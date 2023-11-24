import { type Payment, type PaymentForm } from 'src/interfaces/Payment'

const API_URL = 'http://localhost:4000/api'
export const getAllPayments = async (): Promise<Payment[]> => {
  const resp = await fetch(`${API_URL}/payments`)
  const body = await resp.json()
  return body
}

export const getPaymentById = async ({ id }: { id: string }): Promise<Payment> => {
  const resp = await fetch(`${API_URL}/payments/${id}`)
  const body = await resp.json()
  return body
}

export const createPayment = async ({ payment }: { payment: Payment }): Promise<Payment> => {
  const newPayment = {
    ...payment,
    supplierName: payment.supplier
  }

  const resp = await fetch(`${API_URL}/payments`, {
    method: 'POST',
    body: JSON.stringify(newPayment),
    headers: { 'Content-type': 'application/json; charset=UTF-8' }
  })

  const body = await resp.json()

  return body
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
