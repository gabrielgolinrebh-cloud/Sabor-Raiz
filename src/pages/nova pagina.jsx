// src/pages/NovaPagina.jsx
import React from 'react';

export default function NovaPagina() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: '#F6EBD9', color: '#4A3428' }}>
      <h1 className="text-4xl font-bold mb-4">Bem-vindo à Nova Página!</h1>
      <p>Aqui você pode colocar o formulário de login, o catálogo completo, etc.</p>
      <a href="/" className="mt-6 text-sm underline" style={{ color: '#2F5D50' }}>Voltar para a Home</a>
    </div>
  );
}