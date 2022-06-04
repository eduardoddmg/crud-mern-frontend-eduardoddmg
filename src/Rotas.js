import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Criar from './pages/Criar';
import Editar from './pages/Editar';
import Home from './pages/Home'

const Rotas = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/criar" element={<Criar />} />
      <Route path="/editar/:id" element={<Editar />} />
    </Routes>
  );
}

export default Rotas