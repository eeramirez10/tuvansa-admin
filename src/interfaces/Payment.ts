import { type Dayjs } from 'dayjs'
import type { Supplier } from './Supplier'

export interface PaymentBody {
  supplier: Supplier
  doctos: Docto
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
  id?: string
  datePaid: Dayjs | Date
  supplier: string
  idProscai: string
  docto: string
  paid: number
  comments: string
}

export interface FileId extends File {
  id: string
}

export interface Payment extends PaymentBody {
  id: string
}

export type PaymentId = Pick<Payment, 'id'>
