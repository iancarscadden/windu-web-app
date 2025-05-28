import React from 'react';
import Background from './Background';

export default function BackgroundExample() {
  return (
    <div className="space-y-8">
      {/* Simple color background */}
      <div className="h-64">
        <Background color="bg-blue-100 dark:bg-blue-950">
          <div className="flex items-center justify-center h-full">
            <h2 className="text-2xl font-bold">Simple Color Background</h2>
          </div>
        </Background>
      </div>

      {/* Gradient background */}
      <div className="h-64">
        <Background color="bg-gradient-to-r from-purple-400 to-pink-600 dark:from-purple-900 dark:to-pink-900">
          <div className="flex items-center justify-center h-full">
            <h2 className="text-2xl font-bold text-white">Gradient Background</h2>
          </div>
        </Background>
      </div>

      {/* Background with pattern */}
      <div className="h-64">
        <Background 
          color="bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" 
          pattern="dots"
        >
          <div className="flex items-center justify-center h-full">
            <h2 className="text-2xl font-bold">Background with Dots Pattern</h2>
          </div>
        </Background>
      </div>

      {/* Background with image */}
      <div className="h-64">
        <Background 
          imageUrl="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070"
          overlay={true}
        >
          <div className="flex items-center justify-center h-full">
            <h2 className="text-2xl font-bold text-white">Image Background with Overlay</h2>
          </div>
        </Background>
      </div>
    </div>
  );
} 