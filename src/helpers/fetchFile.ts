import { getApiUrl } from './getApiUrl'

const { API_URL } = getApiUrl()

export const fetchFile = async ({ id }: { id: string }): Promise<[Error?, Blob?]> => {
  try {
    const response = await fetch(`${API_URL}/files/download/${id}`, {
      method: 'GET'
    })

    if (!response.ok) {
      return [new Error(`${response.statusText}`)]
    }

    return [undefined, await response.blob()]
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      return [error]
    }
  }

  return [new Error('Uknow Error')]
}
