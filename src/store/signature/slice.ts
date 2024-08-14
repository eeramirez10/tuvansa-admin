import { createSlice } from '@reduxjs/toolkit'

interface InitialState {
  isSign: boolean
}

const initialState: InitialState = {
  isSign: false
}

export const signSlices = createSlice({
  name: 'sign',
  initialState,
  reducers: {
    signDocument: (state) => {
      state.isSign = true
    },
    unsignDocument: (state) => {

      state.isSign = false
    },
  }
})

export const { signDocument, unsignDocument } = signSlices.actions

export default signSlices.reducer