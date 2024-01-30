/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from 'src/components/Container/Container'
import { usePayments } from 'src/hooks/usePayments'
import { PaymentDescription } from 'src/components/PaymentDescription/PaymentDescription'
import { Button, Form, Select, Space } from 'antd'
import { Navigation } from 'src/UI/Navigation/Navigation'

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
}

const CATEGORY_VALUES: Array<{ value: string, label: JSX.Element }> = [
  { value: 'mantenimiento', label: <span>Mantenimiento</span> }
]

export const PaymentDetail: React.FC = () => {
  const { id } = useParams()
  const { payment, getById, handleOnSubmit } = usePayments()
  const [form] = Form.useForm()

  const saveButtonRef = useRef(null)

  useEffect(() => {
    if (id !== undefined) {
      getById({ id })
    }
  }, [id])

  useEffect(() => {
    form.setFieldValue('category', payment?.category)
  }, [payment])

  const onGenderChange = (value: string) => {
    switch (value) {
      case 'male':
        form.setFieldsValue({ note: 'Hi, man!' })
        break
      case 'female':
        form.setFieldsValue({ note: 'Hi, lady!' })
        break
      case 'other':
        form.setFieldsValue({ note: 'Hi there!' })
        break
      default:
    }
  }

  const onFinish = (value: { category: string }) => {
    if (payment === undefined || payment === null) return

    const { category } = value

    handleOnSubmit({ category, idProscai: payment.idProscai })
  }

  return (
    <>
      <Navigation
        name='Detalle de Pago'
        isNew={false}
        hasFile={payment !== null ? payment.files.length > 0 : false}
        saveRef={saveButtonRef}
      />
      <Container>

        <Space direction='vertical' size={30} style={{ width: '100%' }}>

          {payment !== null ? <PaymentDescription payment={payment} /> : ''}

          <Form

            form={form}
            name="control-hooks"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
          >

            <Form.Item name="category" label="Categoria" rules={[{ required: true }]}>
              <Select
                placeholder="Seleciona una cetegoria"
                onChange={onGenderChange}
                allowClear
                options={CATEGORY_VALUES}
              />

            </Form.Item>

            <Form.Item {...tailLayout}>
              <Space>
                <Button style={{ display: 'none' }} ref={saveButtonRef} type="primary" htmlType="submit">
                  Submit
                </Button>
              </Space>
            </Form.Item>

          </Form>

        </Space>

      </Container>

    </>
  )
}
