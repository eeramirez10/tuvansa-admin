/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider, theme } from 'antd'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
import './index.css'

const { defaultAlgorithm, darkAlgorithm } = theme

const dark = false

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ConfigProvider
      theme={{ algorithm: dark ? darkAlgorithm : defaultAlgorithm }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </BrowserRouter>
)
