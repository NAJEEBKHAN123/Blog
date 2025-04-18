import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { SearchProvider } from './context/SearchContext' // adjust path if different

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SearchProvider>
        <App />
      </SearchProvider>
    </BrowserRouter>
  </StrictMode>
)
