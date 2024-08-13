import { fetchWithoutToken } from 'src/helpers/fetchWhithoutToken'
import { fetchWithToken } from 'src/helpers/fetchWithToken'

export interface Archivo {

  name: string
  originalName: string
  ext: string
  docModel: string
  createdAt: string
  updatedAt: string
  id: string
  doc: string

}

interface ArchivoUpdate {
  name?: string
  originalName?: string
  ext?: string
  docModel?: string
  createdAt?: string
  updatedAt?: string
  id?: string
  doc?: string
}

interface ArchivoResponse {
  file: Archivo
}

const DOC_MODELS = {
  remission: 'Remission',
  orders: 'PurchaseOrders'
} as const

export type docModelsValues = typeof DOC_MODELS[keyof typeof DOC_MODELS]

export const uploadFile = async (file: File, docModel: docModelsValues): Promise<[Error?, Archivo?]> => {
  const formdata = new FormData()
  formdata.append('file', file)
  formdata.append('docModel', docModel)

  try {
    const res = await fetchWithoutToken({
      endpoint: 'files',
      method: 'POST',
      body: formdata,
      isFile: true
    }) as ArchivoResponse

    return [undefined, res.file]
  } catch (error) {
    if (error instanceof Error) return [error]
  }

  return [new Error('Unknow error')]
}

export const updateFile = async (id: string, body: ArchivoUpdate): Promise<[Error?, Archivo?]> => {
  try {
    const resp = await fetchWithToken({ endpoint: `files/${id}`, method: 'PUT', body }) as ArchivoResponse

    return [undefined, resp.file]
  } catch (error) {
    if (error instanceof Error) return [error]
  }

  return [new Error('Unknow error')]
}

// export const downloadFile = async (id: string): Promise<Blob> => {
//   const response = await fetch(`http://localhost:4000/api/files/download/${id}`, {
//     method: 'GET'
//   })

//   return await response.blob()
// }
