"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Canvas, extend } from '@react-three/fiber';
import { OrbitControls, SoftShadows } from '@react-three/drei';
import * as THREE from 'three';
import TshirtModel from './TshirtModel';
import dynamic from 'next/dynamic';
import { IconButton } from '@mui/material';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';

// Ensure the ShadowMaterial is recognized by React Three Fiber
extend({ ShadowMaterial: THREE.ShadowMaterial });

// Dynamic import with no SSR
const P5Sketch = dynamic(() => import('./P5Sketch'), { ssr: false });

const ThreeScene = ({ color, songData, sketchType, songLoading }) => {
  const [texture, setTexture] = useState(null);
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const [triggerLoadingAnimation, setTriggerLoadingAnimation] = useState(false);
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
      'black': '#070707'
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

  const handleIconClick = () => {
    setTriggerAnimation(true);
    setTimeout(() => {
      setTriggerAnimation(false); // Reset the trigger
    }, 3000); // Reset after 3 seconds
  };

  const GroundPlane = () => {
    const meshRef = useRef();

    return (
      <mesh
        ref={meshRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -8, 0]}
        receiveShadow={true}
      >
        <planeGeometry args={[50, 50]} />
        <shadowMaterial attach="material" opacity={0.6} />
      </mesh>
    );
  };

  return (
    <div className="three-scene-container">
      <Canvas
        shadows={{ type: THREE.PCFSoftShadowMap }}
        camera={{ position: [0, 5, 18], fov: 60 }}
        style={{ height: '100%', width: '100%', background: '#f5f5f5' }}
      >
        <ambientLight intensity={1.6} color="#ffffff" />
        <SoftShadows size={500} focus={64} samples={60} />
        <spotLight
          position={[0, 15, 0]}
          angle={0.75}
          penumbra={1}
          intensity={200}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={100}
          shadow-camera-near={0.5}
          shadow-bias={-0.0001}
          shadow-camera-left={-50}
          shadow-camera-right={50}
          shadow-camera-top={50}
          shadow-camera-bottom={-50}
        />
        <pointLight position={[0, 4, 8]} intensity={40} />
        <pointLight position={[0, 4, -6]} intensity={20} />
        <TshirtModel
          color={color}
          texture={texture}
          triggerAnimation={triggerAnimation}
          triggerLoadingAnimation={songLoading}
        />
        <GroundPlane />
        <OrbitControls
          maxPolarAngle={Math.PI / 1.2}
          minPolarAngle={Math.PI / 10}
          enableZoom={true}
          maxDistance={60}
          minDistance={4}
        />
      </Canvas>
      <P5Sketch
        canvasRef={canvasRef}
        onP5Update={handleP5Update}
        color={color}
        songData={songData}
        sketchType={sketchType}
      />
      <div className="icon-container">
        <IconButton aria-label="3D info" onClick={handleIconClick}>
          <ThreeDRotationIcon sx={{ fontSize: 36 }} />
        </IconButton>
      </div>
      <style jsx>{`
        .three-scene-container {
          position: relative;
          height: 100%;
          width: 100%;
          border-radius: 16px 0 0 16px;
          overflow: hidden;
        }

        .icon-container {
          position: absolute;
          bottom: 24px;
          right: 24px;
        }

        @media (max-width: 900px) {
          .three-scene-container {
            min-height: 500px;
            border-radius: 16px 16px 0 0;
            height: 60vh; /* Adjust as needed for more height */
          }
        }
      `}</style>
    </div>
  );
};

export default ThreeScene;
