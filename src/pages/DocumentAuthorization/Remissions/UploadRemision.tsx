import React from 'react'

import { Container } from 'src/components/Container/Container'
import PdfEditor from 'src/pdf/components/PdfEditor'

export const UploadRemision: React.FC = () => {
  return (
    <Container>
      <PdfEditor canAuthorize={false} isLoading={false} />
    </Container>
  )
}
