import { fetchWithToken } from 'src/helpers/fetchWithToken'
import { type CountId } from 'src/interfaces/Inventory'

interface ReturnResponse {
  count: CountId
  error: string
}

export const deleteCount = async ({ id }: { id: string }): Promise<ReturnResponse> => {
  const resp = await fetchWithToken({ endpoint: `counts/${id}`, method: 'DELETE' })

  return resp
}
