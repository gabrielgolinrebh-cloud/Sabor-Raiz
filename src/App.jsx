import React, { useState } from 'react';
import { MapPin, Clock, Truck, CheckCircle2, Leaf } from 'lucide-react';
import { FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
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

  const [meusPedidos, setMeusPedidos] = useState([]);

  // Adiciona o produto ao carrinho
  const adicionarAoPedido = (produto) => {
    setMeusPedidos(pedidosAtuais => {
      const pedidoExistenteIndex = pedidosAtuais.findIndex(
        p => p.status === "Em preparação" && !p.pago
      );

      if (pedidoExistenteIndex !== -1) {
        const novosPedidos = [...pedidosAtuais];
        const pedido = { ...novosPedidos[pedidoExistenteIndex] };
        
        const itemExistenteIndex = pedido.items.findIndex(item => item.nome === produto.nome);
        
        if (itemExistenteIndex !== -1) {
          pedido.items[itemExistenteIndex].qtd += 1;
        } else {
          pedido.items.push({ 
            nome: produto.nome, 
            qtd: 1, 
            preco: produto.preco,
            imagem: produto.imagem 
          });
        }

        pedido.total = pedido.items.reduce((acc, item) => acc + (item.preco * item.qtd), 0);
        novosPedidos[pedidoExistenteIndex] = pedido;
        return novosPedidos;
      } else {
        const novoPedido = {
          id: `#SR-${Math.floor(Math.random() * 9000) + 1000}`,
          data: new Date().toLocaleDateString('pt-BR'),
          status: "Em preparação",
          pago: false,
          total: produto.preco,
          imagemPrincipal: produto.imagem,
          nomePrincipal: produto.nome,
          items: [
            { nome: produto.nome, qtd: 1, preco: produto.preco, imagem: produto.imagem }
          ],
          entrega: "" // Removida a mensagem padrão, agora o usuário é obrigado a inserir
        };
        return [novoPedido, ...pedidosAtuais];
      }
    });
  };

  const totalItensCesta = meusPedidos
    .filter(p => p.status === "Em preparação" && !p.pago)
    .reduce((acc, pedido) => {
      return acc + pedido.items.reduce((subAcc, item) => subAcc + item.qtd, 0);
    }, 0);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden" style={{ backgroundColor: colors.cream, color: colors.brown, fontFamily: "'Montserrat', sans-serif" }}>
      
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap');
          
          .font-title { font-family: 'Cormorant Garamond', serif; }
          .font-support { font-family: 'Montserrat', sans-serif; }
          
          .border-ornament { border: 1px solid ${colors.gold}; position: relative; }
          .border-ornament::before, .border-ornament::after {
            content: '❖'; position: absolute; color: ${colors.gold}; font-size: 12px; background: ${colors.cream}; padding: 0 4px;
          }
          .border-ornament::before { top: -9px; left: 50%; transform: translateX(-50%); }
          .border-ornament::after { bottom: -9px; left: 50%; transform: translateX(-50%); }
        `}
      </style>

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
          <Sobre aoVoltar={setTelaAtual} />
        )}

        {telaAtual === 'contatos' && (
          <Contatos />
        )}

        {telaAtual === 'catalogo' && (
          <Catalogo aoVoltar={() => setTelaAtual('home')} adicionarAoPedido={adicionarAoPedido} />
        )}

        {telaAtual === 'pedidos' && (
          <Pedidos 
            meusPedidos={meusPedidos} 
            setMeusPedidos={setMeusPedidos}
            aoVoltar={setTelaAtual} 
            colors={colors}
          />
        )}
      </main>

      <footer className="mt-auto border-t" style={{ backgroundColor: colors.cream, color: colors.green, borderColor: `${colors.gold}40` }}>
        <div className="max-w-7xl mx-auto px-4 pt-16 pb-6 sm:px-6 lg:px-8 w-full relative">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div className="flex flex-col space-y-4">
              <div className="text-left">
                <h2 className="font-title text-4xl m-0 tracking-tight font-bold" style={{ color: colors.green }}>
                  Sabor<span style={{ color: colors.terracotta }}>Raiz</span>
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="h-px w-8" style={{ backgroundColor: colors.gold }}></span>
                  <span className="uppercase tracking-[0.3em] text-sm font-semibold font-support" style={{ color: colors.green }}>Cestas</span>
                  <span className="h-px w-8" style={{ backgroundColor: colors.gold }}></span>
                </div>
              </div>
              <p className="text-sm mt-4 max-w-xs leading-relaxed opacity-90 font-support font-medium">
                Cestas especiais com produtos regionais e muito amor para todos os momentos.
              </p>
            </div>

            <div className="text-left">
              <h4 className="font-support font-bold text-sm uppercase tracking-wider mb-6" style={{ color: colors.green }}>Links Rápidos</h4>
              <ul className="space-y-3 text-sm font-support font-medium opacity-90">
                {[
                  { label: 'Início', acao: 'home' },
                  { label: 'Sobre Nós', acao: 'sobre' },
                  { label: 'Nossas Cestas', acao: 'catalogo' },
                  { label: 'Contato', acao: 'contatos' }
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Leaf size={14} style={{ color: colors.gold }} className="flex-shrink-0" />
                    <button 
                      onClick={() => setTelaAtual(item.acao)} 
                      className="bg-transparent border-none cursor-pointer transition-colors hover:font-bold p-0 m-0 text-left font-support"
                      style={{ color: colors.green }}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-left">
              <h4 className="font-support font-bold text-sm uppercase tracking-wider mb-6" style={{ color: colors.green }}>Informações</h4>
              <ul className="space-y-3 text-sm font-support font-medium opacity-90">
                {['Sobre Entregas', 'Formas de Pagamento', 'Trocas e Devoluções', 'Perguntas Frequentes'].map((item, index) => (
                  <li key={index}>
                    <button className="bg-transparent border-none cursor-pointer transition-colors hover:font-bold p-0 m-0 text-left font-support" style={{ color: colors.green }}>
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-left relative flex flex-col items-start">
              <h4 className="font-support font-bold text-sm uppercase tracking-wider mb-6" style={{ color: colors.green }}>Siga-nos</h4>
              <div className="flex gap-3 mb-6 relative z-10">
                {[
                  { icon: <FaInstagram size={18} />, link: "#" },
                  { icon: <FaFacebookF size={18} />, link: "#" },
                  { icon: <FaLinkedinIn size={18} />, link: "#" }
                ].map((social, index) => (
                  <a key={index} href={social.link} className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110" style={{ borderColor: colors.green, color: colors.green }}>
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t flex flex-col text-center text-xs sm:text-sm font-support font-medium opacity-80" style={{ borderColor: `${colors.gold}40` }}>
            <p>&copy; {new Date().getFullYear()} Sabor Raiz Cestas. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}