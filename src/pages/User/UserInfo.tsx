import React, { useEffect, useState } from 'react'
import { Button, Card, Flex, type DescriptionsProps } from 'antd'
import { useAuth } from 'src/hooks/useAuth'
import { getUserbyId } from 'src/services/user'
import { UserDescription } from './components/UserDescription'
import { DrawingModal } from '../../pdf/modals/components/DrawingModal'

export const UserInfo: React.FC = () => {
  const { user } = useAuth()

  const [userInfo, setUserInfo] = useState<DescriptionsProps['items']>()
  const [openModal, setOpenModal] = useState<boolean>(false)

  const handldeModal = () => {

    console.log(openModal)

    setOpenModal(!openModal)
  }

  useEffect(() => {
    const id = user.id as string
    getUserbyId(id)
      .then(({ user }) => {
        let userDescription: any[] = []
        Object.entries(user)
          .forEach(([key, value], index) => {
            console.log({ value })
            userDescription = [
              ...userDescription,
              {
                key: index,
                label: key,
                children: value
              }
            ]
          })
        setUserInfo(userDescription)
      })
  }, [])

  return (

    <>

      <UserDescription userInfo={userInfo} />

      <Card style={{ marginTop: 20, display: 'flex' }}>

        <div style={{ display: 'flex', gap:'20px', }}>


          <p>Agregar firma</p>

          <Button type="primary" onClick={() => handldeModal()}>Agregar firma</Button>
        </div>


      </Card>

      <DrawingModal
        open={openModal}
        dismiss={() => handldeModal()}


      />

    </>


  )
}
