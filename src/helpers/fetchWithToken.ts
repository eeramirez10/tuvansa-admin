import { getApiUrl } from './getApiUrl'
import { toast } from 'sonner'

export const METHOD_VALUES = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  PATCH: 'PATCH'
} as const

interface Props {
  endpoint: string
  method?: typeof METHOD_VALUES[keyof typeof METHOD_VALUES]
  body?: Record<string, unknown>
}

// interface ReturnFetch {
//   payments?: Payment[]
//   payment: Payment
//   error?: string
//   ok?: boolean
// }

const { API_URL } = getApiUrl()

export const fetchWithToken = async ({ endpoint, method, body }: Props): Promise<any> => {
  const options = {
    method: METHOD_VALUES.GET,
    headers: {
      Authorization: `bearer ${localStorage.getItem('token')}`
    }

  }

  const postOptions = {
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
