import React from 'react'
import { useParams } from 'react-router-dom'

export const Detail: React.FC = () => {
  const { id } = useParams()
  return (
    <>
      <div>Detail</div>
      {id}

    </>
  )
}
