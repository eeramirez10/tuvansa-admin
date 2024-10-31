import React from 'react'
import {
  BarChartOutlined,
  BorderOutlined,
  // DesktopOutlined,
  PieChartOutlined,
  ReconciliationOutlined,
  UserOutlined,
  WalletOutlined,
  TruckOutlined,
  ShoppingOutlined

} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu as Me } from 'antd'
import { Link } from 'react-router-dom'
import { useAuth } from 'src/hooks/useAuth'
import { getPermission } from 'src/helpers/getPermissions'

export const ROLES = {
  ADMIN: 'admin'
} as const

export const PAGE_PERMISSION = {
  PAYMENTS: 'payments',
  COUNTS: 'counts',
  INVENTORIES: 'inventories',
  SALES: 'sales',
  COMPETITIONS: 'competitions',
  RECEPTIONS: 'receptions',
  SHIPMENTS: 'shipments',
  PURCHASES: 'purchases'
} as const

export type PermissionValues = typeof PAGE_PERMISSION[keyof typeof PAGE_PERMISSION]

export const Menu: React.FC = () => {
  const { startLogout, user } = useAuth()

  const items: MenuProps['items'] = [
    {
      label: 'Pagos',
      key: '1',
      icon: (<WalletOutlined />),
      disabled: !getPermission({ user, permission: 'payments' }),
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
      icon: (<ReconciliationOutlined />),
      disabled: !getPermission({ user, permission: 'inventories' }),
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
    {
      label: !getPermission({ user, permission: 'competitions' }) ? '' : (<Link to='/competitions'> Competencia </Link>),
      key: '33',
      icon: (<PieChartOutlined />),
      disabled: !getPermission({ user, permission: 'competitions' })
    },
    {
      label: !getPermission({ user, permission: 'sales' }) ? '' : (<Link to='/sales'> Ventas </Link>),
      key: '44',
      icon: (<BarChartOutlined />),
      disabled: !getPermission({ user, permission: 'sales' })
    },
    {
      label: !getPermission({ user, permission: 'receptions' }) ? '' : (<Link to='/receptions'> RECEPCIONES </Link>),
      key: '55',
      icon: (<BorderOutlined />),
      disabled: !getPermission({ user, permission: 'receptions' })
    },
    {
      label: !getPermission({ user, permission: 'shipments' }) ? '' : (<Link to='/shipments'> Embarques </Link>),
      key: '66',
      icon: (<TruckOutlined />),
      disabled: !getPermission({ user, permission: 'shipments' })
    },
    {
      label: !getPermission({ user, permission: 'purchases' }) ? '' : (<Link to='/purchase-orders'> Compras </Link>),
      key: '7',
      icon: (<ShoppingOutlined />),
      disabled: !getPermission({ user, permission: 'purchases' }),
      children: [
        {
          label: (<Link to='/purchase-orders'> Ordenes </Link>),
          key: '8'
        },
        {
          label: (<Link to='/doc-auth/orders'> Autorizaciones </Link>),
          key: '9'
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
          label: (<Link to="/user/new"> Nuevo </Link>),
          key: '2828'
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

    // <>
    // </>
    <Me
      defaultSelectedKeys={['1']}
      mode="inline"
      items={items}
    />
  )
}
