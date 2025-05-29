'use client';

import { useEffect, useRef, useState } from 'react';

export default function SubmersiblePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState<string | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
      
      // Add error handling
      videoRef.current.onerror = () => {
        setVideoError('Error loading video');
        console.error('Video error:', videoRef.current?.error);
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-black">
          {/* Gradient background */}
        </div>
        <div className="relative container-custom h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-6xl font-bold mb-6">
              Deep Sea Submersible
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Advanced autonomous underwater vehicle for deep-sea exploration and operations.
            </p>
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="py-20 bg-gray-900">
        <div className="container-custom">
          <h2 className="section-header">Technical Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Performance</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Max Depth: 6000m</li>
                <li>Operating Range: 200 km</li>
                <li>Max Speed: 8 knots</li>
                <li>Endurance: 72 hours</li>
              </ul>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Capabilities</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Advanced Sonar System</li>
                <li>4K Video Imaging</li>
                <li>Robotic Manipulation</li>
                <li>Sample Collection</li>
              </ul>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Systems</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Autonomous Navigation</li>
                <li>Obstacle Avoidance</li>
                <li>Emergency Surface Protocol</li>
                <li>Acoustic Communication</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="section-header">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="font-bold mb-2">Deep Sea Operations</h3>
                    <p className="text-gray-400">Designed for extreme depth and pressure environments</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="font-bold mb-2">Advanced Sensing</h3>
                    <p className="text-gray-400">Multi-modal sensor suite for underwater navigation and mapping</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="font-bold mb-2">Mission Flexibility</h3>
                    <p className="text-gray-400">Configurable for various underwater tasks and operations</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative h-full bg-gray-900 min-h-[400px]">
              {/* Placeholder for additional vehicle imagery */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-blue-600/20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20 bg-gray-900">
        <div className="container-custom">
          <h2 className="section-header">Applications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Research</h3>
              <p className="text-gray-400">Deep-sea exploration and scientific research operations</p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Industrial</h3>
              <p className="text-gray-400">Underwater infrastructure inspection and maintenance</p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Defense</h3>
              <p className="text-gray-400">Maritime security and underwater surveillance</p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Survey</h3>
              <p className="text-gray-400">Seabed mapping and environmental monitoring</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-black">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">Explore the Depths</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact our team to learn how our submersible can support your underwater operations.
          </p>
          <button className="btn-primary">
            Request Information
          </button>
        </div>
      </section>
    </div>
  );
} 