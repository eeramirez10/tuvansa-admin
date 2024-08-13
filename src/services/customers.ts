import { getApiUrl } from 'src/helpers/getApiUrl'

const { API_URL } = getApiUrl()

interface CustomerProscai {
  uid: string
  name: string
  AGTNUM: string
  AGDESCR: string

}

export const getCustomersProscai = async ({ search }: { search: string }): Promise<CustomerProscai[]> => {
  const resp = await fetch(`${API_URL}/proscai/customers?search=${search}`)
  const items = await resp.json()
  return items
}
