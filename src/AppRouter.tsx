import React, { useEffect } from 'react'

import { Routes, Route, Navigate } from 'react-router-dom'
// import { Payments } from './pages/Payments/Payments'

import { NewPayment } from './pages/Payments/NewPayment'
import { PaymentEdit } from './pages/Payments/PaymentEdit'
import { Login } from './pages/Login/Login'
import { ProtectedRoutes } from './ProtectedRoutes'
import './App.css'
import { useAuth } from './hooks/useAuth'
import { Spin } from 'antd'
import { UserInfo } from './pages/User/UserInfo'
import { Inventories } from './pages/Inventories/Inventories'
import { InventoryDetail } from './pages/Inventories/InventoryDetail/InventoryDetail'
import { Counts } from './pages/Counts/Counts'
import { InventoryShelter } from './pages/Inventories/InventoryShelter/InventoryShelter'

export const AppRouter: React.FC = () => {
  const { status, checkAuthToken, urlRedirect } = useAuth()

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
              <Route path='/inventories' element={<Inventories />} />
              <Route path='/inventario/detail/:id' element={<InventoryDetail />} />
              <Route path='/counts' element={<Counts />} />
              <Route path="/inventories/shelter/detail/:id" element={<InventoryShelter />} />

              {/* <Route path='/payments' element={<Payments />} /> */}
              <Route path='/payment/:id/edit' element={<PaymentEdit />} />
              <Route path='/payment/new' element={<NewPayment />} />
              <Route path='/new' element={<h1> New </h1>} />
              <Route path="/user/:id/info" element={<UserInfo />} />

              <Route path="/*" element={<Navigate to={urlRedirect ?? '/payments'} />} />

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
      </Routes>

    </>
  )
}
