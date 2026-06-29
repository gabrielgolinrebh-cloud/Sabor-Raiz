import React, { useState } from 'react';
import { Menu, X, ShoppingBasket, User, Search, MapPin, Heart, ArrowRight, Leaf, ShieldCheck, Truck } from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Paleta de Cores da Marca (img_05)
  const colors = {
    green: '#2F5D50',
    terracotta: '#B96A43',
    gold: '#D1A054',
    cream: '#F6EBD9',
    brown: '#4A3428',
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden" style={{ backgroundColor: colors.cream, color: colors.brown, fontFamily: "'Montserrat', sans-serif" }}>
      
      {/* Estilos locais para recursos avançados e efeitos decorativos */}
      <style>
        {`
          .font-title {
            font-family: 'Cormorant Garamond', serif;
          }
          
          .border-ornament {
            border: 1px solid ${colors.gold};
            position: relative;
          }
          
          .border-ornament::before, .border-ornament::after {
            content: '❖';
            position: absolute;
            color: ${colors.gold};
            font-size: 12px;
            background: ${colors.cream};
            padding: 0 4px;
          }
          
          .border-ornament::before { top: -9px; left: 50%; transform: translateX(-50%); }
          .border-ornament::after { bottom: -9px; left: 50%; transform: translateX(-50%); }
          
          /* Animação do Selo Flutuante SR */
          .floating-badge {
            animation: floatSR 4s ease-in-out infinite;
          }
          
          @keyframes floatSR {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-8px) rotate(2deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
        `}
      </style>

      {/* HEADER / NAVBAR */}
      <header className="sticky top-0 z-50 shadow-sm transition-all duration-300" style={{ backgroundColor: colors.cream }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b" style={{ borderColor: `${colors.gold}40` }}>
          <div className="flex justify-between items-center h-20 md:h-24">
            
            {/* Menu Mobile Button */}
            <div className="flex items-center md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                style={{ color: colors.green }}
                className="p-1 hover:opacity-80 transition-opacity focus:outline-none"
                aria-label="Abrir menu"
              >
                {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>

            {/* Logo Textual Adaptável (Imitando img_04) */}
            <div className="flex-shrink-0 flex flex-col items-center justify-center cursor-pointer select-none">
              <h1 className="font-title text-3xl sm:text-4xl md:text-5xl font-semibold flex items-center" style={{ color: colors.terracotta }}>
                Sabor<span style={{ color: colors.green }}>Raiz</span>
              </h1>
              <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1">
                <span className="h-px w-6 sm:w-8" style={{ backgroundColor: colors.gold }}></span>
                <span className="text-[10px] sm:text-xs tracking-[0.3em] font-medium" style={{ color: colors.brown }}>CESTAS</span>
                <span className="h-px w-6 sm:w-8" style={{ backgroundColor: colors.gold }}></span>
              </div>
            </div>

            {/* Desktop Navigation (img_08) */}
            <nav className="hidden md:flex space-x-6 lg:space-x-8">
              {['Home', 'Sobre', 'Catálogo', 'Cestas Personalizadas', 'Produtos Regionais'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} 
                  className="text-sm font-medium transition-all hover:opacity-75 relative py-2 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#D1A054] hover:after:w-full after:transition-all"
                  style={{ color: colors.green }}
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-6" style={{ color: colors.green }}>
              <button className="hover:opacity-70 p-1 hidden sm:block" aria-label="Pesquisar"><Search size={20} /></button>
              <button className="hover:opacity-70 p-1 hidden sm:block" aria-label="Minha Conta"><User size={20} /></button>
              <button className="hover:opacity-70 p-1 relative flex items-center gap-1.5 focus:outline-none" aria-label="Carrinho">
                <ShoppingBasket size={24} />
                <span className="absolute -top-1 -right-1 text-[9px] w-4 h-4 flex items-center justify-center rounded-full text-white font-semibold" style={{ backgroundColor: colors.terracotta }}>
                  0
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Flutuante (Previne deformaçoes de layout ao abrir) */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full shadow-lg border-b md:hidden transition-all duration-300 z-50" style={{ backgroundColor: colors.cream, borderColor: colors.gold }}>
            <nav className="px-4 pt-3 pb-6 space-y-2">
              {['Home', 'Sobre', 'Catálogo', 'Cestas Personalizadas', 'Produtos Regionais', 'Pedidos', 'Contato'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} 
                  className="block px-3 py-2.5 rounded-md text-base font-medium transition-all hover:bg-black/5" 
                  style={{ color: colors.green }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative h-[75vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Imagem de fundo representativa */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1592663527359-cf6642f54cff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Cesta de produtos regionais" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
          <Leaf className="mb-4 text-amber-400" size={36} style={{ color: colors.gold }} />
          <h2 className="font-title text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4 sm:mb-6 leading-tight drop-shadow-lg">
            Sabores que contam histórias.
          </h2>
          <p className="text-base sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-10 font-light max-w-2xl drop-shadow-md">
            Presentes que criam memórias.
          </p>
          <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 w-full sm:w-auto">
            <button 
              className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 rounded-sm text-white font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95"
              style={{ backgroundColor: colors.terracotta }}
            >
              Ver Catálogo <ShoppingBasket size={18} />
            </button>
            <button 
              className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 rounded-sm font-semibold transition-all hover:bg-white/20 flex items-center justify-center gap-2 backdrop-blur-sm active:scale-95"
              style={{ backgroundColor: `${colors.cream}E6`, color: colors.green }}
            >
              Monte sua Cesta
            </button>
          </div>
        </div>
      </section>

      {/* HISTÓRICO / SOBRE NÓS (img_07) */}
      <section id="sobre" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row gap-10 lg:gap-16 items-center">
          
          {/* Lado Esquerdo: Imagem com moldura decorativa */}
          <div className="w-full md:w-1/2 relative px-2 sm:px-4">
            <div className="border-ornament p-1.5 sm:p-2.5 transition-transform duration-500 hover:scale-[1.01]">
              <img 
                src="https://images.unsplash.com/photo-1614088636750-0a25692634e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Produtos artesanais SaborRaiz" 
                className="w-full h-auto object-cover rounded-sm aspect-[4/3] sm:aspect-auto"
              />
            </div>
            {/* Símbolo decorativo flutuante de tamanho dinâmico */}
            <div className="floating-badge absolute -bottom-4 -right-2 sm:-bottom-6 sm:right-2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-lg z-10" style={{ backgroundColor: colors.green }}>
              <span className="font-title text-white text-xl sm:text-2xl md:text-3xl italic">SR</span>
            </div>
          </div>
          
          {/* Lado Direito: Texto Histórico */}
          <div className="w-full md:w-1/2 space-y-5 sm:space-y-6 text-left">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 sm:w-12" style={{ backgroundColor: colors.gold }}></span>
              <span className="uppercase tracking-widest text-xs sm:text-sm font-bold" style={{ color: colors.terracotta }}>Nossa História</span>
            </div>
            <h3 className="font-title text-3xl sm:text-4xl lg:text-5xl leading-tight" style={{ color: colors.green }}>
              Tradição e Qualidade em cada detalhe.
            </h3>
            
            <div className="space-y-4 text-sm sm:text-base leading-relaxed" style={{ color: colors.brown }}>
              <p>
                A <strong style={{ color: colors.terracotta }}>SaborRaiz Cestas</strong> é uma empresa artesanal especializada em cestas sob medida, presentes afetivos e produtos típicos de várias regiões brasileiras.
              </p>
              <p>
                Nascemos com a proposta de valorizar produtores locais, cooperativas familiares e sabores autênticos da nossa terra, promovendo um consumo responsável e cheio de carinho.
              </p>
              <p>
                Nossa assinatura une design elegante, acabamento premium e ingredientes de primeiríssima linha para entregar uma surpresa perfeita em datas comemorativas, eventos e presentes corporativos.
              </p>
            </div>
            
            <button className="group flex items-center gap-2 pb-1 border-b-2 transition-all hover:gap-3 font-semibold text-sm sm:text-base" style={{ color: colors.green, borderColor: colors.gold }}>
              <span>Conheça nossos produtores</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* DESTAQUES / CATEGORIAS (img_08) */}
      <section id="catálogo" className="py-16 md:py-24" style={{ backgroundColor: `${colors.green}08` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-12 sm:mb-16">
            <Leaf className="mx-auto mb-3" size={28} style={{ color: colors.terracotta }} />
            <h3 className="font-title text-3xl sm:text-4xl lg:text-5xl mb-4" style={{ color: colors.green }}>Descubra Nossas Cestas</h3>
            <p className="max-w-2xl mx-auto text-sm sm:text-base" style={{ color: colors.brown }}>
              Montadas com carinho artesanal, combinando queijos finos, doces artesanais, cafés torrados e decorações rústicas exclusivas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1 */}
            <div className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border flex flex-col hover:-translate-y-1" style={{ borderColor: `${colors.gold}30` }}>
              <div className="h-48 sm:h-56 md:h-64 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Cestas Especiais" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h4 className="absolute bottom-4 left-4 font-title text-xl sm:text-2xl text-white">Cestas Comemorativas</h4>
              </div>
              <div className="p-5 sm:p-6 flex-grow flex flex-col justify-between">
                <p className="text-xs sm:text-sm mb-4 leading-relaxed" style={{ color: colors.brown }}>Perfeitas para aniversários, aniversários de namoro, casamentos e recordações inesquecíveis.</p>
                <button className="text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-1.5 self-start group-hover:opacity-80 transition-opacity" style={{ color: colors.terracotta }}>
                  Ver Opções <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border flex flex-col hover:-translate-y-1" style={{ borderColor: `${colors.gold}30` }}>
              <div className="h-48 sm:h-56 md:h-64 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1608686207856-001b95cf60ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Produtos Regionais" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h4 className="absolute bottom-4 left-4 font-title text-xl sm:text-2xl text-white">Produtos Avulsos</h4>
              </div>
              <div className="p-5 sm:p-6 flex-grow flex flex-col justify-between">
                <p className="text-xs sm:text-sm mb-4 leading-relaxed" style={{ color: colors.brown }}>Geleias de fruta, pães rústicos, patês especiais e vinhos direto do produtor rural.</p>
                <button className="text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-1.5 self-start group-hover:opacity-80 transition-opacity" style={{ color: colors.terracotta }}>
                  Comprar Agora <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border flex flex-col hover:-translate-y-1 sm:col-span-2 lg:col-span-1" style={{ borderColor: `${colors.gold}30` }}>
              <div className="h-48 sm:h-56 md:h-64 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Cestas Corporativas" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h4 className="absolute bottom-4 left-4 font-title text-xl sm:text-2xl text-white">Cestas Corporativas</h4>
              </div>
              <div className="p-5 sm:p-6 flex-grow flex flex-col justify-between">
                <p className="text-xs sm:text-sm mb-4 leading-relaxed" style={{ color: colors.brown }}>Especialmente desenhadas para datas comemorativas corporativas, presentes de fim de ano ou brindes VIPs.</p>
                <button className="text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-1.5 self-start group-hover:opacity-80 transition-opacity" style={{ color: colors.terracotta }}>
                  Solicitar Orçamento <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="py-12 md:py-16 border-y" style={{ borderColor: `${colors.gold}40`, backgroundColor: colors.cream }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 text-center">
            
            <div className="flex flex-col items-center max-w-sm mx-auto">
              <Heart size={36} className="mb-3.5 transition-transform hover:scale-110 duration-300" style={{ color: colors.terracotta }} />
              <h5 className="font-title text-lg sm:text-xl font-bold mb-1.5" style={{ color: colors.green }}>Presentes Afetivos</h5>
              <p className="text-xs sm:text-sm leading-relaxed opacity-90">Embalagens personalizadas que contam histórias e aproximam pessoas.</p>
            </div>
            
            <div className="flex flex-col items-center max-w-sm mx-auto">
              <ShieldCheck size={36} className="mb-3.5 transition-transform hover:scale-110 duration-300" style={{ color: colors.terracotta }} />
              <h5 className="font-title text-lg sm:text-xl font-bold mb-1.5" style={{ color: colors.green }}>Pequenos Produtores</h5>
              <p className="text-xs sm:text-sm leading-relaxed opacity-90">Ingredientes frescos comprados diretamente de cooperativas locais de agricultura familiar.</p>
            </div>
            
            <div className="flex flex-col items-center max-w-sm mx-auto">
              <Truck size={36} className="mb-3.5 transition-transform hover:scale-110 duration-300" style={{ color: colors.terracotta }} />
              <h5 className="font-title text-lg sm:text-xl font-bold mb-1.5" style={{ color: colors.green }}>Entrega Cuidadosa</h5>
              <p className="text-xs sm:text-sm leading-relaxed opacity-90">Frota climatizada para garantir que queijos, chocolates e vinhos cheguem perfeitos.</p>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto" style={{ backgroundColor: colors.green, color: colors.cream }}>
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            
            <div className="sm:col-span-2">
              <h2 className="font-title text-3xl mb-3 text-white">SaborRaiz Cestas</h2>
              <p className="text-xs sm:text-sm opacity-80 max-w-md mb-5 leading-relaxed">
                Sabores que conectam origens. Levamos a autêntica gastronomia artesanal e o design rústico para tornar as surpresas da vida inesquecíveis.
              </p>
              <div className="flex space-x-3">
                {['IG', 'FB', 'WA'].map((social) => (
                  <div 
                    key={social} 
                    className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#D1A054] hover:text-[#2F5D50] hover:-translate-y-0.5 transition-all text-xs font-semibold" 
                    style={{ border: `1px solid ${colors.gold}` }}
                  >
                    {social}
                  </div>
                ))}
              </div>
            </div>

            <div className="text-left">
              <h4 className="font-title text-lg mb-4 text-white font-semibold" style={{ color: colors.gold }}>Links Rápidos</h4>
              <ul className="space-y-2.5 text-xs sm:text-sm opacity-85">
                <li><a href="#" className="hover:text-white hover:pl-1 transition-all block">Catálogo de Cestas</a></li>
                <li><a href="#" className="hover:text-white hover:pl-1 transition-all block">Cestas Customizadas</a></li>
                <li><a href="#" className="hover:text-white hover:pl-1 transition-all block">Histórico da Empresa</a></li>
                <li><a href="#" className="hover:text-white hover:pl-1 transition-all block">Política de Frete</a></li>
              </ul>
            </div>

            <div className="text-left">
              <h4 className="font-title text-lg mb-4 text-white font-semibold" style={{ color: colors.gold }}>Fale Conosco</h4>
              <ul className="space-y-3 text-xs sm:text-sm opacity-85">
                <li className="flex items-start gap-2">
                  <MapPin size={16} className="mt-0.5 flex-shrink-0" style={{ color: colors.terracotta }} />
                  <span>Rua das Tradições, 123 - Centro<br/>Belo Horizonte, MG</span>
                </li>
                <li>contato@saborraizcestas.com.br</li>
                <li>(31) 99999-0000</li>
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