import React from "react";
function BusinessPage() {
    return (
      <div className="flex flex-col">
        {/* Hero Section */}
        <div className="bg-black text-white py-16">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Ayndrome Business.</h1>
            <p className="text-xl mb-8 max-w-2xl">Revolutionize your logistics with our autonomous drone delivery solutions.</p>
            <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition duration-200">
              Get Started
            </button>
          </div>
        </div>
  
        {/* Business Solutions Section */}
        <div className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Business Solutions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-full h-48 bg-gray-200 rounded mb-4 flex items-center justify-center">
                  <p className="text-gray-500">Solution Image 1</p>
                </div>
                <h3 className="text-xl font-bold mb-2">Last-Mile Delivery</h3>
                <p className="text-gray-600">Reduce delivery times and costs with our autonomous drone fleet for last-mile logistics.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-full h-48 bg-gray-200 rounded mb-4 flex items-center justify-center">
                  <p className="text-gray-500">Solution Image 2</p>
                </div>
                <h3 className="text-xl font-bold mb-2">On-Demand Delivery</h3>
                <p className="text-gray-600">Offer your customers fast, on-demand delivery for urgent items and time-sensitive packages.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-full h-48 bg-gray-200 rounded mb-4 flex items-center justify-center">
                  <p className="text-gray-500">Solution Image 3</p>
                </div>
                <h3 className="text-xl font-bold mb-2">API Integration</h3>
                <p className="text-gray-600">Seamlessly integrate drone delivery into your existing e-commerce and logistics systems.</p>
              </div>
            </div>
          </div>
        </div>
  
        {/* Benefits Section */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Benefits for Your Business</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <span className="text-blue-600 font-bold">✓</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Faster Deliveries</h3>
                  <p className="text-gray-600">Reduce delivery times from hours to minutes, improving customer satisfaction.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <span className="text-blue-600 font-bold">✓</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Cost Reduction</h3>
                  <p className="text-gray-600">Cut delivery costs by up to 70% compared to traditional delivery methods.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <span className="text-blue-600 font-bold">✓</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Eco-Friendly</h3>
                  <p className="text-gray-600">Reduce your carbon footprint with zero-emission electric drone deliveries.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <span className="text-blue-600 font-bold">✓</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Expanded Delivery Range</h3>
                  <p className="text-gray-600">Reach customers in areas difficult to access by traditional delivery methods.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Case Studies Section */}
        <div className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-full h-48 bg-gray-200 rounded mb-4 flex items-center justify-center">
                  <p className="text-gray-500">Case Study Image 1</p>
                </div>
                <h3 className="text-xl font-bold mb-2">FreshEats Restaurant Chain</h3>
                <p className="text-gray-600 mb-4">Reduced delivery times by 68% and increased order volume by 42% after implementing DroneDrop for their food delivery service.</p>
                <button className="text-blue-600 font-semibold">Read Case Study →</button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-full h-48 bg-gray-200 rounded mb-4 flex items-center justify-center">
                  <p className="text-gray-500">Case Study Image 2</p>
                </div>
                <h3 className="text-xl font-bold mb-2">MediQuick Pharmacy</h3>
                <p className="text-gray-600 mb-4">Implemented urgent medication delivery via DroneDrop, resulting in life-saving 15-minute delivery times and 98% customer satisfaction.</p>
                <button className="text-blue-600 font-semibold">Read Case Study →</button>
              </div>
            </div>
          </div>
        </div>
  
        {/* Contact Form Section */}
        <div className="py-16 bg-black text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Get Started with Ayndrome Business</h2>
              <form className="bg-white p-8 rounded-lg shadow-lg text-gray-800">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <input type="text" className="w-full p-3 border border-gray-300 rounded" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <input type="text" className="w-full p-3 border border-gray-300 rounded" required />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Business Name</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded" required />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <input type="email" className="w-full p-3 border border-gray-300 rounded" required />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input type="tel" className="w-full p-3 border border-gray-300 rounded" required />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Tell us about your delivery needs</label>
                  <textarea className="w-full p-3 border border-gray-300 rounded h-32" required></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-4 rounded-full font-bold hover:bg-blue-700 transition duration-200"
                >
                  Request a Consultation
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default BusinessPage;