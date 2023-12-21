import React, { useEffect } from 'react'
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useInventories } from 'src/hooks/useInventories';
import { Inventory } from 'src/interfaces/Inventory';

// interface DataType extends Inventory {
//   key: React.Key;
// }

const columns: ColumnsType<Inventory> = [
  {
    title: 'Iseq',
    dataIndex: 'iseq',
  },
  {
    title: 'Cod',
    dataIndex: 'cod'
  },
  {
    title: 'Ean',
    dataIndex: 'ean',
  
  },
  {
    title: 'Descripcion',
    dataIndex: 'description',
 
    responsive:['lg']

  },
  {
    title: 'Cantidad',
    dataIndex: 'quantity',
  

  }

]

// const data: DataType[] = [
//   {
//     key: 1,
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
//   },
//   {
//     key: 2,
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//     description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
//   },
//   {
//     key: 3,
//     name: 'Not Expandable',
//     age: 29,
//     address: 'Jiangsu No. 1 Lake Park',
//     description: 'This not expandable',
//   },
//   {
//     key: 4,
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sydney No. 1 Lake Park',
//     description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
//   },
// ];


export const Counts: React.FC = () => {

  const { inventories, onLoadInventories } = useInventories()


  useEffect(() => {
    onLoadInventories({})
  }, [])

  console.log(inventories)
  return (
    <Table
      columns={columns}
      rowSelection={{}}
      rowKey={(record) => record.id}
      expandable={{
        expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
      }}
      dataSource={inventories}
    />
  )
}
