import React, { useState } from 'react'
import { Select } from 'antd'

interface Props {
  options: Array<{ label: string, value: string }>
  name: string
  handleOnChange: ({ value, name }: { value: string, name: string }) => void
  placeholder?: string
  defaultValue?: string
}

export const SelectInput: React.FC<Props> = ({ options, name, handleOnChange, placeholder = 'Selecciona', defaultValue = '' }) => {
  const [valueInput, setValueInput] = useState<{ value: string, name: string }>()
  const onChange = ({ value }: { value: string }): void => {
    setValueInput({ value, name })

    handleOnChange({ name, value })
  }
  // Filter `option.label` match the user type `input`
  const filterOption = (input: string, option?: { label: string, value: string }): any => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
  console.log(defaultValue)
  return (
    <Select
      labelInValue
      showSearch
      defaultValue={defaultValue}
      style={{ width: '178px' }}
      placeholder={placeholder}
      optionFilterProp="children"
      onChange={onChange}
      value={valueInput}
      filterOption={filterOption}
      options={options}
    />
  )
}
