import React, { useEffect } from 'react'
import { Button, Card, Flex } from 'antd'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  UnorderedListOutlined
} from '@ant-design/icons'
import { useButtonRef } from '../../hooks/useButtonRef'
import { useAppDispatch, useAppSelector } from 'src/hooks/useStore'
import { UploadFiles } from 'src/components/UploadFiles'
import { selectPayment } from 'src/store/payments/slice'

interface NameNavigation {
  singularPath: string
  capitalize: string
  mainRoute: string
  includesNewStringPath: boolean
  includesEditStringPath: boolean
}

const useNameNavigation = (): NameNavigation => {
  const { pathname } = useLocation()

  console.log(pathname)

  const arrPathname = pathname.split('/').slice(1)

  const includesNewStringPath = arrPathname.includes('new')

  const includesEditStringPath = arrPathname.includes('edit')

  const mainRoute = arrPathname[0]

  const capitalize = `${mainRoute.charAt(0).toUpperCase()}${mainRoute.slice(1)}`

  const singularPath = capitalize.substring(0, mainRoute.length - 1)

  return {
    includesNewStringPath,
    includesEditStringPath,
    mainRoute,
    capitalize,
    singularPath
  }
}

export const Navigation: React.FC = () => {
  const { capitalize, singularPath, includesNewStringPath, includesEditStringPath } = useNameNavigation()
  const isLoading = useAppSelector(state => state.payments.isLoading)
  const payment = useAppSelector(state => state.payments.selected)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  console.log(location)

  const pathname = location.pathname.split('/')[1]

  const { buttonRef } = useButtonRef()

  useEffect(() => {

  }, [])

  const handleListadoClick = (): void => {
    dispatch(selectPayment(null))
    navigate(-1)
  }

  return (
    <Card
      size='small'
      style={{
        marginBottom: 30
      }}
    >
      <Flex justify='space-between' align='center'>

        <p> {capitalize} </p>

        {
          (includesNewStringPath || includesEditStringPath || pathname === 'inventory')
            ? (
              <>
                <Flex gap='small' wrap='wrap'>
                  <Button
                    type='primary'
                    icon={<UnorderedListOutlined />}
                    onClick={handleListadoClick}
                  >
                    Listado
                  </Button>

                  {
                    pathname !== 'inventory' &&

                    <Button
                      onClick={() => {
                        if (buttonRef !== null) {
                          buttonRef.current?.click()
                        }
                      }}
                      loading={isLoading}
                      disabled={isLoading}
                    >
                      Guardar
                    </Button>
                  }

                  {
                    (payment !== null)
                      ? payment.id !== undefined
                        ? <UploadFiles />
                        : ''
                      : ''
                  }

                </Flex>

              </>

              )
            : (

              <>

                {
                  pathname !== 'inventories' &&

                  <Link
                    to={`${singularPath}/new`}
                    state={{ name: 'Nuevo', action: 'new' }}
                  >
                    <Button
                      type="primary"
                      shape='round'
                    >
                      Nuevo
                    </Button>

                  </Link>
                }

              </>

              )
        }

      </Flex>

    </Card >
  )
}
