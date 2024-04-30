import React from 'react'
import { Container } from 'src/components/Container/Container'
import { CategoryForm } from '../Categories/CategoryForm'

export const NewCategory: React.FC = () => {
  return (
    <Container>
      <h1>Agregar Categoria</h1>
      <CategoryForm />
    </Container >
  )
}
