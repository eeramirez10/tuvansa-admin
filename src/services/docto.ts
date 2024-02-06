import { fetchWithToken } from 'src/helpers/fetchWithToken'
import { getApiUrl } from 'src/helpers/getApiUrl'
import { type Docto } from 'src/interfaces/Docto'

const { API_URL } = getApiUrl()

interface DocsProscai {
  doctos: Doctos[]
}

interface Doctos {
  uid: string
  name: string
  fechaRegistro: string
  fechaPago: string
  docto: string
  referencia: string
  referenciaEllos: string
  montoFactura: number
  saldo: number
  pagado: number
}

interface ResponsePayments {
  doctos?: Docto[]
  error?: string
  ok?: boolean
}

interface ResponsePayment {
  docto?: Docto
  error?: string
  ok?: boolean
}

export const getAllDoctos = async ({ search = '' }: { search?: string }): Promise<ResponsePayments> => {
  const params = new URLSearchParams({

    search: search !== '' ? search.trim().toUpperCase() : ''

  })

  const resp = await fetchWithToken({ endpoint: `proscai/doctos?${params.toString()}`, method: 'GET' })
  return resp
}

export const getDoctoById = async ({ id }: { id: string }): Promise<ResponsePayment> => {
  const resp = await fetchWithToken({ endpoint: `proscai/doctos/${id}/detail`, method: 'GET' })
  return resp
}

export const getDocsBySupplier = async ({ supplierId }: { supplierId: string }): Promise<DocsProscai> => {
  const resp = await fetch(`${API_URL}/proscai/doctos/${supplierId}`, {
    method: 'GET'
  })
  const data = await resp.json()
  return data
}
