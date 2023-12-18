import { getApiUrl } from 'src/helpers/getApiUrl'

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

export const getDocsBySupplier = async ({ supplierId }: { supplierId: string }): Promise<DocsProscai> => {
  const resp = await fetch(`${API_URL}/proscai/doctos/${supplierId}`, {
    method: 'GET'
  })
  const data = await resp.json()
  return data
}
