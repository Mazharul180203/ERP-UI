import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/CSS/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Webroute from "./routes/webroute.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Webroute />
  </React.StrictMode>,
)
