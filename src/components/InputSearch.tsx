import React from 'react'
import { Button, Form, type FormInstance, Input, Space } from 'antd'

interface Props {
  onSubmit: (values: { search: string }) => void
  form: FormInstance<any>
}

export const InputSearch: React.FC<Props> = ({ onSubmit, form }) => {
  return (
    <Form
      form={form}
      layout="inline"
      onFinish={onSubmit}
      style={{ width: '100%' }}
      autoComplete="off"
    >
      <Form.Item
        name="search"
        rules={[{ required: true }]}
        style={{ minWidth: '50%' }}
      >
        <Input placeholder="Introduce EAN o Codigo" />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Buscar
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}
