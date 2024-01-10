import { Card } from 'antd'
import React from 'react'

interface Props {
  children: string | JSX.Element | JSX.Element[]
}

export const Container: React.FC<Props> = ({ children }) => {
  return (
    <Card style={{ width: '100%' }}>
      {children}
    </Card>
  )
}
