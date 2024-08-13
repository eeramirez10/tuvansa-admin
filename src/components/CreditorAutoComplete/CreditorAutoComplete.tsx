/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react'
import { CloseSquareFilled } from '@ant-design/icons'
import { AutoComplete, Col, Form, type FormInstance, Input } from 'antd'
import { getCreditorsProscai } from 'src/services/creditors'

interface Props {
  required: boolean
  form: FormInstance<any>
}

export const CreditorAutoComplete: React.FC<Props> = ({ required, form }) => {
  const [options, setOptions] = useState<Array<{ label: string, value: string, id: string }>>([])
  const [open, setOpen] = useState(false)
  const [isLoading, setIsloading] = useState(false)
  let filterTimeout: any

  const onSelect = (_value: any, values: { label: string, value: string, id: string }): void => {
    setOpen(false)
    form.setFieldsValue({ idCreditor: values.id })
    // setSupplierId(values.id)
  }

  const onSearch = async (text: string): Promise<void> => {
    clearTimeout(filterTimeout)

    if (text === '' || text === null) return

    filterTimeout = setTimeout(async () => {
      console.log('====>', text)

      setIsloading(true)
      setOpen(false)
      try {
        const { creditors } = await getCreditorsProscai({ search: text })
        const optionsDB = creditors.map(item => {
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

  return (
    <>
      <Col >

        <Form.Item
          name={'creditor'}
          label='Acreedor | Deudor'
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
            disabled={isLoading}
            open={open}

          />

        </Form.Item>

      </Col>

      <Col>
        <Form.Item
          name={'idCreditor'}
          label='id'
          rules={[{ required }]}
        >
          <Input disabled />
        </Form.Item>
      </Col>
    </>

  )
}
