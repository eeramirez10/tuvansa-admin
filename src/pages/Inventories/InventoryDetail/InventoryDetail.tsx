import React, { useEffect } from 'react'
import { Container } from 'src/components/Container/Container'
import { useInventories } from 'src/hooks/useInventories'

import { InventoryInfo } from '../InventoryInfo'
import { useAuth } from 'src/hooks/useAuth'
import { CountList } from '../components/CountList'
import { FormInventory } from '../components/FormInventory'
import { useParams } from 'react-router-dom'
import { AlertInventoryStatus } from '../components/AlertInventoryStatus'

export const InventoryDetail: React.FC = () => {
  const { inventory, handleliberarInventario, isLoading, getInventory } = useInventories()
  const { id } = useParams()
  const { user } = useAuth()

  const paused = inventory?.paused

  useEffect(() => {
    if (id !== undefined) {
      getInventory({ id })
    }
  }, [])

  return (
    <Container>
      <>
        <AlertInventoryStatus
          user={user}
          inventory={inventory}
          handleliberarInventario={handleliberarInventario}
        />

        <InventoryInfo
          user={user}
          inventory={inventory}
        />

        <CountList
          inventory={inventory}
          isLoading={isLoading}
        />

        <FormInventory isPaused={paused ?? false} isLoading={isLoading} />

      </>

    </Container>
  )
}
