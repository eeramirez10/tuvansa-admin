import { Button, Card, Flex } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import React from 'react'

interface NameNavigation {
  capName: string
  nameSingular: string
  name: string
  action: string
}

const useNameNavigation = (): NameNavigation => {
  let { state, pathname } = useLocation()

  let name = ''
  let path = ''

  if (state !== null) {
    name = state.name
    pathname = pathname.slice(1)
  } else {
    path = pathname.slice(1)
    name = path
  }

  const capName = `${pathname.charAt(0).toUpperCase()}${pathname.slice(1)}`

  const nameSingular = path.substring(0, name.length - 1)

  return {
    capName,
    nameSingular,
    name,
    action: state?.action
  }
}

export const Navigation: React.FC = () => {
  const { capName, nameSingular, name, action } = useNameNavigation()
  return (
    <Card
      size='small'
      style={{
        marginBottom: 30
      }}
    >
      <Flex justify='space-between' align='center'>

        {name !== null ? <p> {name} </p> : <p> {capName} </p>}

        {
          (action === 'new')
            ? (
              <Button >
                Guardar
              </Button>
              )
            : (
              <Button
                type="primary"
                shape='round'
              >
                <Link to={`${nameSingular}/new`} state={{ name: 'Nuevo', action: ' new' }} >  Nuevos</Link>
              </Button>
              )
        }

      </Flex>

    </Card >
  )
}
