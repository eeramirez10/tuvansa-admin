import { getApiUrl } from 'src/helpers/getApiUrl'

const { API_URL } = getApiUrl()

interface SupplierProscai {
  suppliers: SupplierProscai[]

}

interface SupplierProscai {
  uid: string
  name: string
}

export const getSuppliersProscai = async ({ search }: { search: string }): Promise<SupplierProscai> => {
  const resp = await fetch(`${API_URL}/proscai/suppliers?search=${search}`)
  const items = await resp.json()
  return items
}
