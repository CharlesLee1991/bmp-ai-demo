import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import IndexPage from './pages/IndexPage'
import SamsungHospital from './pages/SamsungHospital'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/samsung-hospital" element={<SamsungHospital />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
