
 

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";

import BusDetails from "./components/BusDetails"; // Bus list page
import BusInfo from "./components/BusInfo"; // Individual bus info page

const App = () => (
  <Router>
    <div className="App min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/details" element={<BusDetails />} />
          <Route path="/details/:busNumber" element={<BusInfo />} />
        </Routes>
      </main>

      <footer>
        <Features />
      </footer>
    </div>
  </Router>
);

export default App;

