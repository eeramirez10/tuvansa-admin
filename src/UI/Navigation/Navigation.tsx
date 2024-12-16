import React, { type RefObject, type MutableRefObject } from 'react'
import { Button, Card, Flex } from 'antd'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  UnorderedListOutlined
} from '@ant-design/icons'
import { useAppDispatch } from 'src/hooks/useStore'
import { UploadFiles } from 'src/components/UploadFiles'
import { selectPayment } from 'src/store/payments/slice'

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
                Regresar
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

              {hasFile ? <UploadFiles /> : ''}

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
