// src/components/ThreeScene.js
"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import TshirtModel from './TshirtModel';
import dynamic from 'next/dynamic';

// Dynamic import with no SSR
const P5Sketch = dynamic(() => import('./P5Sketch'), { ssr: false });

const ThreeScene = ({ color }) => {
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
      ctx.drawImage(canvasRef.current, 60, 2000, 1500, 2000);
    }

    const texture = new THREE.CanvasTexture(combinedCanvas);
    texture.needsUpdate = true;
    return texture;
  }, [color]);

  useEffect(() => {
    if (canvasRef.current) {
      console.log('Canvas ref is set, creating texture');
      const texture = createCombinedTexture();
      setTexture(texture);
    }
  }, [canvasRef, color, createCombinedTexture]);

  const handleP5Update = useCallback(() => {
    console.log('p5 sketch updated');
    const texture = createCombinedTexture();
    setTexture(texture);
  }, [createCombinedTexture]);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Canvas
        shadows
        camera={{ position: [0, 2, 5], fov: 50 }}
        style={{ height: '100%', width: '100%' }}
      >
        <ambientLight intensity={0.5} />
        <spotLight
          position={[5, 10, 5]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          castShadow
        />
        <TshirtModel color={color} texture={texture} />
        <OrbitControls />
      </Canvas>
      <P5Sketch canvasRef={canvasRef} onP5Update={handleP5Update} />
    </div>
  );
};

export default ThreeScene;
