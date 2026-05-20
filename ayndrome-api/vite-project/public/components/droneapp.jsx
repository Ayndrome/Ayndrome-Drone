import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfilePage from "./Profile";
import LoginPage from "./login";
import SignupPage from "./signUp";
import HelpPage from "./helpPage";
import ContactPage from "./contact";
import SafetyPage from "./safetyPanel";
import BusinessPage from "./buisness";
import OperatePage from "./operate";
import LandingPage from './landingPage';
import AboutPage from './about';
import FAQPage from './faq';
import ApiTest from './ApiTest';
import Navbar from './Navbar';
import Footer from './Footer';
import DeliveryDetails from './DeliveryDetails';
import Payment from './Payment';
import DroneMap from './Map';
import OrderConfirmation from './OrderConfirmation';

function DroneApp() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.backgroundColor = 'white';

        const checkUserAndRedirect = async () => {
            try {
                // Check localStorage first
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);
                    setLoading(false);
                    return;
                }

                // If not in localStorage, check session
                const response = await fetch('http://localhost/ayndrome-api/api/check_session.php', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    const textResponse = await response.text();
                    if (textResponse) {
                        try {
                            const data = JSON.parse(textResponse);
                            if (data.loggedIn && data.user) {
                                setUser(data.user);
                                localStorage.setItem('user', JSON.stringify(data.user));
                            }
                        } catch (parseError) {
                            console.error('Error parsing session check response:', parseError);
                        }
                    }
                }
            } catch (error) {
                console.error('Error checking user session:', error);
            } finally {
                setLoading(false);
            }
        };

        checkUserAndRedirect();

        return () => {
            document.body.style.backgroundColor = 'white';
        };
    }, []); // Empty dependency array to prevent infinite loops

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost/ayndrome-api/api/logout.php', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setUser(null);
                localStorage.removeItem('user');
                navigate('/app/login');
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 sm:h-12 w-8 sm:w-12 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }

    // Protected routes that require authentication
    const protectedRoutes = ['/app/delivery-details', '/app/payment', '/app/profile', '/app/order-confirmation'];
    const isProtectedRoute = protectedRoutes.includes(location.pathname);
    const isAuthRoute = location.pathname === '/app/login' || location.pathname === '/app/signup';

    // Redirect logic
    if (isProtectedRoute && !user) {
        return <Navigate to="/app/login" replace />;
    }

    if (isAuthRoute && user) {
        return <Navigate to="/app/profile" replace />;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar user={user} onLogout={handleLogout} />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="map" element={<DroneMap />} />
                    <Route path="delivery-details" element={<DeliveryDetails />} />
                    <Route path="payment" element={<Payment />} />
                    <Route path="order-confirmation" element={<OrderConfirmation />} />
                    <Route path="business" element={<BusinessPage />} />
                    <Route path="operate" element={<OperatePage />} />
                    <Route path="help" element={<HelpPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="signup" element={<SignupPage />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="faq" element={<FAQPage />} />
                    <Route path="help/contact" element={<ContactPage />} />
                    <Route path="safety" element={<SafetyPage />} />
                    <Route path="about/company" element={<LandingPage />} />
                    <Route path="profile" element={<ProfilePage user={user} />} />
                    <Route path="api-test" element={<ApiTest />} />
                    <Route path="*" element={<Navigate to={user ? "/app/profile" : "/app/login"} replace />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default DroneApp;