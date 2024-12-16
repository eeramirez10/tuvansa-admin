import { Space } from 'antd'
import { type ColumnsType } from 'antd/es/table'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
// import { Navigation } from 'src/UI/Navigation/Navigation'
import { DataTable } from 'src/components/DataTable/DataTable'
import { InputSearch } from 'src/components/InputSearch'
import { useDoctos } from 'src/hooks/useDoctos'
import { type Docto } from 'src/interfaces/Docto'

export const Doctos: React.FC = () => {
  const { getAll, doctos, form, isLoading } = useDoctos()

  const columns: ColumnsType<Docto> = [
    {
      title: 'Docto',
      dataIndex: 'docto',
      width: '20%',
      render: (_, { idProscai }) => {
        return (<Link to={`/docto/${idProscai}/detail`} >{idProscai} </Link>)
      }
    },

    {
      title: 'Moneda',
      dataIndex: 'coin',
      width: '20%',
      render: (value) => value.code
    },
    {
      title: 'Fecha de pago',
      dataIndex: 'fecha',
      render: (_, value) => value.fecha.slice(0, 10)
    },
    {
      title: 'Importe',
      dataIndex: 'importeFactura',
      render: (_, value) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(
        Number(value.importeFactura)
      )
    },
    {
      title: 'Importe MXN',
      dataIndex: 'importePesos',
      render: (_, value) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(
        Number(value.importePesos)
      )
    },
    {
      title: 'Saldo',
      dataIndex: 'saldo',
      render: (_, value) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(
        Number(value.saldo)
      )
    }
    // {
    //   title: 'Archivos',
    //   align: 'center',
    //   render: (_, { id }) => <OpenButtonModal id={id} />
    // }
  ]

  useEffect(() => {
    getAll({})
  }, [])

  const handleSearch = ({ search }: { search: string }): void => {
    getAll({ search })
  }

  return (
    <>
      {/* <Navigation name='Doctos' saveRef={null} /> */}

      <Space direction='vertical' style={{ width: '100%' }} >
        <InputSearch form={form} handleSearch={handleSearch} />
        <DataTable
          loading={isLoading}
          rowKey={(value) => value.idProscai}
          columns={columns}
          data={doctos}
          expandedRowRender={(record: Docto) => PaymentExpandRow({ docto: record })}
        />
      </Space>

    </>
  )
}

interface Props {
  docto: Docto
}

const PaymentExpandRow: React.FC<Props> = ({ docto: record }) => {
  return (
    <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'space-around', gap: 20 }}>
      <div>
        <label>Proveedor</label>
        <p>{record.supplier.name}</p>
      </div>
      <div>
        <label>Factura Proveedor</label>
        <p>{record.supplierFactura}</p>
      </div>
      <div>
        <label>Factura </label>
        <p>{record.factura}</p>
      </div>
      <div>
        <label>Orden de Compra</label>
        <p>{record.ordenCompra}</p>
      </div>
      <div>
        <label>Factura Proveedor</label>
        <p>{record.supplierFactura}</p>
      </div>

    </div>

  )
}
