import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type Payment } from '../../interfaces/Payment'

const DEFAULT_STATE: Payment[] = [
  {
    id: '29508ce8-81a9-11ee-b962-0242ac120002',
    supplier: 'Gunderson',
    docto: '00001',
    paid: 20000,
    comments: 'Test'
  },
  {
    id: '35b14b80-81a9-11ee-b962-0242ac120002',
    supplier: 'Tubos Perros',
    docto: '00002',
    paid: 18763,
    comments: 'Test 2'
  },
  {
    id: '3a03cd66-81a9-11ee-b962-0242ac120002',
    supplier: 'Tubos Perros',
    docto: '00002',
    paid: 18763,
    comments: 'Test 2'
  }

]

export const paymentsSlice = createSlice({
  name: 'payments',
  initialState: DEFAULT_STATE,
  reducers: {
    addNewPayment: (state, action: PayloadAction<Payment>) => {
      const { supplier, paid, comments, docto } = action.payload
      const uuid = crypto.randomUUID()

      const newPayment: Payment = {
        id: uuid,
        supplier,
        paid,
        comments,
        docto
      }

      return [...state, { ...newPayment }]
    },
    editPayment: (state, action: PayloadAction<Payment>) => {
      const { id, ...rest } = action.payload

      const updatedPayload = state.map(payment => {
        if (payment.id === id) {
          return {
            id,
            ...rest
          }
        }
        return payment
      })

      return [...updatedPayload]
    }
  }
})

export const { addNewPayment, editPayment } = paymentsSlice.actions

export default paymentsSlice.reducer
