import { Card } from 'antd'
import React, { useEffect } from 'react'
import { UserForm } from './components/UserForm'
import { useAuth } from '../../hooks/useAuth'
import { type User } from '../../interfaces/Auth'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

export const EditUser: React.FC = () => {
  const { editUser, getUser, selectedUser, form, user } = useAuth()

  const params = useParams()

  useEffect(() => {
    if ((params?.id) != null) {
      getUser(params.id)
    }
  }, [])

  useEffect(() => {
    if (selectedUser != null) {
      form.setFieldsValue({ ...selectedUser })
    }
  }, [selectedUser])

  const hadleSubmit = async (values: User): Promise<void> => {
    console.log(values)

    if (user.id == null) return

    try {
      await editUser({ id: user.id, user: values })

      toast.success('Usuario actualizado')
    } catch (error) {
      toast.error('Hubo un error')
    }

    // if (user !== null) {
    //   form.resetFields()
    // }
  }
  return (
    <Card>

      <UserForm
        hadleSubmit={hadleSubmit}
        form={form} isUpdate={true} />

    </Card>
  )
}
