/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState } from 'react'
import { Button, Card, Form, type FormInstance, Input, DatePicker, AutoComplete, Row, Col, Space, InputNumber } from 'antd'
import { useButtonRef } from 'src/hooks/useButtonRef'
import { CloseSquareFilled } from '@ant-design/icons'
import { getSuppliersProscai } from 'src/services/supplier'
import { getDocsBySupplier } from 'src/services/docto'

interface Props {
  form: FormInstance<any>
  onFinish: (value: any) => Promise<void> | void
}

export const PaymentForm: React.FC<Props> = ({ form, onFinish }) => {
  const { buttonRef } = useButtonRef()
  const [options, setOptions] = useState<Array<{ label: string, value: string, id: string }>>([])
  const [isLoading, setIsloading] = useState(false)
  const [open, setOpen] = useState(false)
  const [supplierId, setSupplierId] = useState('')
  let filterTimeout: any

  useEffect(() => {
    if (supplierId !== '') {
      getDocsBySupplier({ supplierId })
        .then(resp => {
          console.log(resp.doctos)

          form.setFieldsValue({ doctos: resp.doctos })
        })
        .catch(e => { console.log(e) })
    }
  }, [supplierId])

  const onSearch = async (text: string): Promise<void> => {
    clearTimeout(filterTimeout)

    if (text === '' || text === null) return

    filterTimeout = setTimeout(async () => {
      console.log('====>', text)

      setIsloading(true)
      setOpen(false)
      try {
        const { suppliers } = await getSuppliersProscai({ search: text })
        const optionsDB = suppliers.map(item => ({ label: item.name, value: item.name, id: item.uid }))
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

        layout='vertical'

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
                  setSupplierId(values.id)
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

        <DoctosListForm />

        {/* <Form.Item
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

        </Form.Item> */}

        <Form.Item hidden wrapperCol={{ span: 8, offset: 3 }}>
          <Button hidden ref={buttonRef} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

    </Card >
  )
}

const DoctosListForm: React.FC = () => {
  return (
    <Form.List name="doctos">
      {(fields) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space key={key} size='small'>

              <Form.Item
                {...restField}

                name={[name, 'docto']}
                label='Docto'
              >
                <Input style={{ width: 100 }} />
              </Form.Item>

              <Form.Item
                {...restField}

                name={[name, 'referencia']}
                label='Referencia'
              >
                <Input style={{ width: 100 }} />
              </Form.Item>

              <Form.Item
                {...restField}

                name={[name, 'referenciaEllos']}
                label='Referencia Ellos'
              >
                <Input style={{ width: 100 }} />
              </Form.Item>

              <Form.Item
                {...restField}
                name={[name, 'montoFactura']}
                label='Monto'
              >
                <Input style={{ width: 100 }} />
              </Form.Item>

              <Form.Item
                {...restField}
                name={[name, 'saldo']}
                label='Saldo'
              >
                <InputNumber style={{ width: 100 }} />
              </Form.Item>

              <Form.Item
                {...restField}
                name={[name, 'pagado']}
                label="Pagado"
                rules={[{ required: true, message: 'Missing last pagado' }]}
              >
                <InputNumber style={{ width: 100 }} />
              </Form.Item>
            </Space>
          ))}
        </>
      )}
    </Form.List>
  )
}
