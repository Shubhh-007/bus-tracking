import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

function AdminLogin() {
  const navigate = useNavigate()
  const [loginData, setLoginData] = React.useState({
    role: '',
    username: '',
    password: ''
  })
  const [error, setError] = React.useState('')

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

  // Mock credentials (in real app, this would be handled by backend)
  const credentials = {
    conductor: {
      username: 'conductor',
      password: 'conductor123'
    },
    manager: {
      username: 'manager',
      password: 'manager123'
    }
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')

    if (!loginData.role || !loginData.username || !loginData.password) {
      setError('Please select a role and enter both username and password')
      return
    }

    const roleCredentials = credentials[loginData.role]
    if (loginData.username === roleCredentials.username && 
        loginData.password === roleCredentials.password) {
      // Store login state (in real app, this would be a JWT token)
      localStorage.setItem('adminRole', loginData.role)
      localStorage.setItem('isLoggedIn', 'true')
      
      // Navigate to appropriate panel
      if (loginData.role === 'conductor') {
        navigate('/admin/conductor')
      } else if (loginData.role === 'manager') {
        navigate('/admin/manager')
      }
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Bus-themed floating elements */}
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
        
        {/* Bus route lines */}
        <div className="absolute top-1/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-300 to-transparent opacity-30"></div>
        <div className="absolute top-3/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent opacity-30"></div>
        
        {/* Bus stop indicators */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-3 h-3 bg-green-500 rounded-full opacity-60"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          className="absolute top-1/4 right-1/4 w-3 h-3 bg-green-500 rounded-full opacity-60"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 2 }}
          className="absolute top-3/4 left-1/3 w-3 h-3 bg-blue-500 rounded-full opacity-60"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 3 }}
          className="absolute top-3/4 right-1/3 w-3 h-3 bg-blue-500 rounded-full opacity-60"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex items-center justify-center min-h-screen px-6"
      >
         <div className="max-w-lg w-full">
          {/* Enhanced Header */}
          <motion.div variants={itemVariants} className="text-center mb-6">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="inline-block mb-4 relative"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto shadow-lg relative overflow-hidden">
                <svg className="w-8 h-8 text-white z-10" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
                {/* Bus icon overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white opacity-30" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z" />
                  </svg>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full opacity-60"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-400 rounded-full opacity-60"></div>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="mb-4"
            >
              <motion.h1 
                variants={itemVariants}
                className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
              >
                Admin Login
              </motion.h1>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-8 h-0.5 bg-green-400 rounded"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="w-8 h-0.5 bg-blue-400 rounded"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="w-8 h-0.5 bg-purple-400 rounded"></div>
              </div>
            </motion.div>
            
            <motion.p 
              variants={itemVariants}
              className="text-base text-gray-600 flex items-center justify-center space-x-2"
            >
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Select your role and enter your credentials to continue</span>
            </motion.p>
          </motion.div>

          {/* Enhanced Login Form */}
          <motion.div 
            variants={itemVariants}
             className="bg-white rounded-2xl p-10 shadow-xl border border-gray-100 relative overflow-hidden"
          >
            {/* Form background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-4 left-4 w-8 h-8 border-2 border-green-400 rounded-full"></div>
              <div className="absolute top-4 right-4 w-6 h-6 border-2 border-blue-400 rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-4 h-4 border-2 border-purple-400 rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 border-2 border-orange-400 rounded-full"></div>
            </div>
            
            <div className="relative z-10">
               <form onSubmit={handleLogin} className="space-y-8">
              {/* Enhanced Role Selection Tabs */}
              <div className="relative">
                <div className="flex bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg p-1 shadow-inner">
                   <motion.button
                     type="button"
                     whileTap={{ scale: 0.98 }}
                     className={`flex-1 py-4 px-6 rounded-md font-medium transition-all duration-300 relative ${
                       loginData.role === 'conductor' 
                         ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg' 
                         : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                     }`}
                     onClick={() => setLoginData({...loginData, role: 'conductor'})}
                   >
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Conductor</span>
                    </div>
                  </motion.button>
                   <motion.button
                     type="button"
                     whileTap={{ scale: 0.98 }}
                     className={`flex-1 py-4 px-6 rounded-md font-medium transition-all duration-300 relative ${
                       loginData.role === 'manager' 
                         ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg' 
                         : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                     }`}
                     onClick={() => setLoginData({...loginData, role: 'manager'})}
                   >
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                      <span>Transport Manager</span>
                    </div>
                  </motion.button>
                </div>
              </div>

               {/* Enhanced Username Field */}
               <div className="relative">
                 <label className="block text-base font-medium text-gray-700 mb-3 flex items-center space-x-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span>Username</span>
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={loginData.username}
                    onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                    placeholder="Enter your username"
                     className="w-full px-5 py-5 pl-14 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300"
                    autoComplete="username"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

               {/* Enhanced Password Field */}
               <div className="relative">
                 <label className="block text-base font-medium text-gray-700 mb-3 flex items-center space-x-2">
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span>Password</span>
                </label>
                <div className="relative">
                  <input 
                    type="password" 
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    placeholder="Enter your password"
                     className="w-full px-5 py-5 pl-14 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                    autoComplete="current-password"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 rounded-lg p-4"
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-red-700 font-medium">{error}</span>
                  </div>
                </motion.div>
              )}

              {/* Enhanced Login Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                 className={`w-full py-5 px-8 rounded-xl font-semibold text-white transition-all duration-300 relative overflow-hidden ${
                  loginData.role === 'conductor' 
                    ? 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 shadow-lg' 
                    : loginData.role === 'manager'
                    ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
                disabled={!loginData.role}
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{loginData.role ? `Login as ${loginData.role.charAt(0).toUpperCase() + loginData.role.slice(1)}` : 'Select a role to continue'}</span>
                </div>
              </motion.button>
            </form>

            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminLogin