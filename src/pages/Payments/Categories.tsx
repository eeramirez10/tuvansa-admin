import { type ColumnsType } from 'antd/es/table'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Navigation } from 'src/UI/Navigation/Navigation'
import { DataTable } from 'src/components/DataTable/DataTable'
import { type Category } from 'src/interfaces/Category'
import { getCategories } from 'src/services/categories'

const columns: ColumnsType<Category> = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: '20%',
    render: (_, { id }) => {
      return (<Link to={`/payment/${id}/detail`} >{id.slice(5, 15)} </Link>)
    }
  },

  {
    title: 'Categoria',
    dataIndex: 'name',
    width: '20%',
    render: (_, value) => value.name
  }
]

export const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    getCategories()
      .then((resp) => {
        const { categories } = resp
        setCategories(categories)
      })
  }, [])

  console.log(categories)

  return (
    <>

      <Navigation name='Categorias' isNew={false} hasFile={true} />

      <DataTable columns={columns} data={categories} rowKey={(value) => value.id} />
    </>
  )
}
