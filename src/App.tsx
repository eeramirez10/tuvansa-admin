import React from 'react'
import { AppRouter } from './AppRouter'
import { ConfigProvider, theme } from 'antd'
import { useTheme } from './hooks/useTheme'
const App: React.FC = () => {
  const { defaultAlgorithm, darkAlgorithm } = theme
  const { theme: tema } = useTheme()

  return (
    <>

      <ConfigProvider
        theme={{ algorithm: tema === 'dark' ? darkAlgorithm : defaultAlgorithm }}
      >
        <AppRouter />

      </ConfigProvider>

    </>
  )
}

export default App
