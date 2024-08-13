export interface purchaseOrderDTO {
  ID: string
  PROVEEDOR: string
  OC: string
  PED_PRV: string
  DESDE: string
  VENCE: string
  ALMACEN: string
  FEC_CAPTURA: string
  PZAS: string
  IMPORTE: string
  MONEDA: string
  TC: string
  USUARIO: string
  COMENTARIO: string
}

export interface PurchasesProscaiResponse {
  results: purchaseOrderDTO[]
}
