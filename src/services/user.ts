import { fetchWithToken } from 'src/helpers/fetchWithToken'
import { type User } from 'src/interfaces/Auth'

interface Response {
  user: User
}

export const getUserbyId = async (id: string): Promise<Response> => {
  const user = await fetchWithToken({ endpoint: `users/${id}` })

  return user
}
