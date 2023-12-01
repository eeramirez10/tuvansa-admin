import { type Dayjs } from 'dayjs'

export interface PaymentBody {
  supplier: Supplier
  docto: string
  paid: number
  comments: string
  datePaid: Dayjs | Date
  files?: FileId[]
}

export interface PaymentForm {
  id?: string
  datePaid: Dayjs | Date
  supplier: string
  idProscai: string
  docto: string
  paid: number
  comments: string
}

export interface File {
  name: string
  ext: string
  createdAt: Date
  updatedAt: Date
}

export interface Supplier {
  idProscai: string
  name: string
}

export interface SupplierId extends Supplier {
  id: string
}

export interface FileId extends File {
  id: string
}

export interface Payment extends PaymentBody {
  id: string
}

export type PaymentId = Pick<Payment, 'id'>
