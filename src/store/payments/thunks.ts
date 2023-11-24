import { type Dispatch } from 'react'
import { addNewPayment, loadPayments, onStartPayment, selectPayment, editPayment } from './slice'
import { createPayment, edit, getAllPayments, getPaymentById } from 'src/services/payments'
import { type PaymentForm } from 'src/interfaces/Payment'

export const postPayments = (value: any) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(onStartPayment())
    const payment = await createPayment({ payment: value })

    dispatch(addNewPayment(payment))
  }
}

export const editPaymentT = ({ id, payment }: { id: string, payment: PaymentForm }) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(onStartPayment())
    const paymentDB = await edit({ id, payment })
    dispatch(editPayment({ ...paymentDB }))
  }
}

export const getPayments = () => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(onStartPayment())
    const payments = await getAllPayments()
    dispatch(loadPayments(payments))
  }
}

export const getPayment = ({ id }: { id: string }) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(onStartPayment())
    const payment = await getPaymentById({ id })
    dispatch(selectPayment(payment))
  }
}
