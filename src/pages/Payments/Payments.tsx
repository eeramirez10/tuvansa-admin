import React from 'react'
import { type Payment } from '../../interfaces/Payment'
import { type ColumnsType } from 'antd/es/table'
import { DataTable } from '../../components/DataTable/DataTable'
import { Link } from 'react-router-dom'
import { usePayments } from '../../hooks/usePayments'
import { FilesModal } from '../../components/FilesModal/FilesModal'
import { Navigation } from 'src/UI/Navigation/Navigation'
import { OpenButtonModal } from 'src/components/OpenButtonModal'
import { currencyMXNFormat } from 'src/helpers/formatCurrency'
import { Button } from 'antd'

const columns: ColumnsType<Payment> = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: '20%',
    render: (_, { id }) => {
      return (<Link to={`/payment/${id}/detail`} >{id.slice(5, 15)} </Link>)
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
    dataIndex: 'datePaid'
  },
  {
    title: 'Proveedor | Acreedor',
    dataIndex: 'importePesos',
    render: (_, value) => value.supplier?.name ?? value.creditor?.name
  },
  {
    title: 'Importe',
    dataIndex: 'amount',
    render: (_, value) => currencyMXNFormat({ value: value.amount })
  },
  {
    title: 'Archivos',
    align: 'center',
    render: (_, { id, files }) => files.length > 0 ? <OpenButtonModal id={id} /> : null
  }
]

export const Payments: React.FC = () => {
  const { payments } = usePayments()

  return (
    <>
      <Navigation name='Pagos' />
      <Link to={'/payments/categories/new'} state={{ name: 'Nuevo', action: 'new' }}>
        <Button
          type="primary"
          shape='round'
        >
          Categorias
        </Button>

      </Link>
      <FilesModal />
      <DataTable
        rowKey={(value) => value.id}
        columns={columns}
        data={payments}
        expandedRowRender={(record: Payment) => PaymentExpandRow({ payment: record })}
        rowExpandable={(record: Payment) => record.proscai !== null}
      />
    </>

  )
}

interface Props {
  payment: Payment
}

const PaymentExpandRow: React.FC<Props> = ({ payment: record }) => {
  const { proscai } = record

  if (proscai === null) return <div></div>

  const { supplier, supplierFactura, factura, ordenCompra } = proscai

  return (
    <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'space-around', gap: 20 }}>
      <div>
        <label>Proveedor</label>
        <p>{supplier.name}</p>
      </div>
      <div>
        <label>Factura Proveedor</label>
        <p>{supplierFactura}</p>
      </div>
      <div>
        <label>Factura </label>
        <p>{factura}</p>
      </div>
      <div>
        <label>Orden de Compra</label>
        <p>{ordenCompra}</p>
      </div>
    </div>

  )
}
