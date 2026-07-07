import React, { useState } from 'react';
import { MapPin, Clock, Truck, CheckCircle2 } from 'lucide-react';
import Cadastro from './Cadastro';
import Login from './Login';
import Header from './header';
import Home from './Home';
import Sobre from './Sobre';
import Catalogo from './Catalogo';
import Pedidos from './Pedidos';
import Contatos from './Contatos';


export default function App() {
  const [telaAtual, setTelaAtual] = useState('home'); 

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

      <footer className="mt-auto border-t" style={{ backgroundColor: colors.cream, color: colors.green, borderColor: `${colors.gold}40` }}>
        <div className="max-w-7xl mx-auto px-4 pt-16 pb-6 sm:px-6 lg:px-8 w-full relative">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            
            {/* Coluna 1: Logo e Texto */}
            <div className="flex flex-col space-y-4">
              <div className="text-left">
                <h2 className="font-title text-4xl m-0 tracking-tight" style={{ color: colors.green }}>
                  Sabor<span style={{ color: colors.terracotta }}>Raiz</span>
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="h-px w-8" style={{ backgroundColor: colors.gold }}></span>
                  <span className="uppercase tracking-[0.3em] text-sm font-semibold" style={{ color: colors.green }}>Cestas</span>
                  <span className="h-px w-8" style={{ backgroundColor: colors.gold }}></span>
                </div>
              </div>
              <p className="text-sm mt-4 max-w-xs leading-relaxed opacity-90 font-medium">
                Cestas especiais com produtos regionais e muito amor para todos os momentos.
              </p>
            </div>

            {/* Coluna 2: Links Rápidos */}
            <div className="text-left">
              <h4 className="font-bold text-sm uppercase tracking-wider mb-6" style={{ color: colors.green }}>
                Links Rápidos
              </h4>
              <ul className="space-y-3 text-sm font-medium opacity-90">
                {[
                  { label: 'Início', acao: 'home' },
                  { label: 'Sobre Nós', acao: 'sobre' },
                  { label: 'Nossas Cestas', acao: 'catalogo' },
                  { label: 'Produtos', acao: 'produtos' },
                  { label: 'Empresariais', acao: 'empresariais' },
                  { label: 'Contato', acao: 'contatos' }
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Leaf size={14} style={{ color: colors.gold }} className="flex-shrink-0" />
                    <button 
                      onClick={() => setTelaAtual(item.acao)} 
                      className="bg-transparent border-none cursor-pointer transition-colors hover:font-bold p-0 m-0 text-left"
                      style={{ color: colors.green }}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coluna 3: Informações */}
            <div className="text-left">
              <h4 className="font-bold text-sm sm:text-base uppercase tracking-wider mb-6" style={{ color: colors.green }}>
                Informações
              </h4>
              <ul className="space-y-4 text-sm sm:text-base font-medium opacity-90">
                {Object.keys(INFOS_SABOR_RAIZ).map((item, index) => (
                  <li key={index}>
                    <button 
                      onClick={() => setInfoPopupModal(item)} // Abre o pop-up com o texto correspondente
                      className="bg-transparent border-none cursor-pointer transition-all hover:opacity-70 p-0 m-0 text-left"
                      style={{ color: colors.green }}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coluna 4: Redes Sociais e Imagem */}
            <div className="text-left relative flex flex-col items-start">
              <h4 className="font-bold text-sm uppercase tracking-wider mb-6" style={{ color: colors.green }}>
                Siga-nos
              </h4>
              <div className="flex gap-3 mb-6 relative z-10">
                {[
                  { icon: <FaInstagram size={18} />, link: "https://www.instagram.com/sabor.raizoficial/" },
                  { icon: <FaFacebookF size={18} />, link: "https://www.facebook.com/p/Sabor-Raiz-61560768295582/?locale=pt_BR" },
                  { icon: <FaLinkedinIn size={18} />, link: "https://www.linkedin.com/company/restaurante-e-pir%C3%A3o-de-aipim-sabor-raiz/about/" }
                ].map((social, index) => (
                  <a 
                    key={index} 
                    href={social.link} 
                    className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{ borderColor: colors.green, color: colors.green }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t flex flex-col text-center text-xs sm:text-sm font-medium opacity-80" style={{ borderColor: `${colors.gold}40` }}>
            <p>&copy; {new Date().getFullYear()} Sabor Raiz Cestas. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* POP-UP / MODAL DINÂMICO */}
      {infoPopupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setInfoPopupModal(null)}
          ></div>
          <div className="relative bg-[#F6EBD9] w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in duration-300 border" style={{ borderColor: colors.gold }}>
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: `${colors.gold}50`, backgroundColor: colors.green }}>
              <h3 className="font-title text-2xl text-white">
                {INFOS_SABOR_RAIZ[infoPopupModal].titulo}
              </h3>
              <button 
                onClick={() => setInfoPopupModal(null)}
                className="text-white hover:text-amber-400 transition-colors bg-transparent border-none cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>
            <div className="px-6 py-8 max-h-[70vh] overflow-y-auto">
              {INFOS_SABOR_RAIZ[infoPopupModal].conteudo}
            </div>
            <div className="px-6 py-4 border-t flex justify-end" style={{ borderColor: `${colors.gold}50`, backgroundColor: `${colors.cream}50` }}>
              <button 
                onClick={() => setInfoPopupModal(null)}
                className="px-6 py-2 rounded-sm font-semibold text-white transition-all hover:opacity-90 shadow-sm"
                style={{ backgroundColor: colors.terracotta }}
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}