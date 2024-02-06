import { getApiUrl } from 'src/helpers/getApiUrl'

const { API_URL } = getApiUrl()

interface CreditorProscai {
  creditors: [{
    uid: string
    name: string
  }]
}

export const getCreditorsProscai = async ({ search }: { search: string }): Promise<CreditorProscai> => {
  const resp = await fetch(`${API_URL}/proscai/creditors?search=${search}`)
  const items = await resp.json()
  return items
}
