// import React from "react";
// import Navbar from './components/Navbar';
// import Hero from './components/Hero';
// import Features from './components/Features';



// function App() {
//   return (
//     <div className="App">
//        <Navbar />
//       <Hero />
//       <Features />
           

//       <main className="pt-16" >
//       </main>
//     </div>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BusDetails from "./components/BusDetails"; // Bus list page
import BusInfo from "./components/BusInfo"; // Individual bus info page

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/details" element={<BusDetails />} />
      <Route path="/details/:busNumber" element={<BusInfo />} />
    </Routes>
  </Router>
);

export default App;
