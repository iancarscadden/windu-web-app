'use client';

import { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { PerspectiveCamera as ThreePerspectiveCamera } from 'three';

function Model() {
  const { scene } = useGLTF('/3DRENDER/DRONE.glb');
  // Scale the model to ensure it's properly sized
  scene.scale.set(1.5, 1.5, 1.5);
  return <primitive object={scene} />;
}

function CameraRig() {
  const cameraRef = useRef<ThreePerspectiveCamera>(null);
  const time = useRef(0);

  useFrame((state, delta) => {
    time.current += delta * 0.3;
    
    // Create a dynamic orbit radius that varies over time
    const radius = 4 + Math.sin(time.current * 0.5) * 1;
    
    // Calculate camera position
    const x = Math.sin(time.current) * radius;
    const z = Math.cos(time.current) * radius;
    const y = 2 + Math.sin(time.current * 0.5) * 1;

    // Smoothly move camera
    if (cameraRef.current) {
      cameraRef.current.position.lerp(new THREE.Vector3(x, y, z), 0.05);
      cameraRef.current.lookAt(0, 0, 0);
    }
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[3, 2, 3]}
      fov={45}
      near={0.1}
      far={1000}
    />
  );
}

function Loader() {
  return (
    <Html center>
      <div className="text-white text-xl">Loading...</div>
    </Html>
  );
}

export default function DroneModel() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Canvas
        style={{ background: '#000' }}
        shadows
      >
        <Suspense fallback={<Loader />}>
          {/* Lighting setup for cinematic look */}
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={1} 
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <spotLight
            position={[-5, 5, 0]}
            intensity={0.5}
            angle={0.5}
            penumbra={1}
          />
          <Model />
          <CameraRig />
        </Suspense>
      </Canvas>
    </div>
  );
} 