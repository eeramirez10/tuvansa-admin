/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from 'src/components/Container/Container'
// import { PaymentDescription } from 'src/components/PaymentDescription/PaymentDescription'
// import { Button, Form, Select, Space } from 'antd'
import { Navigation } from 'src/UI/Navigation/Navigation'
import { useDoctos } from 'src/hooks/useDoctos'
import { PaymentForm } from '../Payments/components/PaymentForm/PaymentForm'

// const tailLayout = {
//   wrapperCol: { offset: 8, span: 16 }
// }

// const CATEGORY_VALUES: Array<{ value: string, label: JSX.Element }> = [
//   { value: 'mantenimiento', label: <span>Mantenimiento</span> }
// ]

export const DoctoDetail: React.FC = () => {
  const { id } = useParams()
  const { docto, form, getById, handleOnSubmit } = useDoctos()

  const saveButtonRef = useRef(null)

  useEffect(() => {
    if (id !== undefined) {
      getById({ id })
    }
  }, [id])

  const onFinish = (values: any) => {
    console.log(values)
    handleOnSubmit({ values })
  }

  return (
    <>
      <Navigation
        name='Detalle de Pago'
        isNew={false}
        hasFile={false}
        saveRef={saveButtonRef}
      />
      <Container>

        {
          (docto !== undefined && docto !== null) &&

          <PaymentForm
            form={form}
            onFinish={onFinish}
            formValues={docto}
            disabled={true}
          />
        }

        {/* <Space direction='vertical' size={30} style={{ width: '100%' }}>

          {docto !== null ? <PaymentDescription payment={docto} /> : ''}

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

        </Space> */}

      </Container>

    </>
  )
}
