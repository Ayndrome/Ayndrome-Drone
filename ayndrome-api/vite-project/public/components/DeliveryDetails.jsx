import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function DeliveryDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    senderName: "",
    senderPhone: "",
    senderEmail: "",
    pickupLocation: location.state?.pickupLocation || "",
    deliveryLocation: location.state?.deliveryLocation || "",
    itemCategory: "Parcel",
    itemDescription: "",
    itemWeight: "",
    deliveryTimeWindow: "",
    specialInstructions: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!location.state?.pickupLocation || !location.state?.deliveryLocation) {
      toast.error("Please select pickup and delivery locations first");
      navigate("/app");
    }
  }, [location.state, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateFare = () => {
    const baseFare = 50;
    const distance = parseFloat(location.state?.estimatedDistance?.split(' ')[0] || 0);
    const weight = parseFloat(formData.itemWeight || 0);
    
    const distanceCharge = distance * 10;
    const weightSurcharge = weight * 20;
    const subtotal = baseFare + distanceCharge + weightSurcharge;
    const gst = subtotal * 0.18;
    
    return {
      baseFare,
      distanceCharge,
      weightSurcharge,
      gst,
      total: subtotal + gst
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Calculate fare
      const fare = calculateFare();
      
      // Navigate to payment page with all the data
      navigate('/app/payment', {
        state: {
          ...formData,
          pickupLocation: location.state.pickupLocation,
          deliveryLocation: location.state.deliveryLocation,
          estimatedDistance: location.state.estimatedDistance,
          estimatedTime: location.state.estimatedTime,
          fare: fare
        }
      });
    } catch (error) {
      toast.error("Error processing delivery details. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="px-6 py-8 bg-gradient-to-r from-purple-600 to-indigo-600">
            <h2 className="text-2xl font-bold text-white">Delivery Details</h2>
            <p className="text-purple-100 mt-2">Complete your information to continue</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Sender Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 flex items-center">
                <span className="mr-2">👤</span> Sender Information
              </h3>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Full Name</label>
                  <input
                    type="text"
                    name="senderName"
                    value={formData.senderName}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Phone Number</label>
                  <input
                    type="tel"
                    name="senderPhone"
                    value={formData.senderPhone}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-600">Email</label>
                  <input
                    type="email"
                    name="senderEmail"
                    value={formData.senderEmail}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
  
            {/* Locations */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 flex items-center">
                <span className="mr-2">📍</span> Locations
              </h3>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Pickup Location</label>
                  <div className="mt-1 flex items-center bg-gray-50 rounded-lg px-3 py-2 text-gray-700 border border-gray-200">
                    <span className="text-purple-500 mr-2">↑</span>
                    <span className="truncate">{formData.pickupLocation}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Delivery Location</label>
                  <div className="mt-1 flex items-center bg-gray-50 rounded-lg px-3 py-2 text-gray-700 border border-gray-200">
                    <span className="text-purple-500 mr-2">↓</span>
                    <span className="truncate">{formData.deliveryLocation}</span>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Item Details */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 flex items-center">
                <span className="mr-2">📦</span> Item Details
              </h3>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Item Category</label>
                  <select
                    name="itemCategory"
                    value={formData.itemCategory}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="Parcel">📦 Parcel</option>
                    <option value="Grocery">🧴 Grocery</option>
                    <option value="Clothing">🧥 Clothing</option>
                    <option value="Electronics">📱 Electronics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Item Weight (kg)</label>
                  <input
                    type="number"
                    name="itemWeight"
                    value={formData.itemWeight}
                    onChange={handleChange}
                    required
                    min="0.1"
                    step="0.1"
                    className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-600">Item Description</label>
                  <textarea
                    name="itemDescription"
                    value={formData.itemDescription}
                    onChange={handleChange}
                    required
                    rows="2"
                    className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Describe your item here..."
                  />
                </div>
              </div>
            </div>
  
            {/* Delivery Preferences */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 flex items-center">
                <span className="mr-2">🕒</span> Delivery Preferences
              </h3>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Preferred Time Window</label>
                  <select
                    name="deliveryTimeWindow"
                    value={formData.deliveryTimeWindow}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select a time window</option>
                    <option value="9:00 AM - 12:00 PM">9:00 AM - 12:00 PM</option>
                    <option value="12:00 PM - 3:00 PM">12:00 PM - 3:00 PM</option>
                    <option value="3:00 PM - 6:00 PM">3:00 PM - 6:00 PM</option>
                    <option value="6:00 PM - 9:00 PM">6:00 PM - 9:00 PM</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-600">Special Instructions</label>
                  <textarea
                    name="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={handleChange}
                    rows="2"
                    className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Any special delivery instructions..."
                  />
                </div>
              </div>
            </div>
  
            {/* Fare Estimate */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                <span className="mr-2">💰</span> Fare Estimate
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Base Fare</span>
                  <span className="font-medium">₹50</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Distance Charge ({location.state?.estimatedDistance})</span>
                  <span className="font-medium">₹{parseFloat(location.state?.estimatedDistance?.split(' ')[0] || 0) * 10}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Weight Surcharge ({formData.itemWeight || 0} kg)</span>
                  <span className="font-medium">₹{(parseFloat(formData.itemWeight || 0) * 20).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">GST (18%)</span>
                  <span className="font-medium">₹{(calculateFare().gst).toFixed(2)}</span>
                </div>
                <div className="border-t border-purple-200 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">Total</span>
                    <span className="text-lg font-bold text-purple-700">₹{calculateFare().total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
  
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Proceed to Payment
                    <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DeliveryDetails; 