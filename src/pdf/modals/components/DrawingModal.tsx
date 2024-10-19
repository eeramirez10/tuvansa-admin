import React, { useState, createRef, useEffect } from 'react'
import { Modal, Button, Menu, Dropdown, Label } from 'semantic-ui-react'
import { Color } from '../../entities'
import { DrawingAttachment } from '../../types'

interface Props {
  open: boolean
  dismiss: () => void
  drawing?: DrawingAttachment
}

export const DrawingModal = ({ open, dismiss, drawing }: Props) => {
  const svgRef = createRef<SVGSVGElement>()
  const [paths, setPaths] = useState<Array<[string, number, number]>>([])
  const [path, setPath] = useState(((drawing?.path) != null) || '')
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
    event.preventDefault()
    setMouseDown(true)

    const x = event.clientX - svgX
    const y = event.clientY - svgY
    setMinX(Math.min(minX, x))
    setMaxX(Math.max(maxX, x))
    setMinY(Math.min(minY, y))
    setMaxY(Math.max(maxY, y))
    setPath(path + `M${x},${y}`)
    setPaths([...paths, ['M', x, y]])
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>): void => {
    event.preventDefault()
    if (!mouseDown) return

    const x = event.clientX - svgX
    const y = event.clientY - svgY
    setMinX(Math.min(minX, x))
    setMaxX(Math.max(maxX, x))
    setMinY(Math.min(minY, y))
    setMaxY(Math.max(maxY, y))
    setPath(path + `L${x},${y}`)
    setPaths([...paths, ['L', x, y]])
  }

  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>): void => {
    event.preventDefault()
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

  const handlePreview = () => {
    const svgContent = getSVGSign()
  
    setSavedSvgContent(svgContent)

  }

  const getSVGSign = (): string =>{
    const boundingWidth = maxX - minX
    const boundingHeight = maxY - minY
    const dx = -(minX - 10)
    const dy = -(minY - 10)

    const nombreUsuario = "Erick Ramirez" // Cambia esto para obtener el nombre del usuario logueado dinámicamente

    // Crear solo el atributo 'd' para el path
    const pathData = paths.reduce(
      (fullPath, lineItem) =>
        `${fullPath}${lineItem[0]}${lineItem[1] + dx},${lineItem[2] + dy}`,
      ''
    )

    // Generar el contenido completo del SVG
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
          x="50"
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

  const handleDone = (): void => {
    if (paths.length === 0) {
      confirm()
      return
    }

    const newSvg = stringToSvgElement(savedSvgContent!)
    saveSvgAsImage(newSvg!, 'mi-imagen');

    closeModal()
  }

  function stringToSvgElement(svgString: string): SVGSVGElement | null {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, 'image/svg+xml');
    const svgElement = doc.querySelector('svg') as SVGSVGElement | null;
    return svgElement;
  }

  function saveSvgAsImage(svgElement: SVGSVGElement, fileName: string): void {
    // Clonar el SVG para no modificar el original
    const clonedSvgElement = svgElement.cloneNode(true) as SVGSVGElement;

    console.log(svgElement)

    // Serializar el SVG a una cadena
    const serializer = new XMLSerializer();
    const svgString: string = serializer.serializeToString(clonedSvgElement);

    // Asegurar que el SVG tenga una fuente definida
    const styledSvgString = svgString.replace(
      '<svg',
      `<svg style="font-family: Arial, sans-serif;"`
    );

    // Crear un objeto Blob con el tipo MIME adecuado
    const svgBlob: Blob = new Blob([styledSvgString], { type: 'image/svg+xml;charset=utf-8' });
    const url: string = URL.createObjectURL(svgBlob);

    // Crear una nueva imagen
    const img: HTMLImageElement = new Image();
    img.onload = () => {
      // Crear un canvas con las dimensiones del SVG
      const canvas: HTMLCanvasElement = document.createElement('canvas');
      canvas.width = svgElement.width.baseVal.value;
      canvas.height = svgElement.height.baseVal.value;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error('No se pudo obtener el contexto 2D del canvas');
        return;
      }

      // Dibujar el SVG en el canvas
      ctx.drawImage(img, 0, 0);

      // Convertir el canvas a una imagen (por ejemplo, PNG)
      const imgURL: string = canvas.toDataURL('image/png');

      // Crear un enlace para descargar la imagen
      const downloadLink: HTMLAnchorElement = document.createElement('a');
      downloadLink.href = imgURL;
      downloadLink.download = `${fileName}.png`;

      // Iniciar la descarga
      downloadLink.click();

      // Liberar la URL temporal
      URL.revokeObjectURL(url);
    };

    // Establecer la URL como fuente de la imagen
    img.src = url;
  }

  const closeModal = (): void => {
    resetDrawingBoard()
    dismiss()
  }

  // TODO: Move to config
  const strokeSizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const handleStrokeSelect = (color: Color) => () => {
    setStroke(color)
    setStrokeDropdownOpen(false)
  }

  return (
    <Modal size="tiny" dimmer="inverted" open={open} onClose={closeModal}>
      <Modal.Header>Add your Drawing</Modal.Header>
      <Modal.Content>
        <Menu size="tiny">
          <Menu.Item header>Tools</Menu.Item>
          {/* <Menu.Item><Icon name="undo" /></Menu.Item>
                    <Menu.Item><Icon name="redo" /></Menu.Item> */}
          <Menu.Menu position="right">
            <Dropdown item text={`${strokeWidth}`}>
              <Dropdown.Menu>
                {strokeSizes.map((size) => (
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
                        onClick={handleStrokeSelect(color)}
                      />
                    </div>
                  ))}
                </div>
              </Dropdown.Menu>
            </Dropdown>
            {/* <Dropdown item text={stroke}>
                            <Dropdown.Menu>
                                <Card.Group itemsPerRow={3}>
                                    {Object.values(Color).map((color, index) => (
                                        <Card inverted key={index} color={color} />
                                    ))}
                                </Card.Group>
                            </Dropdown.Menu>
                        </Dropdown> */}
          </Menu.Menu>
        </Menu>
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
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
        {savedSvgContent && (
          <SignPreview savedSvgContent={savedSvgContent} />
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button color="blue" content="Reset" onClick={resetDrawingBoard} />
        <Button color="red" content="Cancel" onClick={closeModal} />
        <Button color="black" content="Preview" onClick={handlePreview} />
        <Button
          content="Done"
          labelPosition="right"
          icon="checkmark"
          onClick={handleDone}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

const SignPreview = ({ savedSvgContent }: { savedSvgContent: string }) => {

  return (
    <>
      <h3>Vista Previa</h3>
      <div
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
        dangerouslySetInnerHTML={{ __html: savedSvgContent }}
      />
    </>

  )
}