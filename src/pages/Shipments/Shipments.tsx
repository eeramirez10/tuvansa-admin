import React, { useEffect, useState } from 'react';
import { getShipments } from '../../services/shipment';
import { Alert, Space } from 'antd';
import { DataTable } from '../../components/DataTable/DataTable';
import { Shipment } from '../../interfaces/Shipment';
import { ColumnsType } from 'antd/es/table';
import { currencyMXNFormat } from '../../helpers/formatCurrency';

export const Shipments: React.FC = () => {
  const [ shipments, setShipments ] = useState<Shipment[]>( [] );
  const [ isLoading, setIsLoading ] = useState<boolean>( false );

  const columns: ColumnsType<Shipment> = [
    {
      title: 'Factura',
      dataIndex: 'factura',

      render: ( _, { factura } ) => factura
    },

    {
      title: 'Remision',
      dataIndex: 'remision',

      render: ( _, { remision } ) => remision
    },
    {
      title: 'Ruta',
      dataIndex: 'ruta',

      render: ( _, { ruta } ) => ruta
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      render: ( _, { fecha } ) => fecha.slice( 0, 10 )
    },
    {
      title: 'Cliente',
      dataIndex: 'cliente',
      render: ( _, { nombreCliente } ) => nombreCliente
    },
    {
      title: 'Agente',
      dataIndex: 'agente',
      render: ( _, { agente } ) => agente
    },
    {
      title: 'Costo',
      dataIndex: 'costo',
      render: ( _, { costo } ) => {
        const cost = parseFloat( costo );
        return cost === 0 ? '' : currencyMXNFormat( { value: ( cost ) } );
      }
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      render: ( _, { estado } ) => estado === '' ? <Alert message='Pendiente' type="info" /> : <Alert message='Entregado' type="success" />
    },
    {
      title: 'Entrega',
      dataIndex: 'entrega',
      render: ( _, { fechaFolio, estado } ) => estado !== '' ? fechaFolio.slice( 0, 10 ) : ''
    },

  ];


  useEffect( () => {
    setIsLoading( true );
    getShipments()
      .then( ( { shipments } ) => {
        setShipments( shipments );
      } )
      .finally( () => {
        setIsLoading( false );
      } );
  }, [] );
  return (
    <>
      {/* <Navigation name='Doctos' saveRef={null} /> */ }

      <Space direction='vertical' style={ { width: '100%' } } >
        {/* <InputSearch form={ form } handleSearch={ handleSearch } /> */ }
        <DataTable
          loading={ isLoading }
          rowKey={ ( value ) => value.factura }
          columns={ columns }
          data={ shipments }
          rowExpandable={ ( record: Shipment ) => record.detail !== null }
          expandedRowRender={ ( record: Shipment ) => ExpandRow( { shipment: record } ) }
        />
      </Space>

    </>
  );
};

const ExpandRow: React.FC<{ shipment: Shipment; }> = ( { shipment: record } ) => {
  const { detail } = record;

  if ( detail === null ) return;



  return (

    <>
      {
        detail.map( ( d, i ) => (

          <div key={ d.remision } style={ { display: 'flex', alignContent: 'center', justifyContent: 'space-around', gap: 20 } }>
            <div>
              <label><strong>Index</strong></label>
              <p>{ i + 1 }</p>
            </div>
            <div>
              <label><strong>Factura</strong></label>
              <p>{ d.factura }</p>
            </div>
            <div>
              <label><strong>Remision </strong></label>
              <p>{ d.remision }</p>
            </div>
            <div>
              <label> <strong>Druta  </strong>  </label>
              <p>{ d.druta }</p>
            </div>
            <div>
              <label> <strong>Costo  </strong> </label>
              <p>{ currencyMXNFormat( { value: ( parseFloat( d.costo ) ) } ) }</p>
            </div>
          </div>
        )
        )
      }


    </>




  );
};