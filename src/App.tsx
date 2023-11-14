import React from 'react'
import { Breadcrumb, Layout } from 'antd'
import { Sidebar } from './UI/Sidebar/Sidebar'
import { Content, Header } from 'antd/es/layout/layout'
import { Routes, Route } from 'react-router-dom'
import { Payments } from './pages/Payments/Payments'
import { Navigation } from './UI/Navigation/Navigation'
import { NewPayment } from './pages/Payments/NewPayment'
import { PaymentEdit } from './pages/Payments/PaymentEdit'
import { Login } from './pages/Login/Login'
import { ProtectedRoutes } from './ProtectedRoutes'

const App: React.FC = () => {
  // const [data, setData] = useState<DataType[]>()

  return (
    <>
      <Layout style={{ minHeight: '100vh', width: '100vw' }}>
        <Sidebar />
        <Layout>
          <Header style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <Navigation />
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

          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default App
