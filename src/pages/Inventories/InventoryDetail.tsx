import React from 'react'
import { Container } from 'src/components/Container/Container'
import { useInventories } from 'src/hooks/useInventories'
import { Typography } from 'antd'

import { InventoryInfo } from './InventoryInfo'
import { useAuth } from 'src/hooks/useAuth'
import { CountList } from './components/CountList'
import { FormInventory } from './components/FormInventory'

const { Title } = Typography

export const InventoryDetail: React.FC = () => {
  const { inventory, handleliberarInventario, isLoading } = useInventories()
  const { user } = useAuth()

  const paused = inventory?.paused

  return (
    <Container>

      {
        isLoading
          ? <Title> Cargando ...</Title>
          : <>
            <InventoryInfo
              user={user}
              inventory={inventory}
              handleliberarInventario={handleliberarInventario}
            />

            {
              inventory !== null &&

              <CountList
              inventory={inventory}
            />

            }

            <FormInventory isPaused={paused} />

          </>
      }

    </Container>
  )
}
