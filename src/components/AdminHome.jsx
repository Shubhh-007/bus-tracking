import React from 'react'
import { Link } from 'react-router-dom'

function AdminHome() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <section className="flex items-center justify-center min-h-[80vh] px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Admin Portal
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Select a panel to continue with your administrative tasks
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/admin/conductor" 
              className="px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition shadow-lg hover:shadow-xl"
            >
              Conductor Panel
            </Link>
            <Link 
              to="/admin/manager" 
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
            >
              Transport Manager
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AdminHome
