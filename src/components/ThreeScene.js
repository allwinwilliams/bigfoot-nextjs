"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Canvas, extend } from '@react-three/fiber';
import { OrbitControls, SoftShadows, Environment, OrthographicCamera, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useLoader, useThree, useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';


import dynamic from 'next/dynamic';
import { IconButton, Typography, Box } from '@mui/material';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import RightArrowIcon from '@mui/icons-material/ChevronRightRounded';
import LeftArrowIcon from '@mui/icons-material/ChevronLeftRounded';
import TouchAppIcon from '@mui/icons-material/TouchApp';

import HoodieModel from './HoodieModel';
import TshirtModel from './TshirtModel';

extend({ ShadowMaterial: THREE.ShadowMaterial });

const P5Sketch = dynamic(() => import('./P5Sketch'), { ssr: false });

const ThreeScene = ({ color, type, values, style, loading, loadingDuration = 3 }) => {
  const [texture, setTexture] = useState(null);
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  

  const canvasRef = useRef();

  const [showTooltip, setShowTooltip] = useState(true);

  const cameraPositions = [
    new Vector3(0, 0.3, 3.3),
    new Vector3(5, 4.2, 5),
    new Vector3(2, 2, 0.5),
    new Vector3(3, -3, -5),
  ];

  const [cameraPositionIndex, setCameraPositionIndex] = useState(0);
  const [targetPosition, setTargetPosition] = useState(cameraPositions[cameraPositionIndex]);

  // useFrame(({ camera }) => {
  //   camera.position.lerp(targetPosition, 0.1);
  //   camera.lookAt(0, 0, 0);
  // });

  
  const isIOS = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
  };

  const createCombinedTexture = useCallback(() => {
    if (!(canvasRef.current instanceof HTMLCanvasElement)) {
      console.error('canvasRef.current is not an HTMLCanvasElement');
      return null;
    }

    const isIOSDevice = isIOS();

    // Get the device pixel ratio and cap it to a maximum of 2
    const devicePixelRatio = Math.min(2, window.devicePixelRatio);

    // Set canvas dimensions based on device type and devicePixelRatio
    const canvasSize = isIOSDevice ? 1024 : 4096;
    const scaledCanvasWidth = canvasSize * devicePixelRatio;
    const scaledCanvasHeight = canvasSize * devicePixelRatio;

    // Create the combined canvas
    const combinedCanvas = document.createElement('canvas');
    const ctx = combinedCanvas.getContext('2d');
    combinedCanvas.width = scaledCanvasWidth;
    combinedCanvas.height = scaledCanvasHeight;

    // Apply devicePixelRatio scaling
    combinedCanvas.style.width = `${canvasSize}px`;  // Physical size remains the same
    combinedCanvas.style.height = `${canvasSize}px`;
    ctx.scale(devicePixelRatio, devicePixelRatio);

    // Fill the background color
    const colorMap = {
      'red': '#FF0000',
      'maroon': '#421817',
      'navy': '#101525',
      'blue': '#0000FF',
      'grey': '#333333',
      'beige': '#E1C699',
      'black': '#070707',
      'white': '#FFFFFF',
    };
    const fillColor = colorMap[color] || '#FFFFFF';
    ctx.fillStyle = fillColor;
    ctx.fillRect(0, 0, canvasSize, canvasSize);  // No need to scale this since ctx.scale() handles it

    // Scale down the drawImage values by 4 for iOS devices
    const scaleFactor = isIOSDevice ? 4 : 1;
    ctx.drawImage(
      canvasRef.current, 
      45 / scaleFactor, 1980 / scaleFactor, 
      4000 / scaleFactor, 2060 / scaleFactor
    );

    // Create texture from the combined canvas
    const texture = new THREE.CanvasTexture(combinedCanvas);
    texture.flipY = false; // Flip the Y-axis
    texture.needsUpdate = true;

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

  const handleRotation = () => {
    setTriggerAnimation(true);
    setTimeout(() => {
      setTriggerAnimation(false); // Reset the trigger
    }, 3000); // Reset after 3 seconds
  };

  const handlePreviousCameraChange = () => {
    const nextPosition = (cameraPositionIndex + 1) % cameraPositions.length;
    setCameraPositionIndex(nextPosition);
    setTargetPosition(cameraPositions[nextPosition]);
  };

  const handleNextCameraChange = () => {
    const previousPosition = Math.abs((cameraPositionIndex - 1) % cameraPositions.length);
    setCameraPositionIndex(previousPosition);
    setTargetPosition(cameraPositions[previousPosition]);
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
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial map={texture} transparent={true} />
      </mesh>
    );
  };

  return(
    <Box className="three-scene-container"
    >
      <Canvas
        id="three-canvas"
        shadows={{ type: THREE.PCFSoftShadowMap }}
        style={{ height: '100%', width: '100%', background: '#F8F8F8', cursor: 'grab'}}
      >
        <PerspectiveCamera makeDefault {...{position:cameraPositions[cameraPositionIndex], fov: 60, near: 0.01, far: 100}}>
          {/* <pointLight position={[1, 3, 3]} intensity={2} /> */}
        </PerspectiveCamera>
        <spotLight
            position={[2, 4, 5]}
            angle={1}
            penumbra={1.0}
            intensity={1}
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
          <OrbitControls
            maxPolarAngle={Math.PI / 1.2}
            minPolarAngle={Math.PI / 10}
            enableZoom={true}
            maxDistance={10}
            minDistance={0.8}
          />
        <ambientLight intensity={1.2} color="#FFFFFF" />
        {/* <SoftShadows size={128} focus={32} samples={64} /> */}
        
        <pointLight position={[1, 3, 3]} intensity={1} />
        <pointLight position={[-0.5, 3, -3]} intensity={4} />
        
        <TshirtModel
          color={color}
          texture={texture}
          triggerAnimation={triggerAnimation}
          triggerLoadingAnimation={loading}
          animationDuration={loadingDuration}
        />
        <GroundPlane position={[0, -1.8, 0]} />        
      </Canvas>
      <P5Sketch
        canvasRef={canvasRef}
        onP5Update={handleP5Update}
        color={color}
        type={type}
        values={values}
        style={style}
        width={4000}
        height={2060}
      />
      <Box sx={{
          position: 'absolute',
          bottom: '32px',
          right: '32px'
        }}>
        
        <IconButton aria-label="Next View" onClick={handleRotation}>
          <ThreeDRotationIcon sx={{ fontSize: 36 }} />
        </IconButton>
      </Box>
      <Box sx={{
          position: 'absolute',
          bottom: '32px',
          left: '32px'
        }}>
        <IconButton aria-label="3D Rotation" onClick={handleNextCameraChange}>
          <LeftArrowIcon sx={{ fontSize: 36 }} />
        </IconButton>
        <IconButton aria-label="Previous View" onClick={handlePreviousCameraChange}>
          <RightArrowIcon sx={{ fontSize: 36 }} />
        </IconButton>
      </Box>
      {showTooltip && (
        <div className="tooltip-container">
          <TouchAppIcon id="touch-icon" className="touch-icon" sx={{ fontSize: 36, color: 'white', animation: 'moveLeftRight 1s infinite alternate' }} />
          <Typography variant="h6" color="white" sx={{ textAlign: 'center', }}>
            Move around Tshirt in 3D
          </Typography>
        </div>
      )}
    </Box>
  );
};

export default ThreeScene;
