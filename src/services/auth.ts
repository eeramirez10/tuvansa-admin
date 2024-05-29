import { METHOD_VALUES, fetchAPIWithToken } from 'src/helpers/fetchWithToken'
import { getApiUrl } from 'src/helpers/getApiUrl'
import { type User } from 'src/interfaces/Auth'

const { API_URL } = getApiUrl()

export interface LoginProps {
  username: string
  password: string
}

interface Response {
  user: User
  token: string
  error?: string
}

// interface ResponseError {
//   error: string
// }

export const login = async (props: LoginProps): Promise<Response> => {
  const { username, password } = props
  const resp = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ username, password })

  })
  const body = await resp.json()

  return body
}

export const renewToken = async (): Promise<Response> => {
  const resp = await fetch(`${API_URL}/auth/renew`, {
    method: 'POST',
    headers: {
      Authorization: `bearer ${localStorage.getItem('token')}`
    }
  })

  const body = await resp.json()

  return body
}

export const createUser = async (user: User): Promise<[Error | null, User | null]> => {
  const resp = await fetchAPIWithToken({
    endpoint: 'auth/register',
    method: METHOD_VALUES.POST,
    body: user
  })

  return resp
}
