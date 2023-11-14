import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoutes: React.FC = () => {
  const auth = true
  return (
    auth ? <Outlet /> : <Navigate to='/login' />
  )
}
