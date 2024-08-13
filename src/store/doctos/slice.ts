import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type Docto } from 'src/interfaces/Docto'

const DEFAULT_DOCTOS: Docto[] = []

interface InitialState {
  isLoading: boolean
  data: Docto[]
  selected: Docto | null
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
    loadDoctos: (state, action: PayloadAction<Docto[]>) => {
      state.data = action.payload
      state.isLoading = false
    },
    selectDocto: (state, action: PayloadAction<Docto | null>) => {
      state.selected = action.payload
      state.isLoading = false
    }
  }
})

export const { onStartDoctos, loadDoctos, selectDocto } = doctosSlice.actions

export default doctosSlice.reducer
