import { Table } from 'antd'
import { type ColumnsType } from 'antd/es/table'
import React from 'react'

interface Props {
  columns: ColumnsType<any>
  data: any[]
}

export const DataTable: React.FC<Props> = ({ columns, data }) => {
  return (
    <Table
      columns={columns}
      rowKey={(record) => record.id}
      dataSource={data}
    />
  )
}
