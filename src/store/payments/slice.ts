import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type Payment } from '../../interfaces/Payment'

const DEFAULT_PAYMENTS: Payment[] = [
  // {
  //   id: '29508ce8-81a9-11ee-b962-0242ac120002',
  //   supplier: {
  //     id: '1',
  //     name: 'Gunderson'
  //   },
  //   docto: '00001',
  //   paid: 20000,
  //   comments: 'Test',
  //   datePaid: dayjs(),
  //   files: [
  //     {
  //       id: 'f2b3dec4-8329-11ee-b962-0242ac120002',
  //       name: 'XA20491 DNA INTERNATIONAL.pdf',
  //       ext: '.pdf',
  //       createdAt: new Date(),
  //       updatedAt: new Date()
  //     }
  //   ]
  // },
  // {
  //   id: '35b14b80-81a9-11ee-b962-0242ac120002',
  //   supplier: {
  //     id: '2',
  //     name: 'Tubos Perros'
  //   },
  //   docto: '00002',
  //   paid: 18763,
  //   comments: 'Test 2',
  //   datePaid: dayjs(),
  //   files: [
  //     {
  //       id: 'f2b3dec4-8329-11ee-b962-0242ac120002',
  //       name: 'XA20491 DNA INTERNATIONAL.pdf',
  //       ext: '.pdf',
  //       createdAt: new Date(),
  //       updatedAt: new Date()
  //     }
  //   ]
  // },
  // {
  //   id: '3a03cd66-81a9-11ee-b962-0242ac120002',
  //   supplier: {
  //     id: '3',
  //     name: 'Tubos Perros'
  //   },
  //   docto: '00002',
  //   paid: 18763,
  //   comments: 'Test 2',
  //   datePaid: dayjs(),
  //   files: [
  //     {
  //       id: 'f2b3dec4-8329-11ee-b962-0242ac120002',
  //       name: 'XA20491 DNA INTERNATIONAL.pdf',
  //       ext: '.pdf',
  //       createdAt: new Date(),
  //       updatedAt: new Date()
  //     }
  //   ]
  // }
]

interface InitialState {
  isLoading: boolean
  data: Payment[]
  selected: Payment | null
  error: boolean
}

const DEFAULT_STATE: InitialState = {
  isLoading: false,
  data: DEFAULT_PAYMENTS,
  selected: null,
  error: false
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
