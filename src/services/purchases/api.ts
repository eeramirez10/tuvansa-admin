import { fetchWithToken } from 'src/helpers/fetchWithToken'
import { dtoToPurchaseOrder, type PurchaseOrderUpdate, type PurchaseOrder } from './transform'

import { fetchWithoutToken } from 'src/helpers/fetchWhithoutToken'
import { type Archivo, type ArchivoResponse } from '../sales'
import { type PurchasesProscaiResponse } from './dto'

export const getProscaiPurchaseOrders = async (): Promise<PurchaseOrder[]> => {
  const purchaseOrders = await fetchWithToken({
    endpoint: 'proscai/purchases/orders'
  }) as PurchasesProscaiResponse

  const dtoToPurchaseOrde = purchaseOrders.results.map(po => dtoToPurchaseOrder(po))

  return dtoToPurchaseOrde
}

export const getPurchaseOrders = async (): Promise<PurchaseOrder[]> => {
  const resp = await fetchWithToken({
    endpoint: 'purchases/orders'
  })

  return resp.results
}

export const uploadPurchaseOrderFile = async (file: File): Promise<[Error?, Archivo?]> => {
  const formdata = new FormData()
  formdata.append('file', file)
  formdata.append('docModel', 'PurchaseOrders')

  try {
    const res = await fetchWithoutToken({ endpoint: 'files', method: 'POST', body: formdata, isFile: true }) as ArchivoResponse

    return [undefined, res.file]
  } catch (error) {
    if (error instanceof Error) return [error]
  }

  return [new Error('Unknow error')]
}

export const createPurchaseOrder = async (order: PurchaseOrder): Promise<[Error?, PurchaseOrder?]> => {
  try {
    const res = await fetchWithToken({ endpoint: 'purchases/orders', body: order, method: 'POST' })

    return [undefined, res.result]
  } catch (error) {
    if (error instanceof Error) return [error]
  }

  return [new Error('Unknow error')]
}

export const updatePurchaseOrder = async (id: string, order: PurchaseOrderUpdate): Promise<[Error?, PurchaseOrder?]> => {
  try {
    const res = await fetchWithToken({ endpoint: `purchases/orders/${id}`, body: order, method: 'PUT' })

    return [undefined, res.result]
  } catch (error) {
    if (error instanceof Error) return [error]
  }
  return [new Error('Unknow error')]
}
