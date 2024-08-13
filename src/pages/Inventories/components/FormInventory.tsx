import { Button, Form, InputNumber } from 'antd'
import React from 'react'
import { useInventories } from 'src/hooks/useInventories'

interface Props {
  isLoading: boolean
  isPaused: boolean
}

export const FormInventory: React.FC<Props> = ({ isPaused, isLoading }) => {
  const { handleOnSubmit, form } = useInventories()

  const onFinishFailed = (errorInfo: any): void => {
    console.log('Failed:', errorInfo)
  }
  return (
    <Form
      name="basic"
      form={form}
      style={{ maxWidth: 500 }}
      initialValues={{ remember: true }}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onFinish={handleOnSubmit}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Conteo"
        name="count"
        rules={[{ required: true, message: 'Ingresa un valor numerico!' }]}
      >
        <InputNumber min={0} />
      </Form.Item>
      <Form.Item >
        <Button type="primary" htmlType="submit" disabled = { isPaused || isLoading }>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
