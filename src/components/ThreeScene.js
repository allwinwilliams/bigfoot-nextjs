"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Canvas, extend } from '@react-three/fiber';
import { OrbitControls, SoftShadows } from '@react-three/drei';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import TshirtModel from './TshirtModel';
import dynamic from 'next/dynamic';
import { IconButton, Typography } from '@mui/material';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import TouchAppIcon from '@mui/icons-material/TouchApp';

// Ensure the ShadowMaterial is recognized by React Three Fiber
extend({ ShadowMaterial: THREE.ShadowMaterial });

// Dynamic import with no SSR
const P5Sketch = dynamic(() => import('./P5Sketch'), { ssr: false });

const ThreeScene = ({ color, type, values, style, loading }) => {
  const [texture, setTexture] = useState(null);
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const [triggerLoadingAnimation, setTriggerLoadingAnimation] = useState(false);
  const canvasRef = useRef();

  const [showTooltip, setShowTooltip] = useState(true);
  
  const createCombinedTexture = useCallback(() => {
    if (!(canvasRef.current instanceof HTMLCanvasElement)) {
      console.error('canvasRef.current is not an HTMLCanvasElement');
      return null;
    }

    // console.log('Creating combined texture');
    const combinedCanvas = document.createElement('canvas');
    const ctx = combinedCanvas.getContext('2d');
    combinedCanvas.width = 4096;
    combinedCanvas.height = 4096;

    const colorMap = {
      'red': '#FF0000',
      'blue': '#0000FF',
      'beige': '#E1C699',
      'black': '#090909',
      'white': '#FFFFFF',
    };
    const fillColor = colorMap[color] || '#FFFFFF';
    ctx.fillStyle = fillColor;
    ctx.fillRect(0, 0, combinedCanvas.width, combinedCanvas.height);

    // console.log('Drawing p5 canvas on combined canvas');
    ctx.drawImage(canvasRef.current, 60, 2000, 2600, 2000);

    const texture = new THREE.CanvasTexture(combinedCanvas);
    texture.flipY = false; // Flip the Y-axis
    texture.needsUpdate = true;

    // const sampleDesignUrl = '/models/textures/UV.png';
    // const sampleTexture = useLoader(THREE.TextureLoader, sampleDesignUrl);
    // sampleTexture.flipY = false;

    return texture;
  }, [color]);

  const handleP5Update = useCallback(() => {
    // console.log('p5 sketch updated');
    if (canvasRef.current instanceof HTMLCanvasElement) {
      const texture = createCombinedTexture();
      setTexture(texture);
    }
  }, [createCombinedTexture]);

  useEffect(() => {
    if (canvasRef.current instanceof HTMLCanvasElement) {
      console.log('Canvas ref is set, creating texture');
      const texture = createCombinedTexture();
      setTexture(texture);
    } else {
      console.error('Canvas ref is not set in useEffect');
    }
  }, [canvasRef.current, color, createCombinedTexture]);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleIconClick = () => {
    setTriggerAnimation(true);
    setTimeout(() => {
      setTriggerAnimation(false); // Reset the trigger
    }, 3000); // Reset after 3 seconds
  };

  // const GroundPlane = ({position}) => {
  //   const meshRef = useRef();

  //   return (
  //     <mesh
  //       ref={meshRef}
  //       rotation={[-Math.PI / 2, 0, 0]}
  //       position={position}
  //       receiveShadow={true}
  //     >
  //       <planeGeometry args={[50, 50]} />
  //       <shadowMaterial attach="material" opacity={0.6} />
  //     </mesh>
  //   );
  // };

  const GroundPlane = ({ position }) => {
    const meshRef = useRef();
    const texture = useLoader(THREE.TextureLoader, '/song-tshirt/shadow.png');
  
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.repeat.set(1, 1);
  
    return (
      <mesh
        ref={meshRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={position}
        receiveShadow={false}
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial map={texture} transparent={true} />
      </mesh>
    );
  };

  return(
  <div className="three-scene-container">
      <Canvas
        shadows={{ type: THREE.PCFSoftShadowMap }}
        camera={{ position: [0, 0.5, 3], fov: 70, near: 0.001, far: 100 }}
        style={{ height: '100%', width: '100%', background: '#f5f5f5' }}
      >
        <ambientLight intensity={4} color="#fafafa" />
        {/* <SoftShadows size={128} focus={32} samples={64} /> */}
        <spotLight
          position={[2, 3, 5]}
          angle={1}
          penumbra={0.9}
          intensity={8}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-near={0.001}
          shadow-bias={-0.00001}
          shadow-camera-left={-30}
          shadow-camera-right={30}
          shadow-camera-top={30}
          shadow-camera-bottom={-30}
        />
        <pointLight position={[-2, 2, 4]} intensity={10} />
        <pointLight position={[-1, 3, -3]} intensity={12} />
        <TshirtModel
          color={color}
          texture={texture}
          triggerAnimation={triggerAnimation}
          triggerLoadingAnimation={loading}
        />
        <GroundPlane position={[0, -1.7, 0]} />
        <OrbitControls
          maxPolarAngle={Math.PI / 1.2}
          minPolarAngle={Math.PI / 10}
          enableZoom={true}
          maxDistance={20}
          minDistance={0.6}
        />
      </Canvas>
      <P5Sketch
        canvasRef={canvasRef}
        onP5Update={handleP5Update}
        color={color}
        type={type}
        values={values}
        style={style}
      />
      <div className="icon-container">
        <IconButton aria-label="3D info" onClick={handleIconClick}>
          <ThreeDRotationIcon sx={{ fontSize: 36 }} />
        </IconButton>
      </div>
      {showTooltip && (
        <div className="tooltip-container">
          <TouchAppIcon id="touch-icon" className="touch-icon" sx={{ fontSize: 36, color: 'white', animation: 'moveLeftRight 1s infinite alternate' }} />
          <Typography variant="h6" color="white" sx={{ fontSize: '1rem', fontWeight: 'bold', textAlign: 'center', }}>
            Move around Tshirt in 3D
          </Typography>
        </div>
      )}
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
          bottom: 32px;
          right: 32px;
        }

        @keyframes moveLeftRight {
          0% { transform: translateX(-10px); }
          100% { transform: translateX(10px); }
        }

        .tooltip-container {
          position: absolute;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(0, 0, 0, 0.2);
          padding: 10px 20px;
          border-radius: 10px;
          opacity: 0;
          animation: fadeInOut 3s ease 2s;
        }

        @keyframes fadeInOut {
          0% { opacity: 0; }
          60% { opacity: 1; }
          90% { opacity: 0; }
          100% { display: none; }
        }

        @media (max-width: 900px) {
          .three-scene-container {
            min-height: 500px;
            border-radius: 16px 16px 0 0;
            height: 60vh;
          }
        }
      `}</style>
    </div>
  );
};

export default ThreeScene;
