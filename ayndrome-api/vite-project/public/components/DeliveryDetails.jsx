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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Details</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Sender Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Sender Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                  <input
                    type="text"
                    name="senderName"
                    value={formData.senderName}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
                  <input
                    type="tel"
                    name="senderPhone"
                    value={formData.senderPhone}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Email *</label>
                  <input
                    type="email"
                    name="senderEmail"
                    value={formData.senderEmail}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Locations */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Locations</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Pickup Location</label>
                  <input
                    type="text"
                    value={formData.pickupLocation}
                    disabled
                    className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Delivery Location</label>
                  <input
                    type="text"
                    value={formData.deliveryLocation}
                    disabled
                    className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Item Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Item Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Item Category</label>
                  <select
                    name="itemCategory"
                    value={formData.itemCategory}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  >
                    <option value="Parcel">📦 Parcel</option>
                    <option value="Grocery">🧴 Grocery</option>
                    <option value="Clothing">🧥 Clothing</option>
                    <option value="Electronics">📱 Electronics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Item Weight (kg) *</label>
                  <input
                    type="number"
                    name="itemWeight"
                    value={formData.itemWeight}
                    onChange={handleChange}
                    required
                    min="0.1"
                    step="0.1"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Item Description *</label>
                  <textarea
                    name="itemDescription"
                    value={formData.itemDescription}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Preferences */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Delivery Preferences</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Preferred Delivery Time Window *</label>
                  <select
                    name="deliveryTimeWindow"
                    value={formData.deliveryTimeWindow}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  >
                    <option value="">Select a time window</option>
                    <option value="9:00 AM - 12:00 PM">9:00 AM - 12:00 PM</option>
                    <option value="12:00 PM - 3:00 PM">12:00 PM - 3:00 PM</option>
                    <option value="3:00 PM - 6:00 PM">3:00 PM - 6:00 PM</option>
                    <option value="6:00 PM - 9:00 PM">6:00 PM - 9:00 PM</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Special Instructions</label>
                  <textarea
                    name="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={handleChange}
                    rows="2"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Fare Estimate */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Fare Estimate</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base Fare</span>
                  <span>₹50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Distance Charge ({location.state?.estimatedDistance})</span>
                  <span>₹{parseFloat(location.state?.estimatedDistance?.split(' ')[0] || 0) * 10}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weight Surcharge ({formData.itemWeight || 0} kg)</span>
                  <span>₹{(parseFloat(formData.itemWeight || 0) * 20).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">GST (18%)</span>
                  <span>₹{(calculateFare().gst).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{calculateFare().total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Processing..." : "Proceed to Payment"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DeliveryDetails; 