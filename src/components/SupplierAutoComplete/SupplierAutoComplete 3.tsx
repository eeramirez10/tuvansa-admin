/* eslint-disable @typescript-eslint/no-misused-promises */
import { CloseSquareFilled } from '@ant-design/icons'
import { AutoComplete, Col, Form, type FormInstance, Input } from 'antd'
import React, { useState } from 'react'
import { getSuppliersProscai } from 'src/services/supplier'

interface Props {
  required: boolean
  form: FormInstance<any>
  disabled?: boolean
  // options: Array<{ label: string, value: string, id: string }>
  // open: boolean
  // onSearch: (text: string) => Promise<void>
  // onSelect: (_value: any, values: { label: string, value: string, id: string }) => void
}

export const SupplierAutoComplete: React.FC<Props> = ({ required, form, disabled = false }) => {
  const [options, setOptions] = useState<Array<{ label: string, value: string, id: string }>>([])
  const [open, setOpen] = useState(false)
  const [isLoading, setIsloading] = useState(false)
  let filterTimeout: any

  const onSelect = (_value: any, values: { label: string, value: string, id: string }): void => {
    setOpen(false)
    // form.setFieldsValue({ idSupplier: values.id })
    form.setFieldsValue({ idSupplier: values.id })
  }

  const onSearch = async (text: string): Promise<void> => {
    clearTimeout(filterTimeout)

    if (text === '' || text === null) return

    filterTimeout = setTimeout(async () => {
      console.log('====>', text)

      setIsloading(true)
      setOpen(false)
      try {
        const { suppliers } = await getSuppliersProscai({ search: text })

        console.log(suppliers)

        const optionsDB = suppliers.map(({ name, uid }) => ({
          label: name,
          value: name,
          id: uid
        }))

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
    <>
      <Col >

        <Form.Item
          name={'supplier'}
          label='Proveedor'
          rules={[{ required }]}
        >
          <AutoComplete
            options={options}
            style={{ width: 200 }}
            onSearch={onSearch}
            placeholder="Customized clear icon"
            allowClear={{ clearIcon: <CloseSquareFilled /> }}
            onSelect={onSelect}
            popupMatchSelectWidth={500}
            disabled={ disabled || isLoading}
            open={open}

          />

        </Form.Item>

      </Col>

      <Col>
        <Form.Item
          name={'idSupplier'}
          label='id'
          rules={[{ required }]}
        >
          <Input disabled />
        </Form.Item>
      </Col>
    </>
  )
}
