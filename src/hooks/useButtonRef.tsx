import { useContext } from 'react'
import { ButtonRefContext, type ContextType } from '../context/Button'

export const useButtonRef = (): ContextType => {
  const context = useContext(ButtonRefContext)

  if (context === undefined) {
    throw new Error('useThemeContext must be used inside the ThemeProvider')
  }

  return context
}
