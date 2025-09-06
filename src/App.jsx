
 

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BusDetails from "./components/BusDetails"; // Bus list page
import BusInfo from "./components/BusInfo"; // Individual bus info page
import AdminHome from "./components/AdminHome"; // Admin home page
import ConductorPanel from "./components/ConductorPanel"; // Conductor panel
import TransportManager from "./components/TransportManager"; // Transport manager panel

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
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/conductor" element={<ConductorPanel />} />
          <Route path="/admin/manager" element={<TransportManager />} />
        </Routes>
      </main>

      <footer>
      </footer>
    </div>
  </Router>
);

export default App;

