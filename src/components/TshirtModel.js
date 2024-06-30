// src/components/TshirtModel.js
"use client";

import React, { useRef, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const TshirtModel = ({ color, texture }) => {
  const gltf = useLoader(GLTFLoader, '/models/tshirt-final.glb');
  const meshRef = useRef();

  useEffect(() => {
    if (meshRef.current && texture) {
      meshRef.current.traverse((child) => {
        if (child.isMesh && child.name === 'Tshirt_final1') {
          child.material = new THREE.MeshStandardMaterial({
            side: THREE.DoubleSide,
            color: new THREE.Color(color),
            map: texture,
            roughness: 1,
            metalness: 0.2
          });
          child.material.needsUpdate = true;
        }
      });
    }
  }, [color, texture, gltf]);

  return <primitive object={gltf.scene} ref={meshRef} position={[0, 1, 0]} scale={[10, 10, 10]} />;
};

export default TshirtModel;
