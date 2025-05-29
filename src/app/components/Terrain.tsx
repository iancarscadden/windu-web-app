'use client';

import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Detailed, Instance, Instances, useTexture } from '@react-three/drei';

interface TreeProps {
  position: [number, number, number];
  scale?: number;
  rotation?: number;
}

interface MountainProps {
  position: [number, number, number];
  scale?: number;
  roughness?: number;
}

function Tree({ position, scale = 1, rotation = 0 }: TreeProps) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Tree trunk */}
      <mesh position={[0, scale * 0.5, 0]} castShadow>
        <cylinderGeometry args={[scale * 0.2, scale * 0.3, scale * 1, 8]} />
        <meshStandardMaterial 
          color="#2d1b0e"
          roughness={0.9}
          metalness={0.1}
          normalScale={new THREE.Vector2(1, 1)}
        />
      </mesh>
      {/* Tree layers */}
      {[1.2, 1.7, 2.2].map((height, i) => (
        <mesh key={i} position={[0, scale * height, 0]} castShadow>
          <coneGeometry args={[scale * (1.2 - i * 0.2), scale * 1, 8]} />
          <meshStandardMaterial 
            color={i === 0 ? "#1a472a" : i === 1 ? "#2d5a27" : "#355e20"}
            roughness={0.8}
            metalness={0.1}
            normalScale={new THREE.Vector2(1, 1)}
          />
        </mesh>
      ))}
    </group>
  );
}

function Mountain({ position, scale = 1, roughness = 0.9 }: MountainProps) {
  // Create more complex mountain geometry
  const geometry = new THREE.ConeGeometry(scale * 4, scale * 8, 16);
  const vertices = geometry.attributes.position.array;
  for (let i = 0; i < vertices.length; i += 3) {
    const noise = (Math.random() - 0.5) * scale * 1.5;
    vertices[i] += noise;
    vertices[i + 2] += noise;
  }
  geometry.computeVertexNormals();

  return (
    <mesh position={position} castShadow geometry={geometry}>
      <meshStandardMaterial 
        color="#4a4a4a"
        roughness={roughness}
        metalness={0.1}
        normalScale={new THREE.Vector2(2, 2)}
      />
    </mesh>
  );
}

function River() {
  const riverRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (riverRef.current && riverRef.current.material instanceof THREE.ShaderMaterial) {
      riverRef.current.material.uniforms.time.value = clock.getElapsedTime();
    }
  });

  const waterShader = {
    uniforms: {
      time: { value: 0 },
      color: { value: new THREE.Color('#2196f3') },
      foamColor: { value: new THREE.Color('#ffffff') }
    },
    vertexShader: `
      varying vec2 vUv;
      varying float vElevation;
      uniform float time;
      
      // Simplex 2D noise
      vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
      float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
          dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }
      
      void main() {
        vUv = uv;
        vec3 pos = position;
        float noiseFreq = 1.5;
        float noiseAmp = 0.15;
        vec2 noiseCoord = vec2(pos.x * noiseFreq + time, pos.y * noiseFreq + time);
        float noise = snoise(noiseCoord) * noiseAmp;
        pos.z += noise;
        vElevation = noise;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color;
      uniform vec3 foamColor;
      varying vec2 vUv;
      varying float vElevation;
      
      void main() {
        float mixStrength = (vElevation + 0.15) * 5.0;
        vec3 mixedColor = mix(color, foamColor, mixStrength);
        gl_FragColor = vec4(mixedColor, 0.8);
      }
    `
  };

  return (
    <mesh 
      ref={riverRef} 
      rotation={[-Math.PI / 2, 0, 0]} 
      position={[0, 0.1, 0]}
      receiveShadow
    >
      <planeGeometry args={[30, 4, 128, 128]} />
      <shaderMaterial 
        attach="material" 
        {...waterShader} 
        transparent={true}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Forest() {
  const treePositions: { position: [number, number, number]; scale: number; rotation: number }[] = [];
  
  // Generate random tree positions with varying density
  for (let x = -15; x <= 15; x += 1.5) {
    for (let z = -15; z <= 15; z += 1.5) {
      // Skip trees near the river
      if (Math.abs(x) < 2.5) continue;
      
      // Add randomness to tree placement
      if (Math.random() > 0.7) continue;
      
      const offsetX = (Math.random() - 0.5) * 1.2;
      const offsetZ = (Math.random() - 0.5) * 1.2;
      const scale = 0.4 + Math.random() * 0.6;
      const rotation = Math.random() * Math.PI * 2;
      
      treePositions.push({
        position: [x + offsetX, 0, z + offsetZ],
        scale,
        rotation
      });
    }
  }

  return (
    <group>
      {treePositions.map((tree, i) => (
        <Tree 
          key={i} 
          position={tree.position} 
          scale={tree.scale} 
          rotation={tree.rotation}
        />
      ))}
    </group>
  );
}

function Ground() {
  // Create a custom noise texture
  const noiseTexture = new THREE.DataTexture(
    Float32Array.from({ length: 256 * 256 }, () => Math.random()),
    256,
    256,
    THREE.RedFormat,
    THREE.FloatType
  );
  noiseTexture.needsUpdate = true;

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[100, 100, 64, 64]} />
      <meshStandardMaterial 
        color="#2d5a27"
        roughness={1}
        metalness={0}
        normalScale={new THREE.Vector2(2, 2)}
        roughnessMap={noiseTexture}
      />
    </mesh>
  );
}

export default function Terrain() {
  return (
    <group position={[0, -10, 0]}>
      <Ground />

      {/* Mountains with varying sizes and positions */}
      {[
        { pos: [-20, 0, -20], scale: 2, rough: 0.95 },
        { pos: [-15, 0, -25], scale: 1.5, rough: 0.9 },
        { pos: [-25, 0, -15], scale: 1.8, rough: 0.85 },
        { pos: [20, 0, -20], scale: 2.2, rough: 0.92 },
        { pos: [15, 0, -25], scale: 1.7, rough: 0.88 },
        { pos: [-18, 0, -22], scale: 1.4, rough: 0.87 },
        { pos: [18, 0, -22], scale: 1.6, rough: 0.93 }
      ].map((mountain, i) => (
        <Mountain 
          key={i}
          position={mountain.pos as [number, number, number]}
          scale={mountain.scale}
          roughness={mountain.rough}
        />
      ))}

      <River />
      <Forest />

      {/* Enhanced fog for depth */}
      <fog attach="fog" args={['#202020', 25, 80]} />
    </group>
  );
} 