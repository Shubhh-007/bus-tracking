import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMapPin, FiClock, FiUsers, FiPhone, FiNavigation } from "react-icons/fi";
import { FaBrain, FaBus, FaRoute } from "react-icons/fa";
import SmartAI from "./SmartAI";
import RouteMap from "./RouteMap";
import { getRouteByCities, getAllRoutes } from "../data/punjabRoutes";

export default function BusSelection() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedBus, setSelectedBus] = useState(null);
  const [showMap, setShowMap] = useState(false);

  const fromCity = searchParams.get('from') || '';
  const toCity = searchParams.get('to') || '';

  useEffect(() => {
    // Find route based on search parameters
    if (fromCity && toCity) {
      const route = getRouteByCities(fromCity, toCity);
      if (route) {
        setSelectedRoute(route);
      } else {
        // If exact match not found, show all routes for demo
        setSelectedRoute(getAllRoutes()[0]); // Default to first route
      }
    } else {
      // Show all routes if no search params
      setSelectedRoute(getAllRoutes()[0]);
    }
  }, [fromCity, toCity]);

  const handleBusSelect = (bus) => {
    setSelectedBus(bus);
    // Navigate to tracking page with auto-start
    navigate(`/track?busNumber=${bus.busNumber}&autoStart=true&routeId=${selectedRoute.id}`);
  };

  const getDistanceForRoute = () => {
    if (!selectedRoute) return 0;
    return parseFloat(selectedRoute.distance.replace(' km', ''));
  };

  const getRouteKey = () => {
    return selectedRoute?.id || 'PB001';
  };

  if (!selectedRoute) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading routes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🚌 Available Buses
          </h1>
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-4">
              <FaRoute className="text-blue-500 text-2xl" />
              <h2 className="text-2xl font-bold text-gray-800">{selectedRoute.route}</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <p className="text-gray-600">Distance</p>
                <p className="font-semibold text-green-600">{selectedRoute.distance}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600">Duration</p>
                <p className="font-semibold text-blue-600">{selectedRoute.duration}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600">Frequency</p>
                <p className="font-semibold text-orange-600">{selectedRoute.frequency}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600">Buses</p>
                <p className="font-semibold text-purple-600">{selectedRoute.buses.length}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Map Toggle */}
        <div className="text-center mb-6">
          <button
            onClick={() => setShowMap(!showMap)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
          >
            <FiNavigation className="w-5 h-5" />
            {showMap ? 'Hide Map' : 'Show Route Map'}
          </button>
        </div>

        {/* Route Map */}
        {showMap && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8"
          >
            <RouteMap route={selectedRoute} selectedBus={selectedBus} />
          </motion.div>
        )}

        {/* AI Insights */}
        <div className="mb-8">
          <SmartAI 
            distanceKm={getDistanceForRoute()}
            currentSeats={selectedRoute.buses[0]?.currentSeats}
            totalSeats={selectedRoute.buses[0]?.capacity}
            routeId={getRouteKey()}
            userId="demo-user"
          />
        </div>

        {/* Bus List */}
        <div className="grid gap-6">
          {selectedRoute.buses.map((bus, index) => (
            <motion.div
              key={bus.busNumber}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <FaBus className="text-white text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{bus.name}</h3>
                      <p className="text-gray-600">Bus Number: {bus.busNumber}</p>
                      <p className="text-sm text-gray-500">Type: {bus.type}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">{bus.fare}</p>
                    <p className="text-sm text-gray-500">per person</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <FiUsers className="text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-600">Seats</p>
                      <p className="font-semibold">{bus.currentSeats}/{bus.capacity}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <FiClock className="text-green-500" />
                    <div>
                      <p className="text-sm text-gray-600">Next Stop</p>
                      <p className="font-semibold">{bus.nextStop}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <FiMapPin className="text-orange-500" />
                    <div>
                      <p className="text-sm text-gray-600">ETA</p>
                      <p className="font-semibold">{bus.eta}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <FiPhone className="text-purple-500" />
                    <div>
                      <p className="text-sm text-gray-600">Driver</p>
                      <p className="font-semibold">{bus.driver}</p>
                    </div>
                  </div>
                </div>

                {/* AI Predictions Mini */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FaBrain className="text-blue-500" />
                    <span className="font-semibold text-gray-800">AI Predictions</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Smart ETA</p>
                      <p className="font-semibold text-blue-600">{Math.floor(Math.random() * 10) + 5} min</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Next Stop Seats</p>
                      <p className="font-semibold text-green-600">{Math.floor(Math.random() * 10) + 3}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">CO₂ Saved</p>
                      <p className="font-semibold text-orange-600">{getDistanceForRoute() * 0.09} kg</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleBusSelect(bus)}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-4 px-6 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Select & Track Bus
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            ← Back to Search
          </button>
        </div>
      </div>
    </div>
  );
}



