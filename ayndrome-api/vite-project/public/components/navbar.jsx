import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function Navbar() {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for user data in localStorage on component mount
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser && parsedUser.id) {
          setUser(parsedUser);
        } else {
          localStorage.removeItem('user');
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost/ayndrome-api/api/logout.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        localStorage.removeItem('user');
        setUser(null);
        toast.success('Logged out successfully');
        navigate('/app/login');
      } else {
        toast.error(data.error || 'Failed to logout');
      }
    } catch (err) {
      console.error('Error during logout:', err);
      // Even if the server request fails, we'll still clear local storage and redirect
      localStorage.removeItem('user');
      setUser(null);
      toast.error('Network error during logout. You have been logged out locally.');
      navigate('/app/login');
    }
  };

  return (
    <nav className="bg-black text-white py-3 sm:py-4 px-4 sm:px-6 sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/app" className="text-xl sm:text-2xl font-bold">Ayndrome</Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="sm:hidden text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <div className="hidden sm:flex items-center space-x-8">
            <Link to="/app/operate" className="text-sm hover:text-gray-400 transition duration-200">Operate</Link>
            <Link to="/app/about" className="text-sm hover:text-gray-400 transition duration-200">About</Link>
            <Link to="/app/business" className="text-sm hover:text-gray-400 transition duration-200">Business</Link>
          </div>

          <div className="hidden sm:flex items-center space-x-6">
            <Link to="/app/help" className="text-sm hover:text-gray-400 transition duration-200">Help</Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/app/profile" className="flex items-center space-x-2 hover:text-gray-400 transition duration-200">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black">
                    {user.first_name?.[0]}{user.last_name?.[0]}
                  </div>
                  <span className="text-sm">{user.first_name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm hover:text-gray-400 transition duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/app/login" className="text-sm hover:text-gray-400 transition duration-200">Login</Link>
                <Link
                  to="/app/signup"
                  className="bg-white text-black px-4 py-2 rounded-full text-sm hover:bg-gray-200 transition duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        <div
          className={`sm:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="py-4 space-y-4">
            <Link
              to="/app/operate"
              className="block text-sm hover:text-gray-400 transition duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Operate
            </Link>
            <Link
              to="/app/about"
              className="block text-sm hover:text-gray-400 transition duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/app/business"
              className="block text-sm hover:text-gray-400 transition duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Business
            </Link>
            <Link
              to="/app/help"
              className="block text-sm hover:text-gray-400 transition duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Help
            </Link>
            {user ? (
              <div className="space-y-4">
                <Link
                  to="/app/profile"
                  className="flex items-center space-x-2 hover:text-gray-400 transition duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black">
                    {user.first_name?.[0]}{user.last_name?.[0]}
                  </div>
                  <span className="text-sm">{user.first_name}</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-sm hover:text-gray-400 transition duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <Link
                  to="/app/login"
                  className="block text-sm hover:text-gray-400 transition duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/app/signup"
                  className="block bg-white text-black px-4 py-2 rounded-full text-sm hover:bg-gray-200 transition duration-200 text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;