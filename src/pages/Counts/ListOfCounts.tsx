import React, { useEffect } from 'react'
import type { ColumnsType } from 'antd/es/table'
import { useInventories } from 'src/hooks/useInventories'
import { type Inventory } from 'src/interfaces/Inventory'
import { DataTable } from 'src/components/DataTable/DataTable'
import { type CountId } from '../../interfaces/Inventory'
import { formatDate } from 'src/helpers/formatDate'
import { Button, Space } from 'antd'
import { useExcel } from 'src/hooks/useExcel'

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

  },
  {
    title: 'Suc',
    dataIndex: 'name',
    render: (_, value) => value?.branchOffice?.name ?? 'Mexico'
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
  const { handleDownloadExcel } = useExcel()

  useEffect(() => {
    onLoadInventories({})
  }, [])

  const body = inventories.map(inventory => {
    const counts = inventory.counts ?? []

    const countLength = counts?.length

    const newInventory: any = {}

    for (let i = 0; i < countLength; i++) {
      newInventory[`conteo${i + 1}`] = counts[i].count
      newInventory[`cantidad${i + 1}`] = counts[i].inventory?.quantity ?? inventory.quantity
    }

    return {
      iseq: inventory.iseq,
      cod: inventory.cod,
      ean: inventory.ean,
      descripcion: inventory.description,
      ...newInventory
    }
  })

  const header = ['Iseq', 'ICOD', 'EAN', 'Descripcion', 'conteo1', 'cantidad1', 'conteo2', 'cantidad2']

  return (
    <Space
      direction='vertical'
      size="middle" style={{ display: 'flex' }}
    >

      <Button
        onClick={() => { handleDownloadExcel({ body, header, fileName: 'Conteos' }) }}
      >
        Descargar Excel
      </Button>

      <DataTable
        columns={columns}
        data={inventories}
        rowKey={(record: any) => record.iseq}
        expandedRowRender={(record: any) => (
          <DataTable
            columns={expandedColumns}
            data={record.counts ?? []}
            rowKey={(record) => record.iseq}
            loading={false}
          />
        )}
        loading={false}
      />

    </Space>

  )
}
