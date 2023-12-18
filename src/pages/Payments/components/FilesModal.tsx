// import React from 'react'
// import { DataModal } from 'src/components/DataModal'
// import { useModal } from 'src/hooks/useModal'
// import { ListOfFiles } from './ListOfFiles'
// import { usePayments } from 'src/hooks/usePayments'

// export const FilesModal: React.FC = () => {
//   const { open, handleCancel } = useModal()
//   const { payment } = usePayments()

//   const files = payment?.files !== undefined ? payment.files : []

//   return (

//     <DataModal
//       title="Archivos"
//       open={open}
//       handleCancel={handleCancel}
//     >
//       <ListOfFiles
//         files={files}
//       />
//     </DataModal>
//   )
// }
