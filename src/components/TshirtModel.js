// src/components/TshirtModel.js
"use client";

import React, { useRef, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const TshirtModel = ({ color }) => {
  const gltf = useLoader(GLTFLoader, '/models/tshirt-final.glb');
  const meshRef = useRef();

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.traverse((child) => {
        if (child.isMesh) {
          child.material.color = new THREE.Color(color);
          child.material.needsUpdate = true;
        }
      });
    }
  }, [color, gltf]);

  return <primitive object={gltf.scene} ref={meshRef} position={[0, 1, 0]} scale={[10, 10, 10]} />;
};

export default TshirtModel;
