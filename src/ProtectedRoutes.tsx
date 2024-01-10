import React from 'react'
import { Outlet } from 'react-router-dom'
import { Breadcrumb, Layout, Typography } from 'antd'
import { Sidebar } from './UI/Sidebar/Sidebar'
import { Content, Header } from 'antd/es/layout/layout'
import { Navigation } from './UI/Navigation/Navigation'
import { ButtonProvider } from './context/Button'
import { getEnvVariables } from './helpers/getEnvVariables'
import { SwitchTheme } from './components/SwitchTheme'

const { Title } = Typography

const { PROD } = getEnvVariables()

export const ProtectedRoutes: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh', width: '100vw' }}>
      <Sidebar />
      <Layout>
        <Header style={{ display: 'flex', justifyContent: !PROD ? 'space-between' : 'flex-end', alignItems: 'center' }}>
          {!PROD && <Title level={2} style={{ color: 'rgba(255, 255, 255, 0.85)' }} >Pruebas</Title>}
          <SwitchTheme />
        </Header>
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
