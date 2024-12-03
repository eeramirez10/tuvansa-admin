import React, { useEffect, useState } from 'react'
import type { ColumnsType } from 'antd/es/table'
import { useInventories } from 'src/hooks/useInventories'
import { DataTable } from 'src/components/DataTable/DataTable'
import { type BranchOffice, type CountId } from '../../interfaces/Inventory'
import { formatDate } from 'src/helpers/formatDate'
import { Button, Space, Tag } from 'antd'
import { useExcel } from 'src/hooks/useExcel'
import { ReleaseInventories } from 'src/components/ReleaseInventories'
import { type User } from '../../interfaces/Auth'
import { currencyMXNFormat } from '../../helpers/formatCurrency'

export interface InventoryList {
  id: string
  iseq: string
  cod: string
  ean: string
  description: string
  quantity: string
  costo?: string
  paused?: boolean
  counts: CountId[]
  createdAt?: Date
  updatedAt?: Date
  user?: User
  branchOffice: BranchOffice
}

const columns: ColumnsType<InventoryList> = [
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
    title: 'Existencia',
    dataIndex: 'quantity'

  },
  {
    title: 'Costo',
    dataIndex: 'costo',
    render: (_, { costo }) => currencyMXNFormat({ value: Number(costo) })
  },

  {
    title: 'Conteos',
    key: 'counts',
    dataIndex: 'counts',
    render: (_, { counts }) => {
      return <>
        {
          counts.slice(0, 5).map((count, i) => (

            <Tag key={i}>conteo {i + 1}: {count.count} </Tag>
          ))
        }
      </>
    },

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
  const { inventories, onLoadInventories, getInventoryProscaiByIseq, releaseInventories, isLoading: loading } = useInventories()
  const { handleDownloadExcel } = useExcel()

  const [isLoading, setIsloading] = useState(false)

  useEffect(() => {
    onLoadInventories({})
  }, [])

  const body = (): Promise<any[]> => {
    setIsloading(true)
    return Promise.all(
      inventories.map(async (inventory) => {
        const counts = inventory.counts ?? []

        const countLength = counts?.length

        const newInventory: any = {}

        const inventoryProscai = await getInventoryProscaiByIseq({ id: inventory.iseq })

        for (let i = 0; i < countLength; i++) {
          newInventory[`conteo${i + 1}`] = counts[i].count
          newInventory[`cantidad${i + 1}`] = counts[i].inventory?.quantity ?? inventory.quantity
        }

        const newCount = {
          iseq: inventory.iseq,
          cod: inventory.cod,
          ean: inventory.ean,
          descripcion: inventory.description,
          costo: inventoryProscai.costo,
          ...newInventory
        }

        console.log(newCount)

        return newCount
      })
    ).finally(() => { setIsloading(false) })
  }

  // inventories[0].counts.map( c =>{
  //   console.log(c)
  // })

  const header = ['Iseq', 'ICOD', 'EAN', 'Descripcion', 'existencia', 'costo', 'cantidad1', 'conteo2', 'cantidad2']

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

      <ReleaseInventories handleOnRelease={releaseInventories} />

      <DataTable
        columns={columns}
        data={inventories}
        rowKey={(record: any) => record.iseq}
        expandedRowRender={(record: any) => (
          <DataTable
            columns={expandedColumns}
            data={record.counts ?? []}
            rowKey={(record: any) => record.iseq}
            loading={false}
          />
        )}
        loading={loading || isLoading}
      />

    </Space>

  )
}
