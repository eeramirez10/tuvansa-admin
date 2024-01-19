import { Table } from 'antd'
import { type ColumnsType } from 'antd/es/table'
import { type GetRowKey } from 'antd/es/table/interface'

import React from 'react'

interface Props {
  columns: ColumnsType<any>
  data: any[]
  loading?: boolean
  expandedRowRender?: any | undefined
  rowExpandable?: any | undefined
  rowKey: string | number | symbol | GetRowKey<any> | undefined
}

export const DataTable: React.FC<Props> = ({ columns, data, loading, expandedRowRender, rowExpandable, rowKey }) => {
  return (
    <Table
      scroll={{ scrollToFirstRowOnChange: true, x: 600 }}
      columns={columns}
      rowKey={rowKey}
      dataSource={data}
      loading={loading}
      expandable={{ expandedRowRender, rowExpandable }}
    />
  )
}
