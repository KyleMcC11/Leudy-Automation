import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import './styles/navbar.css'
import './styles/hero.css'
import './styles/problem.css'
import './styles/services.css'
import './styles/how.css'
import './styles/work.css'
import './styles/testimonials.css'
import './styles/about.css'
import './styles/roi.css'
import './styles/book.css'
import './styles/contact.css'
import './styles/privacy.css'
import './styles/footer.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
