/* eslint-disable @typescript-eslint/no-non-null-assertion */
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
import './index.css'
import { ModalProvider } from './context/Modal.tsx'
import { Toaster } from 'sonner'
import ThemeProvider from './context/Theme.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>

    <Provider store={store}>
      <ThemeProvider>
        <ModalProvider>
          <Toaster richColors closeButton position="bottom-center" />
          <App />
        </ModalProvider>

      </ThemeProvider>

    </Provider>

  </BrowserRouter>
)
