import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type Payment } from '../../interfaces/Payment'

const DEFAULT_DOCTOS: Payment[] = []

interface InitialState {
  isLoading: boolean
  data: Payment[]
  selected: Payment | null
  errorMessage: string | undefined
}

const DEFAULT_STATE: InitialState = {
  isLoading: false,
  data: DEFAULT_DOCTOS,
  selected: null,
  errorMessage: undefined
}

export const doctosSlice = createSlice({
  name: 'doctos',
  initialState: DEFAULT_STATE,
  reducers: {
    onStartDoctos: (state) => {
      state.isLoading = true
    },
    loadDoctos: (state, action: PayloadAction<Payment[]>) => {
      state.data = action.payload
      state.isLoading = false
    },
    selectDocto: (state, action: PayloadAction<Payment | null>) => {
      state.selected = action.payload
      state.isLoading = false
    }
  }
})

export const { onStartDoctos, loadDoctos, selectDocto } = doctosSlice.actions

export default doctosSlice.reducer
