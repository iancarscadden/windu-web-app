'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import * as THREE from 'three';

// Dynamically import Globe to avoid SSR issues
const Globe = dynamic(() => import('react-globe.gl'), { 
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-black flex items-center justify-center">
      <div className="text-white text-2xl">Loading Global Network...</div>
    </div>
  )
});

interface Vehicle {
  id: string;
  lat: number;
  lng: number;
  alt: number;
  speed: number;
  pattern: 'equator' | 'polar' | 'diagonal' | 'figure8' | 'spiral';
  rotation?: number;
  trailPositions?: THREE.Vector3[];
  phase?: number;
  radius?: number;
}

// Create a simple drone mesh
const createDroneMesh = () => {
  const group = new THREE.Group();

  // Create the main body (fuselage)
  const bodyGeometry = new THREE.CylinderGeometry(0.05, 0.1, 0.4, 8);
  bodyGeometry.rotateZ(Math.PI / 2);
  const bodyMaterial = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    emissive: 0xff0000,
    emissiveIntensity: 0.5,
    shininess: 100,
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);

  // Create wings
  const wingGeometry = new THREE.BoxGeometry(0.1, 0.5, 0.02);
  const wingMaterial = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    emissive: 0xff0000,
    emissiveIntensity: 0.5,
    shininess: 100,
  });
  const wings = new THREE.Mesh(wingGeometry, wingMaterial);

  // Create tail
  const tailGeometry = new THREE.BoxGeometry(0.08, 0.15, 0.02);
  const tail = new THREE.Mesh(tailGeometry, wingMaterial);
  tail.position.x = -0.15;

  // Create trail
  const trailPoints = [];
  for (let i = 0; i < 20; i++) {
    trailPoints.push(new THREE.Vector3(-i * 0.1, 0, 0));
  }
  const trailGeometry = new THREE.BufferGeometry().setFromPoints(trailPoints);
  const trailMaterial = new THREE.LineBasicMaterial({
    color: 0xff6600,
    transparent: true,
    opacity: 0.6,
  });
  const trail = new THREE.Line(trailGeometry, trailMaterial);
  trail.position.x = -0.2;

  // Add all parts to group
  group.add(body);
  group.add(wings);
  group.add(tail);
  group.add(trail);

  // Scale the entire group
  group.scale.set(0.4, 0.4, 0.4);

  return group;
};

// Generate initial vehicle positions
const generateInitialVehicles = (): Vehicle[] => {
  return [
    // Equatorial drones (4)
    ...Array.from({ length: 4 }, (_, i) => ({
      id: `eq-${i}`,
      lat: 0,
      lng: i * 90 - 180, // Space them out evenly around equator
      alt: 0.5,
      speed: 0.2,
      pattern: 'equator' as const,
      trailPositions: []
    })),
    // Polar orbit drones (4)
    ...Array.from({ length: 4 }, (_, i) => ({
      id: `po-${i}`,
      lat: i * 90 - 180,
      lng: i * 90 - 180,
      alt: 0.6, // Slightly higher
      speed: 0.2,
      pattern: 'polar' as const,
      trailPositions: []
    })),
    // Diagonal orbit drones (4)
    ...Array.from({ length: 4 }, (_, i) => ({
      id: `di-${i}`,
      lat: (i * 60 - 90),
      lng: (i * 90 - 180),
      alt: 0.55, // Middle altitude
      speed: 0.2,
      pattern: 'diagonal' as const,
      trailPositions: []
    })),
    // Figure-8 pattern drones (4)
    ...Array.from({ length: 4 }, (_, i) => ({
      id: `f8-${i}`,
      lat: i * 45,
      lng: i * 90 - 180,
      alt: 0.45, // Lower altitude
      speed: 0.2,
      pattern: 'figure8' as const,
      trailPositions: [],
      phase: i * Math.PI / 2 // Different starting points in the pattern
    })),
    // Spiral pattern drones (4)
    ...Array.from({ length: 4 }, (_, i) => ({
      id: `sp-${i}`,
      lat: i * 45 - 90,
      lng: i * 90 - 180,
      alt: 0.65, // Highest altitude
      speed: 0.15, // Slightly slower
      pattern: 'spiral' as const,
      trailPositions: [],
      radius: 30 + i * 10 // Different spiral sizes
    }))
  ];
};

// Update vehicle positions with different patterns
const updateVehiclePositions = (vehicles: Vehicle[]): Vehicle[] => {
  return vehicles.map(vehicle => {
    let newLat = vehicle.lat;
    let newLng = vehicle.lng;
    let phase = vehicle.phase || 0;

    switch (vehicle.pattern) {
      case 'equator':
        // Move along equator (west to east)
        newLng = vehicle.lng + vehicle.speed;
        break;
      case 'polar':
        // Move in north-south pattern
        newLat = vehicle.lat + vehicle.speed;
        break;
      case 'diagonal':
        // Move diagonally
        newLat = vehicle.lat + vehicle.speed * 0.5;
        newLng = vehicle.lng + vehicle.speed;
        break;
      case 'figure8':
        // Create a figure-8 pattern
        phase = (phase + vehicle.speed * 0.02) % (Math.PI * 2);
        newLat = 45 * Math.sin(phase * 2);
        newLng = vehicle.lng + vehicle.speed;
        break;
      case 'spiral':
        // Create a spiral pattern
        const radius = vehicle.radius || 30;
        phase = (phase + vehicle.speed * 0.02) % (Math.PI * 2);
        newLat = (radius * Math.cos(phase)) / (phase + 1);
        newLng = (radius * Math.sin(phase)) / (phase + 1);
        break;
    }

    // Wrap coordinates
    newLng = ((newLng + 180) % 360) - 180;
    newLat = Math.max(-90, Math.min(90, newLat)); // Clamp latitude

    // Update trail positions
    const trailPositions = vehicle.trailPositions || [];
    trailPositions.push(new THREE.Vector3(vehicle.lng, vehicle.lat, vehicle.alt));
    if (trailPositions.length > 20) {
      trailPositions.shift();
    }

    return {
      ...vehicle,
      lat: newLat,
      lng: newLng,
      phase: phase,
      rotation: vehicle.pattern === 'polar' ? Math.PI : Math.PI / 2,
      trailPositions
    };
  });
};

export default function GlobalTakeoverPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [globeReady, setGlobeReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Create a memoized drone mesh that will be reused
  const droneMesh = useMemo(() => createDroneMesh(), []);

  useEffect(() => {
    const initialVehicles = generateInitialVehicles();
    console.log('Initial vehicles:', initialVehicles);
    setVehicles(initialVehicles);
    setIsLoading(false);

    const interval = setInterval(() => {
      setVehicles(prevVehicles => {
        const updated = updateVehiclePositions(prevVehicles);
        return updated;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const customDroneObject = useCallback(() => {
    return droneMesh.clone();
  }, [droneMesh]);

  const onGlobeReady = useCallback(() => {
    console.log('Globe ready');
    setGlobeReady(true);
  }, []);

  if (isLoading) {
    return (
      <div className="absolute inset-0 bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading Global Network...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-black">
      <div className="absolute inset-0">
        <div className="w-full h-full">
          <Globe
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            pointsData={vehicles}
            customThreeObject={customDroneObject}
            customThreeObjectRotation={(d: Vehicle) => [0, d.rotation || 0, 0]}
            atmosphereColor="#ffffff"
            atmosphereAltitude={0.25}
            width={window.innerWidth}
            height={window.innerHeight}
            autoRotate={true}
            autoRotateSpeed={0.1}
            onGlobeReady={onGlobeReady}
          />
        </div>

        <div className="absolute top-0 left-0 p-8 z-10">
          <h1 className="text-4xl font-bold text-white mb-4">Global Operations</h1>
          <p className="text-xl text-gray-300">
            Active autonomous vehicles: {vehicles.length}
          </p>
          <div className="mt-4 text-sm text-gray-400">
            <p>Globe ready: {globeReady ? 'Yes' : 'No'}</p>
            <p>Vehicle count: {vehicles.length}</p>
          </div>
        </div>

        {!globeReady && (
          <div className="absolute inset-0 bg-black flex items-center justify-center">
            <div className="text-white text-2xl">Loading Global Network...</div>
          </div>
        )}
      </div>
    </div>
  );
} 