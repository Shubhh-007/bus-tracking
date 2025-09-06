
 

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BusDetails from "./components/BusDetails"; // Bus list page
import BusInfo from "./components/BusInfo"; // Individual bus info page
import AdminLogin from "./components/AdminLogin"; // Admin login page
import ConductorPanel from "./components/ConductorPanel"; // Conductor panel
import TransportManager from "./components/TransportManager"; // Transport manager panel
import ProtectedRoute from "./components/ProtectedRoute"; // Protected route component

const App = () => (
  <Router>
    <div className="App min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Hero />} />
          <Route path="/details" element={<BusDetails />} />
          <Route path="/details/:busNumber" element={<BusInfo />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin/conductor" 
            element={
              <ProtectedRoute requiredRole="conductor">
                <ConductorPanel />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/manager" 
            element={
              <ProtectedRoute requiredRole="manager">
                <TransportManager />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>

      <footer>
      </footer>
    </div>
  </Router>
);

export default App;

