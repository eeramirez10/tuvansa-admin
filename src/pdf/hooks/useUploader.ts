import type React from 'react'
import { useState, createRef } from 'react'
import { readAsPDF, readAsDataURL, readAsImage } from '../utils/asyncReader'
import { ggID } from '../utils/helpers'
import { type Pdf } from './usePdf'
import { AttachmentTypes } from '../entities'
import { type Attachment, type ImageAttachment } from '../types'

type ActionEvent<T> = React.TouchEvent<T> | React.MouseEvent<T>

export enum UploadTypes {
  PDF = 'pdf',
  IMAGE = 'image',
}

interface ReturnFunction {
  upload: (event: React.ChangeEvent<HTMLInputElement> & { dataTransfer?: DataTransfer }) => Promise<void>
  onClick: (event: ActionEvent<HTMLInputElement>) => void
  inputRef: React.RefObject<HTMLInputElement>
  isUploading: boolean
  handleClick: () => void
  downloadFromServer: (file: File) => Promise<null | boolean>
  getCurrentPdf: () => File | undefined
  uploadSignatureImage: (image: File) => Promise<void>
}

interface Props {
  use: UploadTypes
  afterUploadPdf?: (upload: Pdf) => void
  afterUploadAttachment?: (upload: Attachment) => void

}

const handlers = {
  pdf: async (file: File) => {
    try {
      const pdf = await readAsPDF(file)

      return {
        file,
        name: file.name,
        pages: Array(pdf.numPages)
          .fill(0)
          .map((_, index) => pdf.getPage(index + 1))
      } satisfies Pdf
    } catch (error) {
      console.log('Failed to load pdf', error)
      throw new Error('Failed to load PDF')
    }
  },
  image: async (file: File) => {
    try {
      const url = await readAsDataURL(file)
      const img = await readAsImage(url as string)
      const id = ggID()
      const { width, height } = img

      const imageAttachemnt: ImageAttachment = {
        id,
        type: AttachmentTypes.IMAGE,
        width,
        height,
        x: 0,
        y: 0,
        img,
        file
      }
      return imageAttachemnt
    } catch (error) {
      console.log('Failed to load image', error)
      throw new Error('Failed to load image')
    }
  }
}

/**
 * @function useUploader
 *
 * @description This hook handles pdf and image uploads
 *
 * @
 * @param use UploadTypes
 */
export const useUploader = ({ use, afterUploadPdf, afterUploadAttachment }: Props): ReturnFunction => {
  const [isUploading, setIsUploading] = useState(false)
  const [inputFile, setInputFile] = useState<File>()
  const inputRef = createRef<HTMLInputElement>()

  const onClick = (event: ActionEvent<HTMLInputElement>): void => {
    event.currentTarget.value = ''
  }

  const handleClick = (): void => {
    const input = inputRef.current

    if (input != null) {
      setIsUploading(true)
      input.click()
    }
  }

  const downloadFromServer = async (file: File): Promise<null | boolean> => {
    if (file === undefined || file === null) return null
    setInputFile(file)
    const result = await handlers[use](file)

    if (use === UploadTypes.PDF && (afterUploadPdf != null)) {
      afterUploadPdf(result as Pdf)
    }

    return true
  }

  const uploadSignatureImage = async (image: File): Promise<void> => {
    if (image === undefined || image === null) {
      setIsUploading(false)
      return
    }

    const file = image

    setInputFile(file)

    const result = await handlers[use](file)

    console.log(result)

    // if (use === UploadTypes.PDF && (afterUploadPdf != null)) {
    //   afterUploadPdf(result as Pdf)
    // }

    if (use === UploadTypes.IMAGE && (afterUploadAttachment != null)) {
      console.log('===> was this also called')
      afterUploadAttachment({ ...result, x: 400, y: 600 } as ImageAttachment)
    }
    setIsUploading(false)
  }

  const upload = async (
    event: React.ChangeEvent<HTMLInputElement> & { dataTransfer?: DataTransfer }
  ): Promise<void> => {
    // if (!isUploading) {
    //   return
    // }

    console.log('png')

    // const filesss = event.dataTransfer?.files

    const files: FileList | null = event.currentTarget.files
    if (files == null) {
      setIsUploading(false)
      return
    }

    const file = files[0]

    setInputFile(file)

    const result = await handlers[use](file)

    if (use === UploadTypes.PDF && (afterUploadPdf != null)) {
      afterUploadPdf(result as Pdf)
    }

    if (use === UploadTypes.IMAGE && (afterUploadAttachment != null)) {
      console.log('===> was this also called')
      afterUploadAttachment(result as ImageAttachment)
    }
    setIsUploading(false)
  }

  const getCurrentPdf = (): File | undefined => {
    return inputFile
  }

  return {
    upload,
    onClick,
    inputRef,
    isUploading,
    uploadSignatureImage,
    handleClick,
    downloadFromServer,
    getCurrentPdf
  }
}
