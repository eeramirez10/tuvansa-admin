import React, { useState } from 'react'
import Sider from 'antd/es/layout/Sider'
import { Menu } from './Menu'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Switch } from 'antd'

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => { setCollapsed(value) }}

    >
      <Menu />

      <Switch
        checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />}
        defaultChecked
        onChange={(cheked) => { console.log(cheked) }}
      />
    </Sider>
  )
}
