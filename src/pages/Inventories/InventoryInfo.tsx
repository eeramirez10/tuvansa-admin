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

      {
        user.rol === 'admin' && <Title level={5}>Existencia en proscai: {inventory?.quantity} </Title>
      }

      

      <ul>
        {
          inventory?.counts?.map((count, i) => (
            <li key={count.id} style={{minWidth:'50%', display:'flex', justifyContent:'flex-start', gap: 20}}>
              <span>{ i + 1 }</span>
              <span>Conteo: {count.count}</span>
              <span>  usuario: {count.user.name}</span>
              <span> fecha: {moment(count.createdAt).format('MM-DD-YYYY')} </span>
             
            </li>
          ))
        }

      </ul>

      <FormInventory isPaused={paused} />
    </>

  )
}
