import { CloseSquareFilled } from '@ant-design/icons'
import { AutoComplete, Form } from 'antd'
import React, { useState } from 'react'

export const InputSearchAutoComplete = () => {
  const [options, setOptions] = useState<Array<{ label: string, value: string, id: string }>>([])

  return (
    <Form.Item
      name={'creditor'}
      label='Acredor | Deudor'
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
  )
}
