"use client";

import React, { useRef } from 'react';

const GroundPlane = () => {
  const meshRef = useRef();
  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -2, 0]}
      receiveShadow={true}
    >
      <planeGeometry args={[200, 200]} />
      <shadowMaterial attach="material" opacity={0.5} />
    </mesh>
  );
};

export default GroundPlane;
