import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useInventories } from 'src/hooks/useInventories'
import { Container } from 'src/components/Container/Container'
import { InventoryInfo } from '../InventoryInfo'
import { useAuth } from 'src/hooks/useAuth'

export const InventoryShelter: React.FC = () => {
  const { id } = useParams()
  const { getShelterByAlmseq, inventory } = useInventories()
  const { user } = useAuth()

  useEffect(() => {
    if (id !== undefined) {
      getShelterByAlmseq({ id })
    }
  }, [])
  return (
    <Container>
      <InventoryInfo
        user={user}
        inventory={inventory}
      />
    </Container>
  )
}
