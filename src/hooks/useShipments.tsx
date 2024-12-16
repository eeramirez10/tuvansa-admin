import { useEffect, useRef, useState } from 'react'
import { type ColumnsType } from 'antd/es/table'
import { type Shipment } from 'src/interfaces/Shipment'
import { getShipments } from 'src/services/shipment'
import { currencyMXNFormat } from 'src/helpers/formatCurrency'
import { Alert } from 'antd'
import { CronJob } from 'cron'

interface ShipmentsReturn {
  shipments: Shipment[]
  isLoading: boolean
  columns: ColumnsType<Shipment>
}

export const useShipments = (): ShipmentsReturn => {
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [firstTime, setFirstTime] = useState<boolean>(true)
  const cronJob = useRef<CronJob<null, null> | CronJob >()

  const columns: ColumnsType<Shipment> = [
    {
      title: 'Factura',
      dataIndex: 'factura',

      render: (_, { factura }) => factura
    },

    {
      title: 'Remision',
      dataIndex: 'remision',

      render: (_, { remision }) => remision
    },
    {
      title: 'Ruta',
      dataIndex: 'ruta',

      render: (_, { ruta }) => ruta
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      render: (_, { fecha }) => fecha.slice(0, 10)
    },
    {
      title: 'Cliente',
      dataIndex: 'cliente',
      render: (_, { nombreCliente }) => nombreCliente
    },
    {
      title: 'Agente',
      dataIndex: 'agente',
      render: (_, { agente }) => agente
    },
    {
      title: 'Costo',
      dataIndex: 'costo',
      render: (_, { costo }) => {
        const cost = parseFloat(costo)
        return cost === 0 ? '' : currencyMXNFormat({ value: (cost) })
      }
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      render: (_, { estado }) => estado === '' ? <Alert message='Pendiente' type="info" /> : <Alert message='Entregado' type="success" />
    },
    {
      title: 'Entrega',
      dataIndex: 'entrega',
      render: (_, { fechaFolio, estado }) => estado !== '' ? fechaFolio.slice(0, 10) : ''
    }

  ]

  useEffect(() => {
    setIsLoading(true)

    const fetchShipments = (): void => {
      getShipments()
        .then(({ shipments }) => {
          setShipments(shipments)
          setFirstTime(false)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }

    if (firstTime) { fetchShipments() }

    cronJob.current = new CronJob('0 */30 8-19 * * 1-5', () => {
      fetchShipments()
    })

    cronJob.current.start()

    return () => {
      cronJob.current?.stop()
    }
  }, [])

  return {
    shipments,
    isLoading,
    columns
  }
}
