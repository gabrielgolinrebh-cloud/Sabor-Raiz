import React, { useState } from 'react';
import { Clock, Leaf, X } from 'lucide-react';
import { FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import Cadastro from './Cadastro';
import Login from './Login';
import Header from './header'; 
import Home from './Home';  
import Sobre from './Sobre';
import Catalogo from './Catalogo';
import Pedidos from './Pedidos';
import Contatos from './Contatos';

const INFOS_SABOR_RAIZ = {
  'Sobre Entregas': {
    titulo: 'Sobre Entregas',
    conteudo: (
      <div className="space-y-4 text-sm leading-relaxed text-[#4A3428]">
        <p>Realizamos entregas para toda a cidade com prazo de 24 a 48 horas úteis. Para regiões fora da área de cobertura, oferecemos retirada na loja ou frete personalizado.</p>
        <p>O cliente recebe um código de rastreamento e atualizações por e-mail ou WhatsApp sobre o status do pedido.</p>
      </div>
    )
  },
  'Formas de Pagamento': {
    titulo: 'Formas de Pagamento',
    conteudo: (
      <div className="space-y-4 text-sm leading-relaxed text-[#4A3428]">
        <p>Aceitamos cartão de crédito, boleto bancário e PIX. O pagamento é processado com segurança e confirmação imediata.</p>
        <p>Para compras corporativas, também oferecemos pagamento por transferência bancária mediante aprovação prévia.</p>
      </div>
    )
  },
  'Trocas e Devoluções': {
    titulo: 'Trocas e Devoluções',
    conteudo: (
      <div className="space-y-4 text-sm leading-relaxed text-[#4A3428]">
        <p>Se houver problema com o produto, garantimos troca ou devolução em até 7 dias a partir do recebimento.</p>
        <p>Basta entrar em contato com nosso suporte e fornecer fotos do item. Avaliamos cada caso com prioridade.</p>
      </div>
    )
  },
  'Perguntas Frequentes': {
    titulo: 'Perguntas Frequentes',
    conteudo: (
      <div className="space-y-4 text-sm leading-relaxed text-[#4A3428]">
        <p>Tem dúvidas sobre personalização, prazos ou embalagens? Nosso atendimento está pronto para ajudar em todas as etapas.</p>
        <p>Consulte também as opções de cestas especiais para eventos e datas comemorativas.</p>
      </div>
    )
  },
  'Política de Privacidade': {
    titulo: 'Política de Privacidade',
    conteudo: (
      <div className="space-y-4 text-sm leading-relaxed text-[#4A3428]">
        <p>Respeitamos seus dados e não compartilhamos informações pessoais sem consentimento.</p>
        <p>Utilizamos seus dados apenas para processar pedidos, enviar atualizações de entrega e melhorar a experiência do cliente.</p>
      </div>
    )
  }
};

export default function App() {
  const [telaAtual, setTelaAtual] = useState('home'); 

  const [infoPopupModal, setInfoPopupModal] = useState(null);

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

        {telaAtual === 'contatos' && (
          <Contatos />
        )}

        {telaAtual === 'catalogo' && (
          <Catalogo aoVoltar={() => setTelaAtual('home')} adicionarAoPedido={adicionarAoPedido} />
        )}

        {telaAtual === 'pedidos' && (
          <Pedidos meusPedidos={meusPedidos} aoVoltar={() => setTelaAtual('home')} />
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

            {/* ... Coluna 4 continua igual ... */}
          </div>
        </div>
      </footer>

      {/* POP-UP / MODAL DINÂMICO */}
      {infoPopupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Fundo escuro com desfoque. Clicar nele fecha o modal */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setInfoPopupModal(null)}
          ></div>
          
          {/* Caixa de conteúdo do Pop-up */}
          <div className="relative bg-[#F6EBD9] w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in duration-300 border" style={{ borderColor: colors.gold }}>
            
            {/* Cabeçalho do Pop-up */}
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
            
            {/* Corpo do texto */}
            <div className="px-6 py-8 max-h-[70vh] overflow-y-auto">
              {INFOS_SABOR_RAIZ[infoPopupModal].conteudo}
            </div>
            
            {/* Rodapé do Pop-up */}
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