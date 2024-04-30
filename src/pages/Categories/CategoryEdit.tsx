import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CategoryForm } from './CategoryForm'
import { getCategoryById } from 'src/services/categories'
import { type Category } from 'src/interfaces/Category'
import { Navigation } from 'src/UI/Navigation/Navigation'

export const CategoryEdit: React.FC = () => {
  const { id } = useParams()
  const [category, setCategory] = useState<Category>()

  useEffect(() => {
    if (id !== undefined) {
      getCategoryById({ id })
        .then(({ category }) => { setCategory(category) })
    }
  }, [])
  return (
    <>
      <Navigation name='Categorias' isNew={false} hasFile={false} />
      <CategoryForm category={category} />
    </>
  )
}
