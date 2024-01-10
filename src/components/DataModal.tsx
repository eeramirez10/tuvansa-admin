import { Modal } from 'antd'
import React from 'react'

interface Props {
  title: string
  open: boolean
  handleCancel: () => void
  children: string | JSX.Element | JSX.Element[]
}

export const DataModal: React.FC<Props> = ({ title, open, handleCancel, children }) => {
  return (
    <Modal
      title={title}
      open={open}
      onCancel={handleCancel}
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
    >
      {children}
    </Modal>
  )
}
