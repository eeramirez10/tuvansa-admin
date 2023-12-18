import type { Supplier } from './Supplier'

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
