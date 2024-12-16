import React, { useEffect, useState } from 'react';
import { Space, Button, Tag } from 'antd';
import { useInventories } from 'src/hooks/useInventories';
import { DataTable } from 'src/components/DataTable/DataTable';
import { currencyMXNFormat } from 'src/helpers/formatCurrency';
import type { ColumnsType } from 'antd/es/table';
import { ReleaseInventories } from 'src/components/ReleaseInventories';
import { useExcel } from 'src/hooks/useExcel';
import { CountId } from 'src/interfaces/Inventory';
import { formatDate } from 'src/helpers/formatDate';

export const ListOfCounts: React.FC = () => {
  const { inventories, onLoadInventories, releaseInventories, isLoading: loading } = useInventories();
  const { handleDownloadExcel } = useExcel();

  const [showFiltered, setShowFiltered] = useState(false); // Estado para alternar entre todas o filtradas

  useEffect(() => {
    onLoadInventories({});
  }, []);

  // Filtrar inventarios con diferencias mayores a 0
  const filteredInventories = inventories.filter(inventory => {
    const quantity = parseFloat(inventory.quantity); // Convertir quantity a número
    const count = inventory.counts[0]?.count || 0; // Obtener el primer count o 0 si no existe
    const difference = Math.abs(quantity - count); // Diferencia absoluta

    return difference > 0; // Solo incluir si hay diferencia (amarillo o rojo)
  });

  // Determinar qué datos mostrar según el estado
  const dataToShow = showFiltered ? filteredInventories : inventories;

  // Columnas originales
  const columns: ColumnsType<any> = [
    {
      title: 'Iseq',
      dataIndex: 'iseq',
    },
    {
      title: 'Cod',
      dataIndex: 'cod',
    },
    {
      title: 'Ean',
      dataIndex: 'ean',
    },
    {
      title: 'Descripcion',
      dataIndex: 'description',
      responsive: ['lg'],
    },
    {
      title: 'Existencia',
      dataIndex: 'quantity',
      render: (quantity, record) => {
        const quantityValue = parseFloat(quantity); // Convertir quantity a número
        const countValue = record.counts[0]?.count || 0; // Obtener el primer count
        const difference = Math.abs(quantityValue - countValue); // Diferencia absoluta

        let color = '';
        if (difference === 0) {
          color = 'green';
        } else if (difference <= 10) {
          color = 'yellow';
        } else {
          color = 'red';
        }

        return (
          <Tag color={color}>
            {quantityValue}
          </Tag>
        );
      },
    },
    {
      title: 'Costo',
      dataIndex: 'costo',
      render: (_, { costo }) => currencyMXNFormat({ value: Number(costo) }),
    },
    {
      title: 'Conteos',
      key: 'counts',
      dataIndex: 'counts',
      render: (_, { counts }) => (
        <>
          {counts.slice(0, 5).map((count, i) => (
            <Tag key={i}>conteo {i + 1}: {count.count}</Tag>
          ))}
        </>
      ),
      responsive: ['lg'],
    },
    {
      title: 'Suc',
      dataIndex: 'branchOffice',
      render: (_, value) => value?.name ?? 'Mexico',
    },
  ];

  const expandedColumns: ColumnsType<CountId> = [
    {
      title: 'conteo',
      dataIndex: 'count'
    },
    {
      title: 'cantidad',
      dataIndex: 'inventory',
      render: (_, value) => value?.inventory?.quantity ?? ''
    },
    {
      title: 'creacion',
      dataIndex: 'createdAt',
      render: (_, value) => formatDate(value.createdAt)
    },
    {
      title: 'Usuario',
      dataIndex: 'user',
      render: (_, value) => value.user?.username ?? ''
    }
  ]

  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      {/* Botón para alternar entre todas y filtradas */}
      <Button onClick={() => setShowFiltered(!showFiltered)}>
        {showFiltered ? 'Mostrar Todos' : 'Mostrar Amarillo y Rojo'}
      </Button>

      {/* Botón para descargar Excel */}
      <Button
        onClick={() =>
          handleDownloadExcel({
            body: () => dataToShow,
            header: ['Iseq', 'Cod', 'EAN', 'Descripcion', 'Existencia', 'Costo', 'Suc'],
            fileName: showFiltered ? 'Conteos_Filtrados' : 'Todos_Conteos',
          })
        }
      >
        Descargar Excel
      </Button>

      {/* Tabla de datos */}
      <DataTable
        columns={columns}
        data={dataToShow}
        rowKey={(record: any) => record.iseq}
        loading={loading}
        expandedRowRender={(record: any) => (
          <DataTable
            columns={expandedColumns}
            data={record.counts ?? []}
            rowKey={(record: any) => record.iseq}
            loading={false}
          />
        )}
      />
    </Space>
  );
};
