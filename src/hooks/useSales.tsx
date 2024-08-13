import { type ColumnsType } from 'antd/es/table'
import { CronJob } from 'cron'
import { useEffect, useRef, useState } from 'react'
import { currencyMXNFormat } from 'src/helpers/formatCurrency'
import { type Sale } from 'src/interfaces/Sales'
import { getSales } from 'src/services/sales'

interface SalesReturn {
  sales: Sale[]
  total: number
  mes: string
  year: string
  columns: ColumnsType<Sale>
  isLoading: boolean
}

export const useSales = (): SalesReturn => {
  const [sales, setSales] = useState<Sale[]>([])
  const [total, setTotal] = useState<number>(0)
  const [mes, setMes] = useState<string>('')
  const [year, setYear] = useState<string>('')
  const [firstTime, setFirstTime] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState(false)

  const cronJob = useRef<CronJob<null, null>>()
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

  useEffect(() => {
    setIsLoading(true)
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
      .finally(() => {
        setIsLoading(false)
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
  return {
    sales,
    total,
    mes,
    year,
    columns,
    isLoading
  }
}
