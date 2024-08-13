import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Container } from 'src/components/Container/Container'
import PdfEditor from 'src/pdf/components/PdfEditor'
import { uploadFile } from 'src/services/file'
import { updatePurchaseOrder } from 'src/services/purchases/api'
import { downloadFile, updateRemission } from 'src/services/sales'
import { Typography } from 'antd'
import { useAppSelector } from 'src/hooks/useStore'
import { useAuth } from 'src/hooks/useAuth'
import { documentsAuthorization } from 'src/helpers/documentsAuthorization'
const { Title } = Typography

interface Params {
  id: string
  docId: string
  docModel: docModelsValues
}

const DOC_MODELS = {
  remission: 'remission',
  orders: 'order'
} as const

type docModelsValues = typeof DOC_MODELS[keyof typeof DOC_MODELS]

const AUTORIZE_DOC = {
  remission: updateRemission,
  order: updatePurchaseOrder
}

const Index: React.FC = () => {
  const { id, docId, docModel } = useParams<keyof Params>() as Params
  const [fileServer, SetFileServer] = useState<File>()
  const order = useAppSelector(state => state.purchaseOrders.selected)
  const { user } = useAuth()
  const navigate = useNavigate()

  const canAuthorize = (): boolean => {
    if (order === null) return false
    if (order.authorized) return false
    return documentsAuthorization.some(docAuth => user.documentsAuthorization.includes(docAuth))
  }

  useEffect(() => {
    if (id != null) {
      downloadFile(id)
        .then(([error, blobFile]) => {
          if (error != null) {
            return toast.warning(`${error.message}`)
          }

          if (blobFile === undefined) return toast.warning('No hay file')

          const { type } = blobFile

          const myFile = new File([blobFile], 'ejemplo.pdf', { type, lastModified: Date.now() })

          SetFileServer(myFile)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [])

  const handleAuthorize = async (signedFile: File): Promise<boolean | Error> => {
    try {
      const [error, uploadedFile] = await uploadFile(signedFile, 'Remission')

      if (error !== undefined) {
        return new Error('Hubo un error al subir el archivo')
      }

      const [err] = await AUTORIZE_DOC[docModel](docId, { signedFile: uploadedFile?.id, authorized: true })

      if (err !== undefined) return new Error('Hubo un error al autorizar')

      return true
    } catch (error) {
      if (error instanceof Error) {
        return error
      }
    }

    return new Error('Error desconocido')
  }

  const uploadAuthorizedPdf = async (signedFile: File): Promise<void> => {
    if (docId === undefined || docModel === undefined) return

    toast.promise(handleAuthorize(signedFile), {
      success: () => {
        return 'Autorizado Correctamente'
      },
      error: () => {
        return 'Error Al autorizar'
      },
      finally: () => {
        navigate('/doc-auth/orders')
      }
    })
  }

  return (
    <Container>
      <Title level={3}>Firmar documento</Title>

      {
        (fileServer !== undefined)
          ? <PdfEditor
            fileServer={fileServer}
            getSignedPdf={uploadAuthorizedPdf}
            canAuthorize={canAuthorize()}
            canUpload={false}
            isLoading={false}
          />
          : <></>

      }

    </Container>
  )
}

export default Index
