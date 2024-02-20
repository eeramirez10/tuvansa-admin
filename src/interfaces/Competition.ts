const EFECTO_COMPROBANTE_VALUES = {
  INGRESO: 'Ingreso',
  EGRESO: 'Egreso',
  NOMINA: 'Nomina'
} as const

export type EfectoComprobanteValues = typeof EFECTO_COMPROBANTE_VALUES[keyof typeof EFECTO_COMPROBANTE_VALUES ]

export interface Competition {
  RfcEmisor: string
  NombreRazonSocialEmisor: string
  anio: number
  ingresos?: Egreso[]
  egresos?: Egreso[]
  pagos?: Egreso[]
  nominas?: Egreso[]
  traslados?: Egreso[]
}

export interface Egreso {
  subTotalPorMes: number
  totalPorMes: number
  mes: number
  EfectoComprobante: EfectoComprobante
}

export enum EfectoComprobante {
  Egreso = 'Egreso',
  Ingreso = 'Ingreso',
  Nómina = 'Nómina',
  Pago = 'Pago',
  Traslado = 'Traslado',
}

export interface CompetitionCustomer {

  anio: number
  RfcReceptor: string
  NombreRazonSocialReceptor: string
  totalPorAnio: number
  subTotalPorAnio: number
  EstadoComprobante: string
  EfectoComprobante: string

}
