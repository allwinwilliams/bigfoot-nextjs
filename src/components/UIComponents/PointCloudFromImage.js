import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Component to generate the point cloud from an image
const PointCloudFromImage = ({ texture }) => {
  const pointsRef = useRef();
  const timeRef = useRef(0);

  // Animate the points
  useFrame((state, delta) => {
    timeRef.current += delta;
    if (pointsRef.current) {
      pointsRef.current.material.uniforms.uTime.value = timeRef.current;
    }
  });

  // Memoize the point cloud positions based on the image
  const pointPositions = useMemo(() => {
    // Ensure texture is fully loaded
    if (!texture || !texture.image) {
      console.error('Texture not loaded');
      return [];
    }

    // Get image dimensions
    const width = texture.image.width;
    const height = texture.image.height;

    const positions = [];

    // Create an offscreen canvas to draw the image
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    // Get the 2D rendering context
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Failed to get 2D context');
      return positions;
    }

    // Draw the image onto the canvas
    ctx.drawImage(texture.image, 0, 0);

    // Get pixel data from the image
    const imgData = ctx.getImageData(0, 0, width, height).data;

    // Iterate through pixels and create point positions
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4; // RGBA channels
        const alpha = imgData[i + 3]; // Alpha channel

        if (alpha > 10) { // Only include non-transparent pixels
          const px = (x / width - 0.5) * 10;
          const py = -(y / height - 0.5) * 10;
          const pz = 0;
          positions.push(px, py, pz);
        }
      }
    }

    return new Float32Array(positions);
  }, [texture]);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          array={pointPositions}
          count={pointPositions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        uniforms={{
          uTime: { value: 0 },
        }}
        vertexShader={`
          uniform float uTime;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            vec3 newPosition = position + normal * sin(uTime) * 0.5;
            gl_PointSize = 4.0; // Size of the points
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          void main() {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Red color for points
          }
        `}
      />
    </points>
  );
};

export default PointCloudFromImage;
