// src/components/TshirtModel.js
"use client";

import React, { useRef, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

const TshirtModel = ({ color, texture }) => {
  const gltf = useLoader(GLTFLoader, '/models/tshirt-final.glb');
  const textureRef = useRef(texture);

  useEffect(() => {
    if (gltf && texture) {
      console.log('Model loaded and texture received:', texture);
      gltf.scene.traverse((child) => {
        if (child.isMesh && child.name === "Tshirt_final1") {
          const material = new THREE.MeshStandardMaterial({
            side: THREE.DoubleSide,
            color: 'white',
            map: textureRef.current,
            roughness: 1,
            metalness: 0.2,
          });
          console.log('Applying texture to mesh:', child);
          child.material = material;
          child.material.needsUpdate = true;
        }
      });
    }
  }, [gltf, texture]);

  useEffect(() => {
    if (texture) {
      console.log('Updating texture:', texture);
      textureRef.current = texture;
      gltf.scene.traverse((child) => {
        if (child.isMesh && child.name === "Tshirt_final1") {
          child.material.map = textureRef.current;
          child.material.needsUpdate = true;
        }
      });
    }
  }, [texture, gltf]);

  return gltf ? <primitive object={gltf.scene} /> : null;
};

export default TshirtModel;
