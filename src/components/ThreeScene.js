// src/components/ThreeScene.js
"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Canvas, extend } from '@react-three/fiber';
import { OrbitControls, SoftShadows } from '@react-three/drei';
import * as THREE from 'three';
import TshirtModel from './TshirtModel';
import dynamic from 'next/dynamic';

// Ensure the ShadowMaterial is recognized by React Three Fiber
extend({ ShadowMaterial: THREE.ShadowMaterial });

// Dynamic import with no SSR
const P5Sketch = dynamic(() => import('./P5Sketch'), { ssr: false });

const ThreeScene = ({ color, songData, sketchType }) => {
  const [texture, setTexture] = useState(null);
  const canvasRef = useRef();

  const createCombinedTexture = useCallback(() => {
    console.log('Creating combined texture');
    const combinedCanvas = document.createElement('canvas');
    const ctx = combinedCanvas.getContext('2d');
    combinedCanvas.width = 4096;
    combinedCanvas.height = 4096;

    const colorMap = {
      'red': '#FF0000',
      'blue': '#0000FF',
      'beige': '#E1C699',
      'black': '#050505'
    };
    const fillColor = colorMap[color] || '#FFFFFF';
    ctx.fillStyle = fillColor;
    ctx.fillRect(0, 0, combinedCanvas.width, combinedCanvas.height);

    if (canvasRef.current) {
      console.log('Drawing p5 canvas on combined canvas');
      ctx.drawImage(canvasRef.current, 60, 2000, 1500, 2000);
    } else {
      console.error('Canvas ref is not set');
    }

    const texture = new THREE.CanvasTexture(combinedCanvas);
    texture.flipY = false; // Flip the Y-axis
    texture.needsUpdate = true;
    return texture;
  }, [color]);

  useEffect(() => {
    if (canvasRef.current) {
      console.log('Canvas ref is set, creating texture');
      const texture = createCombinedTexture();
      setTexture(texture);
    } else {
      console.error('Canvas ref is not set in useEffect');
    }
  }, [canvasRef.current, color, createCombinedTexture]);

  const handleP5Update = useCallback(() => {
    console.log('p5 sketch updated');
    const texture = createCombinedTexture();
    setTexture(texture);
  }, [createCombinedTexture]);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Canvas
        shadows={{ type: THREE.PCFSoftShadowMap }}
        camera={{ position: [0, 5, 15], fov: 60 }}
        style={{ height: '100%', width: '100%' }}
      >
        <ambientLight intensity={1.6} color="#ffffff" />
        <spotLight
          position={[1, 10, 1]}
          angle={0.2}
          penumbra={1}
          intensity={100}
          castShadow
          shadow-mapSize-width={4096}
          shadow-mapSize-height={4096}
          shadow-camera-far={50}
          shadow-camera-near={0.5}
          shadow-bias={-0.0001}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />
        <pointLight position={[4, 4, 4]} intensity={30} />
        <SoftShadows size={200} focus={64} samples={60} />
        <TshirtModel color={color} texture={texture} />
        {/* <GroundPlane /> */}
        <OrbitControls />
      </Canvas>
      <P5Sketch canvasRef={canvasRef} onP5Update={handleP5Update} songData={songData} sketchType={sketchType} />
    </div>
  );
};

export default ThreeScene;
