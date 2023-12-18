import React from 'react'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Card, Descriptions, type DescriptionsProps } from 'antd'

export const UserDescription: React.FC< { userInfo: DescriptionsProps['items'] }> = ({ userInfo }) => {
  return (
    <Card
      cover={<Avatar size={70} icon={<UserOutlined />} style={{ margin: '0 auto', marginTop: 20 }} />}

    >
      <Descriptions title="User Info" items={userInfo} />

    </Card>
  )
}
