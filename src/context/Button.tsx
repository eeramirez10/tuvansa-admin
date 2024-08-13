import React, { createContext, useRef, type RefObject } from 'react'

export interface ContextType {
  buttonRef: RefObject<HTMLButtonElement> | null
}

interface Props {
  children: string | JSX.Element | JSX.Element[]
}

export const ButtonRefContext = createContext<ContextType | undefined>(undefined)

export const ButtonProvider: React.FC<Props> = ({ children }) => {
  const buttonRef = useRef(null)

  return (
    <ButtonRefContext.Provider value={{ buttonRef }} >
      {children}
    </ButtonRefContext.Provider>
  )
}
