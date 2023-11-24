import { Button, List } from 'antd'
import React from 'react'
import { FilePdfFilled } from '@ant-design/icons'
import { type File } from 'src/interfaces/Payment'

interface Props {
  files: File[]
}

export const ListOfFiles: React.FC<Props> = ({ files }) => {
  return (
    <List
    itemLayout='horizontal'
    dataSource={files}
    renderItem={(item) => (
      <List.Item
        actions={[<Button key='list-download-pdf' size='small' > Descargar </Button>]}
      >
        <List.Item.Meta
          avatar={<FilePdfFilled style={{ color: 'red', fontSize: 30 }} />}
          title={item.name}
        />

      </List.Item>
    )}
  />
  )
}
