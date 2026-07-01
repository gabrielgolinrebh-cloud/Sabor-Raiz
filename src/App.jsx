import React, { useState } from 'react';
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

  // Estado dos Pedidos centralizado no componente Pai com dados iniciais limpos ou mockados
  const [meusPedidos, setMeusPedidos] = useState([
    {
      id: "#SR-9843",
      data: "28/06/2026",
      status: "Em preparação",
      statusIcon: Clock,
      statusColor: colors.terracotta,
      total: 245.90,
      imagemPrincipal: "https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&q=80&w=400",
      nomePrincipal: "Cesta Café Regional Premium",
      items: [
        { nome: "Cesta Café Regional Premium", qtd: 1, preco: 189.90 },
        { nome: "Queijo Artesanal Canastra", qtd: 1, preco: 56.00 }
      ],
      entrega: "Rua das Flores, 456 - Lourdes, Belo Horizonte - MG"
    }
  ]);

  // Função para adicionar produto agrupando por quantidade se já existir
  const adicionarAoPedido = (produto) => {
    setMeusPedidos(pedidosAtuais => {
      // Procura se já existe um pedido em preparação com esse mesmo produto principal
      const pedidoExistenteIndex = pedidosAtuais.findIndex(
        p => p.status === "Em preparação" && p.items.some(item => item.nome === produto.nome)
      );

      if (pedidoExistenteIndex !== -1) {
        // Se já existe, clona a lista e atualiza o item e o valor total
        const novosPedidos = [...pedidosAtuais];
        const pedido = { ...novosPedidos[pedidoExistenteIndex] };
        
        pedido.items = pedido.items.map(item => {
          if (item.nome === produto.nome) {
            return { ...item, qtd: item.qtd + 1 };
          }
          return item;
        });

        // Recalcula o total do pedido somando preço * quantidade de todos os itens
        pedido.total = pedido.items.reduce((acc, item) => acc + (item.preco * item.qtd), 0);
        novosPedidos[pedidoExistenteIndex] = pedido;
        return novosPedidos;
      } else {
        // Se não existe, cria um novo card de pedido
        const novoPedido = {
          id: `#SR-${Math.floor(Math.random() * 9000) + 1000}`,
          data: new Date().toLocaleDateString('pt-BR'),
          status: "Em preparação",
          statusIcon: Clock,
          statusColor: colors.terracotta,
          total: produto.preco,
          imagemPrincipal: produto.imagem,
          nomePrincipal: produto.nome,
          items: [
            { nome: produto.nome, qtd: 1, preco: produto.preco }
          ],
          entrega: "Endereço cadastrado na conta do usuário"
        };
        return [novoPedido, ...pedidosAtuais];
      }
    });
  };

  // Calcula o total de itens para exibir na bolha da cesta/header
  const totalItensCesta = meusPedidos.reduce((acc, pedido) => {
    return acc + pedido.items.reduce((subAcc, item) => subAcc + item.qtd, 0);
  }, 0);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden" style={{ backgroundColor: colors.cream, color: colors.brown, fontFamily: "'Montserrat', sans-serif" }}>
      
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

      {/* HEADER GLOBAL Passando a quantidade de itens */}
      <Header colors={colors} setTelaAtual={setTelaAtual} totalItens={totalItensCesta} />

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
          <Pedidos meusPedidos={meusPedidos} aoVoltar={() => setTelaAtual('home')} />
        )}
      </main>
    </div>
  );
}