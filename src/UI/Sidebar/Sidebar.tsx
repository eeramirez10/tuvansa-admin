import React, { useState } from 'react'
import Sider from 'antd/es/layout/Sider'
import { Menu } from './Menu'

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true)

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => { setCollapsed(value) }}
      style={{ position: 'relative' }}
      className='hide-sidebar'

    >
      <Menu />

    </Sider>
  )
}
