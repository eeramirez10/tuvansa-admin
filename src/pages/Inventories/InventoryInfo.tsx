import React from 'react'
import { Alert, Button, Typography } from 'antd'
import { type User } from 'src/interfaces/Auth'
import { type Inventory } from 'src/interfaces/Inventory'
const { Title } = Typography

interface Props {
  user: User | Record<string, unknown>
  inventory: Inventory | null
  handleliberarInventario: () => Promise<void>
}

export const InventoryInfo: React.FC<Props> = ({ user, inventory, handleliberarInventario }) => {
  const paused = inventory?.paused

  return (
    <>

      {
        user.rol === 'admin'
          ? <Alert
            message={`${inventory?.paused === true ? 'Conteo pausado' : 'Libre'}`}
            type={`${inventory?.paused === true ? 'warning' : 'success'}`}
            action={
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              <Button size="small" type='primary' disabled={paused !== true} onClick={() => handleliberarInventario()}>
                Liberar
              </Button>
            }
          />

          : <Alert
            message={`${inventory?.paused === true ? 'Conteo pausado' : 'Libre'}`}
            type={`${inventory?.paused === true ? 'warning' : 'success'}`}
          />
      }

      <Title level={4}>{inventory?.description} </Title>
      <Title level={5}>{inventory?.cod} </Title>
      <Title level={5}>{inventory?.ean} </Title>

      {
        user.rol === 'admin' && <Title level={5}>Existencia en proscai: {inventory?.quantity} </Title>
      }

    </>

  )
}
