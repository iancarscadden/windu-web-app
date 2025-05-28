'use client';

import dynamic from 'next/dynamic';

const DroneModel = dynamic(() => import('./DroneModel'), {
  ssr: false,
  loading: () => (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      <div className="text-white text-xl">Loading 3D Model...</div>
    </div>
  ),
});

export default function DroneModelWrapper() {
  return (
    <div className="w-screen h-screen fixed inset-0">
      <DroneModel />
    </div>
  );
} 