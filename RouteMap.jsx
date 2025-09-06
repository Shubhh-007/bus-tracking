import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import { motion } from "framer-motion";
import { FaBus, FaMapMarkerAlt, FaClock, FaRoute, FaUsers } from "react-icons/fa";

// Custom icons
const busIcon = L.icon({
  iconUrl: "https://img.icons8.com/3d-fluency/94/bus.png",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -15],
});

const startIcon = L.icon({
  iconUrl: "https://img.icons8.com/color/48/map-pin.png",
  iconSize: [25, 25],
  iconAnchor: [12, 25],
  popupAnchor: [0, -25],
});

const endIcon = L.icon({
  iconUrl: "https://img.icons8.com/color/48/map-pin.png",
  iconSize: [25, 25],
  iconAnchor: [12, 25],
  popupAnchor: [0, -25],
});

const stopIcon = L.icon({
  iconUrl: "https://img.icons8.com/color/48/map-marker.png",
  iconSize: [20, 20],
  iconAnchor: [10, 20],
  popupAnchor: [0, -20],
});

// Map bounds updater component
function MapBoundsUpdater({ bounds }) {
  const map = useMap();
  
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [bounds, map]);
  
  return null;
}

export default function RouteMap({ route, selectedBus = null, showAllBuses = true }) {
  const [mapCenter, setMapCenter] = useState([31.6340, 74.8723]);
  const [mapBounds, setMapBounds] = useState(null);

  useEffect(() => {
    if (route) {
      // Calculate center point
      const centerLat = (route.start_location.latitude + route.end_location.latitude) / 2;
      const centerLng = (route.start_location.longitude + route.end_location.longitude) / 2;
      setMapCenter([centerLat, centerLng]);

      // Calculate bounds
      const bounds = L.latLngBounds([
        [route.start_location.latitude, route.start_location.longitude],
        [route.end_location.latitude, route.end_location.longitude]
      ]);
      
      // Add all stops to bounds
      route.stops.forEach(stop => {
        bounds.extend([stop.lat, stop.lng]);
      });
      
      setMapBounds(bounds);
    }
  }, [route]);

  if (!route) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Select a route to view map</p>
      </div>
    );
  }

  // Create route coordinates for polyline
  const routeCoords = route.stops.map(stop => [stop.lat, stop.lng]);

  return (
    <div className="w-full">
      {/* Route Information Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6 mb-4"
      >
        <div className="flex items-center gap-3 mb-4">
          <FaRoute className="text-blue-500 text-2xl" />
          <h2 className="text-2xl font-bold text-gray-800">{route.route}</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-green-500" />
            <div>
              <p className="text-sm text-gray-600">Distance</p>
              <p className="font-semibold">{route.distance}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <FaClock className="text-blue-500" />
            <div>
              <p className="text-sm text-gray-600">Duration</p>
              <p className="font-semibold">{route.duration}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <FaBus className="text-orange-500" />
            <div>
              <p className="text-sm text-gray-600">Frequency</p>
              <p className="font-semibold">{route.frequency}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <FaUsers className="text-purple-500" />
            <div>
              <p className="text-sm text-gray-600">Buses Available</p>
              <p className="font-semibold">{route.buses.length}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Map Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full h-96 rounded-lg overflow-hidden shadow-lg"
      >
        <MapContainer
          center={mapCenter}
          zoom={10}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Route Polyline */}
          <Polyline
            positions={routeCoords}
            color="#3B82F6"
            weight={4}
            opacity={0.8}
          />
          
          {/* Start Location Marker */}
          <Marker
            position={[route.start_location.latitude, route.start_location.longitude]}
            icon={startIcon}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-bold text-green-600">Start Point</h3>
                <p className="font-semibold">{route.start_location.name}</p>
                <p className="text-sm text-gray-600">{route.start_location.address}</p>
              </div>
            </Popup>
          </Marker>
          
          {/* End Location Marker */}
          <Marker
            position={[route.end_location.latitude, route.end_location.longitude]}
            icon={endIcon}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-bold text-red-600">End Point</h3>
                <p className="font-semibold">{route.end_location.name}</p>
                <p className="text-sm text-gray-600">{route.end_location.address}</p>
              </div>
            </Popup>
          </Marker>
          
          {/* Route Stops */}
          {route.stops.map((stop, index) => (
            <Marker
              key={index}
              position={[stop.lat, stop.lng]}
              icon={stopIcon}
            >
              <Popup>
                <div className="text-center">
                  <h4 className="font-semibold">{stop.name}</h4>
                  <p className="text-sm text-gray-600">Stop {index + 1}</p>
                  <p className="text-sm text-blue-600">ETA: {stop.time}</p>
                </div>
              </Popup>
            </Marker>
          ))}
          
          {/* Bus Markers */}
          {showAllBuses && route.buses.map((bus, index) => {
            // Simulate bus position (in real app, this would come from live data)
            const stopIndex = Math.floor(Math.random() * route.stops.length);
            const stop = route.stops[stopIndex];
            
            return (
              <Marker
                key={bus.busNumber}
                position={[stop.lat + (Math.random() - 0.5) * 0.01, stop.lng + (Math.random() - 0.5) * 0.01]}
                icon={busIcon}
              >
                <Popup>
                  <div className="text-center">
                    <h4 className="font-bold text-blue-600">{bus.name}</h4>
                    <p className="text-sm font-semibold">{bus.busNumber}</p>
                    <p className="text-sm text-gray-600">Type: {bus.type}</p>
                    <p className="text-sm text-green-600">Seats: {bus.currentSeats}/{bus.capacity}</p>
                    <p className="text-sm text-orange-600">Fare: {bus.fare}</p>
                    <p className="text-sm text-blue-600">Next: {bus.nextStop}</p>
                    <p className="text-sm text-purple-600">ETA: {bus.eta}</p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
          
          {/* Selected Bus Highlight */}
          {selectedBus && (
            <Marker
              position={[route.stops[0].lat, route.stops[0].lng]}
              icon={L.icon({
                iconUrl: "https://img.icons8.com/3d-fluency/94/bus.png",
                iconSize: [40, 40],
                iconAnchor: [20, 20],
                popupAnchor: [0, -20],
              })}
            >
              <Popup>
                <div className="text-center">
                  <h4 className="font-bold text-green-600">Selected Bus</h4>
                  <p className="font-semibold">{selectedBus.name}</p>
                  <p className="text-sm">{selectedBus.busNumber}</p>
                </div>
              </Popup>
            </Marker>
          )}
          
          <MapBoundsUpdater bounds={mapBounds} />
        </MapContainer>
      </motion.div>

      {/* Route Highlights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-4 bg-white rounded-lg shadow-lg p-6"
      >
        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
          <FaMapMarkerAlt className="text-yellow-500" />
          Route Highlights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {route.highlights.map((highlight, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-700">{highlight}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}



