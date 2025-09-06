import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function AdminHome() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  // Dashboard stats
  const stats = [
    { label: 'Active Buses', value: '18', icon: '🚌', color: 'green' },
    { label: 'Total Routes', value: '5', icon: '🛣️', color: 'blue' },
    { label: 'Daily Passengers', value: '2,847', icon: '👥', color: 'purple' },
    { label: 'On-Time Rate', value: '94%', icon: '⏰', color: 'orange' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '1s' }}
          className="absolute top-40 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-20"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
          className="absolute bottom-20 left-1/4 w-24 h-24 bg-purple-200 rounded-full opacity-20"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '3s' }}
          className="absolute bottom-40 right-1/3 w-12 h-12 bg-orange-200 rounded-full opacity-20"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        {/* Header Section */}
        <motion.section 
          variants={itemVariants}
          className="pt-16 pb-8 px-6"
        >
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
              </div>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6"
            >
              Admin Portal
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
            >
              Welcome to the comprehensive bus tracking management system. 
              Choose your role to access powerful administrative tools.
            </motion.p>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section 
          variants={itemVariants}
          className="px-6 mb-12"
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              variants={itemVariants}
              className="text-3xl font-bold text-gray-900 text-center mb-8"
            >
              System Overview
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 cursor-pointer`}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-3">{stat.icon}</div>
                    <div className={`text-3xl font-bold text-${stat.color}-600 mb-2`}>
                      {stat.value}
                    </div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Main Action Cards */}
        <motion.section 
          variants={itemVariants}
          className="px-6 pb-16"
        >
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              variants={itemVariants}
              className="text-3xl font-bold text-gray-900 text-center mb-12"
            >
              Access Control Panels
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Conductor Panel Card */}
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="group"
              >
                <Link to="/admin/conductor" className="block">
                  <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group-hover:border-green-200">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Conductor Panel</h3>
                        <p className="text-gray-600">Real-time bus management</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Seat management & ticketing</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Passenger verification</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Route tracking</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex items-center text-green-600 font-semibold group-hover:text-green-700">
                      <span>Access Panel</span>
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Transport Manager Card */}
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="group"
              >
                <Link to="/admin/manager" className="block">
                  <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group-hover:border-blue-200">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Transport Manager</h3>
                        <p className="text-gray-600">Fleet & route management</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Fleet management & analytics</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Route planning & optimization</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Performance monitoring</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                      <span>Access Dashboard</span>
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Quick Actions Footer */}
        <motion.section 
          variants={itemVariants}
          className="px-6 pb-8"
        >
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 text-center mb-6">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 bg-green-50 hover:bg-green-100 rounded-xl border border-green-200 transition-colors text-center"
                >
                  <div className="text-2xl mb-2">📊</div>
                  <div className="text-sm font-medium text-gray-700">Analytics</div>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 transition-colors text-center"
                >
                  <div className="text-2xl mb-2">🔔</div>
                  <div className="text-sm font-medium text-gray-700">Alerts</div>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 bg-purple-50 hover:bg-purple-100 rounded-xl border border-purple-200 transition-colors text-center"
                >
                  <div className="text-2xl mb-2">📋</div>
                  <div className="text-sm font-medium text-gray-700">Reports</div>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 bg-orange-50 hover:bg-orange-100 rounded-xl border border-orange-200 transition-colors text-center"
                >
                  <div className="text-2xl mb-2">⚙️</div>
                  <div className="text-sm font-medium text-gray-700">Settings</div>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  )
}

export default AdminHome
