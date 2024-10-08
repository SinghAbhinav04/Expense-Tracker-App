import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/Layout/App.jsx'
import "./assets/styleSheets/Main.css"
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
