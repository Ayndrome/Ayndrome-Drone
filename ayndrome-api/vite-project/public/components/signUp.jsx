import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignupPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        rememberMe: false
    });
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const validateForm = () => {
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
            toast.error('All fields are required', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return false;
        }
        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters long', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setLoadingMessage('Creating your account...');
        
        // Simulate a delay to show the loading animation
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        try {
            // Make the signup request
            const response = await fetch('http://localhost/ayndrome-api/api/signup.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password,
                    rememberMe: formData.rememberMe
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server response:', errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.error) {
                toast.error(data.error, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } else if (data.success && data.user) {
                // Store user data in localStorage
                localStorage.setItem('user', JSON.stringify(data.user));
                
                // Update loading message
                setLoadingMessage('Account created successfully! Logging you in...');
                
                // Simulate a delay to show the success message
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                toast.success('Registration successful! You are now logged in.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                
                // Reset form data
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    password: '',
                    confirmPassword: '',
                    rememberMe: false
                });
                
                // Redirect to profile page
                navigate('/app/profile');
            } else {
                toast.error('Registration failed: Invalid server response', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } catch (err) {
            console.error('Signup error:', err);
            toast.error('Network error. Please check your connection and try again.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } finally {
            setLoading(false);
            setLoadingMessage('');
        }
    };
    
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <ToastContainer />
        {loading ? (
          <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black mb-4"></div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Creating Your Account</h3>
              <p className="text-gray-500">{loadingMessage}</p>
            </div>
          </div>
        ) : (
          <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Create Your Account</h2>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded focus:border-none focus:outline-none focus:ring-1 focus:ring-black" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded focus:border-none focus:outline-none focus:ring-1 focus:ring-black" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:border-none focus:outline-none focus:ring-1 focus:ring-black" 
                  placeholder="you@example.com" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:border-none focus:outline-none focus:ring-1 focus:ring-black" 
                  placeholder="+1 (555) 000-0000" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:border-none focus:outline-none focus:ring-1 focus:ring-black" 
                  placeholder="••••••••" 
                  minLength={6}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <input 
                  type="password" 
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:border-none focus:outline-none focus:ring-1 focus:ring-black" 
                  placeholder="••••••••" 
                />
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-black border-gray-300 rounded" 
                />
                <label className="ml-2 block text-sm text-gray-700">I agree to the <a href="/terms" className="text-blue-600 hover:text-blue-500">Terms of Service</a> and <a href="/privacy" className="text-blue-600 hover:text-blue-500">Privacy Policy</a></label>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3 px-4 bg-black text-white rounded-md hover:bg-transparent hover:text-black hover:ring focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 relative"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }

export default SignupPage;  