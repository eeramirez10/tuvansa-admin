import { onChecking, onError, onLogin, onLogout } from 'src/store/auth/slice'
import { useAppDispatch, useAppSelector } from './useStore'
import { type LoginProps, login, renewToken, createUser } from 'src/services/auth'
import type { StatusValue, User } from 'src/interfaces/Auth'
import { toast } from 'sonner'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Form, type FormInstance } from 'antd'
import { getUserbyId } from '../services/user'
import { onSelectUser } from '../store/auth/slice'
import { updateUser } from '../services/auth'

interface Props {
  status: StatusValue
  // eslint-disable-next-line @typescript-eslint/ban-types
  user: User
  errorMessage: string | undefined
  urlRedirect: string | null
  startLogin: ({ username, password }: LoginProps) => Promise<void>
  checkAuthToken: () => Promise<void>
  startLogout: () => void
  userRegister: (user: User) => Promise<[Error | null, User | null]>
  getUser: (id: string) => Promise<{ user: User }>
  editUser: ({ id, user }: { id: string, user: User }) => Promise<{ user: User }>
  selectedUser?: User
  form: FormInstance<any>
}

export const useAuth = (): Props => {
  const { status, user, errorMessage, selectedUser } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  const location = useLocation()
  const urlRedirect = localStorage.getItem('urlRedirect')

  const [form] = Form.useForm()

  useEffect(() => {
    if (location.key === 'default') {
      localStorage.setItem('urlRedirect', location.pathname)
    }
  }, [location])

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

      //   if (localStorage.getItem('urlRedirect')) {
      //     const url = localStorage.getItem('urlRedirect')

      //     if(url){
      //       console.log(url)
      //       redirect(url);
      //       localStorage.removeItem('urlRedirect')
      //     }

      // }
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
    if (token === null) {
      dispatch(onLogout())
      return
    }

    try {
      const { token, user, error } = await renewToken()

      if (error !== undefined) {
        dispatch(onLogout())
        localStorage.removeItem('token')
        return
      }

      localStorage.setItem('token', token)
      localStorage.setItem('token-init-date', new Date().getTime().toLocaleString())

      dispatch(onLogin(user))
    } catch (error) {
      dispatch(onLogout())
      localStorage.removeItem('token')
    }
  }

  const userRegister = async (user: User): Promise<[Error | null, User | null]> => {
    try {
      const [error, newUser] = await createUser(user)

      if (error !== null) {
        return [error, null]
      }

      toast.success('Usuario credo correctamente')

      return [null, newUser]
    } catch (error) {
      if (error instanceof Error) return [error, null]
    }

    return [new Error(' Error desconocido'), null]
  }

  const getUser = async (id: string): Promise<{ user: User }> => {
    const user = await getUserbyId(id)
    return user
  }

  const editUser = async ({ id, user }: { id: string, user: User }): Promise<{ user: User }> => {
    const updatedUser = await updateUser({ id, user })

    return updatedUser
  }

  return {
    status,
    user,
    errorMessage,
    urlRedirect,
    form,
    selectedUser,
    startLogin,
    checkAuthToken,
    startLogout,
    userRegister,
    editUser,
    getUser
  }
}
