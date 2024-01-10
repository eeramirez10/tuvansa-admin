import React, { useEffect, useState } from 'react'
import { type DescriptionsProps } from 'antd'
import { useAuth } from 'src/hooks/useAuth'
import { getUserbyId } from 'src/services/user'
import { UserDescription } from './components/UserDescription'

export const UserInfo: React.FC = () => {
  const { user } = useAuth()

  const [userInfo, setUserInfo] = useState<DescriptionsProps['items']>()

  useEffect(() => {
    const id = user.id as string
    getUserbyId(id)
      .then(({ user }) => {
        let userDescription: any[] = []
        Object.entries(user)
          .forEach(([key, value], index) => {
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

    <UserDescription userInfo={userInfo} />

  )
}
