'use client';

import { useEffect, useRef, useState } from 'react';

export default function VesselPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState<string | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
      
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
        <div className="absolute inset-0">
          {videoError ? (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-blue-900/50 to-black">
              <p className="text-red-500">Failed to load video background</p>
            </div>
          ) : (
            <div className="relative w-full h-full">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                onCanPlay={() => console.log('Video can play')}
                onPlay={() => console.log('Video started playing')}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ zIndex: 0 }}
              >
                <source 
                  src="/videos/RC_Boat_Video_Generated.mp4" 
                  type="video/mp4"
                  onError={(e) => {
                    console.error('Source error:', e);
                    setVideoError('Error loading video source');
                  }}
                />
                Your browser does not support the video tag.
              </video>
              <div 
                className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"
                style={{ zIndex: 1 }}
              />
            </div>
          )}
        </div>
        <div className="relative container-custom h-full flex items-center z-10">
          <div className="max-w-2xl">
            <h1 className="text-6xl font-bold mb-6">
              Autonomous Vessel
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Advanced surface vessel designed for autonomous maritime operations.
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
                <li>Max Speed: 45 knots</li>
                <li>Range: 500 nautical miles</li>
                <li>Endurance: 72 hours</li>
                <li>Sea State: Up to 5</li>
              </ul>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Capabilities</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Autonomous Navigation</li>
                <li>Weather Routing</li>
                <li>Collision Avoidance</li>
                <li>Remote Operation</li>
              </ul>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Systems</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Advanced Radar</li>
                <li>AIS Integration</li>
                <li>Multi-sensor Fusion</li>
                <li>Satellite Communication</li>
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
                    <h3 className="font-bold mb-2">Autonomous Navigation</h3>
                    <p className="text-gray-400">Advanced AI-powered navigation system for safe maritime operations</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="font-bold mb-2">Multi-Mission Capability</h3>
                    <p className="text-gray-400">Configurable for various maritime operations and missions</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="font-bold mb-2">Advanced Sensors</h3>
                    <p className="text-gray-400">Comprehensive sensor suite for situational awareness</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative h-full bg-gray-900 min-h-[400px]">
              {/* Placeholder for additional vessel imagery */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-blue-600/20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-black">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Maritime Operations?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact our team to learn how our autonomous vessel can enhance your maritime capabilities.
          </p>
          <button className="btn-primary">
            Request Information
          </button>
        </div>
      </section>
    </div>
  );
} 