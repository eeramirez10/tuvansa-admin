import React from 'react'
import { Button, Avatar, List, Space } from 'antd'
import { type Inventory } from '../../../interfaces/Inventory'
import { formatDate } from 'src/helpers/formatDate'
import { useInventories } from 'src/hooks/useInventories'

interface Props {
  inventory: Inventory
}

export const CountList: React.FC<Props> = ({ inventory }) => {
  const { deleteCountbyId } = useInventories()
  return (

    <List
      itemLayout="horizontal"
      pagination={{
        pageSize: 3
      }}

      dataSource={inventory?.counts}
      renderItem={(item) => (
        <List.Item
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          actions={[<Button key="delete-count" size="small" type='link' danger onClick={() => deleteCountbyId({ id: item.id })} > Eliminar</Button>]}
        >

          <Space direction='vertical'>
            <List.Item.Meta
              avatar={<Avatar src={'https://xsgames.co/randomusers/assets/avatars/pixel/1.jpg'} />}
              title={<a>{item?.user?.name ?? 'No user'}</a>}

            />
            <div>Conteo: {item.count}</div>
            <div>Fecha: {formatDate(item.createdAt)} </div>

          </Space>

        </List.Item>
      )}
    />
  )
}
