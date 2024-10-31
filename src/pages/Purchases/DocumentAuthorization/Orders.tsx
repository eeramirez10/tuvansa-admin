import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from 'src/hooks/useStore'
import { getPurchaseOrders } from '../../../services/purchases/api'
import { type PurchaseOrder } from 'src/services/purchases/transform'
import { type ColumnsType } from 'antd/es/table'
import { Link } from 'react-router-dom'
import { currencyMXNFormat } from '../../../helpers/formatCurrency'
import { loadPurchaseOrders, onStartPurchaseOrders, selectPurchaseOrder } from 'src/store/purchase-orders/slice'
import { formatDate } from 'src/helpers/formatDate'
import { DataTable } from 'src/components/DataTable/DataTable'
import { Typography } from 'antd'
import { Container } from 'src/components/Container/Container'

const { Title } = Typography

export const Orders: React.FC = () => {
  const orders = useAppSelector(state => state.purchaseOrders.data)
  const fetching = useAppSelector(state => state.purchaseOrders.isLoading)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(onStartPurchaseOrders())
    getPurchaseOrders()
      .then(resp => {
        dispatch(loadPurchaseOrders(resp.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))))
      })
  }, [])

  const handleSelectCurrentOrder = (order: PurchaseOrder) => (): void => {
    dispatch(selectPurchaseOrder(order))
  }

  // const handleSelectPurchaseOrder = (order: PurchaseOrder): void => {
  //   dispatch(selectPurchaseOrder(order))
  // }

  const columns: ColumnsType<PurchaseOrder> = [
    {
      title: 'OC',
      dataIndex: 'purchaseOrder'

      // render: (_, { purchaseOrder }) => {
      //   return (<Link to={`/payment/${purchaseOrder}/detail`} >{purchaseOrder} </Link>)
      // }
    },
    {
      title: 'Moneda',
      dataIndex: 'currency'

    },
    {
      title: 'Importe',
      dataIndex: 'amount',
      render: (_, value) => currencyMXNFormat({ value: parseFloat(value.amount) })
    },
    {
      title: 'Proveedor',
      dataIndex: 'provider'
    },
    {
      title: 'Fecha',
      dataIndex: 'captureDate',
      render: (_, value) => { return formatDate(value.captureDate) }
    },
    {
      title: 'Autorizado',
      dataIndex: 'authorized',
      render: (_, value) => value.authorized ? 'Si' : 'No'
    },
    {
      title: 'Autorizado por',
      dataIndex: 'authorizedBy',
      render: (_, value) => {
        return value.authorizedBy?.name
      }
    },
    {
      title: 'File',
      dataIndex: 'purchaseOrder',
      render: (_, value) => {
        const { file, signedFile, id, authorized } = value

        return <Link onClick={handleSelectCurrentOrder(value)} to={`${(authorized) ? signedFile : file?.id}/authorize/${id}/order`} >Ver</Link>
      }

    }
  ]

  return (
    <>
      <Container>

        <Title level={3}>Autorizacion de Ordenes</Title>

        <DataTable
          loading={fetching}
          columns={columns}
          data={orders}
          rowKey={(value) => value.id}

        />

      </Container>

    </>

  )
}
