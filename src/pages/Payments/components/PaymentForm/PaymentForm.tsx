/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState } from 'react'
import { Button, Card, Form, type FormInstance, DatePicker, Row, Select, Flex, type RadioChangeEvent, InputNumber } from 'antd'
import { useButtonRef } from 'src/hooks/useButtonRef'
// import { getSuppliersProscai } from 'src/services/supplier'

import { Radio } from 'antd'
import { SupplierAutoComplete } from 'src/components/SupplierAutoComplete/SupplierAutoComplete'
import { CreditorAutoComplete } from 'src/components/CreditorAutoComplete/CreditorAutoComplete'
import { type Docto } from 'src/interfaces/Docto'

interface Props {
  form: FormInstance<any>
  onFinish: (value: any) => Promise<void> | void
  formValues?: Docto
  disabled?: boolean
  radioValue?: number
  isLoading?: boolean
}
const CATEGORY_VALUES: Array<{ value: string, label: JSX.Element }> = [
  { value: 'mantenimiento', label: <span>Mantenimiento</span> }
]

export const PaymentForm: React.FC<Props> = ({ form, onFinish, formValues, disabled = false, radioValue = 1, isLoading = false }) => {
  const { buttonRef } = useButtonRef()

  const [value, setValue] = useState(radioValue)

  useEffect(() => {
    setValue(radioValue)
  }, [radioValue])

  useEffect(() => {
    if (formValues !== undefined) {
      form.setFieldsValue({
        supplier: formValues.supplier.name,
        idSupplier: formValues.supplier.uid
      })
    }
  }, [formValues])

  const onChange = (e: RadioChangeEvent): void => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
  }

  return (
    <Card style={{ width: '100%' }} loading={isLoading}>
      <Radio.Group onChange={onChange} value={value} style={{ marginBottom: 20 }} disabled={disabled}>
        <Radio value={1}>Proveedor</Radio>
        <Radio value={2}>Acreedor | Deudor </Radio>
      </Radio.Group>
      <Form
        form={form}

        layout='vertical'

        onFinish={onFinish}
        style={{ width: '100%' }}

      >

        <Flex vertical>

          <Row gutter={[24, 16]}>
            {
              value === 1 &&

              <SupplierAutoComplete
                required={value === 1}
                form={form}
                disabled={disabled}
              />

            }
          </Row>

          {
            value === 2 &&
            <Row gutter={[24, 16]}>
              <CreditorAutoComplete
                required={value === 2}
                form={form}

              />
            </Row>
          }

          <Form.Item name="category" label="Categoria" rules={[{ required: true }]} style={{ width: 200 }}>
            <Select
              placeholder="Seleciona una cetegoria"
              allowClear
              options={CATEGORY_VALUES}
            />

          </Form.Item>

          <Form.Item
            name={'amount'}
            label='Importe'
            rules={[{ required: true }]}
          >
            <InputNumber />

          </Form.Item>

          <Form.Item name="coin" label="Moneda" rules={[{ required: true }]} style={{ width: 200 }}>
            <Select
              placeholder="Seleciona una una Moneda"
              allowClear
              options={[
                { value: 'MXN', label: 'MXN' },
                { value: 'USD', label: 'USD' }

              ]}
            />

          </Form.Item>

          <Form.Item name="branchOffice" label="Oficina" rules={[{ required: true }]} style={{ width: 200 }}>
            <Select
              placeholder="Seleciona una Sucursal"
              allowClear
              options={[
                { value: 'Mexico', label: 'Mexico' },
                { value: 'Monterrey', label: 'Monterrey' },
                { value: 'Veracruz', label: 'Veracruz' },
                { value: 'Mexicali', label: 'Mexicali' },
                { value: 'Queretaro', label: 'Queretaro' },
                { value: 'Cancun', label: 'Cancun' }

              ]}
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
