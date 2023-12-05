import React, { useState } from 'react'
import Sider from 'antd/es/layout/Sider'
import { Menu } from './Menu'
import { SwitchTheme } from 'src/components/SwitchTheme'

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => { setCollapsed(value) }}
      style={{ position: 'relative' }}

    >
      <Menu />

      <SwitchTheme />

    </Sider>
  )
}
