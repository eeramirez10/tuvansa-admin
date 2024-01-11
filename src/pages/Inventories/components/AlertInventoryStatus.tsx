/* eslint-disable @typescript-eslint/no-misused-promises */
import { Alert, Button } from 'antd'
import React from 'react'
import { type User } from 'src/interfaces/Auth'
import { type Inventory } from 'src/interfaces/Inventory'
interface Props {
  user: User | Record<string, unknown>
  inventory: Inventory | null
  handleliberarInventario: () => Promise<void>
}

export const AlertInventoryStatus: React.FC<Props> = ({ user, inventory, handleliberarInventario }) => {
  const paused = inventory?.paused

  return (
    <>
      <Alert
        message={`${inventory?.paused === true ? 'Conteo pausado' : 'Libre'}`}
        type={`${inventory?.paused === true ? 'warning' : 'success'}`}
        action={
          user.rol === 'admin' &&
          <Button size="small" type='primary' disabled={paused !== true} onClick={() => handleliberarInventario()}>
            Liberar
          </Button>
        }
      />
    </>
  )
}
