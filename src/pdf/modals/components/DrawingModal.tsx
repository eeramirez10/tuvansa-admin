import React, { useState, createRef, useEffect } from 'react'
import { Modal, Button, Menu, Dropdown, Label } from 'semantic-ui-react'
import { Color } from '../../entities'
import { type DrawingAttachment } from '../../types'
import { fetchSignatureWithToken } from '../../../helpers/fetchWithToken'
import { toast } from 'sonner'
import { useAuth } from 'src/hooks/useAuth'

interface Props {
  open: boolean
  dismiss: () => void
  drawing?: DrawingAttachment
}

export const DrawingModal: React.FC<Props> = ({ open, dismiss, drawing }) => {
  const { user } = useAuth()
  const svgRef = createRef<SVGSVGElement>()
  const [paths, setPaths] = useState<Array<[string, number, number]>>([])
  const [path, setPath] = useState(drawing?.path ?? '')
  const [svgX, setSvgX] = useState(0)
  const [svgY, setSvgY] = useState(0)
  const [minX, setMinX] = useState(Infinity)
  const [maxX, setMaxX] = useState(0)
  const [minY, setMinY] = useState(Infinity)
  const [maxY, setMaxY] = useState(0)
  const [mouseDown, setMouseDown] = useState(false)
  const [strokeWidth, setStrokeWidth] = useState(2)
  const [stroke, setStroke] = useState(Color.BLACK)
  const [strokeDropdownOpen, setStrokeDropdownOpen] = useState(false)
  const [savedSvgContent, setSavedSvgContent] = useState<string | null>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (svg === null) return
    const { x, y } = svg.getBoundingClientRect()
    setSvgX(x)
    setSvgY(y)
  }, [svgRef])

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>): void => {
    startDrawing(event.clientX, event.clientY)
  }

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>): void => {
    const touch = event.touches[0]
    startDrawing(touch.clientX, touch.clientY)
  }

  const startDrawing = (clientX: number, clientY: number): void => {
    setMouseDown(true)
    const x = clientX - svgX
    const y = clientY - svgY
    setMinX(Math.min(minX, x))
    setMaxX(Math.max(maxX, x))
    setMinY(Math.min(minY, y))
    setMaxY(Math.max(maxY, y))
    setPath(path + `M${x},${y}`)
    setPaths([...paths, ['M', x, y]])
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (!mouseDown) return
    draw(event.clientX, event.clientY)
  }

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>): void => {
    if (!mouseDown) return
    const touch = event.touches[0]
    draw(touch.clientX, touch.clientY)
  }

  const draw = (clientX: number, clientY: number): void => {
    const x = clientX - svgX
    const y = clientY - svgY
    setMinX(Math.min(minX, x))
    setMaxX(Math.max(maxX, x))
    setMinY(Math.min(minY, y))
    setMaxY(Math.max(maxY, y))
    setPath(path + `L${x},${y}`)
    setPaths([...paths, ['L', x, y]])
  }

  const handleMouseUp = (): void => {
    stopDrawing()
  }

  const handleTouchEnd = (): void => {
    stopDrawing()
  }

  const stopDrawing = (): void => {
    setMouseDown(false)
  }

  const resetDrawingBoard = (): void => {
    setPaths([])
    setPath('')
    setMinX(Infinity)
    setMaxX(0)
    setMinY(Infinity)
    setMaxY(0)
    setStrokeWidth(strokeWidth)
    setStroke(Color.BLACK)
    setSavedSvgContent(null)
  }

  const handlePreview = (): void => {
    const svgContent = getSVGSign()
    setSavedSvgContent(svgContent)
  }

  const getSVGSign = (): string => {
    const boundingWidth = maxX - minX
    const boundingHeight = maxY - minY
    const dx = -(minX - 10)
    const dy = -(minY - 10)
    const nombreUsuario = `${user.name} ${user.last}`
    const pathData = paths.reduce(
      (fullPath, lineItem) =>
        `${fullPath}${lineItem[0]}${lineItem[1] + dx},${lineItem[2] + dy}`,
      ''
    )
    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${boundingWidth + 20}" height="${boundingHeight + 40}">
        <path
          stroke-width="${strokeWidth}"
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke="${stroke}"
          fill="none"
          d="${pathData}"
        />
        <text
          x="10"
          y="${boundingHeight + 30}"
          font-size="14"
          fill="black"
        >
          ${nombreUsuario}
        </text>
      </svg>
    `
    return svgContent
  }

  const handleDone = async (): Promise<void> => {
    if (paths.length === 0) {
      toast.error('Debe de agregar la firma primero')
      return
    }
    if (savedSvgContent === null) return
    try {
      await uploadSvgToServer(savedSvgContent)
      toast.success('Firma agregada')
    } catch (error) {
      toast.error('Hubo un error al subir')
    }
    closeModal()
  }

  async function uploadSvgToServer (svgContent: string): Promise<void> {
    return await fetchSignatureWithToken(svgContent)
  }

  const closeModal = (): void => {
    resetDrawingBoard()
    dismiss()
  }

  return (
    <Modal size="tiny" dimmer="inverted" open={open} onClose={closeModal}>
      <Modal.Header>Add your Drawing</Modal.Header>
      <Modal.Content>
        <Menu size="tiny">
          <Menu.Item header>Tools</Menu.Item>
          <Menu.Menu position="right">
            <Dropdown item text={`${strokeWidth} `}>
              <Dropdown.Menu>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((size) => (
                  <Dropdown.Item
                    key={size}
                    selected={size === strokeWidth}
                    onClick={() => { setStrokeWidth(size) }}
                  >
                    {size}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown
              item
              trigger={<Label color={stroke} />}
              onClick={() => { setStrokeDropdownOpen(true) }}
              onBlur={() => { setStrokeDropdownOpen(false) }}
            >
              <Dropdown.Menu open={strokeDropdownOpen}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    padding: 5
                  }}
                >
                  {Object.values(Color).map((color, index) => (
                    <div
                      style={{ margin: 2.5 }}
                      key={index}
                    >
                      <Label
                        color={color}
                        onClick={() => { setStroke(color) }}
                      />
                    </div>
                  ))}
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Menu>
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ touchAction: 'none' }}
        >
          <svg
            ref={svgRef}
            style={{
              width: '100%',
              border: 'solid gray 1px'
            }}
          >
            <path
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
              strokeLinecap="round"
              stroke={stroke}
              fill="none"
              d={path}
            />
          </svg>
        </div>
        {(savedSvgContent != null) && (
          <SignPreview savedSvgContent={savedSvgContent} />
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button color="blue" content="Reset" onClick={resetDrawingBoard} />
        <Button color="red" content="Cancel" onClick={closeModal} />
        <Button color="black" content="Preview" onClick={handlePreview} />
        <Button
          content="Done"
          onClick={handleDone}
          labelPosition="right"
          icon="checkmark"
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

const SignPreview = ({ savedSvgContent }: { savedSvgContent: string }): JSX.Element => (
  <div>
    <p>Preview</p>
    <div
      style={{
        border: 'solid gray 1px',
        display: 'flex',
        justifyContent: 'center',
        padding: 5
      }}
      dangerouslySetInnerHTML={{
        __html: savedSvgContent
      }}
    />
  </div>
)
