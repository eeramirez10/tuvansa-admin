import React, { useEffect } from 'react'
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Inventory } from 'src/interfaces/Inventory';
import { useInventories } from 'src/hooks/useInventories';
import { type CountId } from '../../interfaces/Inventory';


export const ListOfCounts: React.FC = () => {

  const { inventories,  onLoadInventories } = useInventories()


  const columns: ColumnsType<Inventory> = [

    {
      title: 'iseq',
      dataIndex: 'iseq',
      key:'iseq',
      width: '20%',
    },

    // {
    //   title: 'Cod',
    //   dataIndex: 'cod'
    // },
    // {
    //   title: 'Ean',
    //   dataIndex: 'ean',
    //   width: '20%'
    // },
    // {
    //   title: 'Descripcion',
    //   dataIndex: 'description',
    //   width: '20%',
    //   responsive:['lg']

    // },
    // {
    //   title: 'Cantidad',
    //   dataIndex: 'quantity',
    //   width: '20%'

    // }

  ]

  const columnsExpand: ColumnsType<CountId> = [
    {
      title: 'Conteo',
      dataIndex: 'count',
      width: '20%',
      render: (_, { count }) => {
        return (<a >{count} </a>)
      }
    },
    {
      title: 'Fecha',
      dataIndex: 'createdAt',
      width: '20%',
      responsive:['lg']

    },
    {
      title: 'User',
      dataIndex: 'username',
      width: '20%',
      responsive:['lg'],
      render: (_, { user }) => {
        return (<a >{user.username} </a>)
      }

    },
    {
      title: 'Cantidad',
      dataIndex: 'quantity',
      width: '20%',
      render: (_, { inventory }) => {
        return (<a >{inventory?.quantity} </a>)
      }

    },
    {
      title: 'Descripcion',
      dataIndex: 'description',
      width: '20%',
      responsive:['lg'],
      render: (_, { inventory }) => {
        return (<a >{inventory?.description} </a>)
      }

    },
  ]

  useEffect(() => {
    onLoadInventories({})
  }, [])



  return (


    <Table
      columns={columns}

      // expandable={{
      //   expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.iseq}</p>,
      // }}
      bordered={true}
      dataSource={inventories}
    />
  )
}
