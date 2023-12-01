import React from 'react'
import { Outlet } from 'react-router-dom'
import { Breadcrumb, Layout } from 'antd'
import { Sidebar } from './UI/Sidebar/Sidebar'
import { Content, Header } from 'antd/es/layout/layout'
import { Navigation } from './UI/Navigation/Navigation'
import { ButtonProvider } from './context/Button'

export const ProtectedRoutes: React.FC = () => {
  return (

    <Layout style={{ minHeight: '100vh', width: '100vw' }}>
      <Sidebar />
      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <ButtonProvider>
            <Navigation />
            <Outlet />
          </ButtonProvider>
        </Content>
      </Layout>
    </Layout>

  )
}
