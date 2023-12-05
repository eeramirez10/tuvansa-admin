import { onChecking, onError, onLogin, onLogout } from 'src/store/auth/slice'
import { useAppDispatch, useAppSelector } from './useStore'
import { type LoginProps, login, renewToken } from 'src/services/auth'
import type { StatusValue, User } from 'src/interfaces/Auth'
import { toast } from 'sonner'

interface Props {
  status: StatusValue
  user: User | Record<string, unknown>
  errorMessage: string | undefined
  startLogin: ({ username, password }: LoginProps) => Promise<void>
  checkAuthToken: () => Promise<void>
  startLogout: () => void
}

export const useAuth = (): Props => {
  const { status, user, errorMessage } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const startLogin = async ({ username, password }: LoginProps): Promise<void> => {
    dispatch(onChecking())

    try {
      const resp = await login({ username, password })

      if (resp.error !== undefined) {
        dispatch(onError(resp.error))
        toast.error('usuario o contraseña invalidos')
        return
      }
      localStorage.setItem('token', resp.token)
      localStorage.setItem('token-init-date', new Date().getTime().toLocaleString())
      dispatch(onLogin(resp.user))
      toast.success('Sesion correcta!')
    } catch (error) {
      dispatch(onLogout())
      toast.error('hubo un error interno, hable con el administrador')
    }
  }

  const startLogout = (): void => {
    dispatch(onLogout())
    localStorage.removeItem('token')
  }

  const checkAuthToken = async (): Promise<void> => {
    const token = localStorage.getItem('token')
    if (token === undefined || token === null) {
      dispatch(onLogout())
      return
    }

    try {
      const { token, user, error } = await renewToken()
      localStorage.setItem('token', token)
      localStorage.setItem('token-init-date', new Date().getTime().toLocaleString())

      if (error !== undefined) {
        dispatch(onLogout())
        localStorage.removeItem('token')
      }

      dispatch(onLogin(user))
    } catch (error) {
      dispatch(onLogout())
      localStorage.removeItem('token')
    }
  }

  return {
    status,
    user,
    errorMessage,
    startLogin,
    checkAuthToken,
    startLogout
  }
}
