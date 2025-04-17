import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

function LandingPage() {
    const [pickup, setPickup] = useState('');
    const [dropoff, setDropoff] = useState('');
    const [map, setMap] = useState(null);
    const [pickupCoords, setPickupCoords] = useState(null);
    const [dropoffCoords, setDropoffCoords] = useState(null);
    const [routingControl, setRoutingControl] = useState(null);
    const [estimatedDistance, setEstimatedDistance] = useState(null);
    const [estimatedTime, setEstimatedTime] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [routeCalculated, setRouteCalculated] = useState(false);
    const navigate = useNavigate();
  
    // Initialize map
    useEffect(() => {
      const checkLeaflet = setInterval(() => {
        if (window.L && window.L.Routing) {
          clearInterval(checkLeaflet);

          const L = window.L;

          // Initialize map
          const mapInstance = L.map("map").setView([28.6139, 77.2088], 13);
          setMap(mapInstance);

          // Add OpenStreetMap tile layer
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(mapInstance);

          // Cleanup function
          return () => mapInstance.remove();
        }
      }, 100);

      return () => clearInterval(checkLeaflet);
    }, []);

    // Function to search for location and get coordinates
    const geocodeAddress = async (address, type) => {
      if (!window.L || !window.L.Control.Geocoder) return;

      setIsLoading(true);
      try {
        const geocoder = window.L.Control.Geocoder.nominatim();
        const results = await new Promise((resolve, reject) => {
          geocoder.geocode(address, (results) => {
            resolve(results);
          });
        });

        if (results.length > 0) {
          const { center } = results[0];
          if (type === "pickup") {
            setPickupCoords(center);
            // Add marker for pickup
            if (map) {
              const pickupMarker = window.L.marker(center).addTo(map);
              pickupMarker.bindPopup("Pickup Location").openPopup();
            }
          } else {
            setDropoffCoords(center);
            // Add marker for dropoff
            if (map) {
              const dropoffMarker = window.L.marker(center).addTo(map);
              dropoffMarker.bindPopup("Dropoff Location").openPopup();
            }
          }
          return center;
        } else {
          toast.error("Location not found. Please try again.");
          return null;
        }
      } catch (error) {
        console.error("Geocoding error:", error);
        toast.error("Error finding location. Please try again.");
        return null;
      } finally {
        setIsLoading(false);
      }
    };

    // Function to calculate route and update map
    const calculateRoute = async () => {
      if (!pickupCoords || !dropoffCoords) {
        toast.error("Please select both pickup and dropoff locations");
        return;
      }

      setIsLoading(true);
      setRouteCalculated(false);
      try {
        // Remove existing route if any
        if (routingControl) {
          map.removeControl(routingControl);
        }

        // Create new route with timeout handling
        const routePromise = new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error('Route calculation timed out'));
          }, 30000); // 30 second timeout

          const newRoutingControl = window.L.Routing.control({
            waypoints: [
              window.L.latLng(pickupCoords),
              window.L.latLng(dropoffCoords)
            ],
            routeWhileDragging: false,
            show: true,
            addWaypoints: false,
            draggableWaypoints: false,
            fitSelectedRoutes: true,
            showAlternatives: false,
            createMarker: function(i, waypoint, n) {
              return window.L.marker(waypoint.latLng, {
                draggable: false
              });
            }
          }).addTo(map);

          newRoutingControl.on('routesfound', (e) => {
            clearTimeout(timeout);
            const routes = e.routes;
            if (routes && routes.length > 0) {
              const route = routes[0];
              setEstimatedDistance((route.summary.totalDistance / 1000).toFixed(1) + ' km');
              setEstimatedTime(Math.ceil(route.summary.totalTime / 60) + ' min');
              setRouteCalculated(true);
              setRoutingControl(newRoutingControl);
              resolve();
            } else {
              reject(new Error('No routes found'));
            }
          });

          newRoutingControl.on('routingerror', (e) => {
            clearTimeout(timeout);
            reject(new Error('Routing error: ' + e.error.message));
          });
        });

        await routePromise;
      } catch (error) {
        console.error("Routing error:", error);
        toast.error(error.message || "Error calculating route. Please try again.");
        setRouteCalculated(false);
      } finally {
        setIsLoading(false);
      }
    };

    const handleScheduleDelivery = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        toast.info("Please login to schedule a delivery");
        navigate('/app/login', { replace: true });
        return;
      }

      if (!pickup || !dropoff) {
        toast.error("Please enter both pickup and dropoff locations");
        return;
      }

      navigate('/app/delivery-details', {
        state: {
          pickupLocation: pickup,
          deliveryLocation: dropoff
        },
        replace: true
      });
    };
  
    return (
      <div className="flex flex-col">
        {/* Hero Section */}
        <div className="flex flex-col">
          <div className="bg-white text-black py-8 sm:py-16">
            <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:justify-between items-start">
              <div className="w-full md:w-1/3 mb-8 md:mb-0 p-4 sm:p-5 relative md:left-20 md:top-5 shadow-xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Drone Delivery in Minutes</h1>
                <p className="text-lg sm:text-xl mb-6 sm:mb-8">Fast, reliable, and contactless delivery right to your doorstep.</p>
                <div className="bg-white text-black p-4 sm:p-6 rounded-lg">
                  <div className="mb-4">
                    <label className="block text-black text-sm font-bold mb-2">Pickup Location</label>
                    <input
                      type="text"
                      className="w-full p-2 sm:p-3 border border-gray-600 rounded bg-white text-black"
                      placeholder="Enter pickup address"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-black text-sm font-bold mb-2">Delivery Location</label>
                    <input
                      type="text"
                      className="w-full p-2 sm:p-3 border border-gray-600 rounded bg-white text-black"
                      placeholder="Enter delivery address"
                      value={dropoff}
                      onChange={(e) => setDropoff(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    onClick={handleScheduleDelivery}
                    className="w-full bg-purple-600 text-white p-2 sm:p-3 rounded-full font-bold hover:bg-purple-700 transition duration-200 text-sm sm:text-base"
                  >
                    Schedule Delivery
                  </button>
                </div>
              </div>
              <div className="w-full md:w-1/2 flex justify-center relative md:-top-1 items-start md:pl-10">
                <div id="map" className="w-full h-[50vh] sm:h-[60vh] md:h-[80vh] rounded-lg z-10"></div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Features Section */}
        <div className='mt-8 sm:mt-[20vh] min-h-screen w-full text-black flex justify-center items-center'>
          <div className='w-[90%] h-full sm:h-[90%] flex flex-col md:flex-row justify-between items-center p-4 sm:p-6'>
            <div className='w-full md:w-[50%] flex flex-col justify-center items-start gap-4 sm:gap-6 space-y-3 text-black mb-8 md:mb-0'>
              <h3 className='font-extrabold text-3xl sm:text-4xl md:text-5xl leading-snug text-black'>
                Fly on Your Time,<br/> Deliver What Matters
              </h3>
  
              <p className='text-base sm:text-lg text-black leading-relaxed'>
                Maximize Your Earnings on Your Own Schedule with Drone Deliveries — Whether You Own a Drone or Choose to Rent One, You Have the Flexibility to Deliver Packages Swiftly and Efficiently While Managing Your Time Your Way.
              </p>
              
              <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4'>
                <button className='bg-black hover:bg-white cursor-pointer hover:text-black hover:ring-1 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-base sm:text-lg font-semibold shadow-md transition w-full sm:w-auto'>
                  Get Started
                </button>
  
                <p className='text-gray-500 text-base sm:text-lg'>
                  Already have an account? <span className='underline text-black cursor-pointer'>Sign in</span>
                </p>
              </div>
            </div>
            
            <img
              src="https://img.freepik.com/free-vector/people-filming-with-drone-concept-illustration_114360-14612.jpg"
              alt="Drive Image"
              className='w-full md:w-[45%] h-auto md:h-full object-cover rounded-[1rem]'
            />
          </div>
        </div>
  
        {/* feature-2 */}
        <div className='mt-8 sm:mt-[5vh] min-h-screen w-full text-black flex justify-center items-center'>
          <div className='w-[90%] h-full sm:h-[90%] flex flex-col md:flex-row justify-between items-center p-4 sm:p-6'>
            <img
              src="https://img.freepik.com/free-vector/drone-delivery-concept-illustration_114360-792.jpg"
              alt="Drive Image"
              className='w-full md:w-[45%] h-auto md:h-full object-cover rounded-xl mb-8 md:mb-0'
            />
            <div className='w-full md:w-[50%] flex flex-col justify-center items-start gap-4 sm:gap-6 text-black'>
              <h3 className='font-extrabold text-3xl sm:text-4xl md:text-5xl leading-snug text-black'>
                Drive when you <br />want,
                make what<br /> you need
              </h3>
              <p className='text-base sm:text-lg text-black leading-relaxed'>
                Earn on Your Schedule with Drone Deliveries — Use Your Own Drone or Rent One with Ease
              </p>
            </div>
          </div>
        </div>
  
        {/* feature-3 */}
        <div className='mt-8 sm:mt-[5vh] min-h-screen w-full text-black flex justify-center items-center'>
          <div className='w-[90%] h-full sm:h-[90%] flex flex-col md:flex-row justify-between items-center p-4 sm:p-6'>
            <div className='w-full md:w-[50%] flex flex-col justify-center items-start gap-4 sm:gap-6 text-black mb-8 md:mb-0'>
              <h3 className='font-extrabold text-3xl sm:text-4xl md:text-5xl leading-snug text-black'>
                Drive when you <br />want,
                make what<br /> you need
              </h3>
              <p className='text-base sm:text-lg text-black leading-relaxed'>
                Earn on Your Schedule with Drone Deliveries — Use Your Own Drone or Rent One with Ease
              </p>
            </div>
  
            <img
              src="https://img.freepik.com/free-vector/delivery-drone-with-map_23-2147688476.jpg"
              alt="Drive Image"
              className='w-full md:w-[45%] h-auto md:h-full object-cover rounded-xl'
            />
          </div>
        </div>
  
        {/* How It Works Section */}
        <div className="py-8 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">How Ayndrome Works?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <div className="text-center">
                <div className="w-16 sm:w-24 h-16 sm:h-24 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl sm:text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">Request</h3>
                <p className="text-sm sm:text-base text-gray-600">Enter your pickup and delivery locations</p>
              </div>
              <div className="text-center">
                <div className="w-16 sm:w-24 h-16 sm:h-24 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl sm:text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">Pack</h3>
                <p className="text-sm sm:text-base text-gray-600">Package is secured for drone transport</p>
              </div>
              <div className="text-center">
                <div className="w-16 sm:w-24 h-16 sm:h-24 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl sm:text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">Track</h3>
                <p className="text-sm sm:text-base text-gray-600">Watch your delivery in real-time</p>
              </div>
              <div className="text-center">
                <div className="w-16 sm:w-24 h-16 sm:h-24 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl sm:text-2xl font-bold text-white">4</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">Receive</h3>
                <p className="text-sm sm:text-base text-gray-600">Get your delivery at your doorstep</p>
              </div>
            </div>
          </div>
        </div>
  
        {/* App Download Section */}
        <div className="py-16 bg-white text-black shadow-md">
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Download the Ayndrome App</h2>
              <p className="text-xl mb-6">Track your deliveries, schedule in advance, and get exclusive offers.</p>
              <div className="flex space-x-4">
                <button className="bg-white text-black rounded-lg flex items-center gap-2 px-5 py-1 shadow-md hover:shadow-lg transition-all">
                  <img src="../public/assets/pngwing.com.png" className="w-5 h-5" alt="App Store" />
                  <span className="font-medium">App Store</span>
                </button>
  
                <button className="bg-white text-black rounded-lg flex items-center gap-2 px-4 py-2 shadow-md hover:shadow-lg transition-all">
                  <img src="https://cdn-icons-png.flaticon.com/128/3128/3128279.png" className="w-6 h-6" alt="App Store" />
                  <span className="font-medium">Play Store</span>
                </button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="w-[85%] h-96 bg-white rounded-lg flex items-center justify-center">
                <img src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg" alt="" className="w-full h-full object-cover rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default LandingPage;