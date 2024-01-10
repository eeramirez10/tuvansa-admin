import { downloadExcel } from 'react-export-table-to-excel'

interface ReturnsProps {
  handleDownloadExcel: ({ fileName, header, body }: { fileName?: string, header: any[], body: any[] }) => void
}

export const useExcel = (): ReturnsProps => {
  const handleDownloadExcel = ({ fileName = 'file', header = [], body }: { fileName?: string, header: any[], body: any[] }): void => {
    downloadExcel({
      fileName,
      sheet: 'counts',
      tablePayload: {
        header,
        // accept two different data structures
        body
      }
    })
  }

  return {
    handleDownloadExcel
  }
}
