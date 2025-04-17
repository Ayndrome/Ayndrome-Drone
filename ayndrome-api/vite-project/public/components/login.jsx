import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  // Check if user is already logged in
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        console.log('Checking login status...');
        const response = await fetch('http://localhost/ayndrome-api/api/check_session.php', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        
        console.log('Session check response status:', response.status);
        
        if (response.ok) {
          const textResponse = await response.text();
          console.log('Session check raw response:', textResponse);
          
          if (textResponse) {
            try {
              const data = JSON.parse(textResponse);
              console.log('Session check parsed data:', data);
              
              if (data.loggedIn) {
                console.log('User is logged in, redirecting to profile');
                navigate('/app/profile');
              } else {
                console.log('User is not logged in');
              }
            } catch (parseError) {
              console.error('Error parsing session check response:', parseError);
            }
          }
        } else {
          console.error('Session check failed with status:', response.status);
        }
      } catch (error) {
        console.error('Session check error:', error);
        // Don't show error toast to user, just log it
      }
    };
    
    checkLoginStatus();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return false;
    }
    
    if (!formData.email.includes('@')) {
      toast.error('Please enter a valid email address');
      return false;
    }
    
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
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
    setLoadingMessage('Logging you in...');
    
    // Simulate a delay to show the loading animation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      console.log('Sending login request to:', 'http://localhost/ayndrome-api/api/login.php');
      console.log('Request data:', formData);
      
      const response = await fetch('http://localhost/ayndrome-api/api/login.php', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      console.log('Response status:', response.status);
      
      // Try to parse the response as JSON
      let data;
      try {
        const textResponse = await response.text();
        console.log('Raw response:', textResponse);
        
        if (textResponse) {
          data = JSON.parse(textResponse);
        } else {
          data = { success: false, error: 'Empty response from server' };
        }
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        data = { success: false, error: 'Invalid response format from server' };
      }
      
      console.log('Parsed response data:', data);
      
      if (data.success) {
        toast.success('Login successful!');
        // Store user data in localStorage for persistence
        localStorage.setItem('user', JSON.stringify(data.user));
        // Redirect to profile page after a short delay
        setTimeout(() => {
          navigate('/profile');
        }, 1000);
      } else {
        toast.error(data.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
      setLoadingMessage('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '} 
            <button
              onClick={() => navigate('/signup')}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              create a new account
            </button>
          </p>
        </div>
        {loading ? (
          <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black mb-4"></div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Logging In</h3>
              <p className="text-gray-500">{loadingMessage}</p>
            </div>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                {loading ? (
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                ) : null}
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;