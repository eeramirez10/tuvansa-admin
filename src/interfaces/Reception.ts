export interface ReceptionResponse {
  receptions: Reception[]
}

export interface Reception {
  dfecha: string
  dnum: string
  ditipmv: string
  drefer: string
  dreferellos: string
  proveedor: string
  dcantf: string
  dcfdiuuid: string
  hasFile: boolean
}
