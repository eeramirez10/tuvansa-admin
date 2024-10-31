import { type ColumnsType } from 'antd/es/table'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container } from 'src/components/Container/Container'
import { DataTable } from 'src/components/DataTable/DataTable'
import { currencyMXNFormat } from 'src/helpers/formatCurrency'
import { formatDate } from 'src/helpers/formatDate'
import { useAppSelector } from 'src/hooks/useStore'
import { getProscaiPurchaseOrders, getPurchaseOrders } from 'src/services/purchases/api'
import { type PurchaseOrder } from 'src/services/purchases/transform'
import { cleanPurchaseOrder, loadPurchaseOrders, onStartPurchaseOrders, selectPurchaseOrder } from 'src/store/purchase-orders/slice'
import { Form, Typography } from 'antd'
import { InputSearch } from 'src/components/InputSearch'

const { Title } = Typography

const Index: React.FC = () => {
  const orders = useAppSelector(state => state.purchaseOrders.data)
  const fetching = useAppSelector(state => state.purchaseOrders.isLoading)

  console.log(fetching)

  const [form] = Form.useForm()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(cleanPurchaseOrder())
    dispatch(onStartPurchaseOrders())

    fecthOrders({})
      .then(resp => {
        dispatch(loadPurchaseOrders(resp))
      })
  }, [])

  const fecthOrders = async ({ search }: { search?: string }): Promise<PurchaseOrder[]> => {
    const orders = await getPurchaseOrders()

    const ordersProscai = await getProscaiPurchaseOrders({ search })

    return ordersProscai.filter(orderProscai => !orders.some(order => order.purchaseOrder === orderProscai.purchaseOrder))
  }

  const handleSelectPurchaseOrder = (order: PurchaseOrder): void => {
    dispatch(selectPurchaseOrder(order))
  }

  const handleSearch = ({ search }: { search: string }): void => {
    if (search === '') return
    dispatch(onStartPurchaseOrders())
    fecthOrders({ search })
      .then(resp => {
        dispatch(loadPurchaseOrders(resp))
      })
  }

  const columns: ColumnsType<PurchaseOrder> = [
    {
      title: 'OC',
      dataIndex: 'purchaseOrder',
      width: '20%'
      // render: (_, { purchaseOrder }) => {
      //   return (<Link to={`/payment/${purchaseOrder}/detail`} >{purchaseOrder} </Link>)
      // }
    },
    {
      title: 'Moneda',
      dataIndex: 'currency',
      width: '20%'
    },
    {
      title: 'Importe',
      dataIndex: 'amount',
      render: (_, value) => currencyMXNFormat({ value: parseFloat(value.amount) })
    },
    {
      title: 'Proveedor',
      dataIndex: 'provider',
      width: '20%'
    },
    {
      title: 'Fecha',
      dataIndex: 'captureDate',
      render: (_, value) => formatDate(value.captureDate)
    },
    {
      title: 'Subir Archivo',
      dataIndex: 'purchaseOrder',
      render: (_, value) => <Link onClick={() => { handleSelectPurchaseOrder(value) }} to={`${value.id}/upload`} >Upload</Link>,

      responsive: ['lg']

    }
    // {
    //   title: 'Fecha de pago',
    //   dataIndex: 'datePaid'
    // },
    // {
    //   title: 'Proveedor | Acreedor',
    //   dataIndex: 'importePesos',
    //   render: (_, value) => value.supplier?.name ?? value.creditor?.name
    // },
    // {
    //   title: 'Importe',
    //   dataIndex: 'amount',
    //   render: (_, value) => currencyMXNFormat({ value: value.amount })
    // },
    // {
    //   title: 'Archivos',
    //   align: 'center',
    //   render: (_, { id, files }) => files.length > 0 ? <OpenButtonModal id={id} /> : null
    // }
  ]

  return (
    <>
      <Container>

        <Title level={3}>Ordenes de compra</Title>

        <InputSearch form={form} handleSearch={handleSearch} placeholder='Escribe la OC' />

        <DataTable loading={fetching} columns={columns} data={orders} rowKey={(value) => value.purchaseOrder} />
      </Container>

    </>

  )
}

export default Index
