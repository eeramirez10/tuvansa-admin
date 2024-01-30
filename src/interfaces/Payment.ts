// import { type Dayjs } from 'dayjs'
import type { Supplier } from './Supplier'
import { type BranchOffice } from './Inventory'
import { type File } from './File'

export interface PaymentBody extends PaymentForm {

}

export interface Docto {
  name: string
  references: string
  dateProscai: Date
  amount: number
  balance: number
  paid: number
  file?: File
  supplier: Supplier
}

export interface PaymentForm {
  idProscai: string
  category: string
}

export interface FileId extends File {
  id: string
}

export interface Payment {
  idProscai: string
  id: string
  factura: string
  ordenCompra: string
  supplierFactura: string
  importePesos: string
  importeFactura: string
  saldo: string
  moneda: number
  tipoCambio: string
  cancelada: number
  fecha: string
  supplier: Supplier
  branchOffice: BranchOffice
  category: string
  coin: {
    name: string
    code: string
  }
  files: FileId []
}

export type PaymentId = Pick<Payment, 'id'>
