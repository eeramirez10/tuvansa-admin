import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type StatusValue, type User } from 'src/interfaces/Auth'

interface InitialState {
  status: StatusValue
  // eslint-disable-next-line @typescript-eslint/ban-types
  user: User
  errorMessage: string | undefined
}

const DEFAULT_STATE: InitialState = {
  status: 'checking',
  user: {
    username: '',
    name: '',
    last: '',
    branchOffice: '',
    rol: '',
    token: '',
    pagePermission: []
  },
  errorMessage: undefined
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: DEFAULT_STATE,
  reducers: {
    onChecking: (state) => {
      state.status = 'checking'
      state.user = {
        username: '',
        name: '',
        last: '',
        branchOffice: '',
        rol: '',
        token: '',
        pagePermission: []
      }
      state.errorMessage = undefined
    },
    onLogin: (state, action: PayloadAction<User>) => {
      state.status = 'authenticated'
      state.user = action.payload
      state.errorMessage = undefined
    },
    onLogout: (state) => {
      state.status = 'notauthenticated'
      state.user = {
        username: '',
        name: '',
        last: '',
        branchOffice: '',
        rol: '',
        token: '',
        pagePermission: []
      }
      state.errorMessage = undefined
    },
    onError: (state, action: PayloadAction<string>) => {
      state.status = 'notauthenticated'
      state.user = {
        username: '',
        name: '',
        last: '',
        branchOffice: '',
        rol: '',
        token: '',
        pagePermission: []
      }
      state.errorMessage = action.payload
    }
  }
})

export const { onChecking, onError, onLogin, onLogout } = authSlice.actions

export default authSlice.reducer
