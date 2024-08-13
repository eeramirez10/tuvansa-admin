import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type Payment } from '../../interfaces/Payment'

const DEFAULT_PAYMENTS: Payment[] = []

interface InitialState {
  isLoading: boolean
  data: Payment[]
  selected: Payment | null
  errorMessage: string | undefined
}

const DEFAULT_STATE: InitialState = {
  isLoading: false,
  data: DEFAULT_PAYMENTS,
  selected: null,
  errorMessage: undefined
}

export const paymentsSlice = createSlice({
  name: 'payments',
  initialState: DEFAULT_STATE,
  reducers: {
    onStartPayment: (state) => {
      state.isLoading = true
    },
    loadPayments: (state, action: PayloadAction<Payment[]>) => {
      state.data = action.payload
      state.isLoading = false
    },
    addNewPayment: (state, action: PayloadAction<Payment>) => {
      return {
        ...state,
        isLoading: false,
        data: [
          ...state.data,
          action.payload
        ]
      }
    },
    editPayment: (state, action: PayloadAction<Payment>) => {
      const { id, ...rest } = action.payload

      const updatedPayload = state.data.map(payment => {
        if (payment.id === id) {
          return {
            id,
            ...rest
          }
        }
        return payment
      })

      return {
        ...state,
        isLoading: false,
        payments: [...updatedPayload]
      }
    },
    selectPayment: (state, action: PayloadAction<Payment | null>) => {
      state.selected = action.payload
      state.isLoading = false
    }
  }
})

export const { addNewPayment, editPayment, onStartPayment, loadPayments, selectPayment } = paymentsSlice.actions

export default paymentsSlice.reducer
