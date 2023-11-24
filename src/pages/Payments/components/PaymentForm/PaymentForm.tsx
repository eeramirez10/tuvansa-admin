/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react'
import { Button, Card, Form, type FormInstance, Input, InputNumber, DatePicker, AutoComplete, Row, Col } from 'antd'
import { useButtonRef } from 'src/hooks/useButtonRef'
import { CloseSquareFilled } from '@ant-design/icons'
import { getCustomersProscai } from 'src/services/customers'

interface Props {
  form: FormInstance<any>
  onFinish: (value: any) => Promise<void> | void
}

export const PaymentForm: React.FC<Props> = ({ form, onFinish }) => {
  const { buttonRef } = useButtonRef()
  const [options, setOptions] = useState<Array<{ label: string, value: string, id: string }>>([])
  const [isLoading, setIsloading] = useState(false)
  const [open, setOpen] = useState(false)
  let filterTimeout: number

  const onSearch = async (text: string): Promise<void> => {
    clearTimeout(filterTimeout)

    if (text === '' || text === null) return

    filterTimeout = setTimeout(async () => {
      console.log('====>', text)

      setIsloading(true)
      setOpen(false)
      try {
        const items = await getCustomersProscai({ search: text })

        const optionsDB = items.map(item => ({ label: item.name, value: item.name, id: item.uid }))

        setOptions(optionsDB)
      } catch (error) {
        console.log(error)
      } finally {
        setIsloading(false)
        setOpen(true)
      }
    }, 1000)
  }

  return (
    <Card style={{ width: '100%' }}>
      <Form
        form={form}
        // labelCol={{ span: 3 }}
        wrapperCol={{ span: 8 }}
        onFinish={onFinish}
        style={{ width: '100%' }}

      >
        <Form.Item
          name={'datePaid'}
          label='Fecha de pago'
          rules={[{ required: true }]}
        >
          <DatePicker />

        </Form.Item>
        <Form.Item
          name={'id'}
          label='Proveedor'
          hidden
        >
          <Input />

        </Form.Item>

        <Row gutter={[24, 16]}>
          <Col >
            <Form.Item
              name={'supplier'}
              label='Proveedor'
              rules={[{ required: true }]}
            >
              <AutoComplete
                options={options}
                style={{ width: 200 }}
                onSearch={onSearch}
                placeholder="Customized clear icon"
                allowClear={{ clearIcon: <CloseSquareFilled /> }}
                onSelect={(_value, values) => {
                  setOpen(false)
                  form.setFieldsValue({ idProscai: values.id })
                }}
                popupMatchSelectWidth={500}
                disabled={isLoading}
                open={open}

              />

            </Form.Item>

          </Col>

          <Col>
            <Form.Item
              name={'idProscai'}
              label='id'
              rules={[{ required: true }]}
            >
              <Input disabled />
            </Form.Item>
          </Col>

        </Row>

        <Form.Item
          name={'docto'}
          label='Docto'
          rules={[{ required: true }]}
        >
          <Input />

        </Form.Item>
        <Form.Item
          name={'paid'}
          label='Pagado'
          rules={[{ required: true, type: 'number' }]}
        >
          <InputNumber />

        </Form.Item>

        <Form.Item hidden wrapperCol={{ span: 8, offset: 3 }}>
          <Button hidden ref={buttonRef} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

    </Card >
  )
}
