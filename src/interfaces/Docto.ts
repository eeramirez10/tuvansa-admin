import { type BranchOffice } from './Inventory'
import type { Supplier } from './Supplier'

export interface Docto {
  idProscai: string
  factura: string
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
