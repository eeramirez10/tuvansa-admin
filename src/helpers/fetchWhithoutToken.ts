import { toast } from 'sonner'
import { getApiUrl } from './getApiUrl'

const METHOD_VALUES = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT'
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

export const fetchWithoutToken = async ({ endpoint, method, body }: Props): Promise<any> => {
  const options = {
    method: METHOD_VALUES.GET
  }

  const postOptions = {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
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
