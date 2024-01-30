import { type ColumnsType } from 'antd/es/table'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Navigation } from 'src/UI/Navigation/Navigation'
import { DataTable } from 'src/components/DataTable/DataTable'
import { useDoctos } from 'src/hooks/useDoctos'
import { type Payment } from 'src/interfaces/Payment'

export const Doctos: React.FC = () => {
  const { getAll, doctos } = useDoctos()

  const columns: ColumnsType<Payment> = [
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
        expandedRowRender={(record: Payment) => PaymentExpandRow({ payment: record })}
      />
    </>
  )
}

interface Props {
  payment: Payment
}

const PaymentExpandRow: React.FC<Props> = ({ payment: record }) => {
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
