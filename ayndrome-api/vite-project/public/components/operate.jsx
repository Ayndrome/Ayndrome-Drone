import React from "react";

function OperatePage() {
    return (
      <div className="flex flex-col">
        {/* Hero Section */}
        <div className="bg-white text-black py-16">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Operate With Ayndrome</h1>
            <p className="text-xl mb-8 max-w-2xl">Join our network of drone operators and earn money on your own schedule.</p>
            <button className="bg-white text-black px-8 py-3 ring-1 ring-black rounded-full font-bold hover:bg-gray-100 transition duration-200">
              Apply Now
            </button>
          </div>
        </div>
  
        {/* Benefits Section */}
        <div className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Why Operate With Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-full h-48 bg-gray-200 rounded mb-4 flex items-center justify-center">
                  <p className="text-gray-500">Benefits Image 1</p>
                </div>
                <h3 className="text-xl font-bold mb-2">Flexible Schedule</h3>
                <p className="text-gray-600">Work when you want and set your own hours. Full-time or part-time, you decide.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-full h-48 bg-gray-200 rounded mb-4 flex items-center justify-center">
                  <p className="text-gray-500">Benefits Image 2</p>
                </div>
                <h3 className="text-xl font-bold mb-2">Competitive Earnings</h3>
                <p className="text-gray-600">Earn competitive rates per delivery, plus bonuses for peak hours and special deliveries.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-full h-48 bg-gray-200 rounded mb-4 flex items-center justify-center">
                  <p className="text-gray-500">Benefits Image 3</p>
                </div>
                <h3 className="text-xl font-bold mb-2">Training & Support</h3>
                <p className="text-gray-600">Get comprehensive training and 24/7 support from our dedicated operator success team.</p>
              </div>
            </div>
          </div>
        </div>
  
        {/* Requirements Section */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Requirements</h2>
            <div className="max-w-3xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <span className="text-green-600 font-bold">✓</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Drone Pilot Certification</h3>
                      <p className="text-gray-600">Valid FAA Part 107 Remote Pilot Certificate or equivalent in your country.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <span className="text-green-600 font-bold">✓</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Experience</h3>
                      <p className="text-gray-600">Minimum of 50 hours of drone flight experience required.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <span className="text-green-600 font-bold">✓</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Equipment</h3>
                      <p className="text-gray-600">You can use your own certified delivery drone or rent one from our fleet.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <span className="text-green-600 font-bold">✓</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Background Check</h3>
                      <p className="text-gray-600">Must pass a comprehensive background check for security purposes.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
  
        {/* How it Works Section */}
        <div className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Apply</h3>
                <p className="text-gray-600">Complete our online application and verification process.</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Train</h3>
                <p className="text-gray-600">Complete our comprehensive training program.</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Activate</h3>
                <p className="text-gray-600">Set up your profile and availability in our app.</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Deliver</h3>
                <p className="text-gray-600">Start accepting delivery requests and earning money.</p>
              </div>
            </div>
          </div>
        </div>
  
        {/* Testimonials Section */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Operator Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h3 className="text-xl font-bold">Sarah M.</h3>
                    <p className="text-gray-600">Drone Operator since 2023</p>
                  </div>
                </div>
                <p className="text-gray-600">"I was looking for flexible work to supplement my income as a photographer. DroneDrop has been perfect - I use my drone skills, set my own schedule, and make great money."</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h3 className="text-xl font-bold">Mark J.</h3>
                    <p className="text-gray-600">Drone Operator since 2022</p>
                  </div>
                </div>
                <p className="text-gray-600">"After retiring from the Air Force, I wanted to keep using my technical skills. DroneDrop has been an excellent way to stay active while earning a substantial income on my own terms."</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
  
                </div>
                <div>
                  <h3 className="text-xl font-bold">Lisa T.</h3>
                  <p className="text-gray-600">Drone Operator since 2024</p>
                </div>
              </div>
              <p className="text-gray-600">"As a tech enthusiast, joining DroneDrop was a natural fit. The training was comprehensive, the support team is always responsive, and the earnings are significantly better than my previous delivery job."</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default OperatePage;