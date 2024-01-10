const AUTH_STATUS = {
  CHECKING: 'checking',
  AUTHENTICATED: 'authenticated',
  NOTAUTHENTICATED: 'notauthenticated'
} as const

export type StatusValue = typeof AUTH_STATUS[keyof typeof AUTH_STATUS]

export interface User {
  id?: string
  username: string
  name: string
  last: string
  branchOffice: string
  rol: string
  token: string
}
