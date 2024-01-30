import React, { type RefObject, type MutableRefObject } from 'react'
import { Button, Card, Flex } from 'antd'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  UnorderedListOutlined
} from '@ant-design/icons'
import { useAppDispatch } from 'src/hooks/useStore'
import { UploadFiles } from 'src/components/UploadFiles'
import { selectPayment } from 'src/store/payments/slice'

// const useNameNavigation = (): NameNavigation => {
//   const { pathname } = useLocation()

//   const arrPathname = pathname.split('/').slice(1)

//   const includesNewStringPath = arrPathname.includes('new')

//   const includesEditStringPath = arrPathname.includes('edit')

//   const mainRoute = arrPathname[0]

//   const capitalize = `${mainRoute.charAt(0).toUpperCase()}${mainRoute.slice(1)}`

//   const singularPath = capitalize.substring(0, mainRoute.length - 1)

//   return {
//     includesNewStringPath,
//     includesEditStringPath,
//     mainRoute,
//     capitalize,
//     singularPath
//   }
// }

interface Props {
  name: string
  isNew?: boolean
  isLoading?: boolean
  hasFile?: boolean
  saveRef?: RefObject<HTMLButtonElement> | null | MutableRefObject<undefined>

}

export const Navigation: React.FC<Props> = ({
  name,
  isNew = true,
  isLoading = false,
  hasFile = false,
  saveRef = null
}) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { pathname } = useLocation()

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

        <p> {name} </p>

        {
          !isNew

            ? <Flex gap={10}>

              <Button
                type='primary'
                icon={<UnorderedListOutlined />}
                onClick={handleListadoClick}
              >
                Listado
              </Button>

              <Button
                onClick={() => {
                  if (saveRef !== null) {
                    saveRef.current?.click()
                  }
                }}
                loading={isLoading}
                disabled={isLoading}
              >
                Guardar
              </Button>

              {hasFile && <UploadFiles />}

            </Flex>

            : (
              <Link to={`${pathname}/new`} state={{ name: 'Nuevo', action: 'new' }}>
                <Button
                  type="primary"
                  shape='round'
                >
                  Nuevo
                </Button>

              </Link>
              )

        }

      </Flex>

    </Card >
  )
}
