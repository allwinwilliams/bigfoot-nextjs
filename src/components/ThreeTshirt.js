"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import GroundPlane from './GroundPlane';
import P5Sketch from './P5Sketch';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const ThreeTshirt = ({ color }) => {
  const [gltf, setGltf] = useState(null);
  const [p5UpdateTrigger, setP5UpdateTrigger] = useState(0); // State to trigger p5 updates
  const p5CanvasRef = useRef(null);

  const handleP5Update = useCallback(() => {
    setP5UpdateTrigger((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const loadModel = async () => {
      const loader = new GLTFLoader();
      loader.load('/models/tshirt-final.glb', (gltf) => {
        console.log('Model loaded:', gltf); // Debug statement
        setGltf(gltf);
      });
    };

    loadModel();
  }, []);

  const createCombinedTexture = () => {
    const combinedCanvas = document.createElement('canvas');
    const ctx = combinedCanvas.getContext('2d');
    combinedCanvas.width = 4096;
    combinedCanvas.height = 4096;

    // Set background color based on input using a default color if not specified
    const colorMap = {
      'red': '#FF0000',
      'blue': '#0000FF',
      'beige': '#E1C699',
      'black': '#050505'
    };

    const fillColor = colorMap[color.toLowerCase()] || '#FFFFFF';

    ctx.fillStyle = fillColor;
    ctx.fillRect(0, 0, combinedCanvas.width, combinedCanvas.height);

    // Draw the p5.js design onto the combined canvas
    if (p5CanvasRef.current) {
      ctx.drawImage(p5CanvasRef.current, 302.5, 1220, 709.5, 1163);
    }

    const texture = new THREE.CanvasTexture(combinedCanvas);
    texture.needsUpdate = true;
    return texture;
  };

  const applyTexture = () => {
    if (gltf) {
      const combinedTexture = createCombinedTexture();
      gltf.scene.traverse((child) => {
        if (child.isMesh && child.name === "Tshirt_final1") {
          child.material.map = combinedTexture;
          child.material.needsUpdate = true;
        }
      });
    }
  };

  // Apply texture when gltf, color or p5UpdateTrigger updates
  useEffect(() => {
    applyTexture();
  }, [gltf, color, p5UpdateTrigger]);

  if (!gltf) {
    return null; // Render nothing while the model is loading
  }

  return (
    <div style={{ flex: 1, position: 'relative', height: '80vh' }}>
      <Canvas
        shadows
        camera={{ position: [0, 2, 5], fov: 50 }}
        style={{ height: '100%', width: '100%', backgroundColor: 'white' }} // Keep the background white
      >
        <ambientLight intensity={0.5} />
        <spotLight
          position={[5, 10, 5]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          castShadow
        />
        {gltf && (
          <primitive
            object={gltf.scene}
            position={[0, 1, 0]}
            scale={[10, 10, 10]}
            castShadow
            receiveShadow
          />
        )}
        <GroundPlane />
        <OrbitControls />
      </Canvas>
      <P5Sketch canvasRef={p5CanvasRef} onP5Update={handleP5Update} />
    </div>
  );
};

export default ThreeTshirt;
