// Test data generator for bus tracking animation
// This helps test the animation without needing real Firebase data

export const generateTestBusData = (busNumber, routeCoords) => {
  if (!routeCoords || routeCoords.length === 0) return null;
  
  // Generate random position along the route
  const randomIndex = Math.floor(Math.random() * routeCoords.length);
  const [lat, lng] = routeCoords[randomIndex];
  
  return {
    lat: lat + (Math.random() - 0.5) * 0.001, // Add small random offset
    lng: lng + (Math.random() - 0.5) * 0.001,
    timestamp: Date.now(),
    speed: Math.floor(Math.random() * 20) + 30, // 30-50 km/h
    direction: Math.floor(Math.random() * 360) // 0-360 degrees
  };
};

export const simulateBusMovement = (routeCoords, callback, interval = 3000) => {
  if (!routeCoords || routeCoords.length === 0) {
    console.error("simulateBusMovement: No route coordinates provided");
    return null;
  }
  
  console.log("simulateBusMovement: Starting with", routeCoords.length, "coordinates");
  console.log("simulateBusMovement: Route coordinates:", routeCoords);
  
  let currentIndex = 0;
  const intervalId = setInterval(() => {
    if (currentIndex >= routeCoords.length) {
      console.log("simulateBusMovement: Reached end of route, restarting");
      currentIndex = 0;
    }
    
    const [lat, lng] = routeCoords[currentIndex];
    const testData = {
      lat: lat + (Math.random() - 0.5) * 0.0005,
      lng: lng + (Math.random() - 0.5) * 0.0005,
      timestamp: Date.now(),
      speed: Math.floor(Math.random() * 15) + 35,
      direction: Math.floor(Math.random() * 360)
    };
    
    console.log(`simulateBusMovement: Moving to point ${currentIndex + 1}/${routeCoords.length}:`, testData);
    callback(testData);
    
    currentIndex = (currentIndex + 1) % routeCoords.length;
  }, interval);
  
  return intervalId;
};

// Punjab route coordinates for testing
export const testRoutes = {
  "PB001": {
    from: "Amritsar",
    to: "Wagah Border",
    coords: [
      [31.6340, 74.8723], // Amritsar
      [31.6200, 74.8765], // Golden Temple area
      [31.6000, 74.8500], // Mid route
      [31.5900, 74.8000], // Approaching border
      [31.5820, 74.5730]  // Wagah Border
    ]
  },
  "PB002": {
    from: "Chandigarh",
    to: "Amritsar", 
    coords: [
      [30.7333, 76.7794], // Chandigarh
      [30.8000, 76.7000], // Mohali
      [31.0000, 75.5000], // Jalandhar
      [31.3000, 75.2000], // Mid route
      [31.6340, 74.8723]  // Amritsar
    ]
  }
};






