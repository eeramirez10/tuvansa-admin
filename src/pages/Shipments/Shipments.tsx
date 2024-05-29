import React from 'react'

import { Space, Typography } from 'antd'
import { DataTable } from '../../components/DataTable/DataTable'
import { type Shipment } from '../../interfaces/Shipment'

import { currencyMXNFormat } from '../../helpers/formatCurrency'
import { useShipments } from 'src/hooks/useShipments'
const { Title } = Typography

export const Shipments: React.FC = () => {
  const { shipments, isLoading, columns } = useShipments()

  return (
    <>

      <Space direction='vertical' style={{ width: '100%' }} >
        {/* <InputSearch form={ form } handleSearch={ handleSearch } /> */}
        <Title level={3} >EMBARQUES</Title>
        <DataTable
          loading={isLoading}
          rowKey={(value) => value.factura}
          columns={columns}
          data={shipments}
          rowExpandable={(record: Shipment) => record.detail !== null}
          expandedRowRender={(record: Shipment) => ExpandRow({ shipment: record })}
        />
      </Space>

    </>
  )
}

const ExpandRow: React.FC<{ shipment: Shipment }> = ({ shipment: record }) => {
  const { detail } = record

  if (detail === null) return

  return (

    <>
      {
        detail.map((d, i) => (

          <div key={d.remision} style={{ display: 'flex', alignContent: 'center', justifyContent: 'space-around', gap: 20 }}>
            <div>
              <label><strong>Index</strong></label>
              <p>{i + 1}</p>
            </div>
            <div>
              <label><strong>Factura</strong></label>
              <p>{d.factura}</p>
            </div>
            <div>
              <label><strong>Remision </strong></label>
              <p>{d.remision}</p>
            </div>
            <div>
              <label> <strong>Druta  </strong>  </label>
              <p>{d.druta}</p>
            </div>
            <div>
              <label> <strong>Costo  </strong> </label>
              <p>{currencyMXNFormat({ value: (parseFloat(d.costo)) })}</p>
            </div>
          </div>
        )
        )
      }

    </>

  )
}
