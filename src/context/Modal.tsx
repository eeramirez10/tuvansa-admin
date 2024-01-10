import { type Dispatch, type SetStateAction, createContext, useState } from 'react'

export interface ContextType {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

interface Props {
  children: string | JSX.Element | JSX.Element[]
}

export const ModalContext = createContext<ContextType | undefined>(undefined)

// eslint-disable-next-line react/prop-types
export const ModalProvider: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(false)

  return (
    < ModalContext.Provider value={{ open, setOpen }} >

      {children}
    </ModalContext.Provider >
  )
}
