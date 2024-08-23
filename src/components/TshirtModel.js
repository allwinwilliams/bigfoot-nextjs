"use client";

import React, { useRef, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useEnvironment } from '@react-three/drei';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import { gsap } from 'gsap';

const TshirtModel = ({ color, texture, triggerAnimation = false, animationDuration = 4, triggerLoadingAnimation = false }) => {
  const gltf = useLoader(GLTFLoader, '/models/tshirt-final.glb');
  const normalMapUrl = '/models/textures/normal-final.jpeg';

  const envMap = useEnvironment({files: '/models/textures/env-map.hdr'})
  
  const normalMap = useLoader(TextureLoader, normalMapUrl);
  normalMap.wrapS = THREE.RepeatWrapping;
	normalMap.wrapT = THREE.RepeatWrapping;
	normalMap.flipY = false; 
  const modelRef = useRef();

  useEffect(() => {
    if (gltf && texture) {
      // console.log('Model loaded and texture received');

      gltf.scene.traverse((child) => {
        if (child.isMesh && child.name === 'Tshirt_final1') {
          child.castShadow = true;
          child.receiveShadow = true;
          const material = new THREE.MeshStandardMaterial({
            side: THREE.DoubleSide,
            map: texture,
            normalMap: normalMap,
            roughness: 0.9,
            metalness: 0.2,
            envMap: envMap,
            envMapIntensity: 0.25,
          });
          child.material = material;
          child.material.needsUpdate = true;
        }
      });
    }
  }, [gltf, texture, normalMap]);

  useEffect(() => {
    if (texture) {
      // console.log('Updating texture');
      gltf.scene.traverse((child) => {
        if (child.isMesh && child.name === 'Tshirt_final1') {
          child.material.map = texture;
          child.material.needsUpdate = true;
        }
      });
    }
  }, [texture]);

  useEffect(() => {
    if (triggerAnimation && modelRef.current) {
      gsap.to(modelRef.current.rotation, {
        y: modelRef.current.rotation.y - Math.PI * 2,
        duration: 3,
        ease: "power1.inOut",
        onComplete: () => {
          modelRef.current.rotation.y = modelRef.current.rotation.y % (Math.PI * 2);
        },
      });
    }
  }, [triggerAnimation]);

  useEffect(() => {
    if (triggerLoadingAnimation && modelRef.current) {
      gsap.to(modelRef.current.rotation, {
        y: modelRef.current.rotation.y - Math.PI * 6,
        duration: animationDuration,
        ease: "power1.inOut",
        onComplete: () => {
          modelRef.current.rotation.y = modelRef.current.rotation.y % (Math.PI * 2);
        },
      });
      gsap.to(modelRef.current.scale, {
        x: 0.5,
        y: 0.5,
        z: 0.5,
        duration: animationDuration/2,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut",
      });
    }
  }, [triggerLoadingAnimation]);

  return <primitive ref={modelRef} object={gltf.scene} position={[0, 0, 0]} scale={[2, 2, 2]} />;
};

export default TshirtModel;
