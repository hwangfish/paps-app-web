import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom' // 👈 'react-router-dom'으로 정확히 수정했습니다!

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/paps-app-web">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
