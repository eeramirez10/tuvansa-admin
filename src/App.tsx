import React from 'react'

import { Routes, Route } from 'react-router-dom'
import { Payments } from './pages/Payments/Payments'

import { NewPayment } from './pages/Payments/NewPayment'
import { PaymentEdit } from './pages/Payments/PaymentEdit'
import { Login } from './pages/Login/Login'
import { ProtectedRoutes } from './ProtectedRoutes'

import './App.css'

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path='/payments' element={<Payments />} />
          <Route path='/payment/:id/edit' element={<PaymentEdit />} />
          <Route path='/payment/new' element={<NewPayment />} />
          <Route path='/new' element={<h1> New </h1>} />
        </Route>
        <Route path='/login' element={<Login />} />

        {/* <Route path='/payment/:id' element={<Detail />} >
    <Route path='edit' />
</Route> */}
      </Routes>

    </>
  )
}

export default App
