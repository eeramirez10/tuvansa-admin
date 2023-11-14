export interface PaymentBody {
  supplier: string
  docto: string
  paid: number
  comments: string
}

export interface Payment extends PaymentBody {
  id: `${string}-${string}-${string}-${string}-${string}`
}

export type PaymentId = Pick<Payment, 'id'>
