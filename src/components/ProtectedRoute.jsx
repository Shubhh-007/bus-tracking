import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children, requiredRole }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  const userRole = localStorage.getItem('adminRole')

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

export default ProtectedRoute

