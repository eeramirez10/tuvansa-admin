import { type ColumnsType } from 'antd/es/table'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Navigation } from 'src/UI/Navigation/Navigation'
import { DataTable } from 'src/components/DataTable/DataTable'
import { useDoctos } from 'src/hooks/useDoctos'
import { type Docto } from 'src/interfaces/Docto'

export const Doctos: React.FC = () => {
  const { getAll, doctos } = useDoctos()

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
      dataIndex: 'fecha'
    },
    {
      title: 'Importe',
      dataIndex: 'importeFactura'
    },
    {
      title: 'Importe MXN',
      dataIndex: 'importePesos'
    },
    {
      title: 'Saldo',
      dataIndex: 'saldo'
    }
    // {
    //   title: 'Archivos',
    //   align: 'center',
    //   render: (_, { id }) => <OpenButtonModal id={id} />
    // }
  ]

  useEffect(() => {
    getAll()
  }, [])

  return (
    <>
      <Navigation name='Doctos' saveRef={null} />
      <DataTable
        rowKey={(value) => value.idProscai}
        columns={columns}
        data={doctos}
        expandedRowRender={(record: Docto) => PaymentExpandRow({ docto: record })}
      />
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
