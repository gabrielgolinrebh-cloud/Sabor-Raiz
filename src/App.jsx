import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import Cadastro from './Cadastro';
import Login from './Login';
import Header from './Header'; 
import Home from './Home';  

export default function App() {
  const [telaAtual, setTelaAtual] = useState('home'); // 'home', 'cadastro', 'login', 'sobre', 'catalogo'

  const colors = {
    green: '#2F5D50',
    terracotta: '#B96A43',
    gold: '#D1A054',
    cream: '#F6EBD9',
    brown: '#4A3428',
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden" style={{ backgroundColor: colors.cream, color: colors.brown, fontFamily: "'Montserrat', sans-serif" }}>
      
      {/* Estilos Globais injetados */}
      <style>
        {`
          .font-title { font-family: 'Cormorant Garamond', serif; }
          .border-ornament { border: 1px solid ${colors.gold}; position: relative; }
          .border-ornament::before, .border-ornament::after {
            content: '❖'; position: absolute; color: ${colors.gold}; font-size: 12px; background: ${colors.cream}; padding: 0 4px;
          }
          .border-ornament::before { top: -9px; left: 50%; transform: translateX(-50%); }
          .border-ornament::after { bottom: -9px; left: 50%; transform: translateX(-50%); }
          .floating-badge { animation: floatSR 4s ease-in-out infinite; }
          @keyframes floatSR {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-8px) rotate(2deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
        `}
      </style>

      {/* HEADER FIXO GLOBAL - Fica disponível em todas as páginas */}
      <Header colors={colors} setTelaAtual={setTelaAtual} />

      {/* GERENCIADOR DE PÁGINAS (CONTEÚDO DINÂMICO) */}
      <main className="flex-grow">
        {telaAtual === 'home' && <Home colors={colors} />}
        
        {telaAtual === 'cadastro' && (
          <Cadastro aoVoltar={() => setTelaAtual('home')} aoMudarParaLogin={() => setTelaAtual('login')} />
        )}
        
        {telaAtual === 'login' && (
          <Login aoVoltar={() => setTelaAtual('home')} aoMudarParaCadastro={() => setTelaAtual('cadastro')} />
        )}

        {telaAtual === 'sobre' && (
          <div className="py-32 text-center max-w-4xl mx-auto px-6">
            <h2 className="font-title text-4xl sm:text-5xl mb-6" style={{ color: colors.green }}>Nossa História Completa</h2>
            <p className="text-base leading-relaxed">Esta é a página dedicada e isolada sobre a história da SaborRaiz!</p>
          </div>
        )}

        {telaAtual === 'catalogo' && (
          <div className="py-32 text-center max-w-4xl mx-auto px-6">
            <h2 className="font-title text-4xl sm:text-5xl mb-6" style={{ color: colors.green }}>Catálogo Completo de Cestas</h2>
            <p className="text-base leading-relaxed">Exibição de todos os produtos e filtros de busca do catálogo.</p>
          </div>
        )}
      </main>

      {/* FOOTER GLOBAL */}
      <footer className="mt-auto" style={{ backgroundColor: colors.green, color: colors.cream }}>
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            <div className="sm:col-span-2">
              <h2 className="font-title text-3xl mb-3 text-white">SaborRaiz Cestas</h2>
              <p className="text-xs sm:text-sm opacity-80 max-w-md mb-5 leading-relaxed">Sabores que conectam origens. Levamos a autêntica gastronomia artesanal para as surpresas da vida.</p>
            </div>
            <div className="text-left">
              <h4 className="font-title text-lg mb-4 text-white font-semibold" style={{ color: colors.gold }}>Links Rápidos</h4>
              <ul className="space-y-2.5 text-xs sm:text-sm opacity-85">
                <li><button onClick={() => setTelaAtual('catalogo')} className="hover:text-white block bg-transparent border-none cursor-pointer">Catálogo de Cestas</button></li>
                <li><button onClick={() => setTelaAtual('home')} className="hover:text-white block bg-transparent border-none cursor-pointer">Voltar ao Início</button></li>
              </ul>
            </div>
            <div className="text-left">
              <h4 className="font-title text-lg mb-4 text-white font-semibold" style={{ color: colors.gold }}>Fale Conosco</h4>
              <ul className="space-y-3 text-xs sm:text-sm opacity-85">
                <li className="flex items-start gap-2">
                  <MapPin size={16} className="mt-0.5" style={{ color: colors.terracotta }} />
                  <span>Rua das Tradições, 123 - Centro<br/>Belo Horizonte, MG</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] sm:text-xs opacity-60" style={{ borderColor: `${colors.gold}30` }}>
            <p className="text-center md:text-left">&copy; {new Date().getFullYear()} SaborRaiz Cestas. Todos os direitos reservados.</p>
            <p className="text-center md:text-right">Desenvolvido pelo Grupo 3 - Etapa 1</p>
          </div>
        </div>
      </footer>
    </div>
  );
}