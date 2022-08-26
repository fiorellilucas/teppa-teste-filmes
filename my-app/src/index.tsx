import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Adicionar from './adicionar';
import { BrowserRouter, Route, Routes } from "react-router-dom"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/adicionar" element={<Adicionar />} />
    </Routes>
  </BrowserRouter>
);

