import React from 'react'
import { Container } from 'src/components/Container/Container'
import { useInventories } from 'src/hooks/useInventories'
import { Typography } from 'antd'

import { InventoryInfo } from './InventoryInfo'

const { Title } = Typography

export const InventoryDetail: React.FC = () => {
  const { isLoading } = useInventories()

  return (
    <Container>

      {
        isLoading
          ? <Title> Cargando ...</Title>
          : <InventoryInfo />
      }

    </Container>
  )
}
