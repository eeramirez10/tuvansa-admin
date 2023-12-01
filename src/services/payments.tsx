import { getApiUrl } from 'src/helpers/getApiUrl'
import { type PaymentBody, type Payment, type PaymentForm } from 'src/interfaces/Payment'
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

export const edit = async ({ id, payment }: { id: string, payment: PaymentForm }): Promise<Payment> => {
  const editedPayment = {
    ...payment,
    supplierName: payment.supplier
  }
  const resp = await fetch(`${API_URL}/payments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(editedPayment),
    headers: { 'Content-type': 'application/json; charset=UTF-8' }
  })

  const body = await resp.json()

  return body
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
