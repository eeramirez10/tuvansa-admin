import React from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'

interface Props {
  uploadNewPdf: () => void
  addDrawing: () => void
  isPdfLoaded: boolean
  savingPdfStatus: boolean
  savePdf: () => void
  upload: () => Promise<void>
  addText: () => void;
  canAuthorize: boolean
  canUpload: boolean

}

export const MenuBar: React.FC<Props> = ({
  uploadNewPdf,
  addDrawing,
  upload,
  addText,
  savingPdfStatus,
  savePdf,
  canAuthorize,
  canUpload
}) => (
  <Menu pointing>
    <Menu.Item header>PDF Editor</Menu.Item>
    <Menu.Menu position="right">

      <>
        {
          canAuthorize &&
          <>
            <Dropdown
              data-testid='edit-menu-dropdown'
              item
              closeOnBlur
              icon="edit outline" simple
            >
              <Dropdown.Menu

              >
                <Dropdown.Item onClick={addText}>Add Text</Dropdown.Item>
              {/* <Dropdown.Item onClick={addImage}>Add Image</Dropdown.Item> */}
                <Dropdown.Item onClick={addDrawing} disabled={!canAuthorize}>Agregar firma</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Item
              data-testid='save-menu-item'
              name={savingPdfStatus ? 'Guardando...' : 'Guardar firmado'}
              disabled={savingPdfStatus || !canAuthorize}
              onClick={savePdf}
            />
          </>

        }
        {

          canUpload &&
          <>

            <Menu.Item
              data-testid='save-menu-item'
              name={savingPdfStatus ? 'Guardando...' : 'Subir a servidor'}

              onClick={upload}
            />
            <Menu.Item
              data-testid='upload-menu-item'
              name="Subir nuevo"
              onClick={uploadNewPdf}
            />

          </>

        }

      </>

      {/* <Menu.Item data-testid="help-menu-item" onClick={openHelp}>
        <Icon name="question circle outline" />
      </Menu.Item> */}
    </Menu.Menu>
  </Menu>
)
