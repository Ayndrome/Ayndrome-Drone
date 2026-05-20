import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
    const [user, setUser] = useState(null);
    const [rides, setRides] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        checkUserAndRedirect();
    }, []);

    // Add new useEffect for fetching rides when user is set
    useEffect(() => {
        if (user?.id) {
            fetchRides();
        }
    }, [user]);

    const checkUserAndRedirect = () => {
        const userData = localStorage.getItem('user');
        
        if (!userData) {
            toast.error('Please login to access your profile');
            // Use window.location for a hard redirect
            window.location.href = '/app/login';
            return;
        }

        try {
            const parsedUser = JSON.parse(userData);
            
            // Validate user data structure
            if (!parsedUser || typeof parsedUser !== 'object' || !parsedUser.id) {
                console.error('Invalid user data structure:', parsedUser);
                toast.error('Invalid user data');
                localStorage.removeItem('user');
                window.location.href = '/app/login';
                return;
            }

            // Validate required fields
            const requiredFields = ['id', 'first_name', 'last_name', 'email'];
            const missingFields = requiredFields.filter(field => !parsedUser[field]);
            
            if (missingFields.length > 0) {
                console.error('Missing required fields:', missingFields);
                toast.error('Invalid user data: missing required fields');
                localStorage.removeItem('user');
                window.location.href = '/app/login';
                return;
            }

            setUser(parsedUser);
        } catch (error) {
            console.error('Error parsing user data:', error);
            toast.error('Error loading user data');
            localStorage.removeItem('user');
            window.location.href = '/app/login';
            return;
        }
    };

    const fetchRides = async () => {
        try {
            console.log('Fetching rides for user:', user.id);
            const response = await fetch('http://localhost/ayndrome-api/api/get_rides.php', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            
            console.log('Rides response status:', response.status);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const textResponse = await response.text();
            console.log('Rides raw response:', textResponse);
            
            if (textResponse) {
                try {
                    const data = JSON.parse(textResponse);
                    console.log('Rides parsed data:', data);
                    
                    if (data.success) {
                        setRides(data.rides || []);
                    } else {
                        toast.error(data.error || 'Failed to fetch ride history');
                    }
                } catch (parseError) {
                    console.error('Error parsing rides response:', parseError);
                    toast.error('Invalid response format from server');
                }
            } else {
                toast.error('Empty response from server');
            }
        } catch (err) {
            console.error('Error fetching rides:', err);
            toast.error('Failed to fetch ride history. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost/ayndrome-api/api/logout.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            
            if (response.ok) {
                // Clear user data from localStorage
                localStorage.removeItem('user');
                setUser(null);
                toast.success('Logged out successfully');
                // Use window.location for a hard redirect
                window.location.href = '/app/login';
            } else {
                toast.error('Failed to logout. Please try again.');
            }
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('Network error during logout. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">User Profile</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and ride history.</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Logout
                        </button>
                    </div>
                    <div className="border-t border-gray-200">
                        <dl>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {user?.first_name} {user?.last_name}
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Email address</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user?.email}</dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user?.phone || 'Not provided'}</dd>
                            </div>
                        </dl>
                    </div>
                </div>

                <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Ride History</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Your recent rides and their status.</p>
                    </div>
                    <div className="border-t border-gray-200">
                        {rides.length === 0 ? (
                            <div className="px-4 py-5 sm:px-6 text-center text-gray-500">
                                No ride history available.
                            </div>
                        ) : (
                            <ul className="divide-y divide-gray-200">
                                {rides.map((ride) => (
                                    <li key={ride.id} className="px-4 py-4 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-indigo-600 truncate">
                                                    {ride.pickup_location} → {ride.dropoff_location}
                                                </p>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    {new Date(ride.pickup_time).toLocaleString()}
                                                </p>
                                            </div>
                                            <div className="ml-4 flex-shrink-0">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                    ${ride.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                                    ride.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                                    ride.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                                                    'bg-blue-100 text-blue-800'}`}>
                                                    {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile; 