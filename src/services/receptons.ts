import { fetchWithoutToken } from 'src/helpers/fetchWhithoutToken'
import { METHOD_VALUES } from 'src/helpers/fetchWithToken'
import { type ReceptionResponse } from 'src/interfaces/Reception'

interface Options {
  page?: string
  size?: string
  search?: string
}

export const getReceptions = async (options: Options): Promise<ReceptionResponse> => {
  const { page = '', size = '10', search = '' } = options

  const params = new URLSearchParams({
    search: search !== undefined ? search.trim().toUpperCase() : '',
    page,
    size
  })

  const response = await fetchWithoutToken({ endpoint: `proscai/receptions?${params.toString()}`, method: METHOD_VALUES.GET })

  return response
}
