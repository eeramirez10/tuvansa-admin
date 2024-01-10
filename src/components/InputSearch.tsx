import React from 'react'
import { Button, Form, type FormInstance, Input } from 'antd'

interface Props {
  onSubmit: ({ value, from, almacen }: { value: { search: string }, from: string, almacen: string }) => Promise<void>
  form: FormInstance<any>
  options: {
    from: string
    almacen: string
  }
}

export const InputSearch: React.FC<Props> = ({ onSubmit, form, options }) => {
  return (
    <Form
      form={form}
      layout="inline"
      onFinish={(value) => { onSubmit({ value, from: options.from, almacen: options.almacen }) }}
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

        <Button type="primary" htmlType="submit">
          Buscar
        </Button>

      </Form.Item>
    </Form>
  )
}
