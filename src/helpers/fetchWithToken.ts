import { getApiUrl } from './getApiUrl'
import { toast } from 'sonner'

export const METHOD_VALUES = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE'
} as const

interface Props {
  endpoint: string
  method?: typeof METHOD_VALUES[keyof typeof METHOD_VALUES]
  body?: any
  abortController?: AbortController
}

// type Data = Array<Record<string, string>> | Record<string, string>

// interface ReturnFetch {
//   payments?: Payment[]
//   payment: Payment
//   error?: string
//   ok?: boolean
// }

const { API_URL } = getApiUrl()

export const fetchWithToken = async (props: Props): Promise<any> => {
  const { endpoint, method, body, abortController } = props

  const options = {
    signal: abortController?.signal,
    method: METHOD_VALUES.GET,
    headers: {
      Authorization: `bearer ${localStorage.getItem('token')}`
    }
  }

  const postOptions = {
    signal: abortController?.signal,
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `bearer ${localStorage.getItem('token')}`
    }
  }

  try {
    const resp = await fetch(`${API_URL}/${endpoint}`, method === 'GET' ? options : postOptions)

    const data = await resp.json()

    if (data.error !== undefined) {
      toast.error(data.error)
    }

    return data
  } catch (error) {
    console.log(error)
    toast.error('Hubo un error, hable con el administrador')
  }
}

export const fetchAPIWithToken = async (props: Props): Promise<[Error | null, any | null]> => {
  const { endpoint, method, body, abortController } = props

  const options = {
    signal: abortController?.signal,
    method: METHOD_VALUES.GET,
    headers: {
      Authorization: `bearer ${localStorage.getItem('token')}`
    }
  }

  const postOptions = {
    signal: abortController?.signal,
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `bearer ${localStorage.getItem('token')}`
    }
  }

  try {
    const resp = await fetch(`${API_URL}/${endpoint}`, method === 'GET' ? options : postOptions)

    const data = await resp.json()

    if (!resp.ok) {
      toast.error(data.error)
      return [new Error(`${resp.statusText}`), null]
    }

    return [null, data]
  } catch (error) {
    toast.error('Hubo un error, hable con el administrador')

    if (error instanceof Error) return [error, null]
  }

  return [new Error('Error desconocido'), null]
}
