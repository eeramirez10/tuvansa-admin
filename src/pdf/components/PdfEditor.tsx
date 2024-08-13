import React, { type MutableRefObject, useLayoutEffect, useRef, useState, useEffect } from 'react'
// import SignatureCanvas from 'react-signature-canvas'
import { Empty } from './Empty'
import { type Pdf, usePdf } from '../hooks/usePdf'
import { useAttachments } from '../hooks/useAttachments'
import { ggID } from 'src/utils/helpers'
import { AttachmentTypes } from '../entities'
import { UploadTypes, useUploader } from '../hooks/useUploader'
import { DrawingModal } from '../modals/components/DrawingModal'
import { Grid, Button, Segment } from 'semantic-ui-react'
import { MenuBar } from './MenuBar'
import { Page } from './Page'
import { Attachments } from './Attachments'

interface Props {
  fileServer?: File
  getPdf?: (pdf: File) => void
  getSignedPdf?: (pdf: File) => Promise<void>
  canAuthorize: boolean
  isLoading: boolean
  canUpload: boolean
}

const Index: React.FC<Props> = ({ fileServer, getPdf, getSignedPdf, canAuthorize = false, canUpload = false, isLoading }) => {
  const [drawingModalOpen, setDrawingModalOpen] = useState(false)
  const { file, initialize, pageIndex, isMultiPage, isFirstPage, isLastPage, currentPage, isSaving, previousPage, nextPage, setDimensions, name, dimensions, saveSignedPdf } = usePdf()
  const { add: addAttachment, allPageAttachments, pageAttachments, reset: resetAttachments, update, remove, setPageIndex } = useAttachments()

  const refPage: MutableRefObject<HTMLDivElement | null> = useRef(null)
  const initializePageAndAttachments = (pdfDetails: Pdf): void => {
    initialize(pdfDetails)
    const numberOfPages = pdfDetails.pages.length
    resetAttachments(numberOfPages)
  }

  const { inputRef: pdfInput, handleClick: handlePdfClick, isUploading, onClick, upload: uploadPdf, downloadFromServer, getCurrentPdf } = useUploader({
    use: UploadTypes.PDF,
    afterUploadPdf: initializePageAndAttachments
  })

  const addDrawing = (drawing?: { width: number, height: number, path: string }): void => {
    if (drawing == null) return

    if (refPage.current !== null) {
      const { offsetHeight, offsetWidth } = refPage.current

      const x = offsetWidth - 200
      const y = offsetHeight - 200

      const newDrawingAttachment: DrawingAttachment = {
        id: ggID(),
        type: AttachmentTypes.DRAWING,
        ...drawing,
        x,
        y,
        scale: 1
      }
      addAttachment(newDrawingAttachment)
    }
  }

  const handleUploadPdf = async (): Promise<void> => {
    if (fileServer != null) {
      console.log('edit')
      return
    }

    const pdfFile = getCurrentPdf()

    if (pdfFile !== undefined && getPdf !== undefined) { getPdf(pdfFile) }
  }

  const handleUploadSignedPdf = async (): Promise<void> => {
    const signedFile = await saveSignedPdf(allPageAttachments)

    if (signedFile !== undefined && getSignedPdf !== undefined) {
      getSignedPdf(signedFile)
    }
  }

  useLayoutEffect(() => { setPageIndex(pageIndex) }, [pageIndex, setPageIndex])

  // const handleSavePdf = async (): Promise<void> => {
  //   // savePdf(allPageAttachments)
  //   const signedFile = await saveSignedPdf(allPageAttachments)

  //   if (signedFile === undefined || id === undefined || remissionId === undefined) return

  //   const [error, uploadedFile] = await uploadFile(signedFile)

  //   if (error !== undefined) { console.log(error); return }

  //   const [err, updatedRemission] = await updateRemission(remissionId, { signedFile: uploadedFile?.id, authorized: true })

  //   if (err !== undefined) { console.log(error) }
  //   console.log(updatedRemission)
  //   toast.success('Guardado correctamente')
  // }

  const hiddenInputs = (
    <>
      <input
        data-testid="pdf-input"
        ref={pdfInput}
        type="file"
        name="pdf"
        id="pdf"
        accept="application/pdf"
        onChange={uploadPdf}
        onClick={onClick}
        style={{ display: 'none' }}
      />
    </>
  )

  useEffect(() => {
    if (fileServer !== undefined) {
      downloadFromServer(fileServer)
    }
  }, [fileServer])

  return (

    <div>

      {hiddenInputs}
      <MenuBar
        savePdf={handleUploadSignedPdf}
        addDrawing={() => { setDrawingModalOpen(true) }}
        savingPdfStatus={isSaving}
        uploadNewPdf={handlePdfClick}
        isPdfLoaded={!(file == null)}
        upload={handleUploadPdf}
        canAuthorize={canAuthorize}
        canUpload={canUpload}
      />

      {file === undefined
        ? (
          <Empty
            loading={isUploading}
            uploadPdf={handlePdfClick}
          />
          )
        : (
          <Grid>
            <Grid.Row>
              <Grid.Column width={3} verticalAlign="middle" textAlign="left">
                {isMultiPage && !isFirstPage && (
                  <Button circular icon="angle left" onClick={previousPage} />
                )}
              </Grid.Column>
              <Grid.Column width={10}>
                {(Boolean(currentPage)) && (
                  <Segment
                    data-testid="page"
                    compact
                    stacked={isMultiPage && !isLastPage}
                  >
                    <div
                      style={{ position: 'relative' }}
                      ref={refPage}
                    >
                      <Page
                        dimensions={dimensions}
                        updateDimensions={setDimensions}
                        page={currentPage}
                      />
                      {(dimensions != null) && (
                        <Attachments
                          pdfName={name}
                          removeAttachment={remove}
                          updateAttachment={update}
                          pageDimensions={dimensions}
                          attachments={pageAttachments}
                        />
                      )}
                    </div>
                  </Segment>
                )}

              </Grid.Column>
              <Grid.Column width={3} verticalAlign="middle" textAlign="right">
                {isMultiPage && !isLastPage && (
                  <Button circular icon="angle right" onClick={nextPage} />
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
          )}
      <DrawingModal
        open={drawingModalOpen}
        dismiss={() => { setDrawingModalOpen(false) }}
        confirm={addDrawing}

      />

    </div>
  )
}

export default Index
