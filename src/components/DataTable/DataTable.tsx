import { Table } from 'antd'
import { type ColumnsType } from 'antd/es/table'
import { type DefaultRecordType, type ExpandedRowRender } from 'rc-table/lib/interface'
import React from 'react'

interface Props {
  columns: ColumnsType<any>
  data: any[]
  loading: boolean
  expandedRowRender?: ExpandedRowRender<DefaultRecordType> | undefined
}

export const DataTable: React.FC<Props> = ({ columns, data, loading, expandedRowRender }) => {
  return (
    <Table
      columns={columns}
      rowKey={(record) => record.iseq}
      dataSource={data}
      loading = {loading}
      expandable={{ expandedRowRender }}
    />
  )
}
