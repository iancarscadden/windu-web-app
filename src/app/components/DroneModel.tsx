'use client';

import { Suspense, useEffect, useState, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, Environment, Cloud, useTexture, Preload, Points, PointMaterial, AdaptiveDpr, AdaptiveEvents, Trail } from '@react-three/drei';
import * as THREE from 'three';

function Loader() {
  return (
    <Html center>
      <div className="text-white text-xl">Loading 3D Model...</div>
    </Html>
  );
}

function Background() {
  const { scene } = useThree();
  
  // Create sky shader
  const skyShader = useMemo(() => {
    return new THREE.ShaderMaterial({
      side: THREE.BackSide,
      uniforms: {
        time: { value: 0 },
        topColor: { value: new THREE.Color('#001B48') },  // Dark blue
        middleColor: { value: new THREE.Color('#003366') }, // Mid blue
        bottomColor: { value: new THREE.Color('#0A4FA6') } // Lighter blue
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 middleColor;
        uniform vec3 bottomColor;
        uniform float time;
        varying vec3 vWorldPosition;

        void main() {
          float h = normalize(vWorldPosition + vec3(0.0, 0.3, 0.0)).y;
          vec3 color = mix(
            mix(bottomColor, middleColor, smoothstep(0.0, 0.3, h)),
            topColor,
            smoothstep(0.3, 0.7, h)
          );
          gl_FragColor = vec4(color, 1.0);
        }
      `
    });
  }, []);

  // Update shader time uniform
  useFrame(({ clock }) => {
    skyShader.uniforms.time.value = clock.getElapsedTime();
  });

  return (
    <mesh>
      <sphereGeometry args={[500, 60, 40]} />
      <primitive object={skyShader} attach="material" />
    </mesh>
  );
}

function RainEffect() {
  const count = 2500; // Reduced from 5000 for better performance
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = Math.random() * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return positions;
  }, []);

  useFrame((state) => {
    const points = state.scene.children.find(child => child.name === 'rain');
    if (points && points instanceof THREE.Points) {
      const positions = points.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] -= 0.5;
        if (positions[i + 1] < -10) {
          positions[i + 1] = 40;
        }
      }
      points.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points name="rain" limit={2500}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        vertexColors
        size={0.2} // Slightly larger to compensate for fewer particles
        sizeAttenuation
        depthWrite={false}
        color="#aaddff"
      />
    </Points>
  );
}

function LightningEffect() {
  const lightningRef = useRef<THREE.PointLight>(null);
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    const triggerLightning = () => {
      if (!isFlashing) {
        setIsFlashing(true);
        const flashDuration = 120; // Shorter duration for more rapid flashes
        const light = lightningRef.current;
        if (light) {
          // Initial bright flash
          light.intensity = 40;
          light.color.set('#ffffff');
          
          // Fade out sequence
          setTimeout(() => {
            light.intensity = 25;
            light.color.set('#aaaaff');
          }, 40);
          
          setTimeout(() => {
            light.intensity = 15;
            light.color.set('#8888ff');
          }, 80);
          
          setTimeout(() => {
            light.intensity = 0;
            setIsFlashing(false);
            
            // Increased chance of multiple flashes
            if (Math.random() > 0.4) { // 60% chance of follow-up flash
              setTimeout(() => triggerLightning(), 80);
            }
          }, flashDuration);
        }
      }
    };

    const interval = setInterval(() => {
      if (Math.random() < 0.25) { // 25% chance of lightning
        triggerLightning();
      }
    }, 800); // Check more frequently

    return () => clearInterval(interval);
  }, [isFlashing]);

  return (
    <>
      <pointLight
        ref={lightningRef}
        position={[0, 30, 20]}
        intensity={0}
        color="#ffffff"
        distance={120}
        decay={2}
      />
      {/* Additional ambient flash for overall scene illumination */}
      {isFlashing && (
        <ambientLight intensity={1.2} color="#aaaaff" />
      )}
    </>
  );
}

function RealisticClouds() {
  const cloudRefs = useRef<(THREE.Group | null)[]>([]);
  const cloudConfigs = useMemo(() => {
    return Array(12).fill(null).map((_, i) => ({ // Reduced from 20 to 12 clouds
      position: [
        (Math.random() - 0.5) * 100,
        20 + Math.random() * 30,
        -50 - Math.random() * 50
      ] as [number, number, number],
      scale: 8 + Math.random() * 12,
      rotation: Math.random() * Math.PI * 2,
      speed: 0.02 + Math.random() * 0.03
    }));
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    cloudRefs.current.forEach((cloud, i) => {
      if (cloud && cloud instanceof THREE.Group) {
        const config = cloudConfigs[i];
        // Reduced movement calculations
        cloud.position.x += Math.sin(time * 0.05) * config.speed * 0.1;
        cloud.rotation.y = Math.sin(time * 0.025) * 0.1 + config.rotation;
      }
    });
  });

  return (
    <group>
      {cloudConfigs.map((config, i) => (
        <group 
          key={i}
          position={config.position}
          scale={config.scale}
          ref={(el) => {
            if (cloudRefs.current) {
              cloudRefs.current[i] = el;
            }
          }}
        >
          <Cloud
            seed={i}
            segments={30} // Reduced from 40
            bounds={[5, 2, 1]}
            volume={10}
            opacity={0.85}
            fade={1}
            speed={0.3}
            color="#666666"
          />
        </group>
      ))}
    </group>
  );
}

function Model() {
  const { scene } = useGLTF('/3DRENDER/DRONE.glb', true);
  const modelRef = useRef<THREE.Group>(null);
  const lastUpdateTime = useRef(0);
  const updateInterval = 1000 / 60; // Target 60 FPS for movement updates

  useEffect(() => {
    scene.scale.set(1.5, 1.5, 1.5);
    scene.position.y = 0;
    scene.rotation.y = Math.PI;
  }, [scene]);

  useFrame(({ clock }) => {
    const currentTime = clock.getElapsedTime() * 1000; // Convert to milliseconds
    if (currentTime - lastUpdateTime.current >= updateInterval) {
      if (modelRef.current) {
        const time = clock.getElapsedTime();
        
        // Smoother movement with lerping
        const targetY = Math.sin(time * 2) * 0.15;
        const targetX = Math.sin(time * 1.5) * 0.1;
        const targetZ = Math.sin(time * 1.8) * 0.05;
        
        modelRef.current.position.y += (targetY - modelRef.current.position.y) * 0.1;
        modelRef.current.position.x += (targetX - modelRef.current.position.x) * 0.1;
        modelRef.current.position.z += (targetZ - modelRef.current.position.z) * 0.1;

        // Smoother rotation
        modelRef.current.rotation.x += (Math.sin(time * 2.5) * 0.03 - modelRef.current.rotation.x) * 0.1;
        modelRef.current.rotation.z += (Math.sin(time * 2) * 0.03 - modelRef.current.rotation.z) * 0.1;
        modelRef.current.rotation.y = Math.PI + Math.sin(time * 1.5) * 0.02;
      }
      lastUpdateTime.current = currentTime;
    }
  });
  
  return <primitive ref={modelRef} object={scene} />;
}

function MovingCamera() {
  const cameraRef = useRef<THREE.Camera>(null);

  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime();
    
    // Reduced speed to 20% by multiplying time by 0.04 instead of 0.2
    const x = Math.sin(t * 0.04) * 6;
    // Reduced vertical movement speed as well
    const y = -2 + Math.sin(t * 0.1) * 0.2;
    const z = 4;
    
    camera.position.set(x, y, z);
    camera.lookAt(0, Math.sin(t * 2) * 0.15, 0); // Keep drone movement tracking the same
  });

  return null;
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
        <div className="text-white text-xl">Initializing Scene...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, -2, 4], fov: 30 }}
        gl={{ 
          preserveDrawingBuffer: true,
          antialias: true,
          alpha: false,
          powerPreference: "high-performance"
        }}
        shadows={false}
        dpr={Math.min(window.devicePixelRatio, 2)}
      >
        <Suspense fallback={<Loader />}>
          <Background />
          <RealisticClouds />
          <RainEffect />
          <LightningEffect />
          
          {/* Simplified lighting setup */}
          <ambientLight intensity={0.15} />
          <spotLight
            position={[0, 10, 10]}
            angle={0.4}
            penumbra={1}
            intensity={2}
            castShadow={false}
            color="#90a0ff"
          />
          <pointLight 
            position={[0, -5, 5]} 
            intensity={0.8} 
            color="#CCE6FF"
            distance={20}
            decay={2}
          />
          
          <Model />
          <MovingCamera />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
} 