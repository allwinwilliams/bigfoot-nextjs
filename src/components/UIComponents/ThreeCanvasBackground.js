import React, { useMemo, useEffect, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const ImagePlaneShader = ({ imageUrl, channel, zOffset, speedMultiplier, influenceRadius = 1.5, influenceStrength = 0.5 }) => {
  const texture = useTexture(imageUrl); // Load the texture
  const meshRef = useRef(); // Ref for accessing the mesh directly
  const targetPosition = useRef({ x: 0, y: 0 }); // Store the mouse position
  
  // Memoize the geometry for the plane
  const geometry = useMemo(() => new THREE.PlaneGeometry(10, 7, 100, 100), []); // Add more subdivisions to make it flexible

  // The shader material using a custom vertex and fragment shader
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture }, // Pass the texture to the shader
        uChannel: { value: channel }, // 0 for red, 1 for green, 2 for blue
        uZOffset: { value: zOffset }, // Z-axis offset for layering
        uMouse: { value: new THREE.Vector2() }, // Mouse position (x, y)
        uInfluenceRadius: { value: influenceRadius }, // How far the mouse influence extends
        uInfluenceStrength: { value: influenceStrength }, // How strong the displacement is
      },
      vertexShader: `
        uniform vec2 uMouse;
        uniform float uZOffset;
        uniform float uInfluenceRadius;
        uniform float uInfluenceStrength;
        varying vec2 vUv;

        void main() {
          vUv = uv;

          // Offset layers by Z based on input
          vec3 displacedPosition = position;
          displacedPosition.z += uZOffset;

          // Calculate distance between the vertex and the mouse position
          vec2 mouseDist = uMouse - vec2(position.x, position.y);
          float distance = length(mouseDist);

          // If the distance is within the influence radius, apply a displacement
          if (distance < uInfluenceRadius) {
            float force = (1.0 - (distance / uInfluenceRadius)) * uInfluenceStrength;
            displacedPosition.x += normalize(mouseDist).x * force;
            displacedPosition.y += normalize(mouseDist).y * force;
            displacedPosition.z += normalize(mouseDist).x * normalize(mouseDist).y * force;
          }

          // Standard transformation to clip space
          gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform int uChannel; // 0 for red, 1 for green, 2 for blue
        varying vec2 vUv;

        void main() {
          // Sample the texture color at this fragment's UV coordinate
          vec4 texColor = texture2D(uTexture, vUv);

          // Apply color channel and set alpha based on intensity
          if (uChannel == 0) {
            // For Red channel: only show red with alpha based on red intensity
            gl_FragColor = vec4(texColor.r, 0.0, 0.0, texColor.r); // Alpha = red intensity
          } else if (uChannel == 1) {
            // For Green channel: only show green with alpha based on green intensity
            gl_FragColor = vec4(0.0, texColor.g, 0.0, texColor.g); // Alpha = green intensity
          } else if (uChannel == 2) {
            // For Blue channel: only show blue with alpha based on blue intensity
            gl_FragColor = vec4(0.0, 0.0, texColor.b, texColor.b); // Alpha = blue intensity
          }
        }
      `,
      transparent: true, 
      blending: THREE.AdditiveBlending, // Use additive blending for a glowing effect
      depthWrite: false, // Enable transparency based on alpha channel
    });
  }, [texture, channel, zOffset, influenceRadius, influenceStrength]);

  // Capture mouse position and update the uniform
  useEffect(() => {
    const handleMouseMove = (event) => {
      const { innerWidth, innerHeight } = window;
      const mouseX = (event.clientX / innerWidth) * 2 - 1; // Normalized range [-1, 1]
      const mouseY = -(event.clientY / innerHeight) * 2 + 1; // Normalized range [-1, 1]

      // Update the mouse position
      targetPosition.current.x = mouseX * speedMultiplier; 
      targetPosition.current.y = mouseY * speedMultiplier;
    };

    // Add event listener for mouse movement
    window.addEventListener('mousemove', handleMouseMove);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Use `useFrame` to update the mouse position in the shader
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uMouse.value.x = targetPosition.current.x * 5.0;
      meshRef.current.material.uniforms.uMouse.value.y = targetPosition.current.y * 5.0;
      
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetPosition.current.x, 0.02);
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetPosition.current.y, 0.04);
        meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.x, targetPosition.current.y, 0.04);
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetPosition.current.y, -0.01);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetPosition.current.x, 0.012);
    }
  });

  

  return <mesh ref={meshRef} geometry={geometry} material={material} />;
};

const ThreeCanvasBackground = () => {
  return (
    <Canvas style={{ height: '100vh', width: '100%', position: 'absolute' }} camera={{ position: [0, 0, 10], fov: 50 }}>
      <ambientLight intensity={0.5} />

      {/* Render the red channel at Z offset +0.1 with slower speed */}
      <ImagePlaneShader imageUrl="/gallery/move.png" channel={0} zOffset={0.2} speedMultiplier={0.5} influenceRadius={2} influenceStrength={0.5} />

      {/* Render the green channel at Z offset 0 with medium speed */}
      <ImagePlaneShader imageUrl="/gallery/move.png" channel={1} zOffset={0} speedMultiplier={1.0} influenceRadius={2} influenceStrength={0.5} />

      {/* Render the blue channel at Z offset -0.1 with faster speed */}
      <ImagePlaneShader imageUrl="/gallery/move.png" channel={2} zOffset={-0.2} speedMultiplier={1.5} influenceRadius={2} influenceStrength={0.5} />
    </Canvas>
  );
};

export default ThreeCanvasBackground;
