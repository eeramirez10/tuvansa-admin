import React from 'react'
import { Alert, Button, Typography } from 'antd'
import { useInventories } from 'src/hooks/useInventories'
import { FormInventory } from './components/FormInventory'
import { useAuth } from 'src/hooks/useAuth'
import moment from 'moment'
const { Title } = Typography

export const InventoryInfo: React.FC = () => {
  const { inventory, handleliberarInventario } = useInventories()
  const { user } = useAuth()

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

      <Title level={5}>Existencia en proscai: {inventory?.quantity} </Title>

      <ul>
        {
          inventory?.counts?.map(count => (
            <li key={count.id}>
              Conteo: {count.count}
              usuario: {count.user.name}
              fecha:{moment(count.createdAt).format('MM-DD-YYYY')}
            </li>
          ))
        }

      </ul>

      <FormInventory isPaused={paused} />
    </>

  )
}
