import React from 'react'
import { Button, Card, Form, type FormInstance, Input, InputNumber } from 'antd'

interface Props {
  form: FormInstance<any>
  onFinish: (value: any) => any
}

export const PaymentForm: React.FC<Props> = ({ form, onFinish }) => {
  return (
    <Card>
      <Form
        form={form}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 8 }}
        onFinish={onFinish}

      >
        <Form.Item
          name={['payment', 'id']}
          label='Proveedor'
          hidden
        >
          <Input />

        </Form.Item>
        <Form.Item
          name={['payment', 'supplier']}
          label='Proveedor'
          rules={[{ required: true }]}
        >
          <Input />

        </Form.Item>
        <Form.Item
          name={['payment', 'docto']}
          label='Docto'
          rules={[{ required: true }]}
        >
          <Input />

        </Form.Item>
        <Form.Item
          name={['payment', 'paid']}
          label='Pagado'
          rules={[{ required: true, type: 'number' }]}
        >
          <InputNumber />

        </Form.Item>

        <Form.Item wrapperCol={{ span: 8, offset: 3 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

    </Card >
  )
}
