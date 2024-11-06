import React from 'react'
import ReactDOMClient from 'react-dom/client'
import App from './App'
import './css/main.css'
import './js/js.js'

const app = ReactDOMClient.createRoot(document.getElementById('app'))

app.render(<App />)
