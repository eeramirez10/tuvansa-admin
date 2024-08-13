// To parse this data:
//
//   import { Convert, SalesResponse } from "./file";
//
//   const salesResponse = Convert.toSalesResponse(json);

export interface SalesResponse {
  results: Sale[]
}

export interface Sale {
  nombre: string
  descripcion: string
  grupo: string
  presupuesto: number
  venta_neta: number
  venta_iva: number
  ejercido: number
  utilidad: number
  porcentaje: number
  NUM_COT: number
  IMP_COT: number
  month: string
  year: string
}
