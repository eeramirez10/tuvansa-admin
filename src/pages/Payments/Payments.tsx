import React from 'react'
import { type Payment } from '../../interfaces/Payment'
import { type ColumnsType } from 'antd/es/table'
import { DataTable } from '../../components/DataTable/DataTable'
import { Link } from 'react-router-dom'
import { usePayments } from '../../hooks/usePayments'
import { Button } from 'antd'
import { FilePdfOutlined } from '@ant-design/icons'

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
    width: '20%'
  },

  {
    title: 'Total Pagado',
    dataIndex: 'paid'
  },
  {
    title: 'Commentarios',
    dataIndex: 'comments'
  },
  {
    title: 'Archivos',
    align: 'center',
    render: () => <Button type="primary" icon={<FilePdfOutlined />} />
  }
]

export const Payments: React.FC = () => {
  const { payments } = usePayments()

  return (
    <>
      <DataTable
        columns={columns}
        data={payments}
      />
    </>

  )
}
