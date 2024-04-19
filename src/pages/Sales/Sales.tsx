import { CalendarFilled, HomeFilled } from '@ant-design/icons'
import { Space, Typography } from 'antd'
import { type ColumnsType } from 'antd/es/table'
import React, { useEffect, useState, useRef } from 'react'
import { DataTable } from 'src/components/DataTable/DataTable'
import { currencyMXNFormat } from 'src/helpers/formatCurrency'
import { type Sale } from 'src/interfaces/Sales'
import { getSales } from 'src/services/sales'
import { CronJob } from 'cron'

const { Title } = Typography

const columns: ColumnsType<Sale> = [
  {
    title: 'Nombre',
    dataIndex: 'nombre',
    width: '20%',
    render: (_, value) => value.descripcion
  },

  {
    title: 'Presupuesto',
    dataIndex: 'presupuesto',
    width: '20%',
    render: (_, value) => value.presupuesto === 0 ? '' : currencyMXNFormat({ value: value.presupuesto })
  },
  {
    title: 'Venta',
    dataIndex: 'ventaNeta',
    render: (_, value) => currencyMXNFormat({ value: value.venta_neta })
  },
  {
    title: 'Resta',
    dataIndex: 'resta',
    render: (_, value) => value.presupuesto === 0 ? '' : currencyMXNFormat({ value: (value.venta_neta - value.presupuesto) })
  },
  {
    title: 'Ejercido',
    dataIndex: 'ejercido',
    render: (_, value) => value.presupuesto === 0 ? '' : `${value.ejercido.toFixed(2)}%`
  }
  // {
  //   title: 'Archivos',
  //   align: 'center',
  //   render: (_, { id }) => <OpenButtonModal id={id} />
  // }
]

export const Sales: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([])
  const [total, setTotal] = useState<number>(0)
  const [mes, setMes] = useState<string>('')
  const [year, setYear] = useState<string>('')
  const [firstTime, setFirstTime] = useState<boolean>(true)

  const cronJob = useRef<CronJob<null, null>>(null)

  useEffect(() => {
    const fetchSales = (): Promise<void> => getSales()
      .then((resp) => {
        const { results } = resp
        setSales([...results])

        const totalNeta = results.reduce((prev, current) => prev + current.venta_neta, 0)

        setYear(results[0].year)
        setMes(results[0].month)
        setTotal(totalNeta)
        setFirstTime(false)
      })

    if (firstTime) { fetchSales() }

    cronJob.current = new CronJob('0 */30 8-19 * * 1-5', () => {
      fetchSales()
    })

    cronJob.current.start()

    return () => {
      cronJob.current?.stop()
    }
  }, [])

  console.log(total)

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
      />
    </Space>
  )
}
