import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './assets/css/bootstrap.min.css'
import './assets/css/sb-admin-2.min.css'
import './assets/js/bootstrap.bundle.min.js'
import App from './App'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <App />
//   <React.StrictMode>
//   </React.StrictMode>
)

reportWebVitals()
