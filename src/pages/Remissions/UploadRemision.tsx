import React from 'react'
import { useParams } from 'react-router-dom'

import { Container } from 'src/components/Container/Container'
import { useRemission } from 'src/hooks/useRemisson'
import PdfEditor from 'src/pdf/components/PdfEditor'

export const UploadRemision: React.FC = () => {
  const { id } = useParams()

  const { handleUploadRemissionAndFile, isLoading } = useRemission()

  const savePdf = async (pdf: File): Promise<void> => {
    if (id === undefined || pdf === undefined) return

    await handleUploadRemissionAndFile(id, pdf)
  }
  return (
    <Container>
      <PdfEditor isLoading={isLoading} getPdf={savePdf} canAuthorize={false} />
    </Container>
  )
}
