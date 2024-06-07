import React from 'react'
import { Menu, Dropdown, Icon } from 'semantic-ui-react'

interface Props {
  openHelp: () => void
  uploadNewPdf: () => void
  addText: () => void
  addImage: () => void
  addDrawing: () => void
  isPdfLoaded: boolean
  savingPdfStatus: boolean
  savePdf: () => void
}

export const MenuBar: React.FC<Props> = ({
  openHelp,
  uploadNewPdf,
  addDrawing,
  addText,
  addImage,
  isPdfLoaded,
  savingPdfStatus,
  savePdf
}) => (
  <Menu pointing>
    <Menu.Item header>PDF Editor</Menu.Item>
    <Menu.Menu position="right">
      {isPdfLoaded && (
        <>
          <Dropdown
            data-testid='edit-menu-dropdown'
            item
            closeOnBlur
            icon="edit outline" simple
          >
            <Dropdown.Menu>
              {/* <Dropdown.Item onClick={addText}>Add Text</Dropdown.Item>
              <Dropdown.Item onClick={addImage}>Add Image</Dropdown.Item> */}
              <Dropdown.Item onClick={addDrawing}>Agregar firma</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Item
            data-testid='save-menu-item'
            name={savingPdfStatus ? 'Guardando...' : 'Guardar'}
            disabled={savingPdfStatus}
            onClick={savePdf}
          />
          <Menu.Item
            data-testid='upload-menu-item'
            name="Subir nuevo"
            onClick={uploadNewPdf}
          />
        </>
      )}
      {/* <Menu.Item data-testid="help-menu-item" onClick={openHelp}>
        <Icon name="question circle outline" />
      </Menu.Item> */}
    </Menu.Menu>
  </Menu>
)
