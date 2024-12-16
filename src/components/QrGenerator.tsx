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
    <div style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', height: '100vh', paddingBottom: '25px', marginBottom: '30px'
    }}>
      {/* Título */}
      <div style={{

        textAlign: 'center'

      }} >
        <h1 style={{ fontSize: 55 }}><strong>{(inventario.description !== null) ? inventario.description.replace(/COD\. ART\.\s?R?\d*\s*/, '').trim() : 'Sin descripcion'} </strong></h1>
      </div>
      <div style={{ fontSize: 55 }} >  <u> <strong> {inventario.ean} </strong>  </u>  </div>
      <div style={{ fontSize: 55 }} > <strong> {inventario.cod} </strong>  </div>

      {/* QR Code */}
      <div>
        <QRCode
          style={{ display: 'block', margin: '0 auto' }}
          value={`inventarios.dyndns.org/${inventario.iseq ?? ''}`}
          size={350} // Ajusta el tamaño del QR si es necesario
        />
      </div>
    </div>
  )
}
