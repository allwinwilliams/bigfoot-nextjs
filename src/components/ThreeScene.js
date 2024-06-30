// src/components/ThreeScene.js
"use client";

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import TshirtModel from './TshirtModel';

const ThreeScene = ({ color }) => {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Canvas
        shadows
        camera={{ position: [5, 12, 8], fov: 50 }}
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
        <TshirtModel color={color} />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default ThreeScene;
