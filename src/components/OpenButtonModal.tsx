import { Button } from 'antd'
import React from 'react'
import { useModal } from 'src/hooks/useModal'
import { FilePdfOutlined } from '@ant-design/icons'

interface Props {
  id: string
}

export const OpenButtonModal: React.FC<Props> = ({ id }) => {
  const { showModal } = useModal()

  return (
    <Button
      type="primary"
      onClick={() => { showModal({ id }) }}
      icon={<FilePdfOutlined />}
    />
  )
}
