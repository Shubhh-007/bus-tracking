import React from "react";
import { motion } from "framer-motion";

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

export default function Features() {
  return (
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
              <p className="text-gray-600 mt-3 text-base">
                {feature.desc}
              </p>

              {/* Bottom bar animation */}
              <div className="mt-6 h-1 w-0 group-hover:w-full bg-green-500 transition-all duration-500 rounded-full"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
