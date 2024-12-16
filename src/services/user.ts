import { fetchAPIWithToken, fetchWithToken } from 'src/helpers/fetchWithToken'
import { type User } from 'src/interfaces/Auth'

interface Response {
  user: User
}

export const getUserbyId = async (id: string): Promise<Response> => {
  const user = await fetchWithToken({ endpoint: `users/${id}` })

  return user
}

interface responseUsers {
  users: User[] | null
}

export const getUsers = async (): Promise<[Error | null, responseUsers]> => {
  const resp = await fetchAPIWithToken({
    endpoint: 'users'
  })

  return resp
}

export const uploadSignature = async (svgContent: string): Promise<string> => {
  const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' })
  const formData = new FormData()
  formData.append('image', svgBlob, 'imagen.svg')

  const headers = { Authorization: `bearer ${localStorage.getItem('token')}` }

  const resp = await fetch('http://localhost:4000/api/users/signature/upload', {
    method: 'POST',
    body: formData,
    headers

  })

  const body = await resp.json()

  return body
}

export const getUserSignature = async (signature: string): Promise<Blob> => {
  const [error, response] = await fetchAPIWithToken({ endpoint: `uploads/signatures/${signature}`, isFile: true })

  if (error != null) throw new Error('error')

  return response
}
