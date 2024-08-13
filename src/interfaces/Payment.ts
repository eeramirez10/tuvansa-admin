// import { type Dayjs } from 'dayjs'
import type { Supplier } from './Supplier'
import { type BranchOffice } from './Inventory'
import { type File } from './File'
import { type Creditor } from './Creditor'
import { type Dayjs } from 'dayjs'

export interface PaymentFormValues {
  category: string
  subcategory: string
  amount: number
  coin: coinValues
  branchOffice: string
  datePaid: Dayjs | Date
  supplier: string
  idSupplier: string
  creditor: string
  idCreditor: string
}

enum coinValues {
  MXN = 'MXN',
  USD = 'USD'
}

export interface FileId extends File {
  id: string
}

export interface Payment {
  id: string
  supplier: Supplier
  creditor: Creditor
  amount: number
  comments: string
  branchOffice: string
  datePaid: Date
  coin: {
    name: string
    code: coinValues
  }
  category: Category
  subcategory: Subcategory
  files: FileId[]
  proscai: Doctos | null
}

export interface Category {
  id: string
  name: string
}

export interface Subcategory {
  id: string
  name: string
}

export interface Doctos {
  id: string
  factura: string
  idProscai: string
  ordenCompra: string
  supplierFactura: string
  importePesos: string
  importeFactura: string
  saldo: string
  tipoCambio: string
  fecha: string
  supplier: Supplier
  branchOffice: BranchOffice
  coin: {
    name: string
    code: string
  }

}

export type PaymentId = Pick<Payment, 'id'>
