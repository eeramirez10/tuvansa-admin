import React from 'react'
import { type Payment } from '../../interfaces/Payment'
import { type ColumnsType } from 'antd/es/table'
import { DataTable } from '../../components/DataTable/DataTable'
import { Link } from 'react-router-dom'
import { usePayments } from '../../hooks/usePayments'
import { FilesModal } from './components/FilesModal'
import { Navigation } from 'src/UI/Navigation/Navigation'

const columns: ColumnsType<Payment> = [
  {
    title: 'Docto',
    dataIndex: 'docto',
    width: '20%',
    render: (_, { id, idProscai }) => {
      return (<Link to={`/payment/${id}/detail`} >{idProscai} </Link>)
    }
  },

  {
    title: 'Moneda',
    dataIndex: 'coin',
    width: '20%',
    render: (value) => value.code
  },
  {
    title: 'Fecha de pago',
    dataIndex: 'fecha'
  },
  {
    title: 'Importe',
    dataIndex: 'importeFactura'
  },
  {
    title: 'Importe MXN',
    dataIndex: 'importePesos'
  },
  {
    title: 'Saldo',
    dataIndex: 'saldo'
  }
  // {
  //   title: 'Archivos',
  //   align: 'center',
  //   render: (_, { id }) => <OpenButtonModal id={id} />
  // }
]

export const Payments: React.FC = () => {
  const { payments } = usePayments()

  return (
    <>
      <Navigation name='Pagos' />
      <FilesModal />
      <DataTable
        rowKey={(value) => value.idProscai}
        columns={columns}
        data={payments}
        expandedRowRender={(record: Payment) => PaymentExpandRow({ payment: record })}
      />
    </>

  )
}

interface Props {
  payment: Payment
}

const PaymentExpandRow: React.FC<Props> = ({ payment: record }) => {
  return (
    <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'space-around', gap: 20 }}>
      <div>
        <label>Proveedor</label>
        <p>{record.supplier.name}</p>
      </div>
      <div>
        <label>Factura Proveedor</label>
        <p>{record.supplierFactura}</p>
      </div>
      <div>
        <label>Factura </label>
        <p>{record.factura}</p>
      </div>
      <div>
        <label>Orden de Compra</label>
        <p>{record.ordenCompra}</p>
      </div>
      <div>
        <label>Factura Proveedor</label>
        <p>{record.supplierFactura}</p>
      </div>

    </div>

  )
}
