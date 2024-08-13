import { type ColumnsType } from 'antd/es/table'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'src/components/Container/Container'
import { DataTable } from 'src/components/DataTable/DataTable'
import { currencyMXNFormat } from 'src/helpers/formatCurrency'
import { formatDate } from 'src/helpers/formatDate'
import { type Remission } from 'src/interfaces/Remissions'
import { getRemissions } from 'src/services/sales'

const columns: ColumnsType<Remission> = [
  {
    title: 'Remision',
    dataIndex: 'remission'
  },
  {
    title: 'Pedido',
    dataIndex: 'order'
  },
  {
    title: 'Fecha',
    dataIndex: 'createdAt',
    render: (_, val) => formatDate(val.createdAt)

  },
  {
    title: 'Importe',
    dataIndex: 'IMPORTE',
    render: (_, val) => currencyMXNFormat({ value: parseFloat(val.amount) }),

    responsive: ['lg']

  },
  {
    title: 'Cliente',
    dataIndex: 'customer'

  },
  {
    title: 'Autorizado',
    dataIndex: 'authorized',
    render: (_, val) => val.authorized ? 'Si' : 'No',

    responsive: ['lg']

  },
  {
    title: 'File',
    render: (_, value) => {
      const { file, signedFile, id, authorized } = value

      return <Link to={`${authorized ? signedFile : file?.id}/authorize/${id}`} >Ver</Link>
    },

    responsive: ['lg']

  }

]

const Index: React.FC = () => {
  const [remissions, setRemissions] = useState<Remission[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getRemissions()
      .then((data) => {
        const { remissions } = data

        setRemissions(remissions)
      }).finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <Container>

      {/* <PdfEditor /> */}

      <DataTable loading={isLoading} columns={columns} data={remissions} rowKey={remission => remission.id} />

    </Container>
  )
}

export default Index
