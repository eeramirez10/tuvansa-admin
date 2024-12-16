import { fetchFile } from 'src/helpers/fetchFile'
import { fetchWithoutToken } from 'src/helpers/fetchWhithoutToken'
import { fetchAPIWithToken, fetchWithToken } from 'src/helpers/fetchWithToken'
import { type User } from 'src/interfaces/Auth'
import { type Remission, type RemissionsProscaiResponse } from 'src/interfaces/Remissions'
import { type SalesResponse } from 'src/interfaces/Sales'

export interface ArchivoResponse {
  file: Archivo
}

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

interface RemissionResponse {
  remission: Remission
}

interface RemissionsResponse {
  remissions: Remission[]
}

interface RemissionUpdate {
  proscai?: string
  dateProscai?: string
  remission?: string
  order?: string
  customer?: string
  amount?: string
  agent?: string
  authorized?: boolean
  authorizedBy?: User
  file?: string
  signedFile?: string
  user?: User
}

// export interface Remission {
//   proscai: string
//   dateProscai: string
//   remission: string
//   order: string
//   customer: string
//   amount: string
//   agent: string
//   authorized: boolean
//   authorizedBy: string
//   file: string
//   user: string
//   createdAt: string
//   updatedAt: string
//   id: string
// }

export const getSales = async (): Promise<SalesResponse> => {
  const results = await fetchWithoutToken({ endpoint: 'proscai/sales' })

  return results
}

export const getRemissionsProscai = async (): Promise<RemissionsProscaiResponse> => {
  const results = await fetchWithoutToken({ endpoint: 'proscai/sales/remissions' })

  return results
}

export const getRemissions = async (): Promise<RemissionsResponse> => {
  const results = await fetchWithToken({ endpoint: 'sales/remissions' })

  return results
}

export const uploadRemission = async (file: File): Promise<[Error?, Archivo?]> => {
  const formdata = new FormData()
  formdata.append('file', file)
  formdata.append('docModel', 'Remission')

  try {
    const res = await fetchWithoutToken({ endpoint: 'files', method: 'POST', body: formdata, isFile: true }) as ArchivoResponse

    return [undefined, res.file]
  } catch (error) {
    if (error instanceof Error) return [error]
  }

  return [new Error('Unknow error')]
}

export const createRemision = async (id: string): Promise<[Error?, Remission?]> => {
  try {
    const [error, resp] = await fetchAPIWithToken({ endpoint: `sales/remissions/${id}`, method: 'POST' }) as [Error | null, RemissionResponse | null]

    if (error != null) return [error]

    return [undefined, resp?.remission]
  } catch (error) {
    if (error instanceof Error) return [error]
  }

  return [new Error('Unknow error')]
}

export const updateRemission = async (id: string, body: RemissionUpdate): Promise<[Error?, Remission?]> => {
  try {
    const resp = await fetchWithToken({ endpoint: `sales/remissions/${id}`, method: 'PUT', body }) as RemissionResponse

    return [undefined, resp.remission]
  } catch (error) {
    if (error instanceof Error) return [error]
  }

  return [new Error('Unknow error')]
}

export const updateRemissionFile = async (file: ArchivoUpdate, idFile: string): Promise<[Error?, Archivo?]> => {
  try {
    const resp = await fetchWithToken({ endpoint: `files/${idFile}`, method: 'PUT', body: file }) as ArchivoResponse

    return [undefined, resp.file]
  } catch (error) {
    if (error instanceof Error) return [error]
  }
  return [new Error('Unknow error')]
}

export const downloadFile = async (id: string): Promise<[Error?, Blob?]> => {
  try {
    const [error, file] = await fetchFile({ id })

    if (error !== undefined) {
      console.log(error)
      return [new Error('hubo un error')]
    }

    return [undefined, file]
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      return [error]
    }
  }

  return [new Error('Uknow Error')]
}
