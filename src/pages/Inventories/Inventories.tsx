/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React from 'react'
import { ListOfInventories } from './components/ListOfInventories'

export const Inventories: React.FC = () => {
  // const { onLoadInventories } = useInventories()

  // useEffect(() => {
  //   const abortController = new AbortController()
  //   onLoadInventories({ from: 'proscai', abortController, size: '1' })
  //   return () => abortController.abort()
  // }, [])

  return (
    <ListOfInventories />
  )
}
