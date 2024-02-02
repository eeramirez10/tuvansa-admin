import { getApiUrl } from 'src/helpers/getApiUrl'
import { type Payment } from 'src/interfaces/Payment'
import { fetchWithToken } from '../helpers/fetchWithToken'

const { API_URL } = getApiUrl()

interface ResponsePayments {
  payments?: Payment[]
  error?: string
  ok?: boolean
}

interface ResponsePayment {
  payment?: Payment
  error?: string
  ok?: boolean
}

export interface PaymentBody {
  idProscai: string | null
  amount: number
  category: string
  creditor: {
    name: string
    uid: string
  } | null
  coin: {
    name: string
    code: string
  }
  datePaid: Date
  supplier: {
    name: string
    uid: string
  } | null
  branchOffice: string

}

export const getAllPayments = async (): Promise<ResponsePayments> => {
  const resp = await fetchWithToken({ endpoint: 'payments', method: 'GET' })
  return resp
}

export const getPaymentById = async ({ id }: { id: string }): Promise<ResponsePayment> => {
  const resp = await fetchWithToken({ endpoint: `payments/${id}`, method: 'GET' })
  return resp
}

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export const createPayment = async ({ payment }: { payment: PaymentBody }): Promise<ResponsePayment> => {
  const newPayment = {
    ...payment
  }

  const resp = await fetchWithToken({ endpoint: 'payments', method: 'POST', body: newPayment })
  return resp
}

export const editPaymentService = async ({ id, payment }: { id: string, payment: PaymentBody }): Promise<ResponsePayment> => {
  const editedPayment = {
    ...payment,
    id

  }
  const resp = await fetchWithToken({ endpoint: `payments/${id}`, method: 'PUT', body: editedPayment })
  return resp
}

export const uploadFiles = async ({ id, files }: { id: string, files: any }): Promise<void> => {
  const resp = await fetch(`${API_URL}/files/${id}`, {
    method: 'POST',
    body: files,
    headers: {
      Authorization: `bearer ${localStorage.getItem('token')}`
    }
  })

  const body = await resp.json()

  return body
}
