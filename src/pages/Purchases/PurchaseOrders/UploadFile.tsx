import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useAppSelector } from 'src/hooks/useStore'
import PdfEditor from 'src/pdf/components/PdfEditor'
import { updateFile } from 'src/services/file'
import { createPurchaseOrder, updatePurchaseOrder, uploadPurchaseOrderFile } from 'src/services/purchases/api'
import { type PurchaseOrder } from 'src/services/purchases/transform'
import { type Archivo } from 'src/services/sales'
import { cleanPurchaseOrder } from 'src/store/purchase-orders/slice'
import { Typography } from 'antd'
import { Container } from 'src/components/Container/Container'

const { Title } = Typography

export const UploadFile: React.FC = () => {
  // const { id } = useParams()

  const order = useAppSelector(state => state.purchaseOrders.selected)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (order === null) {
      // getProscaiPurchaseOrders
    }
  }, [])

  const addPdfToPurchaseOrder = async (id: string, fileId: string): Promise<PurchaseOrder | undefined> => {
    const [error, purchaseOrder] = await updatePurchaseOrder(id, { file: fileId })

    if (error !== undefined) {
      toast.error('Hubo un error')
      return
    }

    return purchaseOrder
  }

  const addPurchaseOrderToFile = async (fileId: string, purchaseOrderId: string): Promise<Archivo | undefined> => {
    const [error, archivo] = await updateFile(fileId, { doc: purchaseOrderId })

    if (error !== undefined) {
      toast.error('Hubo un error')
      return
    }

    return archivo
  }

  const handleUploadFile = async (order: PurchaseOrder, pdf: File): Promise<true | Error> => {
    try {
      const [error, file] = await uploadPurchaseOrderFile(pdf)

      if (file === undefined) {
        return new Error('No hay File DB')
      }

      if (error !== undefined) {
        return new Error('Error al guardar la el archivo')
      }

      const [errorOrder, purchaseOrder] = await createPurchaseOrder(order)

      if (errorOrder !== undefined) {
        console.log(errorOrder)

        return new Error('Error al guardar la orden de compra')
      }

      if (purchaseOrder === undefined) {
        return new Error('No hay orden decompra DB')
      }

      await addPdfToPurchaseOrder(purchaseOrder?.id, file?.id)

      await addPurchaseOrderToFile(file.id, purchaseOrder.id)

      return true
    } catch (error) {
      console.log(error)
      return new Error('Hubo un error')
    }
  }

  const savePdf = async (pdf: File): Promise<void> => {
    if (order === undefined || order === null) {
      toast.error('No hay orden para guardar')
      return
    }

    if (pdf === undefined || order === null) return

    toast.promise(handleUploadFile(order, pdf), {
      loading: '...Subiendo',
      success: () => {
        return 'Subido Correctamente'
      },
      error: 'No se subio la orden',
      finally: () => {
        dispatch(cleanPurchaseOrder())
        navigate('/purchase-orders')
      }
    })
  }
  return (
    <Container>
      <Title level={3}>Subir Orden de compra</Title>
      <PdfEditor isLoading={isLoading} getPdf={savePdf} canAuthorize={false} canUpload={true}  />
    </Container>
  )
}
