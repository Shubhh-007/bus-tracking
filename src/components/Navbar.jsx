import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-green-900 via-green-800 to-green-700 py-4 px-0">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3 bg-white rounded-2xl shadow-lg">

        {/* Left: Logo */}
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-poppins font-bold text-green-700 select-none hover:text-green-800 transition">
            DigiMarg
          </Link>
        </div>

        {/* Center: Navigation links */}
        <nav className="flex items-center space-x-8 text-base font-inter text-gray-800">
          {!isAdminRoute ? (
            <>
              <a
                href="#home"
                className="font-semibold px-3 py-2 rounded transition hover:text-green-600"
              >
                Home
              </a>
              <a
                href="#features"
                className="font-semibold px-3 py-2 rounded transition hover:text-green-600"
              >
                Features
              </a>
              <a
                href="#co2"
                className="font-semibold px-3 py-2 rounded transition hover:text-green-600"
              >
                CRI
              </a>
              <a
                href="#contact"
                className="font-semibold px-3 py-2 rounded transition hover:text-green-600"
              >
                Contact
              </a>
            </>
          ) : (
            <>
              <Link 
                to="/admin" 
                className={`font-semibold px-3 py-2 rounded transition ${
                  location.pathname === '/admin' ? 'text-green-600 bg-green-50' : 'hover:text-green-600'
                }`}
              >
                Admin Home
              </Link>
              <Link 
                to="/admin/conductor" 
                className={`font-semibold px-3 py-2 rounded transition ${
                  location.pathname === '/admin/conductor' ? 'text-green-600 bg-green-50' : 'hover:text-green-600'
                }`}
              >
                Conductor
              </Link>
              <Link 
                to="/admin/manager" 
                className={`font-semibold px-3 py-2 rounded transition ${
                  location.pathname === '/admin/manager' ? 'text-green-600 bg-green-50' : 'hover:text-green-600'
                }`}
              >
                Transport Manager
              </Link>
            </>
          )}
        </nav>

        {/* Right: Log in and Sign up buttons */}
        <div className="flex items-center space-x-2">
          {!isAdminRoute ? (
            <>
              <button className="px-6 py-2 border border-green-600 text-green-700 font-semibold rounded-lg hover:bg-green-50 transition">
                Log in
              </button>
              <button className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition">
                Sign up
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Admin Online</span>
              <Link 
                to="/" 
                className="px-4 py-2 text-green-700 font-semibold rounded-lg hover:bg-green-50 transition"
              >
                Public View
              </Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
