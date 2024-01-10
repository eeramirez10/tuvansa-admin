import React, { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { Button, message, Upload } from 'antd'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import { useAppSelector } from 'src/hooks/useStore'
import { uploadFiles } from 'src/services/payments'

export const UploadFiles: React.FC = () => {
  const payment = useAppSelector(selector => selector.payments.selected)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [uploading, setUploading] = useState(false)

  const handleUpload = (): void => {
    if (payment === null || payment === undefined) return
    const formData = new FormData()
    fileList.forEach((file) => {
      formData.append('payments', file as RcFile)
    })
    setUploading(true)

    uploadFiles({ id: payment?.id, files: formData })
      .then((resp) => {
        console.log(resp)
        setFileList([])
        message.success('upload successfully.')
      })
      .catch((e) => {
        console.log(e)
        message.error('upload failed.')
      })
      .finally(() => {
        setUploading(false)
      })
    // fetch(`https://tuvansacloud.dyndns.org/api/files/${payment?.id}`, {
    //   method: 'POST',
    //   body: formData
    // })
    //   .then((res) => res.json())
    //   .then((resp) => {
    //     console.log(resp)

    //   })
    //   .catch((e) => {
    //     console.log(e)
    //     message.error('upload failed.')
    //   })
    //   .finally(() => {
    //     setUploading(false)
    //   })
  }

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    beforeUpload: (file) => {
      console.log(file)
      setFileList(prevState => [...prevState, file])

      return false
    },
    fileList
  }
  return (
    <>

      <Upload {...props} multiple maxCount={5} >
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}

      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>

    </>
  )
}
