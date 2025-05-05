import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { CookiesProvider } from 'react-cookie'
import { BrowserRouter } from 'react-router'

import 'uswds/css/uswds.min.css'
import '@trussworks/react-uswds/lib/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CookiesProvider>
  </StrictMode>,
)
