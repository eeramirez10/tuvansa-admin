import React, { useEffect } from 'react'
import type { ColumnsType } from 'antd/es/table'
import { useInventories } from 'src/hooks/useInventories'
import { type Inventory } from 'src/interfaces/Inventory'
import { DataTable } from 'src/components/DataTable/DataTable'
import { type CountId } from '../../interfaces/Inventory'
import { formatDate } from 'src/helpers/formatDate'

const columns: ColumnsType<Inventory> = [
  {
    title: 'Iseq',
    dataIndex: 'iseq'
  },
  {
    title: 'Cod',
    dataIndex: 'cod'
  },
  {
    title: 'Ean',
    dataIndex: 'ean'

  },
  {
    title: 'Descripcion',
    dataIndex: 'description',

    responsive: ['lg']

  }

]

const expandedColumns: ColumnsType<CountId> = [
  {
    title: 'conteo',
    dataIndex: 'count'
  },
  {
    title: 'cantidad',
    dataIndex: 'inventory',
    render: (_, value) => value?.inventory?.quantity ?? ''
  },
  {
    title: 'creacion',
    dataIndex: 'createdAt',
    render: (_, value) => formatDate(value.createdAt)
  },
  {
    title: 'Usuario',
    dataIndex: 'user',
    render: (_, value) => value.user?.username ?? ''
  }
]

export const ListOfCounts: React.FC = () => {
  const { inventories, onLoadInventories } = useInventories()

  useEffect(() => {
    onLoadInventories({})
  }, [])

  return (
    <DataTable
      columns={columns}
      data={inventories}
      expandedRowRender={(record) => (
        <DataTable
          columns={expandedColumns}
          data={record.counts ?? []}
          loading={false}
        />
      )}
      loading={false}
    />
  )
}
