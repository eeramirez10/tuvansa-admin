import React, { type Dispatch, type SetStateAction, createContext, useState } from 'react'

const THEME_VALUES = {
  dark: 'dark',
  light: 'light'
} as const

export type ThemeValues = typeof THEME_VALUES[keyof typeof THEME_VALUES]

export interface ContextType {
  theme: ThemeValues
  setTheme: Dispatch<SetStateAction<any>>
}
interface Props {
  children: string | JSX.Element | JSX.Element[]
}

export const ThemeContext = createContext<ContextType | undefined>(undefined)

const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState(THEME_VALUES.light)

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
