import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaLeaf, FaTrophy, FaMedal, FaCoins } from "react-icons/fa";

const GreenPointsSystem = ({ distance, busType, onPointsEarned }) => {
  const [points, setPoints] = useState(0);
  const [totalCo2Saved, setTotalCo2Saved] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // Calculate points for current trip
    if (distance > 0) {
      const co2Saved = (120 - 89) * distance; // Car vs Bus emissions
      const newPoints = Math.round(co2Saved / 10);
      
      setPoints(prev => prev + newPoints);
      setTotalCo2Saved(prev => prev + co2Saved);
      
      // Show animation
      setShowAnimation(true);
      setTimeout(() => setShowAnimation(false), 3000);
      
      if (onPointsEarned) {
        onPointsEarned(newPoints, co2Saved);
      }
    }
  }, [distance, busType, onPointsEarned]);

  const getLeaderboard = () => {
    return [
      { name: "Prakhar", points: 500, co2Saved: 5000, rank: 1 },
      { name: "Shubh", points: 200, co2Saved: 2000, rank: 2 },
      { name: "You", points: points, co2Saved: totalCo2Saved, rank: 3 }
    ];
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <FaTrophy className="text-yellow-500" />;
      case 2: return <FaMedal className="text-gray-400" />;
      case 3: return <FaMedal className="text-amber-600" />;
      default: return <FaCoins className="text-green-500" />;
    }
  };

  return (
    <div className="green-points-system">
      {/* Current Trip Points */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: showAnimation ? 1.1 : 1, opacity: 1 }}
        className="current-points-card"
      >
        <div className="points-header">
          <FaLeaf className="text-green-500 text-2xl" />
          <h3 className="points-title">Green Points Earned</h3>
        </div>
        
        <div className="points-content">
          <div className="points-display">
            <span className="points-number">+{points}</span>
            <span className="points-label">Points</span>
          </div>
          
          <div className="co2-saved">
            <span className="co2-amount">{totalCo2Saved.toFixed(0)}g</span>
            <span className="co2-label">CO₂ Saved</span>
          </div>
          
          <div className="equivalent">
            <span className="equivalent-text">
              = {Math.round(totalCo2Saved / 1000 * 10) / 10} kg CO₂
            </span>
          </div>
        </div>
      </motion.div>

      {/* Leaderboard */}
      <div className="leaderboard-card">
        <div className="leaderboard-header">
          <FaTrophy className="text-yellow-500 text-xl" />
          <h3 className="leaderboard-title">Eco Warriors Leaderboard</h3>
        </div>
        
        <div className="leaderboard-list">
          {getLeaderboard().map((user, index) => (
            <motion.div
              key={user.name}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`leaderboard-item ${user.name === "You" ? "current-user" : ""}`}
            >
              <div className="user-rank">
                {getRankIcon(user.rank)}
                <span className="rank-number">#{user.rank}</span>
              </div>
              
              <div className="user-info">
                <span className="user-name">{user.name}</span>
                <span className="user-co2">{user.co2Saved}g CO₂ saved</span>
              </div>
              
              <div className="user-points">
                <span className="points-badge">{user.points}</span>
                <span className="points-text">pts</span>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="leaderboard-footer">
          <p className="motivation-text">
            🌍 Every trip makes a difference! Keep going green!
          </p>
        </div>
      </div>

      {/* Rewards Section */}
      <div className="rewards-card">
        <h3 className="rewards-title">Redeem Your Points</h3>
        <div className="rewards-grid">
          <div className="reward-item">
            <div className="reward-cost">50 pts</div>
            <div className="reward-name">10% Bus Discount</div>
          </div>
          <div className="reward-item">
            <div className="reward-cost">100 pts</div>
            <div className="reward-name">Free Coffee</div>
          </div>
          <div className="reward-item">
            <div className="reward-cost">200 pts</div>
            <div className="reward-name">Movie Ticket</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreenPointsSystem;



