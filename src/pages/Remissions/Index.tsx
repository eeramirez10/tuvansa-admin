import { type ColumnsType } from 'antd/es/table'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'src/components/Container/Container'
import { DataTable } from 'src/components/DataTable/DataTable'
import { currencyMXNFormat } from 'src/helpers/formatCurrency'
import { formatDate } from 'src/helpers/formatDate'
import { type RemissionProscai } from 'src/interfaces/Remissions'
import { getRemissions, getRemissionsProscai } from 'src/services/sales'

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
    title: 'Cliente',
    dataIndex: 'CLIENTE'

  },
  {
    title: 'Subir Archivo',
    dataIndex: 'IMPORTE',
    render: (_, value) => <Link to={`${value.DSEQ}/upload`} >Upload</Link>,

    responsive: ['lg']

  }

]

const Index: React.FC = () => {
  const [remissions, setRemissions] = useState<RemissionProscai[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const getHandleRemissions = async (): Promise<RemissionProscai[]> => {
    const { remissions } = await getRemissions()

    const { results } = await getRemissionsProscai()

    const filterRemissions = results.filter((remProscai) => !remissions.some(rem => rem.proscai === remProscai.DSEQ.toString()))

    return filterRemissions
  }

  useEffect(() => {
    setIsLoading(true)
    getHandleRemissions()
      .then((res) => {
        setRemissions(res)
      })
      .finally(() => { setIsLoading(false) })
  }, [])

  return (
    <Container>

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
