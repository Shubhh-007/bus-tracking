import React from "react";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';



function App() {
  return (
    <div className="App">
       <Navbar />
      <Hero />
      <Features />
           

      <main className="pt-16" >
      </main>
    </div>
  );
}

export default App;