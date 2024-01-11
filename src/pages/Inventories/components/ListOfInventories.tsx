/* eslint-disable @typescript-eslint/no-misused-promises */
import { Space } from 'antd'
import React from 'react'
import { type ColumnsType } from 'antd/es/table'
import { Link } from 'react-router-dom'
import { DataTable } from 'src/components/DataTable/DataTable'
import { type InventoryProscai, type Shelter } from 'src/interfaces/Inventory'
import { useInventories } from 'src/hooks/useInventories'
import { InputSearch } from 'src/components/InputSearch'
import { SelectBranchOffice } from 'src/components/SelectBranchOffice/SelectBranchOffice'

export const ListOfInventories: React.FC = () => {
  const {
    inventories,
    isLoading,
    form,
    options,
    handleOnSearch,
    onLoadInventories,
    handleOptions
  } = useInventories()

  const columns: ColumnsType<InventoryProscai> = [
    {
      title: 'Iseq',
      dataIndex: 'iseq',
      width: '20%',
      render: (_, { iseq }) => {
        return (<Link to={`/inventario/detail/${iseq}`} >{iseq} </Link>)
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
      width: '20%',
      responsive: ['lg']
    },
    {
      title: 'Cantidad',
      dataIndex: 'quantity',
      width: '20%',
      responsive: ['lg']

    }
  ]

  const expandedColumns: ColumnsType<Shelter> = [
    {
      title: 'Iseq',
      dataIndex: 'iseq',
      width: '20%',
      render: (_, { almseq }) => (<Link to={`/inventories/shelter/detail/${almseq}`} >{almseq} </Link>)
    },
    {
      title: 'Almacen',
      dataIndex: 'code',
      render: (_, value) => value.warehouse.code
    },
    {
      title: 'cantidad',
      dataIndex: 'inventory',
      render: (_, value) => value.quantity
    }
  ]

  return (
    <>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>

        <Space direction="horizontal" size="middle" style={{ display: 'flex', justifyContent: 'space-between' }} wrap>
          <InputSearch onSubmit={handleOnSearch} form={form} options={options} />
          <SelectBranchOffice onLoadInventories={onLoadInventories} handleOptions={handleOptions} options={options} />
        </Space>

        <DataTable
          columns={columns}
          data={inventories}
          loading={isLoading}
          expandedRowRender={(record: InventoryProscai) => {
            return <DataTable
              columns={expandedColumns}
              data={record.shelters ?? []}
              loading={false} />
          }}
        />

      </Space>

    </>

  )
}
