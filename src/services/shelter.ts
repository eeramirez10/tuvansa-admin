import { fetchWithToken } from 'src/helpers/fetchWithToken'
import { type Shelter } from 'src/interfaces/Inventory'

interface ShelterProps {
  id: string
}

interface ShelterReturn {
  shelter: Shelter
}

export const getShelter = async (props: ShelterProps): Promise<ShelterReturn> => {
  const { id } = props

  const resp = await fetchWithToken({ endpoint: `proscai/inventories/shelter/${id}` })
  return resp
}
