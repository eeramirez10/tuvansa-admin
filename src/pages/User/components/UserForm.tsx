import { Button, Col, Form, type FormInstance, Input, Row, Select, Space } from 'antd'
import React from 'react'
import { PAGE_PERMISSION } from 'src/UI/Sidebar/Menu'
import { type User } from 'src/interfaces/Auth'

interface FieldType {
  username?: string
  name: string
  last: string
  branchOffice: string
  rol: string
  gender: string
  pagePermission: string[]
  password?: string
  remember?: string
}

type SelectOptions = Array<{ value: string, label: string }>

const branchOfficeOptions: SelectOptions = [
  { value: 'Mexico', label: 'Mexico' },
  { value: 'Monterrey', label: 'Monterrey' },
  { value: 'Veracruz', label: 'Veracruz' },
  { value: 'Mexicali', label: 'Mexicali' },
  { value: 'Queretaro', label: 'Queretaro' },
  { value: 'Cancun', label: 'Cancun' }

]

const genderOptions: SelectOptions = [
  { value: 'male', label: 'Masculino' },
  { value: 'female', label: 'Femenino' }
]

const rolOptions: SelectOptions = [
  { value: 'user', label: 'User' },
  { value: 'admin', label: 'Admin' }
]

const permissionsOptions = Object.entries(PAGE_PERMISSION).map(([row, value]) => {
  return {
    value,
    label: row,
    desc: row
  }
})

interface Props {
  hadleSubmit: (values: User) => Promise<void>
  form: FormInstance<any>
}

export const UserForm: React.FC<Props> = ({ hadleSubmit, form }) => {
  return (
    <Form
      name='user'
      layout='vertical'
      onFinish={hadleSubmit}
      form={form}
    >

      <Row gutter={56}>
        <Col >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: 'El usuario es obligatorio' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Nombre"
            name="name"
            rules={[{ required: true, message: 'El nombre es requerido' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Apellido"
            name="last"
            rules={[{ required: true, message: 'El apellido es requerido' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Sucursal"
            name="branchOffice"
            rules={[{ required: true, message: 'La Sucursal es requerida' }]}
          >
            <Select

              options={branchOfficeOptions}
            />

          </Form.Item>

        </Col>
        <Col>

          <Form.Item<FieldType>
            label="Genero"
            name="gender"
            rules={[{ required: true, message: 'El genero es requerido' }]}
          >
            <Select
              options={genderOptions}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="Rol"
            name="rol"
            rules={[{ required: true, message: 'El rol es requerido' }]}
          >
            <Select
              options={rolOptions}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="Permisos"
            name="pagePermission"
            rules={[{ required: true, message: 'Los permisos son requeridos' }]}
          >
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Selecciona los permisos"
              options={permissionsOptions}
              optionRender={(option) => (
                <Space>
                  <span role="img" aria-label={option.data.label}>
                    {option.data.emoji}
                  </span>
                  {option.data.desc}
                </Space>
              )}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: 'El password es reuqerido' }]}
          >
            <Input.Password />
          </Form.Item>

        </Col>

      </Row>

      <Form.Item >
        <Button type="primary" htmlType='submit'>Submit</Button>
      </Form.Item>

    </Form>
  )
}
