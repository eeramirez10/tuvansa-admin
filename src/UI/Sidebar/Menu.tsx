import React from 'react'
import {
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu as Me } from 'antd'
import { Link } from 'react-router-dom'

// const items: MenuItem[] = [
//   getItem((<Link to='/payments'> Pagos </Link>), '1', <PieChartOutlined />),
//   getItem('Option 2', '2', <DesktopOutlined />),
//   getItem('User', 'sub1', <UserOutlined />, [
//     getItem('Tom', '3'),
//     getItem('Bill', '4'),
//     getItem('Alex', '5')
//   ]),
//   getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '7')]),
//   getItem('Files', '9', <FileOutlined />)
// ]

const items: MenuProps['items'] = [
  {
    label: (<Link to='/payments'> Pagos </Link>),
    key: '1',
    icon: (<PieChartOutlined />)
  },
  {
    label: 'Option 2',
    key: '2',
    icon: (<DesktopOutlined />)
  },
  {
    label: 'user',
    key: 'sub1',
    icon: (<UserOutlined />),
    children: [
      {
        label: 'Configuracion',
        key: '3'
      },
      {
        label: 'Info',
        key: '4'
      },
      {
        label: 'Logout',
        key: '5'
      }
    ]
  }
]

export const Menu: React.FC = () => {
  return (
    <Me
      defaultSelectedKeys={['1']}
      mode="inline"
      items={items}
    />
  )
}
