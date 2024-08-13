import { useContext, useEffect } from 'react'
import { ThemeContext, type ThemeValues } from 'src/context/Theme'

interface UseThemeReturn {
  theme: ThemeValues
  handleTheme: (theme: ThemeValues) => void
}

export const useTheme = (): UseThemeReturn => {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error('use ThemeContext must be used inside the ThemeProvider')
  }

  const { theme, setTheme } = context

  useEffect(() => {
    if (localStorage.getItem('themeApp') !== undefined) {
      const themeApp = localStorage.getItem('themeApp')
      setTheme(themeApp)
    }
  })

  const handleTheme = (theme: ThemeValues): void => {
    setTheme(theme)
    localStorage.setItem('themeApp', theme)
  }

  return {
    theme,
    handleTheme
  }
}
