// AI-Powered Prediction Service for Bus Tracking
// This service provides intelligent predictions for ETA, carbon savings, and seat availability

// Traffic data simulation (in real app, you'd use Google Traffic API or OpenStreetMap)
const getTrafficDelay = async (fromCoords, toCoords) => {
  // Simulate traffic API call
  const baseDelay = Math.random() * 10; // 0-10 minutes
  const timeOfDay = new Date().getHours();
  
  // Rush hour simulation
  if ((timeOfDay >= 7 && timeOfDay <= 9) || (timeOfDay >= 17 && timeOfDay <= 19)) {
    return baseDelay + 15; // Extra 15 minutes during rush hour
  }
  
  return baseDelay;
};

// AI ETA Prediction
export const predictETA = async (routeCoords, currentPosition, busSpeed = 40) => {
  try {
    // Calculate remaining distance
    const remainingDistance = calculateRemainingDistance(routeCoords, currentPosition);
    
    // Get traffic delay
    const trafficDelay = await getTrafficDelay(routeCoords[0], routeCoords[routeCoords.length - 1]);
    
    // AI Formula: ETA = (distance / speed) + traffic_delay + historical_factor
    const baseTime = (remainingDistance / busSpeed) * 60; // Convert to minutes
    const historicalFactor = getHistoricalDelay(routeCoords); // Based on route history
    const weatherFactor = getWeatherDelay(); // Weather impact
    
    const predictedETA = baseTime + trafficDelay + historicalFactor + weatherFactor;
    
    return {
      eta: Math.max(1, Math.round(predictedETA)), // Minimum 1 minute
      confidence: calculateConfidence(trafficDelay, historicalFactor),
      factors: {
        baseTime: Math.round(baseTime),
        trafficDelay: Math.round(trafficDelay),
        historicalFactor: Math.round(historicalFactor),
        weatherFactor: Math.round(weatherFactor)
      }
    };
  } catch (error) {
    console.error('ETA prediction error:', error);
    return { eta: 10, confidence: 0.5, factors: {} };
  }
};

// Carbon Emission & Green Score AI
export const calculateCarbonSavings = (distance, busType = 'standard') => {
  // CO2 emissions per km (in grams)
  const emissions = {
    car: 120, // Average car
    bus: 89,  // Average bus (per passenger)
    electric: 0 // Electric bus
  };
  
  const busEmissions = busType === 'electric' ? emissions.electric : emissions.bus;
  const carEmissions = emissions.car;
  
  const co2Saved = (carEmissions - busEmissions) * distance;
  const greenPoints = Math.round(co2Saved / 10); // 1 point per 10g CO2 saved
  
  return {
    co2Saved: Math.round(co2Saved),
    greenPoints,
    equivalent: getEquivalent(co2Saved)
  };
};

// AI Crowd & Seat Prediction
export const predictSeatAvailability = (currentSeats, routeData, nextStopIndex) => {
  const historicalData = getHistoricalBoardingData(routeData.route);
  const timeOfDay = new Date().getHours();
  const dayOfWeek = new Date().getDay();
  
  // AI prediction based on historical patterns
  let predictedBoarding = historicalData.avgBoarding;
  
  // Adjust for time of day
  if (timeOfDay >= 7 && timeOfDay <= 9) predictedBoarding *= 1.5; // Morning rush
  if (timeOfDay >= 17 && timeOfDay <= 19) predictedBoarding *= 1.3; // Evening rush
  if (dayOfWeek === 0 || dayOfWeek === 6) predictedBoarding *= 0.7; // Weekend
  
  // Adjust for weather
  const weatherFactor = getWeatherImpact();
  predictedBoarding *= weatherFactor;
  
  const predictedSeats = Math.max(0, currentSeats - Math.round(predictedBoarding));
  const confidence = calculateSeatConfidence(historicalData, timeOfDay);
  
  return {
    predictedSeats,
    confidence,
    boardingPrediction: Math.round(predictedBoarding),
    factors: {
      historical: historicalData.avgBoarding,
      timeOfDay: timeOfDay,
      weather: weatherFactor
    }
  };
};

// Helper functions
const calculateRemainingDistance = (routeCoords, currentPosition) => {
  if (!currentPosition || routeCoords.length === 0) return 0;
  
  let totalDistance = 0;
  let foundCurrent = false;
  
  for (let i = 0; i < routeCoords.length - 1; i++) {
    if (foundCurrent) {
      totalDistance += getDistanceKm(routeCoords[i], routeCoords[i + 1]);
    } else {
      // Check if we're near this point
      const distance = getDistanceKm(currentPosition, routeCoords[i]);
      if (distance < 0.1) { // Within 100m
        foundCurrent = true;
        totalDistance += getDistanceKm(currentPosition, routeCoords[i + 1]);
      }
    }
  }
  
  return totalDistance;
};

const getDistanceKm = (coord1, coord2) => {
  const R = 6371;
  const dLat = (coord2[0] - coord1[0]) * Math.PI / 180;
  const dLon = (coord2[1] - coord1[1]) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(coord1[0] * Math.PI / 180) * Math.cos(coord2[0] * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

const getHistoricalDelay = (routeCoords) => {
  // Simulate historical data based on route
  const routeKey = `${routeCoords[0][0]}-${routeCoords[0][1]}`;
  const delays = {
    '31.6340-74.8723': 5, // Amritsar routes
    '30.7333-76.7794': 3, // Chandigarh routes
    'default': 2
  };
  return delays[routeKey] || delays.default;
};

const getWeatherDelay = () => {
  // Simulate weather impact
  const weather = ['sunny', 'rainy', 'foggy'][Math.floor(Math.random() * 3)];
  const delays = { sunny: 0, rainy: 8, foggy: 5 };
  return delays[weather];
};

const calculateConfidence = (trafficDelay, historicalFactor) => {
  // Higher confidence when factors are consistent
  const variance = Math.abs(trafficDelay - historicalFactor);
  return Math.max(0.6, 1 - (variance / 20));
};

const getEquivalent = (co2Saved) => {
  if (co2Saved > 1000) return `${(co2Saved/1000).toFixed(1)} kg CO₂`;
  return `${co2Saved} g CO₂`;
};

const getHistoricalBoardingData = (route) => {
  // Simulate historical boarding data
  const data = {
    'Amritsar → Wagah Border': { avgBoarding: 8, variance: 3 },
    'Chandigarh → Amritsar': { avgBoarding: 12, variance: 4 },
    'Golden Temple → Jallianwala Bagh': { avgBoarding: 3, variance: 2 },
    'default': { avgBoarding: 6, variance: 2 }
  };
  return data[route] || data.default;
};

const getWeatherImpact = () => {
  // Weather affects bus usage
  const weather = ['sunny', 'rainy', 'foggy'][Math.floor(Math.random() * 3)];
  const impacts = { sunny: 1.0, rainy: 1.2, foggy: 0.9 };
  return impacts[weather];
};

const calculateSeatConfidence = (historicalData, timeOfDay) => {
  // Confidence based on data quality and time consistency
  let confidence = 0.7;
  if (timeOfDay >= 7 && timeOfDay <= 9) confidence += 0.2; // Rush hour is predictable
  if (historicalData.variance < 3) confidence += 0.1; // Low variance = more predictable
  return Math.min(0.95, confidence);
};

// Green Points System
export const calculateGreenPoints = (distance, busType) => {
  const savings = calculateCarbonSavings(distance, busType);
  return savings.greenPoints;
};

// Leaderboard data
export const getLeaderboard = () => {
  return [
    { name: "Prakhar", points: 500, co2Saved: 5000 },
    { name: "Shubh", points: 200, co2Saved: 2000 },
    { name: "You", points: 0, co2Saved: 0 }
  ];
};



