import React from 'react'
import { Select } from 'antd'

interface Props {
  onLoadInventories: ({ from, almacen }: { from?: string, almacen?: string }) => Promise<void>
  handleOptions: ({ from, almacen }: { from: string, almacen: string }) => void
  options: {
    from: string
    almacen: string
  }
}

export const SelectBranchOffice: React.FC<Props> = ({ onLoadInventories, handleOptions, options }) => {
  const onChange = (value: string): void => {
    onLoadInventories({ from: 'proscai', almacen: value })

    handleOptions({
      from: 'proscai',
      almacen: value
    })
  }

  // Filter `option.label` match the user type `input`
  const filterOption = (input: string, option?: { label: string, value: string }): any =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
  return (
    <Select
      showSearch
      placeholder="Almacen"
      optionFilterProp="children"
      onChange={onChange}
      value={options.almacen}
      filterOption={filterOption}
      options={[
        {
          value: '01',
          label: 'Mexico'
        },
        {
          value: '02',
          label: 'Monterrey'
        },
        {
          value: '03',
          label: 'Veracruz'
        }
      ]}
    />
  )
}
