import React from 'react'
import {
  // DesktopOutlined,
  PieChartOutlined,
  UserOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu as Me } from 'antd'
import { Link } from 'react-router-dom'
import { useAuth } from 'src/hooks/useAuth'

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

export const Menu: React.FC = () => {
  const { startLogout } = useAuth()

  const items: MenuProps['items'] = [
    {
      label: 'Pagos',
      key: '1',
      icon: (<PieChartOutlined />),
      children: [
        {
          label: (<Link to='/doctos'> Doctos </Link>),
          key: '11'
        },
        {
          label: (<Link to='/payments'> Pagos </Link>),
          key: '12'
        }
      ]
    },
    {
      label: 'Almacen',
      key: '2',
      icon: (<PieChartOutlined />),
      children: [
        {
          label: (<Link to='/inventories'> Inventarios </Link>),
          key: '21'
        },
        {
          label: (<Link to='/counts'> Conteos </Link>),
          key: '22'
        }
      ]
    },
    // {
    //   label: 'Option 2',
    //   key: '2',
    //   icon: (<DesktopOutlined />)
    // },
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
          label: (<Link to="/user/1/info"> Info </Link>),
          key: '4'
        },
        {
          label: 'Logout',
          onClick: () => { startLogout() },
          key: '5'
        }
      ]
    }
  ]

  return (
    <Me
      defaultSelectedKeys={['1']}
      mode="inline"
      items={items}
    />
  )
}
