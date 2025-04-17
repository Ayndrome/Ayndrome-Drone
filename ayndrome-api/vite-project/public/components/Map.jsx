import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function DroneMap() {
  const [map, setMap] = useState(null);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropoffCoords, setDropoffCoords] = useState(null);
  const [routingControl, setRoutingControl] = useState(null);
  const [estimatedDistance, setEstimatedDistance] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLeaflet = setInterval(() => {
      if (window.L && window.L.Control.Geocoder) {
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
        } else {
          setDropoffCoords(center);
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
    try {
      // Remove existing route if any
      if (routingControl) {
        map.removeControl(routingControl);
      }

      // Create new route
      const newRoutingControl = window.L.Routing.control({
        waypoints: [
          window.L.latLng(pickupCoords),
          window.L.latLng(dropoffCoords)
        ],
        routeWhileDragging: true,
        show: true,
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false
      }).addTo(map);

      // Get route details
      newRoutingControl.on('routesfound', (e) => {
        const routes = e.routes;
        const route = routes[0];
        setEstimatedDistance((route.summary.totalDistance / 1000).toFixed(1) + ' km');
        setEstimatedTime(Math.ceil(route.summary.totalTime / 60) + ' min');
      });

      setRoutingControl(newRoutingControl);
    } catch (error) {
      console.error("Routing error:", error);
      toast.error("Error calculating route. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleScheduleDelivery = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      toast.info("Please login to schedule a delivery");
      navigate('/app/login', { replace: true });
      return;
    }

    if (!pickup || !dropoff || !estimatedDistance || !estimatedTime) {
      toast.error("Please select both locations and calculate route first");
      return;
    }

    navigate('/app/delivery-details', {
      state: {
        pickupLocation: pickup,
        deliveryLocation: dropoff,
        estimatedDistance,
        estimatedTime,
        pickupCoords,
        dropoffCoords
      },
      replace: true
    });
  };

  return (
    <div className="relative w-full">
      {/* Search Inputs */}
      <div className="absolute top-4 sm:top-10 left-1/2 transform -translate-x-1/2 z-50 w-full sm:w-auto px-4 sm:px-0">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <input
            type="text"
            placeholder="Enter pickup location"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            onBlur={() => geocodeAddress(pickup, "pickup")}
            className="w-full sm:w-64 md:w-80 p-2 sm:p-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="text"
            placeholder="Enter drop-off location"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            onBlur={() => geocodeAddress(dropoff, "dropoff")}
            className="w-full sm:w-64 md:w-80 p-2 sm:p-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            onClick={calculateRoute}
            disabled={isLoading}
            className="w-full sm:w-auto px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Calculating..." : "Calculate Route"}
          </button>
        </div>
      </div>

      {/* Route Details */}
      {(estimatedDistance || estimatedTime) && (
        <div className="absolute top-24 sm:top-20 left-1/2 transform -translate-x-1/2 z-50 bg-white p-4 rounded-lg shadow-lg">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Distance</p>
              <p className="font-bold">{estimatedDistance}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Estimated Time</p>
              <p className="font-bold">{estimatedTime}</p>
            </div>
            <button
              onClick={handleScheduleDelivery}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Schedule Delivery
            </button>
          </div>
        </div>
      )}

      {/* Map Container */}
      <div 
        id="map" 
        className="w-full h-[50vh] sm:h-[60vh] md:h-[80vh] mt-20 sm:mt-24 md:mt-28"
      ></div>
    </div>
  );
}

export default DroneMap;


