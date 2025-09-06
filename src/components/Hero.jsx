

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeftRight } from "lucide-react";
import { motion } from "framer-motion";
import { FaMedal } from "react-icons/fa";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";


const features = [
  {
    id: 1,
    title: "Real-Time Bus Tracking",
    desc: "Track buses in real-time with accurate live locations for a smooth travel experience.",
    img: "bus.jpg",
  },
  {
    id: 2,
    title: "Accurate Routes & Stops",
    desc: "Get precise route maps and nearby bus stop information to plan your journey better.",
    img: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  },
  {
    id: 3,
    title: "Live Updates & Alerts",
    desc: "Get instant notifications about delays, diversions, and real-time service updates.",
    img: "https://cdn-icons-png.flaticon.com/512/1827/1827370.png",
  },
];

export default function Hero() {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [busNumber, setBusNumber] = useState("");
  const navigate = useNavigate();

  const handleTrackBus = (e) => {
    e.preventDefault();
    if (busNumber.trim().length > 0) {
      navigate(`/details/${encodeURIComponent(busNumber.trim())}`);
    } else if (fromCity.trim().length > 0 && toCity.trim().length > 0) {
      navigate(
        `/details?from=${encodeURIComponent(fromCity.trim())}&to=${encodeURIComponent(toCity.trim())}`
      );
    } else {
      alert("Please enter either both cities or the bus number.");
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center px-6 md:px-16 py-16 min-h-[90vh] bg-gradient-to-l from-green-100 via-white to-green-100">
        {/* Left: Search Section */}
        <div className="md:w-1/2 flex flex-col items-start gap-8">
          <h1 className="font-poppins text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Track Your Bus in Real-Time
          </h1>
          <p className="font-inter text-lg text-gray-600 max-w-md">
            Enter your source & destination or directly search by bus number.
          </p>

          <form
            onSubmit={handleTrackBus}
            className="w-full bg-white/90 backdrop-blur-md px-6 py-6 rounded-2xl shadow-lg border border-gray-200 space-y-4"
          >
            {/* Row 1: From & To */}
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Source City"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                autoComplete="off"
              />

              <ArrowLeftRight className="w-6 h-6 text-green-600 self-center hidden md:block" />

              <input
                type="text"
                placeholder="Destination"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
                autoComplete="off"
              />
            </div>

            {/* Row 2: Bus Number */}
            <div className="flex flex-col">
              <span className="font-semibold text-gray-600 mb-2">OR</span>
              <input
                type="text"
                placeholder="Enter Bus Number (Eg. PB20AB0001)"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                value={busNumber}
                onChange={(e) => setBusNumber(e.target.value)}
                autoComplete="off"
              />
            </div>

            {/* Row 3: Button */}
            <button
              type="submit"
              className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            >
              Track Bus
            </button>
          </form>

          {/* Admin Access Link */}
          <div className="mt-6 text-center">
            <Link 
              to="/admin" 
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 hover:text-green-800 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
              </svg>
              Admin Panel Access
            </Link>
          </div>
        </div>

        {/* Right: Image */}
        <div className="md:w-1/2 flex justify-center items-center mt-12 md:mt-0">
          <img src="bus.png" alt="Bus Tracking" className="w-[420px] h-auto" />
        </div>
      </section>

      {/* Features Section */}
      <section
        className="py-20 bg-gradient-to-b from-green-50 to-white"
        id="features"
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-14 text-gray-900"
          >
            Our <span className="text-green-700">Features</span>
          </motion.h2>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="p-8 bg-white rounded-2xl shadow-md hover:shadow-2xl border border-green-100 transition-all duration-300 cursor-pointer group"
              >
                {/* Image */}
                <div className="flex justify-center mb-6">
                  <motion.img
                    src={feature.img}
                    alt={feature.title}
                    className="w-20 h-20 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 10 }}
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-green-700 group-hover:text-green-800 transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mt-3 text-base">{feature.desc}</p>

                {/* Bottom bar animation */}
                <div className="mt-6 h-1 w-0 group-hover:w-full bg-green-500 transition-all duration-500 rounded-full"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


  {/* CRI Section */}
<section className="py-20 px-6 bg-gradient-to-b from-green-50 via-white to-green-100">
  <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-12 space-y-16">
    
    {/* CRI Definition */}
    <div className="text-center max-w-3xl mx-auto">
      <h2 className="text-4xl font-extrabold text-green-900 mb-6">
        CRI (Carbon Reduction Initiative)
      </h2>
      <p className="text-lg leading-relaxed text-gray-700">
        The <span className="font-bold text-green-800">Carbon Reduction Initiative</span> rewards 
        eco-friendly actions by giving you <span className="text-green-700 font-semibold">Green Points</span> 
        for reducing carbon emissions. These points can be redeemed for exciting coupons, discounts, and 
        exclusive offers — all while helping create a <span className="text-green-900 font-semibold">
        greener, healthier, pollution-free future 🌍</span>.
      </p>
    </div>

    {/* Leaderboard */}
    <div className="max-w-3xl mx-auto">
      <h3 className="flex items-center justify-center text-2xl font-bold text-green-800 mb-8">
        <FaMedal className="mr-3 text-yellow-400" />
        Top Eco Warriors
      </h3>
      <ol className="space-y-4">
        <li className="flex justify-between items-center bg-gradient-to-r from-green-100 to-green-50 rounded-xl px-6 py-4 shadow-md hover:shadow-lg transition">
          <span className="font-semibold text-green-900">🥇 Prakhar</span>
          <span className="text-green-700 font-bold">500 pts</span>
        </li>
        <li className="flex justify-between items-center bg-gradient-to-r from-green-100 to-green-50 rounded-xl px-6 py-4 shadow-md hover:shadow-lg transition">
          <span className="font-semibold text-green-900">🥈 Shubh</span>
          <span className="text-green-700 font-bold">200 pts</span>
        </li>
        <li className="flex justify-between items-center bg-gradient-to-r from-green-100 to-green-50 rounded-xl px-6 py-4 shadow-md hover:shadow-lg transition">
          <span className="font-semibold text-green-900">🥉 You?</span>
          <a 
            href="#calculate" 
            className="text-green-600 font-bold hover:underline"
          >
            Join Now →
          </a>
        </li>
      </ol>
    </div>

    {/* Call to Action */}
    <div className="flex flex-col justify-center items-center text-center" id="calculate">
      <button
        className="px-10 py-6 bg-gradient-to-r from-green-600 to-green-700 text-white text-xl font-bold rounded-3xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300"
        aria-label="Calculate your CRI"
      >
        🌱 Calculate Your CRI
      </button>
      <p className="mt-6 text-green-800 font-medium">
        Take your first step towards a cleaner tomorrow
      </p>
    </div>

  </div>
</section>


{/* Contact Section */}
<section className="py-20 px-6 bg-gradient-to-br from-green-50 via-white to-green-100">
  <div className="max-w-2xl mx-auto text-gray-700">
    {/* Title */}
    <h2 className="text-4xl font-extrabold text-green-900 mb-12 text-center">
      Get in Touch
    </h2>

    {/* Contact Card */}
    <div className="bg-white shadow-2xl rounded-2xl p-10 border border-green-100">
      <form className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-green-800 mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            required
            className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-green-800 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-green-800 mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            rows="5"
            required
            className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Write your message here..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-green-700 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-green-800 transition duration-300"
        >
          Send Message
        </button>
      </form>

      {/* Helplines (as footer inside card) */}
      <div className="mt-10 pt-6 border-t border-green-200 text-center">
        <h3 className="text-lg font-bold text-green-800 mb-4">Emergency Helplines</h3>
        <ul className="flex flex-wrap justify-center gap-6 text-green-700 text-base">
          <li>
            <span className="font-semibold">Police:</span>{" "}
            <a href="tel:100" className="hover:underline">100</a>
          </li>
          <li>
            <span className="font-semibold">Children Helpline:</span>{" "}
            <a href="tel:1098" className="hover:underline">1098</a>
          </li>
          <li>
            <span className="font-semibold">Ambulance:</span>{" "}
            <a href="tel:102" className="hover:underline">102</a>
          </li>
          <li>
            <span className="font-semibold">Fire:</span>{" "}
            <a href="tel:101" className="hover:underline">101</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>








 
      
<section className="bg-green-100 py-12 border-t border-green-200">
  <div className="max-w-7xl mx-auto px-6 md:px-12">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-gray-700">
      
      {/* Quick Links */}
      <div>
        <h4 className="text-xl font-bold text-green-900 mb-5">Quick Links</h4>
        <ul className="space-y-3 text-base">
          <li><a href="#home" className="hover:text-green-900 text-green-700 transition">Home</a></li>
          <li><a href="#about" className="hover:text-green-900 text-green-700 transition">About Us</a></li>
          <li><a href="#services" className="hover:text-green-900 text-green-700 transition">Services</a></li>
          <li><a href="#contact" className="hover:text-green-900 text-green-700 transition">Contact</a></li>
        </ul>
      </div>

      {/* Contact Info */}
      <div>
        <h4 className="text-xl font-bold text-green-900 mb-5">Contact Us</h4>
        <ul className="space-y-2 text-base">
          <li>
            Email:{" "}
            <a href="mailto:support@digimarg.com" className="text-green-700 hover:text-green-900 transition">
              support@digimarg.com
            </a>
          </li>
          <li>
            Phone:{" "}
            <a href="tel:+919899899898" className="text-green-700 hover:text-green-900 transition">
              +91 98989 89898
            </a>
          </li>
        </ul>
      </div>

      {/* Social Links */}
      <div>
        <h4 className="text-xl font-bold text-green-900 mb-5">Follow Us</h4>
        <div className="flex space-x-6 text-green-700">
          <a href="#" className="hover:text-green-900 transition" aria-label="Facebook">
            <FaFacebookF size={20} />
          </a>
          <a href="#" className="hover:text-green-900 transition" aria-label="Twitter">
            <FaTwitter size={20} />
          </a>
          <a href="#" className="hover:text-green-900 transition" aria-label="LinkedIn">
            <FaLinkedinIn size={20} />
          </a>
          <a href="#" className="hover:text-green-900 transition" aria-label="Instagram">
            <FaInstagram size={20} />
          </a>
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="mt-10 text-center text-sm text-gray-500 border-t border-green-200 pt-6">
      &copy; {new Date().getFullYear()} DigiMarg. All rights reserved.
    </div>
  </div>
</section>


    </>
  );
}