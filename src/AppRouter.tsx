import React, { useEffect } from 'react'

import { Routes, Route, Navigate } from 'react-router-dom'
// import { Payments } from './pages/Payments/Payments'

import './App.css'
import { NewPayment } from './pages/Payments/NewPayment'
import { PaymentEdit } from './pages/Payments/PaymentEdit'
import { Login } from './pages/Login/Login'
import { ProtectedRoutes } from './ProtectedRoutes'
import { useAuth } from './hooks/useAuth'
import { Spin } from 'antd'
import { UserInfo } from './pages/User/UserInfo'
import { Inventories } from './pages/Inventories/Inventories'
import { InventoryDetail } from './pages/Inventories/InventoryDetail/InventoryDetail'
import { Counts } from './pages/Counts/Counts'
import { InventoryShelter } from './pages/Inventories/InventoryShelter/InventoryShelter'
import { Payments } from './pages/Payments/Payments'
import { PaymentDetail } from './pages/Payments/PaymentDetail'
import { Doctos } from './pages/Doctos/Doctos'
import { DoctoDetail } from './pages/Doctos/DoctoDetail'
import { Competitions } from './pages/Competitions/Competitions'
import { NewCategory } from './pages/Payments/NewCategory'
import { Categories } from './pages/Payments/Categories'
import { Sales } from './pages/Sales/Sales'
import { CategoryEdit } from './pages/Categories/CategoryEdit'
import { Receptions } from './pages/Receptions/Receptions'
import { Shipments } from './pages/Shipments/Shipments'
import { SalesShipments } from './pages/SalesShipments/SalesShipments'
import { Users } from './pages/User/Users'
import { EditUser } from './pages/User/EditUser'
import RemissionDocAuth from './pages/DocumentAuthorization/Remissions/Index'
import Authorize from './pages/DocumentAuthorization/Authorize/Index'
import { UploadRemision } from './pages/Remissions/UploadRemision'
import Remissions from './pages/Remissions/Index'
import { NewUser } from './pages/User/NewUser'

import PurchaseOrders from 'src/pages/Purchases/PurchaseOrders/Index'
import { UploadFile } from './pages/Purchases/PurchaseOrders/UploadFile'
import { Orders } from './pages/Purchases/DocumentAuthorization/Orders'

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
              <Route path='/doctos' element={<Doctos />} />
              <Route path='/docto/:id/detail' element={<DoctoDetail />} />
              <Route path='/inventories' element={<Inventories />} />
              <Route path='/inventario/detail/:id' element={<InventoryDetail />} />
              <Route path='/counts' element={<Counts />} />
              <Route path="/inventories/shelter/detail/:id" element={<InventoryShelter />} />

              <Route path='/payments' element={<Payments />} />
              <Route path='/payment/:id/edit' element={<PaymentEdit />} />
              <Route path='/payment/:id/detail' element={<PaymentDetail />} />
              <Route path='/payments/new' element={<NewPayment />} />
              <Route path='/new' element={<h1> New </h1>} />
              <Route path='/payments/categories' element={<Categories />} />

              <Route path='/payments/categories/new' element={<NewCategory />} />
              <Route path='/payments/categories/:id/edit' element={<CategoryEdit />} />

              <Route path="/user/:id/info" element={<UserInfo />} />

              <Route path="/user/new" element={<NewUser />} />
              <Route path="/user/users" element={<Users />} />
              <Route path="/user/:id/edit" element={<EditUser />} />

              <Route path='/competitions' element={<Competitions />} />

              <Route path='/receptions' element={<Receptions />} />

              <Route path='/sales' element={<Sales />} />

              <Route path='/shipments' element={<Shipments />} />
              <Route path='/sales-shipments' element={<SalesShipments />} />

              <Route path='/doc-auth/remissions' element={<RemissionDocAuth />} />
              <Route path='/doc-auth/remissions/:id/authorize/:docId/:docModel' element={<Authorize />} />
              {/* <Route path='/doc-auth/remissions/:id/upload' element={<UploadRemision />} /> */}

              <Route path='/remissions' element={<Remissions />} />
              <Route path='/remissions/:id/upload' element={<UploadRemision />} />

              <Route path='/purchase-orders' element={<PurchaseOrders />} />
              <Route path='/doc-auth/orders' element={<Orders />} />
              <Route path='/doc-auth/orders/:id/authorize/:docId/:docModel' element={<Authorize />} />

              <Route path='/purchase-orders/:id/upload' element={<UploadFile />} />

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
