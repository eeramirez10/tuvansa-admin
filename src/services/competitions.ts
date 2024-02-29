import { METHOD_VALUES, fetchWithToken } from 'src/helpers/fetchWithToken'
import { type EfectoComprobanteValues, type Competition } from 'src/interfaces/Competition'
import { type CompetitionCustomer } from '../interfaces/Competition'

interface Response {
  competitions: Competition[]
}

export const getCompetitions = async (): Promise<Response> => {
  const resp = await fetchWithToken({ endpoint: 'competitions', method: METHOD_VALUES.GET })

  return resp
}

export const getCompetition = async ({ RfcEmisor, EfectoComprobante = 'Ingreso', year = '2022' }: { RfcEmisor: string, EfectoComprobante?: EfectoComprobanteValues, year?: string }): Promise<{ competition: Competition }> => {
  const params = new URLSearchParams({ EfectoComprobante, year })
  const resp = await fetchWithToken({ endpoint: `competitions/${RfcEmisor}?${params.toString()}`, method: METHOD_VALUES.GET })

  return resp
}
export const getCustomersByCompetition = async ({ RfcEmisor, EfectoComprobante = 'Ingreso', year = '2022' }: { RfcEmisor: string, EfectoComprobante?: EfectoComprobanteValues, year?: string }): Promise<{ customers: CompetitionCustomer[] }> => {
  const params = new URLSearchParams({ EfectoComprobante, year })
  const resp = await fetchWithToken({ endpoint: `competitions/customers/${RfcEmisor}?${params.toString()}`, method: METHOD_VALUES.GET })

  return resp
}
