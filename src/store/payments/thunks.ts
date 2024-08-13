import { type Dispatch } from 'react'
import { onStartPayment, selectPayment } from './slice'
import { getPaymentById } from 'src/services/payments'

// export const getPayments = () => {
//   return async (dispatch: Dispatch<any>) => {
//     try {
//       dispatch(onStartPayment())
//       const payments = await getAllPayments()
//       dispatch(loadPayments(payments))
//     } catch (error) {
//       console.log(error)
//     }
//   }
// }

export const getPayment = ({ id }: { id: string }) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(onStartPayment())
    const resp = await getPaymentById({ id })
    console.log(resp)

    dispatch(selectPayment(resp?.payment !== undefined ? resp.payment : null))
  }
}
