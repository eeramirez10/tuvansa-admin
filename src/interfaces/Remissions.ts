import { type Archivo } from 'src/services/sales'
import { type User } from './Auth'

export interface RemissionResponse {
  remission: Remission
}

export interface Remission {
  proscai: string
  dateProscai: string
  remission: string
  order: string
  customer: string
  amount: string
  agent: string
  authorized: boolean
  authorizedBy: User
  file?: Archivo
  signedFile?: string
  user: User
  createdAt: string
  updatedAt: string
  id: string
}

export interface RemissionsProscaiResponse {
  results: RemissionProscai[]
}

export interface RemissionProscai {
  DSEQ: number
  DFECHA: string
  DNUM: string
  DREFER: string
  DREFERELLOS: string
  CLIENTE: string
  IMPORTE: string
  AGDESCR: string
}
