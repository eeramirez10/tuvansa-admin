import React from 'react'
import { Button, Form, type FormInstance, Input } from 'antd'

interface Props {
  // onSubmit: ({ value, from, almacen }: { value: { search: string }, from: string, almacen: string }) => Promise<void>
  form: FormInstance<any>
  handleSearch: ({ search }: { search: string }) => void
  placeholder?: string
}

export const InputSearch: React.FC<Props> = ({ form, handleSearch, placeholder = 'Escribe algo' }) => {
  return (
    <Form
      form={form}
      layout="inline"
      onFinish={({ search }) => {
        handleSearch({ search })
      }}
      style={{ width: '100%' }}
      autoComplete="off"
    >
      <Form.Item
        name="search"
        rules={[{ required: true }]}
        style={{ minWidth: '50%' }}
      >
        <Input placeholder={placeholder} />
      </Form.Item>
      <Form.Item>

        <Button type="primary" htmlType="submit">
          Buscar
        </Button>

      </Form.Item>
    </Form>
  )
}
