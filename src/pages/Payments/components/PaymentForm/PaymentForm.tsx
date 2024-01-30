/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState } from 'react'
import { Button, Card, Form, type FormInstance, Input, DatePicker, AutoComplete, Row, Col, Select, Flex } from 'antd'
import { useButtonRef } from 'src/hooks/useButtonRef'
import { CloseSquareFilled } from '@ant-design/icons'
import { getSuppliersProscai } from 'src/services/supplier'
import { getDocsBySupplier } from 'src/services/docto'
import { getCreditorsProscai } from 'src/services/creditors'

interface Props {
  form: FormInstance<any>
  onFinish: (value: any) => Promise<void> | void
}
const CATEGORY_VALUES: Array<{ value: string, label: JSX.Element }> = [
  { value: 'mantenimiento', label: <span>Mantenimiento</span> }
]

export const PaymentForm: React.FC<Props> = ({ form, onFinish }) => {
  const { buttonRef } = useButtonRef()
  const [options, setOptions] = useState<Array<{ label: string, value: string, id: string }>>([])
  const [optionsCreditors, setOptionsCreditors] = useState<Array<{ label: string, value: string, id: string }>>([])
  const [openCreditors, setOpenCreditors] = useState(false)

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
        const optionsDB = suppliers.map(item => {
          console.log(item)
          return { label: item.name, value: item.name, id: item.uid }
        })
        setOptions(optionsDB)
      } catch (error) {
        console.log(error)
      } finally {
        setIsloading(false)
        setOpen(true)
      }
    }, 1000)
  }

  const onSearchCreditors = async (text: string): Promise<void> => {
    clearTimeout(filterTimeout)

    if (text === '' || text === null) return

    filterTimeout = setTimeout(async () => {
      console.log('====>', text)

      setIsloading(true)
      setOpenCreditors(false)
      try {
        const { creditors } = await getCreditorsProscai({ search: text })
        const optionsDB = creditors.map(item => {
          console.log(item)
          return { label: item.name, value: item.name, id: item.uid }
        })
        setOptionsCreditors(optionsDB)
      } catch (error) {
        console.log(error)
      } finally {
        setIsloading(false)
        setOpenCreditors(true)
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

        <Flex vertical>
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

          <Row gutter={[24, 16]}>
            <Col >
              <Form.Item
                name={'creditor'}
                label='Acredor | Deudor'
                rules={[{ required: true }]}
              >
                <AutoComplete
                  options={optionsCreditors}
                  style={{ width: 200 }}
                  onSearch={onSearchCreditors}
                  placeholder="Customized clear icon"
                  allowClear={{ clearIcon: <CloseSquareFilled /> }}
                  onSelect={(_value, values) => {
                    setOpenCreditors(false)
                    form.setFieldsValue({ idProscai: values.id })
                    setSupplierId(values.id)
                  }}
                  popupMatchSelectWidth={500}
                  disabled={isLoading}
                  open={openCreditors}

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

          <Form.Item name="category" label="Categoria" rules={[{ required: true }]}>
            <Select
              placeholder="Seleciona una cetegoria"
              allowClear
              options={CATEGORY_VALUES}
            />

          </Form.Item>

          <Form.Item
            name={'datePaid'}
            label='Fecha de pago'
            rules={[{ required: true }]}
          >
            <DatePicker />

          </Form.Item>

        </Flex>

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

        <Form.Item wrapperCol={{ span: 8, offset: 3 }}>
          <Button ref={buttonRef} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

    </Card >
  )
}
