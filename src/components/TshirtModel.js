"use client";

import React, { useRef, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import { gsap } from 'gsap';

const TshirtModel = ({ color, texture, triggerAnimation, triggerLoadingAnimation }) => {
  const gltf = useLoader(GLTFLoader, '/models/tshirt-final.glb');
  const normalMapUrl = '/models/textures/normal-final.jpeg';
  const normalMap = useLoader(TextureLoader, normalMapUrl);
  normalMap.wrapS = THREE.RepeatWrapping;
	normalMap.wrapT = THREE.RepeatWrapping;
	normalMap.flipY = false; 
  const modelRef = useRef();

  useEffect(() => {
    if (gltf && texture) {
      console.log('Model loaded and texture received:', texture);

      gltf.scene.traverse((child) => {
        if (child.isMesh && child.name === 'Tshirt_final1') {
          child.castShadow = true;
			    // child.receiveShadow = true;
          console.log('Applying texture to mesh:', child);
          const material = new THREE.MeshStandardMaterial({
            side: THREE.DoubleSide,
            map: texture,
            normalMap: normalMap,
            roughness: 1,
            metalness: 0.2,
          });
          child.material = material;
          child.material.needsUpdate = true;
        }
      });
    }
  }, [gltf, texture, normalMap]);

  useEffect(() => {
    if (texture) {
      console.log('Updating texture:', texture);
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
        y: modelRef.current.rotation.y + Math.PI * 2,
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
        y: modelRef.current.rotation.y + Math.PI * 4,
        duration: 2,
        ease: "power1.inOut",
        onComplete: () => {
          modelRef.current.rotation.y = modelRef.current.rotation.y % (Math.PI * 2);
        },
      });
      console.log("Scale", modelRef.current.scale);
      gsap.to(modelRef.current.scale, {
        x: 5,
        y: 5,
        z: 5,
        duration: 1,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut",
      });
    }
  }, [triggerLoadingAnimation]);

  return <primitive ref={modelRef} object={gltf.scene} position={[0, 1, 0]} scale={[10, 10, 10]} />;
};

export default TshirtModel;
