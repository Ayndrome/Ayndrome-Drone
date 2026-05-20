import React from "react";

function SafetyPage() {
    return (
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Safety First</h1>
  
        <div className="bg-white p-8 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-bold mb-6">Our Approach to Safety</h2>
          <p className="text-gray-600 mb-4">At DroneDrop, safety isn't just a priority—it's embedded in everything we do. From the design of our drones to our operational protocols, we've developed multiple layers of safety systems to ensure reliable and secure deliveries.</p>
          <p className="text-gray-600">Our commitment to safety extends beyond our technology. We work closely with regulatory authorities, participate in industry safety initiatives, and continuously improve our systems based on operational data and feedback.</p>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Drone Safety Features</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-4 mt-1">
                  <span className="text-green-600 font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-bold">Obstacle Avoidance Technology</h3>
                  <p className="text-gray-600">Advanced sensors detect and navigate around obstacles in real-time.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-4 mt-1">
                  <span className="text-green-600 font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-bold">Redundant Systems</h3>
                  <p className="text-gray-600">Multiple backup systems for navigation, communication, and power.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-4 mt-1">
                  <span className="text-green-600 font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-bold">Weather Monitoring</h3>
                  <p className="text-gray-600">Real-time weather tracking with automatic flight restrictions in unsafe conditions.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-4 mt-1">
                  <span className="text-green-600 font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-bold">Secure Package Containment</h3>
                  <p className="text-gray-600">Specially designed compartments keep packages secure during flight.</p>
                </div>
              </li>
            </ul>
          </div>
  
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Operational Safety</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-4 mt-1">
                  <span className="text-green-600 font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-bold">Certified Pilots</h3>
                  <p className="text-gray-600">All flight operations monitored by FAA-certified drone pilots.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-4 mt-1">
                  <span className="text-green-600 font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-bold">Pre-Flight Inspections</h3>
                  <p className="text-gray-600">Comprehensive safety checks before every flight.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-4 mt-1">
                  <span className="text-green-600 font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-bold">Optimized Flight Paths</h3>
                  <p className="text-gray-600">AI-powered routes avoid populated areas when possible.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-4 mt-1">
                  <span className="text-green-600 font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-bold">24/7 Monitoring</h3>
                  <p className="text-gray-600">Control center with real-time monitoring of all active flights.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
  
        <div className="bg-blue-50 p-8 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-bold mb-6">Regulatory Compliance</h2>
          <p className="text-gray-600 mb-4">DroneDrop operates in full compliance with all applicable regulations, including:</p>
          <ul className="space-y-2 text-gray-600 mb-4">
            <li>• FAA Part 107 rules for commercial drone operations</li>
            <li>• Local airspace restrictions and regulations</li>
            <li>• Privacy laws regarding flight paths and data collection</li>
            <li>• Transportation and shipping regulations for various cargo types</li>
          </ul>
          <p className="text-gray-600">We actively participate in regulatory discussions and industry working groups to help shape the future of drone delivery regulations.</p>
        </div>
  
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Safety Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-8">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">99.98%</div>
              <p className="text-lg">Successful Delivery Rate</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">&lt;0.01%</div>
              <p className="text-lg">Incident Rate</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
              <p className="text-lg">FAA Compliance</p>
            </div>
          </div>
          <p className="text-gray-600 text-center">Our safety record exceeds industry standards, with continuous improvement based on operational data and feedback.</p>
        </div>
      </div>
    );
  }
export default SafetyPage;  