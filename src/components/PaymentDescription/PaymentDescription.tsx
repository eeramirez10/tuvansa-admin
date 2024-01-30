import React from 'react'
import { type Payment } from 'src/interfaces/Payment'
import { Descriptions } from 'antd'
import type { DescriptionsProps } from 'antd'

interface Props {
  payment: Payment
}

export const PaymentDescription: React.FC<Props> = ({ payment }) => {
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Factura',
      children: payment?.factura
    },
    {
      key: '2',
      label: 'Orden de Compra',
      children: payment?.ordenCompra
    },
    {
      key: '3',
      label: 'Factura Proveedor',
      children: payment?.supplierFactura
    },
    {
      key: '4',
      label: 'Fecha',
      children: payment?.fecha
    },
    {
      key: '5',
      label: 'Proveedor',
      span: 2,
      children: payment?.supplier.name
    },
    {
      key: '6',
      label: 'Importe Factura',
      children: payment?.importeFactura
    },
    {
      key: '7',
      label: 'Importe en pesos',
      children: payment?.importePesos
    },
    {
      key: '8',
      label: 'Saldo',
      children: payment?.saldo
    },
    {
      key: '9',
      label: 'Tipo de cambio',
      children: payment?.tipoCambio
    },
    {
      key: '10',
      label: 'Moneda',
      children: payment?.coin.code
    }
  ]
  return (
    <Descriptions
      title="Detalle Pago"
      layout="vertical"
      bordered items={items}
    />
  )
}
