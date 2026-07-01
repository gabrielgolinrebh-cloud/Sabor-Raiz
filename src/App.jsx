import React, { useState } from 'react';
// Importações ajustadas para incluir os ícones dos pedidos
import { MapPin, Clock, Truck, CheckCircle2 } from 'lucide-react';
import Cadastro from './Cadastro';
import Login from './Login';
import Header from './header'; 
import Home from './Home';  
import Sobre from './Sobre';
import Catalogo from './Catalogo';
import Pedidos from './Pedidos';


export default function App() {
  const [telaAtual, setTelaAtual] = useState('home'); 

  const colors = {
    green: '#2F5D50',
    terracotta: '#B96A43',
    gold: '#D1A054',
    cream: '#F6EBD9',
    brown: '#4A3428',
  };

  // Estado dos Pedidos centralizado no componente Pai
  const [meusPedidos, setMeusPedidos] = useState([
    {
      id: "#SR-9843",
      data: "28/06/2026",
      status: "Em preparação",
      statusIcon: Clock,
      statusColor: colors.terracotta,
      total: "R$ 245,90",
      items: [
        { nome: "Cesta Tradição Mineira", qtd: 1, preco: "R$ 180,00" },
        { nome: "Queijo Canastra Artesanal (Avulso)", qtd: 1, preco: "R$ 65,90" }
      ],
      entrega: "Rua das Flores, 456 - Lourdes, Belo Horizonte - MG"
    },
    {
      id: "#SR-9102",
      data: "10/05/2026",
      status: "Entregue",
      statusIcon: CheckCircle2,
      statusColor: colors.green,
      total: "R$ 145,00",
      items: [
        { nome: "Cesta Café da Manhã Afeto", qtd: 1, preco: "R$ 145,00" }
      ],
      entrega: "Rua das Tradições, 123 - Centro, Belo Horizonte - MG"
    }
  ]);

  // Função para criar um novo pedido com base no produto clicado
  const adicionarAoPedido = (produto) => {
    const valorFormatado = produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    
    const novoPedido = {
      id: `#SR-${Math.floor(Math.random() * 10000)}`,
      data: new Date().toLocaleDateString('pt-BR'),
      status: "Em preparação",
      statusIcon: Clock,
      statusColor: colors.terracotta,
      total: valorFormatado,
      items: [
        { nome: produto.nome, qtd: 1, preco: valorFormatado }
      ],
      entrega: "Endereço cadastrado na conta do usuário"
    };

    setMeusPedidos([novoPedido, ...meusPedidos]);
    alert(`Sucesso! ${produto.nome} foi enviado para a página de pedidos.`);
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

      {/* HEADER FIXO GLOBAL */}
      <Header colors={colors} setTelaAtual={setTelaAtual} />

      {/* GERENCIADOR DE PÁGINAS (CONTEÚDO DINÂMICO) */}
      <main className="flex-grow">
        {telaAtual === 'home' && <Home colors={colors} setTelaAtual={setTelaAtual} />}
        
        {telaAtual === 'cadastro' && (
          <Cadastro aoVoltar={() => setTelaAtual('home')} aoMudarParaLogin={() => setTelaAtual('login')} />
        )}
        
        {telaAtual === 'login' && (
          <Login aoVoltar={() => setTelaAtual('home')} aoMudarParaCadastro={() => setTelaAtual('cadastro')} />
        )}

        {telaAtual === 'sobre' && (
          <Sobre aoVoltar={() => setTelaAtual('home')} />
        )}

        {telaAtual === 'catalogo' && (
          <Catalogo aoVoltar={() => setTelaAtual('home')} adicionarAoPedido={adicionarAoPedido} />
        )}

        {telaAtual === 'pedidos' && (
          <Pedidos meusPedidos={meusPedidos} />
        )}

        {/* Removido o erro caso Contatos não exista, ou mantenha se tiver o arquivo */}
        {telaAtual === 'contatos' && (
          <div className="p-8 text-center">Página de Contatos em desenvolvimento.</div>
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
                <li><button onClick={() => setTelaAtual('contatos')} className="hover:text-white block bg-transparent border-none cursor-pointer">Contatos / Suporte</button></li>
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