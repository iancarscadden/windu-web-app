'use client';

import DroneModel from './components/DroneModel';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <DroneModel />
        </div>
        <div className="relative container-custom h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-6xl font-bold mb-6">
              Next-Generation Autonomous Systems
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Advanced drone technology powered by cutting-edge autonomy and AI.
            </p>
            <button className="btn-primary">
              Explore Our Systems
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="container-custom">
          <h2 className="section-header text-center">Core Capabilities</h2>
          <div className="grid-layout">
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Advanced Autonomy</h3>
              <p className="text-gray-400">
                State-of-the-art autonomous navigation and decision-making systems.
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold mb-4">All-Weather Operations</h3>
              <p className="text-gray-400">
                Designed to perform in the most challenging environmental conditions.
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Advanced Sensors</h3>
              <p className="text-gray-400">
                Multi-modal sensor suite for comprehensive situational awareness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-header">Cutting-Edge Technology</h2>
              <p className="text-gray-400 mb-6">
                Our systems integrate advanced AI, robust hardware, and sophisticated software to deliver unmatched performance in any environment.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Real-time AI Processing
                </li>
                <li className="flex items-center">
                  <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Advanced Navigation Systems
          </li>
                <li className="flex items-center">
                  <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Multi-Modal Sensor Fusion
          </li>
              </ul>
            </div>
            <div className="relative h-96 bg-gray-900">
              {/* Placeholder for additional 3D model or image */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-black">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Operations?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact us to learn how our advanced drone systems can enhance your capabilities.
          </p>
          <button className="btn-primary">
            Get in Touch
          </button>
        </div>
      </section>
    </div>
  );
}
