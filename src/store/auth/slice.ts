import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type StatusValue, type User } from 'src/interfaces/Auth'

interface InitialState {
  status: StatusValue
  user: User | Record<string, unknown>
  errorMessage: string | undefined
}

const DEFAULT_STATE: InitialState = {
  status: 'checking',
  user: {},
  errorMessage: undefined
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: DEFAULT_STATE,
  reducers: {
    onChecking: (state) => {
      state.status = 'checking'
      state.user = {}
      state.errorMessage = undefined
    },
    onLogin: (state, action: PayloadAction<User>) => {
      state.status = 'authenticated'
      state.user = action.payload
      state.errorMessage = undefined
    },
    onLogout: (state) => {
      state.status = 'notauthenticated'
      state.user = {}
      state.errorMessage = undefined
    },
    onError: (state, action: PayloadAction<string>) => {
      state.status = 'notauthenticated'
      state.user = {}
      state.errorMessage = action.payload
    }
  }
})

export const { onChecking, onError, onLogin, onLogout } = authSlice.actions

export default authSlice.reducer
