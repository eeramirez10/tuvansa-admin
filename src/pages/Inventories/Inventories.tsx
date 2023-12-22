import React, { useEffect } from 'react'

import { useInventories } from 'src/hooks/useInventories'
import { ListOfInventories } from './components/ListOfInventories'

export const Inventories: React.FC = () => {
  const { onLoadInventories } = useInventories()

  useEffect(() => {
    onLoadInventories({ from: 'proscai' })
  }, [])

  return (
    <ListOfInventories />
  )
}
