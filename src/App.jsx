import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import Cadastro from './Cadastro';
import Login from './Login';
import Header from './header';
import Home from './Home';
import Sobre from './Sobre';
import Catalogo from './Catalogo';
import Pedidos from './Pedidos';
import Contatos from './Contatos';
import AreaAdmin from './AreaAdmin';
import { adicionarAoCarrinho, listarCarrinho } from './services/api';

export default function App() {
  const [telaAtual, setTelaAtual] = useState('home');
  const [usuario, setUsuario] = useState(null);
  const [meusPedidos, setMeusPedidos] = useState([]);

  const colors = {
    green: '#2F5D50',
    terracotta: '#B96A43',
    gold: '#D1A054',
    cream: '#F6EBD9',
    brown: '#4A3428',
  };

  const carregarCarrinho = async (userId) => {
    try {
      const itens = await listarCarrinho(userId);
      const pedidosFormatados = itens.map((item, index) => ({
        id: `#SR-${1000 + index}`,
        data: new Date(item.added_at).toLocaleDateString('pt-BR'),
        status: 'Em preparação',
        statusIcon: Clock,
        statusColor: colors.terracotta,
        total: Number(item.preco) * Number(item.quantidade),
        imagemPrincipal: item.imagem,
        nomePrincipal: item.nome,
        items: [{ nome: item.nome, qtd: Number(item.quantidade), preco: Number(item.preco) }],
        entrega: 'Endereço cadastrado na conta do usuário',
      }));
      setMeusPedidos(pedidosFormatados);
    } catch (error) {
      console.error(error);
      setMeusPedidos([]);
    }
  };

  useEffect(() => {
    if (usuario?.id) {
      carregarCarrinho(usuario.id);
    } else {
      setMeusPedidos([]);
    }
  }, [usuario]);

  useEffect(() => {
    if (telaAtual === 'admin' && usuario?.role !== 'admin') {
      setTelaAtual('home');
    }
  }, [telaAtual, usuario]);

  const adicionarAoPedido = async (produto) => {
    if (usuario?.id) {
      try {
        await adicionarAoCarrinho(usuario.id, produto.id, 1);
        await carregarCarrinho(usuario.id);
      } catch (error) {
        console.error(error);
      }
      return;
    }

    setMeusPedidos((pedidosAtuais) => {
      const pedidoExistenteIndex = pedidosAtuais.findIndex(
        (p) => p.status === 'Em preparação' && p.items.some((item) => item.nome === produto.nome)
      );

      if (pedidoExistenteIndex !== -1) {
        const novosPedidos = [...pedidosAtuais];
        const pedido = { ...novosPedidos[pedidoExistenteIndex] };

        pedido.items = pedido.items.map((item) => {
          if (item.nome === produto.nome) {
            return { ...item, qtd: item.qtd + 1 };
          }
          return item;
        });

        pedido.total = pedido.items.reduce((acc, item) => acc + item.preco * item.qtd, 0);
        novosPedidos[pedidoExistenteIndex] = pedido;
        return novosPedidos;
      }

      const novoPedido = {
        id: `#SR-${Math.floor(Math.random() * 9000) + 1000}`,
        data: new Date().toLocaleDateString('pt-BR'),
        status: 'Em preparação',
        statusIcon: Clock,
        statusColor: colors.terracotta,
        total: produto.preco,
        imagemPrincipal: produto.imagem,
        nomePrincipal: produto.nome,
        items: [{ nome: produto.nome, qtd: 1, preco: produto.preco }],
        entrega: 'Endereço cadastrado na conta do usuário',
      };
      return [novoPedido, ...pedidosAtuais];
    });
  };

  const totalItensCesta = meusPedidos.reduce((acc, pedido) => {
    return acc + pedido.items.reduce((subAcc, item) => subAcc + item.qtd, 0);
  }, 0);

  const handleLogin = (usuarioLogado) => {
    setUsuario(usuarioLogado);
    setTelaAtual('home');
  };

  const handleCadastro = (usuarioCadastrado) => {
    setUsuario(usuarioCadastrado);
    setTelaAtual('home');
  };

  const handleSair = () => {
    setUsuario(null);
    setTelaAtual('home');
  };

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

      <Header colors={colors} setTelaAtual={setTelaAtual} totalItens={totalItensCesta} usuario={usuario} onSair={handleSair} />

      <main className="flex-grow">
        {telaAtual === 'home' && <Home colors={colors} setTelaAtual={setTelaAtual} />}
        
        {telaAtual === 'cadastro' && (
          <Cadastro aoVoltar={() => setTelaAtual('home')} aoMudarParaLogin={() => setTelaAtual('login')} aoCadastrar={handleCadastro} />
        )}
        
        {telaAtual === 'login' && (
          <Login aoVoltar={() => setTelaAtual('home')} aoMudarParaCadastro={() => setTelaAtual('cadastro')} aoLogar={handleLogin} />
        )}

        {telaAtual === 'sobre' && (
          <Sobre aoVoltar={() => setTelaAtual('home')} />
        )}

        {telaAtual === 'contatos' && (
          <Contatos />
        )}

        {telaAtual === 'catalogo' && (
          <Catalogo aoVoltar={() => setTelaAtual('home')} adicionarAoPedido={adicionarAoPedido} />
        )}

        {telaAtual === 'pedidos' && (
          <Pedidos meusPedidos={meusPedidos} aoVoltar={() => setTelaAtual('home')} />
        )}

        {telaAtual === 'admin' && usuario?.role === 'admin' && (
          <AreaAdmin colors={colors} usuario={usuario} onVoltar={() => setTelaAtual('home')} />
        )}
      </main>
    </div>
  );
}