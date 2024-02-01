import { Button, List } from 'antd'
import React from 'react'
import { FilePdfFilled } from '@ant-design/icons'
import { type FileId } from 'src/interfaces/Payment'
import { getApiUrl } from 'src/helpers/getApiUrl'

interface Props {
  files: FileId[]
}

const { URL } = getApiUrl()

export const ListOfFiles: React.FC<Props> = ({ files }) => {
  const handleViewPdf = (id: string): void => {
    window.open(`${URL}/public/${id}.pdf`, '_blank')
  }

  console.log(files)

  return (
    <List
      itemLayout='horizontal'
      dataSource={files}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Button
              key='list-download-pdf'
              size='small'
              onClick={() => { handleViewPdf(item.id) }}
            >
              Descargar
            </Button>
          ]}
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
