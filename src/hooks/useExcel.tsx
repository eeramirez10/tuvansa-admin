import { downloadExcel } from 'react-export-table-to-excel'

interface ReturnsProps {
  handleDownloadExcel: ({ fileName, header, body }: { fileName?: string, header: any[], body: Promise<any[]> }) => Promise<void>
}

export const useExcel = (): ReturnsProps => {
  const handleDownloadExcel = async ({ fileName = 'file', header = [], body }: { fileName?: string, header: any[], body: Promise<any[]> }): Promise<void> => {
    console.log(await body)
    downloadExcel({
      fileName,
      sheet: 'counts',
      tablePayload: {
        header,
        // accept two different data structures
        body: await body
      }
    })
  }

  return {
    handleDownloadExcel
  }
}
