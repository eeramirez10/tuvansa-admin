import React from 'react'
import { CalendarFilled, HomeFilled } from '@ant-design/icons'
import { Space, Typography } from 'antd'
import { DataTable } from 'src/components/DataTable/DataTable'
import { currencyMXNFormat } from 'src/helpers/formatCurrency'
import { useSales } from 'src/hooks/useSales'

const { Title } = Typography

export const Sales: React.FC = () => {
  const { columns, sales, year, total, mes, isLoading } = useSales()

  const header = <div style={{ display: 'flex', justifyContent: 'space-between' }}>

    <div>

      <Title level={3} > TUBERIA Y VALVULAS DEL NORTE SA DE CV </Title>
      <Title level={5}><HomeFilled /> Mexico</Title>
    </div>

    <div>
      <h3>{currencyMXNFormat({ value: total })}</h3>
      <div>

        <Title level={5}>
          <CalendarFilled />

          {mes}
          {/* <DatePicker picker={'month'} onChange={(value) => { console.log(value) }} /> */}
          / {year}
          {/* <DatePicker picker={'year'} /> */}
        </Title>

      </div>
    </div>

  </div>

  return (
    <Space direction='vertical' style={{ width: '100%' }} >

      <DataTable
        columns={columns}
        data={sales}
        rowKey={(value) => value.nombre}
        title={() => header}
        loading={isLoading}
      />
    </Space>
  )
}
