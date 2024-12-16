import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type StatusValue, type User } from 'src/interfaces/Auth'

interface InitialState {
  status: StatusValue
  users: User[]
  selectedUser?: User,
  // eslint-disable-next-line @typescript-eslint/ban-types
  user: User,
  selected: User | null
  errorMessage: string | undefined
}

const DEFAULT_STATE: InitialState = {
  status: 'checking',
  user: {
    gender: '',
    username: '',
    name: '',
    last: '',
    branchOffice: '',
    rol: '',
    token: '',
    pagePermission: [],
    documentsAuthorization: []
  },
  selectedUser: undefined,
  errorMessage: undefined,
  users: [],
  selected: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: DEFAULT_STATE,
  reducers: {
    onChecking: (state) => {
      return {
        ...state,
        ...DEFAULT_STATE,
        status: 'checking'
      }
      // state.status = 'checking'
      // state.user = {
      //   gender: '',
      //   username: '',
      //   name: '',
      //   last: '',
      //   branchOffice: '',
      //   rol: '',
      //   token: '',
      //   pagePermission: []
      // }
      // state.errorMessage = undefined
    },
    onSelectUser: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload

    },
    onLogin: (state, action: PayloadAction<User>) => {
      state.status = 'authenticated'
      state.user = action.payload
      state.errorMessage = undefined
    },
    onLogout: (state) => {
      return {
        ...state,
        ...DEFAULT_STATE,
        status: 'notauthenticated'
      }
      // state.status = 'notauthenticated'
      // state.user = {
      //   gender: '',
      //   username: '',
      //   name: '',
      //   last: '',
      //   branchOffice: '',
      //   rol: '',
      //   token: '',
      //   pagePermission: []
      // }
      // state.errorMessage = undefined
    },
    onError: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        ...DEFAULT_STATE,
        status: 'notauthenticated',
        errorMessage: action.payload
      }

      // state.status = 'notauthenticated'
      // state.user = {
      //   gender: '',
      //   username: '',
      //   name: '',
      //   last: '',
      //   branchOffice: '',
      //   rol: '',
      //   token: '',
      //   pagePermission: []
      // }
      // state.errorMessage = action.payload
    }
  }
})

export const { onChecking, onError, onLogin, onLogout, onSelectUser } = authSlice.actions

export default authSlice.reducer
