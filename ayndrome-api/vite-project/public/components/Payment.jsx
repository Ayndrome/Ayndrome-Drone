import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  useEffect(() => {
    if (!location.state) {
      toast.error("Please complete the delivery details first");
      navigate("delivery-details");
    }
  }, [location.state, navigate]);

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      // Here you would typically make an API call to process the payment
      // For demo purposes, we'll simulate a successful payment
      
      // Update user profile with delivery history
      const response = await fetch('/api/deliveries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...location.state,
          status: 'scheduled',
          paymentStatus: 'completed',
          paymentMethod,
          createdAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save delivery details');
      }

      const data = await response.json();
      
      // Navigate to order confirmation with order details
      navigate('/app/order-confirmation', {
        state: {
          ...location.state,
          orderId: data.orderId,
          createdAt: new Date().toISOString(),
          paymentMethod
        },
        replace: true
      });
    } catch (error) {
      toast.error("Payment failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment</h2>
          
          {/* Order Summary */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Pickup Location</span>
                <span>{location.state?.pickupLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Location</span>
                <span>{location.state?.deliveryLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Item</span>
                <span>{location.state?.itemCategory} - {location.state?.itemDescription}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Weight</span>
                <span>{location.state?.itemWeight} kg</span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span>Total Amount</span>
                  <span>₹{location.state?.fare?.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-lg border-2 ${
                  paymentMethod === 'card'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-center">
                  <span className="text-lg mr-2">💳</span>
                  <span>Credit/Debit Card</span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-4 rounded-lg border-2 ${
                  paymentMethod === 'upi'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-center">
                  <span className="text-lg mr-2">📱</span>
                  <span>UPI</span>
                </div>
              </button>
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handlePayment} className="space-y-6">
            {paymentMethod === 'card' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Card Number</label>
                  <input
                    type="text"
                    name="number"
                    value={cardDetails.number}
                    onChange={handleCardChange}
                    placeholder="1234 5678 9012 3456"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                    <input
                      type="text"
                      name="expiry"
                      value={cardDetails.expiry}
                      onChange={handleCardChange}
                      placeholder="MM/YY"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={cardDetails.cvv}
                      onChange={handleCardChange}
                      placeholder="123"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Cardholder Name</label>
                  <input
                    type="text"
                    name="name"
                    value={cardDetails.name}
                    onChange={handleCardChange}
                    placeholder="John Doe"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">UPI ID</label>
                  <input
                    type="text"
                    placeholder="username@upi"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div className="text-sm text-gray-500">
                  You will be redirected to your UPI app to complete the payment.
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Processing Payment..." : "Pay ₹" + location.state?.fare?.total.toFixed(2)}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment; 