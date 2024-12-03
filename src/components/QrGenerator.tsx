import React from 'react'
import { Col, Row, Typography } from 'antd'
import QRCode from 'qrcode.react'

import './QrGenerator.css'
import { type Inventory } from 'src/interfaces/Inventory'

interface QrToPrintInventarioProps {
  inventario: Inventory
}

export const QrGenerator: React.FC<QrToPrintInventarioProps> = ({ inventario }) => {
  return (
    <>
      <Row
        justify="center"
        align="middle"
        style={{
          minHeight: '100vh',
          textAlign: 'center',
          // borderBottom: inventario.length - 1 ? '1px solid #f0f0f0' : 'none',
          paddingBottom: '20px',
          marginBottom: '20px'
        }}
      >
        {/* Título */}
        <Col span={24} style={{ marginBottom: '30px' }}>
          <Typography.Title style={{ fontSize: 55 }} > <strong>{inventario.description}</strong> </Typography.Title>

        </Col>

        {/* Código EAN */}
        <Col span={24} style={{ marginBottom: '30px' }}>
          <div style={{ fontSize: 55, marginBottom: 30 }} >  <u> <strong> {inventario.ean} </strong>  </u>  </div>

        </Col>

        {/* Código ICOD */}
        <Col span={24} style={{ marginBottom: '50px' }}>
          <div style={{ fontSize: 55, marginBottom: 50 }} > <strong> {inventario.cod} </strong>  </div>
        </Col>

        {/* QR Code */}
        <Col span={24}>
          <QRCode
            style={{ display: 'block', margin: '0 auto' }}
            value={`inventarios.dyndns.org/${inventario.iseq ?? ''}`}
            size={320}
          />
        </Col>
      </Row>
    </>
  )
}
