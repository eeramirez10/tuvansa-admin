import { Button, Input, Space } from 'antd'
import React, { useEffect, useRef, useState } from 'react'

import { DataTable } from 'src/components/DataTable/DataTable'
import { Link } from 'react-router-dom'
import { type ColumnsType } from 'antd/es/table'
import { type InventoryProscai } from 'src/interfaces/Inventory'
import { SelectInput } from 'src/components/Selects/SelectInput'
import { useInventories } from 'src/hooks/useInventories'
import { QrcodeOutlined, SearchOutlined } from '@ant-design/icons'
import { QrGenerator } from 'src/components/QrGenerator'
import { useReactToPrint } from 'react-to-print'
const { Search } = Input

const DEFAULT_VALUES = {
  size: '100',
  withStock: 'true',
  family: 'TCC',
  almacen: '01'
}

export const InventoryPrint: React.FC = () => {
  const { onLoadInventories, inventories: data, isLoading } = useInventories()
  const [queries, setQueries] = useState(DEFAULT_VALUES)
  const [inputSearchValue, setInputSearchValue] = useState('')

  const contentRef = useRef<HTMLDivElement>(null)

  // Función para manejar la impresión
  const handlePrint = useReactToPrint({
    contentRef,
    pageStyle: `
     @page {
      size: landscape;
    }
    body {
      margin: 0;
      padding: 0;
    }
    
    `
  })

  const options = [
    { value: 'ACCESORIOS', label: 'ACCESORIOS' },
    { value: 'BRIDAS', label: 'BRIDAS' },
    { value: 'CONEXION ALTA PRESION', label: 'CONEXION ALTA PRESION' },
    { value: 'CONEXION SOLDAR', label: 'CONEXION SOLDAR' },
    { value: 'CONEXION SOLDAR VARIOS', label: 'CONEXION SOLDAR VARIOS' },
    { value: 'EMPAQUES Y JUNTAS', label: 'EMPAQUES Y JUNTAS' },
    { value: 'ESPARRAGOS Y TORNILLOS', label: 'ESPARRAGOS Y TORNILLOS' },
    { value: 'GRUVLOK', label: 'GRUVLOK' },
    { value: 'HDPE', label: 'HDPE' },
    { value: 'HIERRO MALEABLE', label: 'HIERRO MALEABLE' },
    { value: 'NIPLES', label: 'NIPLES' },
    { value: 'NO ASIGNADO', label: 'NO ASIGNADO' },
    { value: 'PLASTICO', label: 'PLASTICO' },
    { value: 'SOPORTERIA', label: 'SOPORTERIA' },
    { value: 'TCC', label: 'TCC' },
    { value: 'TSC', label: 'TSC' },
    { value: 'TUBERIA PARED DELGADA', label: 'TUBERIA PARED DELGADA' },
    { value: 'TUBO PLUS', label: 'TUBO PLUS' },
    { value: 'TUBOS VARIOS', label: 'TUBOS VARIOS' },
    { value: 'VALVULAS', label: 'VALVULAS' },
    { value: 'VARIOS', label: 'VARIOS' },
    { value: 'VICTAULIC', label: 'VICTAULIC' }
  ]

  const branchOfficeOptions = [
    {
      value: '01',
      label: 'Mexico'
    },
    {
      value: '02',
      label: 'Monterrey'
    },
    {
      value: '03',
      label: 'Veracruz'
    },
    {
      value: '04',
      label: 'Mexicali'
    },
    {
      value: '05',
      label: 'Queretaro'
    }, {
      value: '06',
      label: 'Cancun'
    }
  ]

  const stockOptions = [
    {
      value: 'true',
      label: 'Con Stock'
    },
    {
      value: 'false',
      label: 'Todos'
    }
  ]

  const columns: ColumnsType<InventoryProscai> = [
    {
      title: 'Iseq',
      dataIndex: 'iseq',
      width: 100,
      render: (_, { iseq }) => {
        return (<Link to={`/inventario/detail/${iseq}`} >{iseq} </Link>)
      },
      fixed: 'left'
    },
    {
      title: 'Cod',
      dataIndex: 'cod',
      width: 100
    },
    {
      title: 'Ean',
      dataIndex: 'ean',
      width: 100
    },
    {
      title: 'Familia',
      dataIndex: 'familyDescription',
      width: 100,

      ellipsis: true
    },
    {
      title: 'Descripcion',
      dataIndex: 'description',
      width: 100,

      ellipsis: true
    },
    {
      title: 'Cantidad',
      dataIndex: 'quantity',
      width: 100

    },
    {
      title: 'Costo',
      dataIndex: 'costo',
      width: 100

    }
  ]

  const handleOnchangeSelect = ({ value, name }: { value: string, name: string }): void => {
    console.log(value, name)

    setQueries(prev => ({ ...prev, [name]: value }))
  }

  const handleClickSearchButton = (): void => {
    console.log(inputSearchValue)
    setQueries(prev => ({ ...prev, search: inputSearchValue }))
  }

  const handleOnchageInputValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputSearchValue(event.target.value)
  }

  useEffect(() => {
    onLoadInventories({ from: 'proscai', queryParams: queries })
  }, [queries])
  return (

    <Space
      direction='vertical'
      size="middle" style={{ display: 'flex' }}
    >

      <Space direction='horizontal' align='center'>

        <Search
          placeholder="Buscar"
          value={inputSearchValue}
          onChange={handleOnchageInputValue}
          enterButton={
            <Button icon={<SearchOutlined />} onClick={handleClickSearchButton} />
          }
          loading={isLoading}
        />

        <SelectInput
          placeholder='Familia'
          defaultValue={DEFAULT_VALUES.family}
          handleOnChange={handleOnchangeSelect}
          options={options}
          name='family'
        />
        <SelectInput
          placeholder='Almacen'
          defaultValue={DEFAULT_VALUES.almacen}
          handleOnChange={handleOnchangeSelect}
          options={branchOfficeOptions}
          name='almacen'
        />
        <SelectInput
          placeholder='Stock'
          defaultValue={DEFAULT_VALUES.withStock}
          handleOnChange={handleOnchangeSelect}
          options={stockOptions}
          name='withStock'
        />

        <Button type='primary' icon={<QrcodeOutlined />} onClick={() => { handlePrint() }} loading={isLoading} >
          Imprimir
        </Button>

      </Space>

      <DataTable
        columns={columns}
        data={data}
        loading={isLoading}
        rowKey={(record) => record.iseq}
      />

      {
        data.length > 0 &&
        <div style={{ display: 'none' }} >
          <div ref={contentRef}>
            {data.map((inventario) => (
              <QrGenerator
                key={inventario.iseq}
                inventario={inventario} />
            ))}
          </div>

        </div>

      }

    </Space>
  )
}
