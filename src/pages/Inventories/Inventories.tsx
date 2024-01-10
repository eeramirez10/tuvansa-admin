/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React, { useEffect } from 'react'

import { useInventories } from 'src/hooks/useInventories'
import { ListOfInventories } from './components/ListOfInventories'

export const Inventories: React.FC = () => {
  const { onLoadInventories } = useInventories()

  useEffect(() => {
    const abortController = new AbortController()
    onLoadInventories({ from: 'proscai', abortController })
    return () => abortController.abort()
  }, [])

  return (
    <ListOfInventories />
  )
}
