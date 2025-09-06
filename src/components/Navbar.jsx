import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-gradient-to-r from-green-900 via-green-800 to-green-700 py-4 px-0">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3 bg-white rounded-2xl shadow-lg">

        {/* Left: Logo */}
        <div className="flex items-center">
          <span className="text-2xl font-bold text-green-700 select-none">
            Admin Panel
          </span>
        </div>

        {/* Center: Navigation links */}
        <nav className="flex items-center space-x-8 text-base text-gray-800">
          <Link to="/" className="font-semibold px-3 py-2 rounded transition hover:text-green-600">Home</Link>
          <Link to="/conductor" className="font-semibold px-3 py-2 rounded transition hover:text-green-600">Conductor</Link>
          <Link to="/manager" className="font-semibold px-3 py-2 rounded transition hover:text-green-600">Transport Manager</Link>
        </nav>

        {/* Right: Status indicator */}
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Online</span>
        </div>

      </div>
    </header>
  );
}

