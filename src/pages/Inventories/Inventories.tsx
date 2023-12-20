import React, { useEffect } from 'react'

import { ListOfInventories } from './components/ListOfInventories'
import { useInventories } from 'src/hooks/useInventories'

export const Inventories: React.FC = () => {
  const { onLoadInventories } = useInventories()

  useEffect(() => {
    onLoadInventories({from: 'proscai'})
  }, [])

  return (
    <ListOfInventories />
  )
}
