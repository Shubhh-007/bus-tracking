import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMapPin, FiClock, FiUsers, FiPhone } from "react-icons/fi";
import { FaBrain } from "react-icons/fa";
import SmartAI from "./SmartAI";
import RouteMap from "./RouteMap";
import { getRouteByCities, getAllRoutes } from "../data/punjabRoutes";

// Available buses for different routes
const availableBuses = {
  "Amritsar-Wagah Border": [
    {
      id: "PB001",
      name: "Golden Temple Express",
      busNumber: "PB001",
      driver: "Raj Kumar",
      phone: "+91-9876543210",
      capacity: 45,
      type: "AC Sleeper",
      departure: "07:00 AM",
      arrival: "12:30 PM",
      price: "₹450",
      status: "Available",
      seatsAvailable: 12
    }
  ],
  "Chandigarh-Amristsar": [
    {
      id: "PB002", 
      name: "Capital Connect",
      busNumber: "PB002",
      driver: "Amit Singh",
      phone: "+91-9876543211",
      capacity: 35,
      type: "Non-AC",
      departure: "08:30 AM",
      arrival: "02:00 PM",
      price: "₹380",
      status: "Available",
      seatsAvailable: 8
    }
  ],
  "Golden Temple-Jallianwala Bagh": [
    {
      id: "PB003",
      name: "Heritage Shuttle", 
      busNumber: "PB003",
      driver: "Vikram Sharma",
      phone: "+91-9876543212",
      capacity: 25,
      type: "Mini Bus",
      departure: "09:00 AM",
      arrival: "09:15 AM",
      price: "₹50",
      status: "Available",
      seatsAvailable: 15
    }
  ],
  "Anandpur Sahib-Talwandi Sabo": [
    {
      id: "PB004",
      name: "Guru Marg Express",
      busNumber: "PB004", 
      driver: "Suresh Patel",
      phone: "+91-9876543213",
      capacity: 50,
      type: "AC Semi-Sleeper",
      departure: "06:00 AM",
      arrival: "04:00 PM",
      price: "₹650",
      status: "Available",
      seatsAvailable: 5
    }
  ],
  "Chandigarh-Shimla": [
    {
      id: "PB005",
      name: "Himalayan Express",
      busNumber: "PB005",
      driver: "Ravi Kumar", 
      phone: "+91-9876543214",
      capacity: 40,
      type: "AC Seater",
      departure: "07:30 AM",
      arrival: "11:30 AM",
      price: "₹520",
      status: "Available",
      seatsAvailable: 18
    }
  ],
  "Zirakpur-Parwanoo": [
    {
      id: "PB006",
      name: "Expressway Shuttle",
      busNumber: "PB006",
      driver: "Gurpreet Singh",
      phone: "+91-9876543215", 
      capacity: 30,
      type: "Non-AC Seater",
      departure: "08:00 AM",
      arrival: "09:00 AM",
      price: "₹180",
      status: "Available",
      seatsAvailable: 22
    }
  ]
};

const BusSelection = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [selectedBus, setSelectedBus] = useState(null);

  useEffect(() => {
    const urlFrom = searchParams.get('from');
    const urlTo = searchParams.get('to');
    
    if (urlFrom && urlTo) {
      setFrom(decodeURIComponent(urlFrom));
      setTo(decodeURIComponent(urlTo));
    }
  }, [searchParams]);

  const getRouteKey = () => {
    if (!from || !to) return null;
    return `${from}-${to}`;
  };

  const getAvailableBuses = () => {
    const routeKey = getRouteKey();
    return availableBuses[routeKey] || [];
  };

  const handleBusSelect = (bus) => {
    setSelectedBus(bus);
    // Navigate to tracking with auto-start animation
    navigate(`/track?bus=${bus.busNumber}&autoStart=true`);
  };

  const buses = getAvailableBuses();

  if (!from || !to) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Route Selected</h2>
          <p className="text-gray-600 mb-6">Please select a source and destination first.</p>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Go Back to Search
          </button>
        </div>
      </div>
    );
  }

  if (buses.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="text-6xl mb-6">🚌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Buses Available</h2>
          <p className="text-gray-600 mb-6">
            Sorry, no buses are currently available for the route from <strong>{from}</strong> to <strong>{to}</strong>.
          </p>
          <div className="space-y-3">
            <button 
              onClick={() => navigate('/')}
              className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Search Different Route
            </button>
            <button 
              onClick={() => navigate(`/track?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`)}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              View Route Map
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 py-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-4">Available Buses</h1>
          <div className="flex items-center justify-center gap-4 text-lg text-gray-700">
            <span className="font-semibold">{from}</span>
            <FiMapPin className="text-green-600" />
            <span className="font-semibold">{to}</span>
          </div>
        </div>

        {/* Bus Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buses.map((bus, index) => (
            <motion.div
              key={bus.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-green-100"
            >
              {/* Bus Header */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">{bus.name}</h3>
                    <p className="text-green-100 text-sm">Bus {bus.busNumber}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{bus.price}</div>
                    <div className="text-green-100 text-xs">per person</div>
                  </div>
                </div>
              </div>

              {/* Bus Details */}
              <div className="p-6 space-y-4">
                {/* Driver Info */}
                <div className="flex items-center gap-3">
                  <FiUsers className="text-green-600 w-5 h-5" />
                  <div>
                    <p className="font-semibold text-gray-800">{bus.driver}</p>
                    <p className="text-sm text-gray-600">Driver</p>
                  </div>
                </div>

                {/* Timing */}
                <div className="flex items-center gap-3">
                  <FiClock className="text-green-600 w-5 h-5" />
                  <div>
                    <p className="font-semibold text-gray-800">{bus.departure} - {bus.arrival}</p>
                    <p className="text-sm text-gray-600">Departure - Arrival</p>
                  </div>
                </div>

                {/* Bus Type & Capacity */}
                <div className="flex justify-between items-center py-3 border-t border-gray-100">
                  <div>
                    <p className="font-semibold text-gray-800">{bus.type}</p>
                    <p className="text-sm text-gray-600">Bus Type</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">{bus.seatsAvailable}/{bus.capacity}</p>
                    <p className="text-sm text-gray-600">Seats Available</p>
                  </div>
                </div>

                {/* AI Predictions */}
                <div className="ai-predictions-mini">
                  <div className="ai-prediction-item">
                    <FaBrain className="text-blue-500 w-4 h-4" />
                    <span className="text-xs text-gray-600">AI ETA: 12 min</span>
                  </div>
                  <div className="ai-prediction-item">
                    <FiUsers className="text-orange-500 w-4 h-4" />
                    <span className="text-xs text-gray-600">Next stop: 5 seats</span>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-700">{bus.status}</span>
                  </div>
                  <a 
                    href={`tel:${bus.phone}`}
                    className="flex items-center gap-2 text-green-600 hover:text-green-700 transition"
                  >
                    <FiPhone className="w-4 h-4" />
                    <span className="text-sm">Call Driver</span>
                  </a>
                </div>

                {/* Select Button */}
                <button
                  onClick={() => handleBusSelect(bus)}
                  className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Track This Bus
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Insights Section */}
        <div className="mt-8">
          <SmartAI 
            distanceKm={getDistanceForRoute()}
            currentSeats={buses[0]?.seatsAvailable}
            totalSeats={buses[0]?.capacity}
            routeId={getRouteKey()}
            userId="demo-user"
          />
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
};

export default BusSelection;

// Add CSS for AI predictions mini
const styles = `
.ai-predictions-mini {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin: 12px 0;
  padding: 8px 12px;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 8px;
  border: 1px solid #dee2e6;
}

.ai-prediction-item {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
}

.ai-prediction-item span {
  font-size: 11px;
  font-weight: 500;
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}



