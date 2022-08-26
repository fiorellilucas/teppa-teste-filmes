import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import FormFilme from "./adicionar"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/adicionar" element={<FormFilme />} />
      <Route path="/alterar" element={<FormFilme />} />
    </Routes>
  </BrowserRouter>
)
