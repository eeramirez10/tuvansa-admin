import React from 'react'
import { Typography } from 'antd'
import { type User } from 'src/interfaces/Auth'
import { type Inventory } from 'src/interfaces/Inventory'
const { Title } = Typography

interface Props {
  user: User | Record<string, unknown>
  inventory: Inventory | null
}

export const InventoryInfo: React.FC<Props> = ({ user, inventory }) => {
  return (
    <>
      <Title level={4}>{inventory?.description} </Title>
      <Title level={5}>{inventory?.cod} </Title>
      <Title level={5}>{inventory?.ean} </Title>
      <Title level={5}> costo: {inventory?.costo} </Title>

      {
        user.rol === 'admin' && <Title level={5}>Existencia en proscai: {inventory?.quantity} </Title>
      }

    </>

  )
}
