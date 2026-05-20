import React from "react";

function ContactPage() {
    return (
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="bg-white p-8 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
              <form>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input type="email" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea rows="5" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
                <button type="submit" className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 transition">Send Message</button>
              </form>
            </div>
          </div>
  
          <div>
            <div className="bg-white p-8 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Customer Support</h3>
                <p className="text-gray-600 mb-1">Email: support@dronedelivery.com</p>
                <p className="text-gray-600 mb-1">Phone: 1-800-DRONE-DL</p>
                <p className="text-gray-600 mb-1">Hours: 24/7 Support</p>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Business Inquiries</h3>
                <p className="text-gray-600 mb-1">Email: business@dronedelivery.com</p>
                <p className="text-gray-600 mb-1">Phone: 1-888-DRONE-BIZ</p>
                <p className="text-gray-600 mb-1">Hours: Monday-Friday, 9am-5pm EST</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Office Location</h3>
                <p className="text-gray-600 mb-1">123 Drone Avenue</p>
                <p className="text-gray-600 mb-1">San Francisco, CA 94107</p>
                <p className="text-gray-600 mb-1">United States</p>
              </div>
            </div>
  
            {/* Space for image/illustration */}
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Space for contact illustration</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
export default ContactPage;