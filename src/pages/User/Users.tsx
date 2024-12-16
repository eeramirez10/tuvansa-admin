import { Space, Typography } from 'antd'
import { type ColumnsType } from 'antd/es/table'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DataTable } from 'src/components/DataTable/DataTable'
import { type User } from 'src/interfaces/Auth'
import { getUsers } from 'src/services/user'
const { Title } = Typography

const columns: ColumnsType<User> = [
  {
    title: 'Nombre',
    dataIndex: 'name',

    render: (_, { name, id }) => <Link to={`/user/${id}/edit`} >{name}</Link>
  },
  {
    title: 'Apellido',
    dataIndex: 'last',

    render: (_, { last }) => last
  },
  {
    title: 'Usuario',
    dataIndex: 'username',

    render: (_, { username }) => username
  },

  {
    title: 'Sucursal',
    dataIndex: 'sucursal',
    render: (_, { branchOffice }) => branchOffice
  },
  {
    title: 'Genero',
    dataIndex: 'gender',
    render: (_, { gender }) => gender
  },
  {
    title: 'Rol',
    dataIndex: 'rol',
    render: (_, { rol }) => rol
  },
  {
    title: 'Permisos',
    dataIndex: 'pagePermission',
    render: (_, { pagePermission }) => pagePermission
  },
  {
    title: 'Auth Doc',
    dataIndex: 'documentsAuthorization',
    render: (_, { documentsAuthorization }) => documentsAuthorization
  }

]

export const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  console.log(users)
  useEffect(() => {
    getUsers()
      .then(([error, data]) => {
        setIsLoading(true)
        if (error != null) { console.log(error); return }
        if (data.users != null) { setUsers(data.users) }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <Space direction='vertical' style={{ width: '100%' }} >

      <Title level={3} >Usuarios</Title>
      <DataTable
        loading={isLoading}
        rowKey={(value) => value.id}
        columns={columns}
        data={users}

      />

    </Space>

  )
}
