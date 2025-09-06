// Local AI API Server for Development
// Simulates Firebase Functions locally without requiring paid plan

// Import AI modules
import { predictETA } from './aiPredictionService';
import { calculateCarbonSavings } from './aiPredictionService';
import { predictSeatAvailability } from './aiPredictionService';

/**
 * Local AI API Server
 * Provides the same interface as Firebase Functions but runs locally
 */
export class LocalAIServer {
  constructor() {
    this.baseUrl = 'http://localhost:3001/api';
    this.isServerRunning = false;
  }

  /**
   * Start the local AI server
   */
  async startServer() {
    if (this.isServerRunning) return;
    
    console.log('🤖 Starting Local AI Server...');
    this.isServerRunning = true;
    
    // Simulate server startup
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('✅ Local AI Server is running on http://localhost:3001');
  }

  /**
   * Unified AI API endpoint
   */
  async callAI(requestData) {
    try {
      const {
        distanceKm,
        avgSpeed = 40,
        trafficFactor = 1,
        timeOfDay = 'normal',
        weather = 'clear',
        busType = 'standard',
        passengers = 1,
        currentSeats,
        totalSeats,
        routeId,
        currentStopIndex = 0,
        dayOfWeek = 'weekday'
      } = requestData;

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));

      // Call AI modules
      const [etaResult, carbonResult, seatResult] = await Promise.allSettled([
        // ETA Prediction
        this.predictETA(distanceKm, avgSpeed, trafficFactor, timeOfDay, weather),
        
        // Carbon Savings
        this.calculateCarbonSavings(distanceKm, busType, passengers),
        
        // Seat Forecast
        currentSeats && totalSeats ? 
          this.predictSeats(currentSeats, totalSeats, routeId, currentStopIndex, timeOfDay, dayOfWeek) : 
          Promise.resolve({ currentSeats: null, message: 'Seat data not provided' })
      ]);

      return {
        success: true,
        timestamp: new Date().toISOString(),
        data: {
          eta: etaResult.status === 'fulfilled' ? etaResult.value : { eta: 10, confidence: 0.5 },
          carbon: carbonResult.status === 'fulfilled' ? carbonResult.value : { co2Saved: 0, greenPoints: 0 },
          seat: seatResult.status === 'fulfilled' ? seatResult.value : { predictedSeats: currentSeats, trend: 'Stable' }
        }
      };

    } catch (error) {
      console.error('Local AI API error:', error);
      return {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * ETA Prediction
   */
  async predictETA(distanceKm, avgSpeed = 40, trafficFactor = 1, timeOfDay = 'normal', weather = 'clear') {
    // Base time calculation
    const baseTime = (distanceKm / avgSpeed) * 60; // in minutes
    
    // AI-enhanced traffic delay calculation
    let trafficDelay = 0;
    
    // Time-based traffic patterns
    const timeFactors = {
      'rush_morning': 1.5,    // 7-9 AM
      'rush_evening': 1.3,    // 5-7 PM
      'normal': 1.0,          // Regular hours
      'night': 0.8            // 10 PM - 6 AM
    };
    
    // Weather impact
    const weatherFactors = {
      'clear': 1.0,
      'rainy': 1.4,
      'foggy': 1.2,
      'snowy': 1.6
    };
    
    // Calculate intelligent traffic delay
    const timeFactor = timeFactors[timeOfDay] || 1.0;
    const weatherFactor = weatherFactors[weather] || 1.0;
    
    trafficDelay = trafficFactor * timeFactor * weatherFactor * 2;
    
    // Historical data factor (simulated)
    const historicalFactor = Math.random() * 3; // 0-3 minutes based on route history
    
    // Final ETA calculation
    const eta = Math.round(baseTime + trafficDelay + historicalFactor);
    
    // Confidence calculation
    let confidence = 'High';
    if (trafficFactor >= 3 || weather !== 'clear') {
      confidence = 'Low';
    } else if (trafficFactor === 2 || timeOfDay.includes('rush')) {
      confidence = 'Medium';
    }
    
    return {
      eta: Math.max(1, eta), // Minimum 1 minute
      confidence,
      factors: {
        baseTime: Math.round(baseTime),
        trafficDelay: Math.round(trafficDelay),
        historicalFactor: Math.round(historicalFactor),
        timeOfDay,
        weather
      },
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Carbon Savings Calculation
   */
  async calculateCarbonSavings(distanceKm, busType = 'standard', passengers = 1) {
    // CO2 emissions per km (in kg CO2)
    const emissions = {
      car: 0.12,        // Small car
      suv: 0.18,        // SUV
      bus_standard: 0.03, // Standard bus per passenger
      bus_electric: 0.01, // Electric bus per passenger
      bus_hybrid: 0.02   // Hybrid bus per passenger
    };
    
    // Get bus emission based on type
    const busEmission = emissions[`bus_${busType}`] || emissions.bus_standard;
    const carEmission = emissions.car; // Default to small car
    
    // Calculate savings per passenger
    const savedPerKm = carEmission - busEmission;
    const totalSaved = savedPerKm * distanceKm;
    
    // Green Points calculation (10 points per kg CO2 saved)
    const greenPoints = Math.round(totalSaved * 10);
    
    // Additional bonus points for longer distances
    let bonusPoints = 0;
    if (distanceKm > 50) bonusPoints += 5;  // Long distance bonus
    if (distanceKm > 100) bonusPoints += 10; // Very long distance bonus
    
    // Eco-friendly bus type bonuses
    if (busType === 'electric') bonusPoints += 10;
    if (busType === 'hybrid') bonusPoints += 5;
    
    const totalPoints = greenPoints + bonusPoints;
    
    // Calculate environmental impact
    const treesEquivalent = Math.round(totalSaved * 0.5); // Rough estimate: 1kg CO2 = 0.5 trees
    const carTripsAvoided = Math.round(totalSaved / carEmission);
    
    return {
      co2Saved: totalSaved.toFixed(2),
      greenPoints: totalPoints,
      bonusPoints,
      environmentalImpact: {
        treesEquivalent,
        carTripsAvoided,
        busType
      },
      breakdown: {
        carEmission: carEmission.toFixed(3),
        busEmission: busEmission.toFixed(3),
        savedPerKm: savedPerKm.toFixed(3),
        distance: distanceKm
      },
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Seat Prediction
   */
  async predictSeats(currentSeats, totalSeats, routeId, currentStopIndex = 0, timeOfDay = 'normal', dayOfWeek = 'weekday') {
    // Historical boarding patterns (simulated)
    const historicalPatterns = {
      'PB001': { // Amritsar → Wagah Border
        avgBoarding: 8,
        avgDrop: 3,
        peakBoarding: 12,
        peakDrop: 5
      },
      'PB002': { // Chandigarh → Amritsar
        avgBoarding: 10,
        avgDrop: 4,
        peakBoarding: 15,
        peakDrop: 6
      },
      'PB003': { // Heritage Street
        avgBoarding: 3,
        avgDrop: 2,
        peakBoarding: 5,
        peakDrop: 3
      },
      'default': {
        avgBoarding: 6,
        avgDrop: 3,
        peakBoarding: 10,
        peakDrop: 4
      }
    };
    
    const pattern = historicalPatterns[routeId] || historicalPatterns.default;
    
    // Time-based multipliers
    const timeMultipliers = {
      'rush_morning': 1.5,    // 7-9 AM
      'rush_evening': 1.3,    // 5-7 PM
      'normal': 1.0,          // Regular hours
      'night': 0.6,           // 10 PM - 6 AM
      'weekend': 0.8          // Weekend pattern
    };
    
    // Day of week adjustments
    const dayMultipliers = {
      'weekday': 1.0,
      'weekend': 0.7,
      'holiday': 0.5
    };
    
    // Calculate predicted boarding and drop-off
    const timeMultiplier = timeMultipliers[timeOfDay] || 1.0;
    const dayMultiplier = dayMultipliers[dayOfWeek] || 1.0;
    
    // AI prediction: consider if it's peak time
    const isPeakTime = timeOfDay.includes('rush');
    const predictedBoarding = Math.round(
      (isPeakTime ? pattern.peakBoarding : pattern.avgBoarding) * 
      timeMultiplier * dayMultiplier
    );
    
    const predictedDrop = Math.round(
      (isPeakTime ? pattern.peakDrop : pattern.avgDrop) * 
      timeMultiplier * dayMultiplier
    );
    
    // Calculate next stop prediction
    const nextStopSeats = Math.max(0, Math.min(totalSeats, 
      currentSeats - predictedBoarding + predictedDrop
    ));
    
    // Trend analysis
    let trend = 'Stable';
    if (nextStopSeats < currentSeats * 0.8) {
      trend = 'Decreasing';
    } else if (nextStopSeats > currentSeats * 1.2) {
      trend = 'Increasing';
    }
    
    // Confidence calculation
    let confidence = 'High';
    if (timeOfDay.includes('rush') || dayOfWeek === 'holiday') {
      confidence = 'Medium';
    }
    if (Math.abs(predictedBoarding - pattern.avgBoarding) > pattern.avgBoarding * 0.5) {
      confidence = 'Low';
    }
    
    // Occupancy percentage
    const occupancyPercentage = Math.round(((totalSeats - currentSeats) / totalSeats) * 100);
    
    return {
      currentSeats,
      totalSeats,
      nextStopSeats,
      trend,
      confidence,
      occupancyPercentage,
      factors: {
        predictedBoarding,
        predictedDrop,
        timeOfDay,
        dayOfWeek,
        routeId
      },
      recommendations: {
        shouldBoard: nextStopSeats > 5 ? 'Yes' : 'Consider next bus',
        urgency: nextStopSeats < 3 ? 'High' : nextStopSeats < 8 ? 'Medium' : 'Low'
      },
      timestamp: new Date().toISOString()
    };
  }
}

// Create singleton instance
export const localAIServer = new LocalAIServer();

// Start server automatically
localAIServer.startServer();



