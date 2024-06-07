import React, { type MutableRefObject, useLayoutEffect, useRef, useState } from 'react'
// import SignatureCanvas from 'react-signature-canvas'
import { Empty } from './Empty'
import { usePdf } from '../hooks/usePdf'
import { useAttachments } from '../hooks/useAttachments'
import { ggID } from 'src/utils/helpers'
import { AttachmentTypes } from '../entities'
import { UploadTypes, useUploader } from '../hooks/useUploader'
import { DrawingModal } from '../modals/components/DrawingModal'
import { Grid, Button, Segment } from 'semantic-ui-react'
import { MenuBar } from './MenuBar'
import { Page } from './Page'
import { Attachments } from './Attachments'

const Index: React.FC = () => {
  const [drawingModalOpen, setDrawingModalOpen] = useState(false)
  const { file, initialize, pageIndex, isMultiPage, isFirstPage, isLastPage, currentPage, isSaving, savePdf, previousPage, nextPage, setDimensions, name, dimensions } = usePdf()
  const { add: addAttachment, allPageAttachments, pageAttachments, reset: resetAttachments, update, remove, setPageIndex } = useAttachments()

  const refPage: MutableRefObject<HTMLDivElement | null> = useRef(null)
  const initializePageAndAttachments = (pdfDetails: Pdf) => {
    initialize(pdfDetails)
    const numberOfPages = pdfDetails.pages.length
    resetAttachments(numberOfPages)
  }

  const { inputRef: pdfInput, handleClick: handlePdfClick, isUploading, onClick, upload: uploadPdf } = useUploader({
    use: UploadTypes.PDF,
    afterUploadPdf: initializePageAndAttachments
  })
  const { inputRef: imageInput, handleClick: handleImageClick, onClick: onImageClick, upload: uploadImage } = useUploader({
    use: UploadTypes.IMAGE,
    afterUploadAttachment: addAttachment
  })

  const addText = () => {
    const newTextAttachment: TextAttachment = {
      id: ggID(),
      type: AttachmentTypes.TEXT,
      x: 0,
      y: 0,
      width: 120,
      height: 25,
      size: 16,
      lineHeight: 1.4,
      fontFamily: 'Times-Roman',
      text: 'Enter Text Here'
    }
    addAttachment(newTextAttachment)
  }

  const addDrawing = (drawing?: { width: number, height: number, path: string }): void => {
    if (drawing == null) return

    console.log(refPage.current)

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

  useLayoutEffect(() => { setPageIndex(pageIndex) }, [pageIndex, setPageIndex])

  const handleSavePdf = (): void => { savePdf(allPageAttachments) }

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
      <input
        ref={imageInput}
        type="file"
        id="image"
        name="image"
        accept="image/*"
        onClick={onImageClick}
        style={{ display: 'none' }}
        onChange={uploadImage}
      />
    </>
  )
  return (

    <div>

      <div>Firma de documentos</div>

      {/* <SignatureCanvas
        backgroundColor='white'
        canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }} />, */}

      {hiddenInputs}
      <MenuBar
        openHelp={() => { setHelpModalOpen(true) }}
        savePdf={handleSavePdf}
        addText={addText}
        addImage={handleImageClick}
        addDrawing={() => { setDrawingModalOpen(true) }}
        savingPdfStatus={isSaving}
        uploadNewPdf={handlePdfClick}
        isPdfLoaded={!(file == null)}
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
                {currentPage && (
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
                      {dimensions && (
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
