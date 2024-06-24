"use client";

import React, { useRef, useEffect } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const TshirtModel = ({ canvas, color, text }) => {
  const gltf = useLoader(GLTFLoader, "/models/tshirt-final.glb");
  const textureRef = useRef();

  // Function to create combined canvas texture
  const createCombinedTexture = () => {
    const combinedCanvas = document.createElement('canvas');
    const ctx = combinedCanvas.getContext('2d');
    combinedCanvas.width = 4096;
    combinedCanvas.height = 4096;

    // Set background color based on input using a default color if not specified
    const colorMap = {
      'Red': '#FF0000',
      'Blue': '#0000FF',
      'Beige': '#E1C699',
      'Black': '#050505'
    };
    const fillColor = colorMap[color] || '#FFFFFF';
    ctx.fillStyle = fillColor;
    ctx.fillRect(0, 0, combinedCanvas.width, combinedCanvas.height);

    // Draw the p5.js design onto the combined canvas
    if (canvas) {
      ctx.drawImage(canvas, 302.5, 1220, 709.5, 1163);
    }

    // Draw text
    ctx.font = '100px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(text, 100, 500);

    const texture = new THREE.CanvasTexture(combinedCanvas);
    texture.needsUpdate = true;
    return texture;
  };

  useEffect(() => {
    if (canvas) {
      const texture = createCombinedTexture();
      textureRef.current = texture;

      gltf.scene.traverse((child) => {
        if (child.isMesh && child.name === "Tshirt_final1") {
          const material = new THREE.MeshStandardMaterial({
            map: texture,
            side: THREE.DoubleSide,
            roughness: 1,
            metalness: 0.2,
          });
          child.material = material;
          child.material.needsUpdate = true;
        }
      });
    }
  }, [canvas, color, text, gltf]);

  useFrame(() => {
    if (canvas && textureRef.current) {
      const texture = createCombinedTexture();
      textureRef.current.image = texture.image;
      textureRef.current.needsUpdate = true;
    }
  });

  return <primitive object={gltf.scene} position={[0, -1.5, 0]} scale={[10, 10, 10]} />;
};

export default TshirtModel;
