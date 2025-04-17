import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state?.orderId) {
      toast.error("No order details found");
      navigate("/app");
    }
  }, [location.state, navigate]);

  const handleTrackOrder = () => {
    // In a real app, this would navigate to a tracking page
    toast.info("Order tracking feature coming soon!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6 sm:p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Order Confirmed!</h2>
            <p className="text-gray-600 mt-2">Your order has been successfully placed</p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Order Details</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Order ID</p>
                  <p className="font-medium">{location.state?.orderId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Order Date</p>
                  <p className="font-medium">
                    {new Date(location.state?.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600">Pickup Location</p>
                <p className="font-medium">{location.state?.pickupLocation}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Delivery Location</p>
                <p className="font-medium">{location.state?.deliveryLocation}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Item Details</p>
                <p className="font-medium">{location.state?.itemCategory} - {location.state?.itemDescription}</p>
                <p className="text-sm text-gray-600">Weight: {location.state?.itemWeight} kg</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Delivery Time Window</p>
                <p className="font-medium">{location.state?.deliveryTimeWindow}</p>
              </div>

              {location.state?.specialInstructions && (
                <div>
                  <p className="text-sm text-gray-600">Special Instructions</p>
                  <p className="font-medium">{location.state.specialInstructions}</p>
                </div>
              )}

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Payment Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Fare</span>
                    <span>₹{location.state?.fare?.baseFare}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Distance Charge</span>
                    <span>₹{location.state?.fare?.distanceCharge}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weight Surcharge</span>
                    <span>₹{location.state?.fare?.weightSurcharge}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">GST (18%)</span>
                    <span>₹{location.state?.fare?.gst.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total Amount</span>
                      <span>₹{location.state?.fare?.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleTrackOrder}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Track Order
            </button>
            <button
              onClick={() => navigate("/app")}
              className="px-6 py-3 bg-white text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation; 