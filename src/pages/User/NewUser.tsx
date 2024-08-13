import { Card } from 'antd'
import React from 'react'

import { useAuth } from 'src/hooks/useAuth'
import { type User } from 'src/interfaces/Auth'
import { UserForm } from './components/UserForm'

export const NewUser: React.FC = () => {
  const { userRegister, form } = useAuth()

  const hadleSubmit = async (values: User): Promise<void> => {
    const [, user] = await userRegister(values)
    if (user !== null) {
      form.resetFields()
    }
  }

  return (

    <Card style={{ width: '100%' }} >
      <UserForm
        hadleSubmit={hadleSubmit}
        form={form}
      />

    </Card>

  )
}
