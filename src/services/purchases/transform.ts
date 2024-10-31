import { type User } from 'src/interfaces/Auth'
import { type Archivo } from '../file'
import { type purchaseOrderDTO } from './dto'

export interface PurchaseOrder {
  id: string
  proscai: string
  provider: string
  purchaseOrder: string
  pedPrv: string
  from: string
  due: string
  warehouse: string
  captureDate: string
  pcs: string
  amount: string
  currency: string
  exchangeRate: string
  userOrder: string
  comment: string
  authorized: boolean
  file?: Archivo
  signedFile?: string
  user?: string
  authorizedBy?: User
}

export interface PurchaseOrderUpdate {
  id?: string
  proscai?: string
  provider?: string
  createdAt?: string
  purchaseOrder?: string
  pedPrv?: string
  from?: string
  due?: string
  warehouse?: string
  captureDate?: string
  pcs?: string
  amount?: string
  currency?: string
  exchangeRate?: string
  userOrder?: string
  comment?: string
  authorized?: boolean
  file?: string
  signedFile?: string
  user?: string
  authorizedBy?: string
}

export const dtoToPurchaseOrder = (purchaseOrder: purchaseOrderDTO): PurchaseOrder => ({
  id: purchaseOrder.ID,
  proscai: purchaseOrder.ID,
  provider: purchaseOrder.PROVEEDOR,
  createdAt: purchaseOrder.createdAt,
  purchaseOrder: purchaseOrder.OC,
  pedPrv: purchaseOrder.PED_PRV,
  from: purchaseOrder.DESDE,
  due: purchaseOrder.VENCE,
  warehouse: purchaseOrder.ALMACEN,
  captureDate: purchaseOrder.FEC_CAPTURA,
  pcs: purchaseOrder.PZAS,
  amount: purchaseOrder.IMPORTE,
  currency: purchaseOrder.MONEDA,
  exchangeRate: purchaseOrder.TC,
  userOrder: purchaseOrder.USUARIO,
  comment: purchaseOrder.COMENTARIO,
  authorized: false
})
