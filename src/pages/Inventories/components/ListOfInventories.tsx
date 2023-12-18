/* eslint-disable @typescript-eslint/no-misused-promises */
import { Space } from 'antd'
import React from 'react'
import { type ColumnsType } from 'antd/es/table'
import { Link } from 'react-router-dom'
import { DataTable } from 'src/components/DataTable/DataTable'
import { type Inventory } from 'src/interfaces/Inventory'
import { useInventories } from 'src/hooks/useInventories'
import { InputSearch } from 'src/components/InputSearch'

export const ListOfInventories: React.FC = () => {
  const { inventories, isLoading, handleOnSearch, form } = useInventories()

  const columns: ColumnsType<Inventory> = [
    {
      title: 'Iseq',
      dataIndex: 'iseq',
      width: '20%',
      render: (_, { iseq }) => {
        return (<Link to={`/inventory/detail/${iseq}`} >{iseq} </Link>)
      }
    },
    {
      title: 'Cod',
      dataIndex: 'cod'
    },
    {
      title: 'Ean',
      dataIndex: 'ean',
      width: '20%'
    },
    {
      title: 'Descripcion',
      dataIndex: 'description',
      width: '20%'

    },
    {
      title: 'Cantidad',
      dataIndex: 'quantity',
      width: '20%'

    }

  ]
  return (
    <>
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
    <InputSearch onSubmit={handleOnSearch} form={form} />
      <DataTable
        columns={columns}
        data={inventories}
        loading={ isLoading}
      />

    </Space>

    </>

  )
}
