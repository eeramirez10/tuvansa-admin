import React from 'react'
import { type Payment } from '../../interfaces/Payment'
import { type ColumnsType } from 'antd/es/table'
import { DataTable } from '../../components/DataTable/DataTable'
import { Link } from 'react-router-dom'
import { usePayments } from '../../hooks/usePayments'
import { OpenButtonModal } from 'src/components/OpenButtonModal'
import { FilesModal } from './components/FilesModal'

const columns: ColumnsType<Payment> = [
  {
    title: 'Docto',
    dataIndex: 'docto',
    width: '20%',
    render: (_, { id, docto }) => {
      return (<Link to={`/payment/${id}/edit`} >{docto} </Link>)
    }
  },
  {
    title: 'Proveedor',
    dataIndex: 'supplier',
    width: '20%',
    render: (text) => text.name
  },

  {
    title: 'Total Pagado',
    dataIndex: 'paid'
  },
  {
    title: 'Fecha de pago',
    dataIndex: 'datePaid',
    render: (payment) => payment
  },
  {
    title: 'Commentarios',
    dataIndex: 'comments'
  },
  {
    title: 'Archivos',
    align: 'center',
    render: (_, { id }) => <OpenButtonModal id={id} />
  }
]

export const Payments: React.FC = () => {
  const { payments } = usePayments()

  return (
    <>
      <FilesModal />
      <DataTable
        columns={columns}
        data={payments}
      />
    </>

  )
}
