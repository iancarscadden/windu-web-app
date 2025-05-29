'use client';

import DroneModel from '../../components/DroneModel';

export default function RumiSentinelPage() {
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
              Runi Sentinel
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Advanced autonomous aerial system designed for all-weather operations and superior performance.
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
                <li>Max Speed: 120 km/h</li>
                <li>Operating Range: 100 km</li>
                <li>Max Altitude: 5000m</li>
                <li>Flight Time: 4 hours</li>
              </ul>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Environmental</h3>
              <ul className="space-y-2 text-gray-400">
                <li>All-weather capable</li>
                <li>Operating Temp: -20°C to +45°C</li>
                <li>Wind Resistance: Up to 40 knots</li>
                <li>IP67 Rated</li>
              </ul>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Payload</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Max Payload: 10kg</li>
                <li>Modular Payload System</li>
                <li>Quick-swap Interface</li>
                <li>Multiple Mount Points</li>
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
                    <h3 className="font-bold mb-2">Advanced Autonomy</h3>
                    <p className="text-gray-400">AI-powered navigation and decision making for complex missions</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="font-bold mb-2">Multi-Sensor Suite</h3>
                    <p className="text-gray-400">Integrated sensors for comprehensive situational awareness</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="font-bold mb-2">Modular Design</h3>
                    <p className="text-gray-400">Easily adaptable for different mission requirements</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative h-full bg-gray-900 min-h-[400px]">
              {/* Placeholder for additional vehicle imagery */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-black">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Learn More?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact our team to discuss how the Runi Sentinel can meet your operational needs.
          </p>
          <button className="btn-primary">
            Request Information
          </button>
        </div>
      </section>
    </div>
  );
} 