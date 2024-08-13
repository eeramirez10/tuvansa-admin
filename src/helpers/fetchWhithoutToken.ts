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
  body?: any
  isFile?: boolean
}

const { API_URL } = getApiUrl()

export const fetchWithoutToken = async ({ endpoint, method, body, isFile = false }: Props): Promise<any> => {
  const options = {
    method: method ?? METHOD_VALUES.GET,
    body: !isFile ? JSON.stringify(body) : body

  }

  const headers = isFile
    ? {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `bearer ${localStorage.getItem('token')}`
      }
    : {
        'Content-type': 'multipart/form-data; boundary=<calculated when request is sent>',
        Authorization: `bearer ${localStorage.getItem('token')}`
      }

  try {
    const resp = await fetch(`${API_URL}/${endpoint}`, { ...options, ...headers })

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
