/* eslint-disable @typescript-eslint/no-non-null-assertion */
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider, theme } from 'antd'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
import './index.css'
import { ModalProvider } from './context/Modal.tsx'
import { Toaster } from 'sonner'

const { defaultAlgorithm, darkAlgorithm } = theme

const dark = true

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ConfigProvider
      theme={{ algorithm: dark ? darkAlgorithm : defaultAlgorithm }}
    >
      <Provider store={store}>
        <ModalProvider>
          <Toaster richColors closeButton position="bottom-center" />
          <App />
        </ModalProvider>
      </Provider>
    </ConfigProvider>
  </BrowserRouter>
)
