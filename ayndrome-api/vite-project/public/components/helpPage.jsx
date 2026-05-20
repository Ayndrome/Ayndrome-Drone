import React from "react";
import { Link } from "react-router-dom";

function HelpPage() {
    return (
      <div>
        <section className="bg-white text-black py-8 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">How Can We Help?</h1>
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <input type="text" className="w-full ring-1 ring-white rounded-lg p-3 sm:p-4 pl-10 sm:pl-12 text-black text-sm sm:text-base" placeholder="Search for help topics..." />
                <svg className="absolute left-3 sm:left-4 top-3 sm:top-4 h-4 sm:h-5 w-4 sm:w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </section>
  
        <section className="py-8 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center">
                <div className="h-16 sm:h-20 w-16 sm:w-20 bg-black rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center">
                  <svg className="h-8 sm:h-10 w-8 sm:w-10 text-[#dadada]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">FAQs</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Find answers to the most commonly asked questions about our service.</p>
                <a href="#faqs" className="text-sm sm:text-base text-black hover:text-blue-500 font-medium">Browse FAQs</a>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center">
                <div className="h-16 sm:h-20 w-16 sm:w-20 bg-black rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center">
                  <svg className="h-8 sm:h-10 w-8 sm:w-10 text-[#dadada]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Contact Support</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Need personalized help? Our support team is ready to assist you.</p>
                <a href="/contact" className="text-sm sm:text-base text-black hover:text-blue-500 font-medium">Contact Us</a>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center">
                <div className="h-16 sm:h-20 w-16 sm:w-20 bg-black rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center">
                  <svg className="h-8 sm:h-10 w-8 sm:w-10 text-[#dadada]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">User Guides</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Detailed guides to help you make the most of our drone delivery service.</p>
                <a href="/guides" className="text-sm sm:text-base text-black hover:text-blue-500 font-medium">View Guides</a>
              </div>
            </div>
          </div>
        </section>
  
        <section id="faqs" className="py-8 sm:py-16 bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4 sm:mb-6">
                <button className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold focus:outline-none text-sm sm:text-base">
                  What areas do you service?
                </button>
                <div className="px-4 sm:px-6 pb-4">
                  <p className="text-sm sm:text-base text-gray-600">We currently service major metropolitan areas across the United States, with a delivery radius of up to 10 miles from our drone hubs. You can check if your location is within our service area by entering your address on our homepage.</p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4 sm:mb-6">
                <button className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold focus:outline-none text-sm sm:text-base">
                  How long does delivery take?
                </button>
                <div className="px-4 sm:px-6 pb-4">
                  <p className="text-sm sm:text-base text-gray-600">Delivery times typically range from 15-30 minutes, depending on the distance between pickup and delivery locations, weather conditions, and current demand. You'll receive an estimated delivery time when you place your order.</p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4 sm:mb-6">
                <button className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold focus:outline-none text-sm sm:text-base">
                  What is the maximum weight a drone can carry?
                </button>
                <div className="px-4 sm:px-6 pb-4">
                  <p className="text-sm sm:text-base text-gray-600">Our standard delivery drones can carry packages weighing up to 5 pounds (2.3 kg). For heavier items, we offer premium drones that can handle up to 10 pounds (4.5 kg), though these have a more limited service area.</p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4 sm:mb-6">
                <button className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold focus:outline-none text-sm sm:text-base">
                  How does the drone deliver my package?
                </button>
                <div className="px-4 sm:px-6 pb-4">
                  <p className="text-sm sm:text-base text-gray-600">Our drones deliver to designated landing zones, typically in open areas such as driveways, backyards, or building rooftops. The drone will hover at a safe height, lower your package via a tether, and release it once it touches the ground.</p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4 sm:mb-6">
                <button className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold focus:outline-none text-sm sm:text-base">
                  What happens if weather conditions are poor?
                </button>
                <div className="px-4 sm:px-6 pb-4">
                  <p className="text-sm sm:text-base text-gray-600">Our drones operate in most weather conditions, but services may be limited during severe weather such as heavy rain, snow, or high winds. In such cases, we'll notify you of delays or offer alternative delivery options.</p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4 sm:mb-6">
                <button className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold focus:outline-none text-sm sm:text-base">
                  How do I track my delivery?
                </button>
                <div className="px-4 sm:px-6 pb-4">
                  <p className="text-sm sm:text-base text-gray-600">You can track your delivery in real-time through our mobile app or website. You'll receive notifications when your package is picked up, in transit, and about to arrive, along with a live map showing the drone's location.</p>
                </div>
              </div>
              <div className="text-center mt-6 sm:mt-8">
                <Link to="/app/faq" className="inline-block bg-black text-white py-2 sm:py-3 px-4 sm:px-6 rounded hover:bg-transparent hover:text-black hover:ring-1 ring-black transition text-sm sm:text-base">
                  View All FAQs
                </Link>
              </div>
            </div>
          </div>
        </section>
  
        <section className="py-8 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Help Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <a href="/help/account" className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Account & Billing</h3>
                <p className="text-sm sm:text-base text-gray-600">Help with account setup, payments, and subscriptions.</p>
              </a>
              <a href="/help/delivery" className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Delivery Issues</h3>
                <p className="text-sm sm:text-base text-gray-600">Troubleshooting delivery problems and delays.</p>
              </a>
              <a href="/help/app" className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Using the App</h3>
                <p className="text-sm sm:text-base text-gray-600">Guidance on using our mobile and web applications.</p>
              </a>
              <a href="/help/business" className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Business Support</h3>
                <p className="text-sm sm:text-base text-gray-600">Specialized help for our business customers.</p>
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  }

export default HelpPage;