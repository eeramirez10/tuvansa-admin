import { Button } from 'antd'
import { type ColumnsType } from 'antd/es/table'
import React, { useEffect, useState } from 'react'
import { Container } from 'src/components/Container/Container'
import { DataTable } from 'src/components/DataTable/DataTable'
import { currencyMXNFormat } from 'src/helpers/formatCurrency'
import { formatDate } from 'src/helpers/formatDate'
import { type Remission, type RemissionProscai } from 'src/interfaces/Remissions'
import { getRemissions } from 'src/services/sales'

const columns: ColumnsType<RemissionProscai> = [
  {
    title: 'Remision',
    dataIndex: 'DSEQ'
  },
  {
    title: 'Pedido',
    dataIndex: 'DNUM'
  },
  {
    title: 'Fecha',
    dataIndex: 'DFECHA',
    render: (_, val) => formatDate(val.DFECHA)

  },
  {
    title: 'Importe',
    dataIndex: 'IMPORTE',
    render: (_, val) => currencyMXNFormat({ value: parseFloat(val.IMPORTE) }),
    responsive: ['lg']

  },
  {
    title: 'Autorizado',
    dataIndex: 'IMPORTE',
    render: () => 'no',
    responsive: ['lg']

  },
  {
    title: 'Subir Archivo',
    dataIndex: 'IMPORTE',
    render: () => <Button>Upload</Button>,

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
        setRemissions(data.remissions)
      }).finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <Container>

      {/* <PdfEditor /> */}

      <DataTable
        loading={isLoading}
        columns={columns}
        data={remissions}
        rowKey={remission => remission.DSEQ}
      />

    </Container>
  )
}

export default Index
