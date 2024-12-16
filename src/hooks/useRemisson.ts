import { useState } from 'react'
import { toast } from 'sonner'
import { type Remission } from 'src/interfaces/Remissions'
import { type Archivo, createRemision, updateRemission, uploadRemission, updateRemissionFile } from 'src/services/sales'

interface RemissionReturn {

  addRemission: (id: string) => Promise<Remission | null>
  addFileToRemission: (id: string, fileId: string) => Promise<Remission | undefined>
  uploadRemissionPdf: (pdf: File) => Promise<Archivo | undefined>
  addIdRemissionFile: (idRemission: string, idFile: string) => Promise<Archivo | undefined>
  handleUploadRemissionAndFile: (id: string, pdf: File) => Promise<void>
  isLoading: boolean
}

export const useRemission = (): RemissionReturn => {
  const [isLoading, setIsLoading] = useState(false)
  const addRemission = async (id: string): Promise<Remission | null> => {
    try {
      const [error, remision] = await createRemision(id)
      if (error != null) {
        console.log(error)
        toast.error('Hubo un error')

        return null
      }

      if (remision != null) return remision

      return null
    } catch (error) {
      console.log(error)
      throw (error)
    }
  }

  const addFileToRemission = async (id: string, fileId: string): Promise<Remission | undefined> => {
    const [error, remision] = await updateRemission(id, { file: fileId })
    if (error !== undefined) {
      console.log(error)
      toast.error('Hubo un error')

      return undefined
    }

    return remision
  }

  const uploadRemissionPdf = async (pdf: File): Promise<Archivo | undefined> => {
    // const filesss = event.dataTransfer?.files
    if (pdf === undefined || pdf === null) return undefined

    try {
      const [error, file] = await uploadRemission(pdf)

      if (error !== undefined) {
        console.log(error)
        toast.error('Hubo un error al subir el archivo')
        return undefined
      }

      if (file !== undefined) {
        return file
      }
    } catch (error) {
      console.log(error)
      toast.error('Hubo un error al subir el archivo')
    }
  }

  const addIdRemissionFile = async (idRemission: string, idFile: string): Promise<Archivo | undefined> => {
    const [error, file] = await updateRemissionFile({ doc: idRemission }, idFile)

    if (error != null) {
      toast.error('Hubo un error')
      return
    }
    return file
  }

  const handleUploadRemissionAndFile = async (id: string, pdf: File): Promise<void> => {
    setIsLoading(true)
    toast.loading('subiendo .....')

    try {
      const file = await uploadRemissionPdf(pdf)

      if (file == null) return

      const newRemission = await addRemission(id)

      if (newRemission == null) return

      await addFileToRemission(newRemission.id, file.id)

      const idFile = file?.id

      if (newRemission != null) {
        await addIdRemissionFile(newRemission.id, idFile)
      }

      toast.success('Subido correctamente')
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  // const addIdRemissionFile = async (idRemission: string, idFile: string): Promise<void> => {
  //   const [error, file] = await updateRemissionFile({ doc: idRemission }, idFile)

  //   if (error != null) {
  //     toast.error('Hubo un error')
  //   }
  // }
  return {
    addRemission,
    addFileToRemission,
    uploadRemissionPdf,
    addIdRemissionFile,
    handleUploadRemissionAndFile,
    isLoading
  }
}
