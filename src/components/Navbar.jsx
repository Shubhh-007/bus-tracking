import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userRole = localStorage.getItem('adminRole');

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('adminRole');
    navigate('/admin/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-green-900 via-green-800 to-green-700 py-2 px-0">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-2 bg-white rounded-2xl shadow-lg">

        {/* Left: Logo */}
        <div className="flex items-center">
          <Link to="/" className="text-xl font-poppins font-bold text-green-700 select-none hover:text-green-800 transition">
            DigiMarg
          </Link>
        </div>

        {/* Center: Navigation links */}
        <nav className="flex items-center space-x-6 text-sm font-inter text-gray-800">
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
          ) : isLoggedIn ? (
            <>
              <Link 
                to="/admin/login" 
                className={`font-semibold px-3 py-2 rounded transition ${
                  location.pathname === '/admin/login' ? 'text-green-600 bg-green-50' : 'hover:text-green-600'
                }`}
              >
                Admin Login
              </Link>
              {userRole === 'conductor' && (
                <Link 
                  to="/admin/conductor" 
                  className={`font-semibold px-3 py-2 rounded transition ${
                    location.pathname === '/admin/conductor' ? 'text-green-600 bg-green-50' : 'hover:text-green-600'
                  }`}
                >
                  Conductor Panel
                </Link>
              )}
              {userRole === 'manager' && (
                <Link 
                  to="/admin/manager" 
                  className={`font-semibold px-3 py-2 rounded transition ${
                    location.pathname === '/admin/manager' ? 'text-green-600 bg-green-50' : 'hover:text-green-600'
                  }`}
                >
                  Transport Manager
                </Link>
              )}
            </>
          ) : (
            <Link 
              to="/admin/login" 
              className="font-semibold px-3 py-2 rounded transition hover:text-green-600"
            >
              Admin Login
            </Link>
          )}
        </nav>

        {/* Right: Log in and Sign up buttons */}
        <div className="flex items-center space-x-2">
          {!isAdminRoute ? (
            <>
              <button className="px-4 py-1.5 border border-green-600 text-green-700 font-semibold rounded-lg hover:bg-green-50 transition text-sm">
                Log in
              </button>
              <button className="px-4 py-1.5 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition text-sm">
                Sign up
              </button>
            </>
          ) : isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">
                {userRole === 'conductor' ? 'Conductor' : 'Manager'} Online
              </span>
              <button 
                onClick={handleLogout}
                className="px-3 py-1.5 text-red-600 font-semibold rounded-lg hover:bg-red-50 transition text-sm"
              >
                Logout
              </button>
              <Link 
                to="/" 
                className="px-3 py-1.5 text-green-700 font-semibold rounded-lg hover:bg-green-50 transition text-sm"
              >
                Public View
              </Link>
            </div>
          ) : (
            <Link 
              to="/admin/login" 
              className="px-4 py-1.5 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition text-sm"
            >
              Admin Login
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}
