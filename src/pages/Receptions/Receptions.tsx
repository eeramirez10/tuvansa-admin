import { getApiUrl } from 'src/helpers/getApiUrl'
import { Button, Form, Space } from 'antd'
import { type ColumnsType } from 'antd/es/table'
import React, { useState } from 'react'
import { DataTable } from 'src/components/DataTable/DataTable'
import { InputSearch } from 'src/components/InputSearch'
// import { OpenButtonModal } from 'src/components/OpenButtonModal'
import { type Reception } from 'src/interfaces/Reception'
import { getReceptions } from 'src/services/receptons'

const { URL } = getApiUrl()

export const Receptions: React.FC = () => {
  const [receptions, setReceptions] = useState<Reception[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [form] = Form.useForm()

  const columns: ColumnsType<Reception> = [
    {
      title: 'Fecha',
      dataIndex: 'dfecha',
      width: '20%',
      render: (_, { dfecha }) => dfecha.slice(0, 10)
    },

    {
      title: 'Doc',
      dataIndex: 'dnum',
      width: '20%',
      render: (_, value) => value.dnum
    },
    {
      title: 'Proveedor',
      dataIndex: 'proveedor',
      render: (_, value) => value.proveedor
    },
    {
      title: 'Cantidad',
      dataIndex: 'dcantf',
      render: (_, value) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(
        Number(value.dcantf)
      )
    },
    {
      title: 'Archivos',
      align: 'center',
      render: (_, { dnum, hasFile }) => hasFile
        ? <Button
        onClick={() => {
          window.open(`${URL}/public/RECEPCIONES/${dnum}.pdf`, '_blank')
        }}
      > {dnum}</Button>
        : ''
    }
  ]

  const handleSearch = ({ search }: { search: string }): void => {
    setIsLoading(true)
    getReceptions({ search })
      .then((resp) => {
        setReceptions(resp.receptions)
      })
      .catch((error) => { console.log(error) })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Space direction='vertical' style={{ width: '100%' }} >
      <InputSearch form={form} handleSearch={handleSearch} />
      <DataTable
        loading={isLoading}
        rowKey={(value) => value.dnum}
        columns={columns}
        data={receptions}
      />
    </Space>

  )
}
