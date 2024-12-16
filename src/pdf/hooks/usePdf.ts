import { useState, useCallback } from 'react'
import { save, signedPdf } from '../utils/pdf'
import { type Attachments, type Dimensions } from '../types'

export interface Pdf {
  name: string
  file: File
  pages: Array<Promise<any>>
}

export const usePdf = () => {
  const [name, setName] = useState('')
  const [pageIndex, setPageIndex] = useState(-1)
  const [dimensions, setDimensions] = useState<Dimensions>()
  const [file, setFile] = useState<File>()
  const [pages, setPages] = useState<any>([])
  const [isMultiPage, setIsMultiPage] = useState(false)
  const [isFirstPage, setIsFirstPage] = useState(false)
  const [isLastPage, setIsLastPage] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const currentPage = pages[pageIndex]

  const setDimensionsHandler = useCallback(setDimensions, [setDimensions])

  const nextPage = (): void => {
    const newPageIndex = pageIndex + 1
    setPageIndex(pageIndex + 1)
    setIsFirstPage(newPageIndex === 0)
    setIsLastPage(newPageIndex === pages.length - 1)
  }

  const previousPage = (): void => {
    const newPageIndex = pageIndex - 1
    setPageIndex(newPageIndex)
    setIsFirstPage(newPageIndex === 0)
    setIsLastPage(newPageIndex === pages.length - 1)
  }

  const initialize = ({ name, file, pages: _pages }: Pdf): void => {
    const multi = _pages.length > 1
    setName(name)
    setFile(file)
    setPages(_pages)
    setPageIndex(0)
    setIsMultiPage(multi)
    setIsFirstPage(true)
    setIsLastPage(_pages.length === 1)
  }

  const savePdf = async (attachments: Attachments[]): Promise<void> => {
    if (isSaving || file === undefined) return

    setIsSaving(true)

    try {
      await save(file, attachments, name)
    } catch (e) {
      console.log(e)
    } finally {
      setIsSaving(false)
    }
  }

  const saveSignedPdf = async (attachments: Attachments[]): Promise<File | undefined> => {
    if (file === undefined) return
    try {
      const signedFile = await signedPdf(file, attachments)

      return signedFile
    } catch (error) {
      console.log(error)
    }
  }

  return {
    currentPage,
    dimensions,
    setDimensions: setDimensionsHandler,
    name,
    setName,
    pageIndex,
    setPageIndex,
    file,
    setFile,
    nextPage,
    pages,
    savePdf,
    initialize,
    isMultiPage,
    previousPage,
    isFirstPage,
    isLastPage,
    isSaving,
    saveSignedPdf
  }
}
