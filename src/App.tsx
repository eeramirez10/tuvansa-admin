import React, { useEffect } from 'react'

import { Routes, Route, Navigate } from 'react-router-dom'
import { Payments } from './pages/Payments/Payments'

import { NewPayment } from './pages/Payments/NewPayment'
import { PaymentEdit } from './pages/Payments/PaymentEdit'
import { Login } from './pages/Login/Login'
import { ProtectedRoutes } from './ProtectedRoutes'

import './App.css'
import { useAuth } from './hooks/useAuth'
import { Spin } from 'antd'

const App: React.FC = () => {
  const { status, checkAuthToken } = useAuth()

  useEffect(() => {
    checkAuthToken()
  }, [])

  return (
    <>
      <Spin spinning={status === 'checking'} fullscreen />
      <Routes>
        {

          status === 'authenticated' &&

          (
            <Route element={<ProtectedRoutes />}>
              <Route path='/payments' element={<Payments />} />
              <Route path='/payment/:id/edit' element={<PaymentEdit />} />
              <Route path='/payment/new' element={<NewPayment />} />
              <Route path='/new' element={<h1> New </h1>} />
              <Route path="/*" element={<Navigate to="/payments" />} />
            </Route>
          )
        }

        {
          status === 'notauthenticated' &&

          (
            <>
              <Route path='/login' element={<Login />} />
              <Route path="/*" element={<Navigate to="/login" />} />
            </>

          )
        }

        {/* <Route path='/payment/:id' element={<Detail />} >
    <Route path='edit' />
</Route> */}
      </Routes>

    </>
  )
}

export default App
