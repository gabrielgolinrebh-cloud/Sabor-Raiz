import React, { useState } from 'react';
import { Menu, X, ShoppingBasket, User, Search, MapPin, Heart, ArrowRight, Leaf, ShieldCheck, Truck } from 'lucide-react';
import style from './Home.jsx';

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
    <div className="min-h-screen" style={{ backgroundColor: colors.cream, color: colors.brown, fontFamily: "'Montserrat', sans-serif" }}>
      
      {/* HEADER / NAVBAR */}
      <header className={`sticky top-0 z-50 shadow-sm ${style.stickyHeader}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b" style={{ borderColor: `${colors.gold}40` }}>
          <div className="flex justify-between items-center h-24">
            
            {/* Menu Mobile Button */}
            <div className="flex items-center md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ color: colors.green }}>
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>

            {/* Logo Textual */}
            <div className="flex-shrink-0 flex flex-col items-center justify-center cursor-pointer">
              <h1 className={`text-4xl md:text-5xl font-semibold flex items-center ${style['font-title']}`} style={{ color: colors.terracotta }}>
                Sabor<span style={{ color: colors.green }}>Raiz</span>
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="h-px w-8" style={{ backgroundColor: colors.gold }}></span>
                <span className="text-xs tracking-[0.3em] font-medium" style={{ color: colors.brown }}>CESTAS</span>
                <span className="h-px w-8" style={{ backgroundColor: colors.gold }}></span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {['Home', 'Sobre', 'Catálogo', 'Cestas Personalizadas', 'Produtos Regionais'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className={`${style['nav-link']} text-sm font-medium`} style={{ color: colors.green }}>
                  {item}
                </a>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-4 md:space-x-6" style={{ color: colors.green }}>
              <button className="hover:opacity-70 hidden sm:block"><Search size={20} /></button>
              <button className="hover:opacity-70 hidden sm:block"><User size={20} /></button>
              <button className="hover:opacity-70 relative flex items-center gap-2">
                <ShoppingBasket size={24} />
                <span className="absolute -top-2 -right-2 text-[10px] w-5 h-5 flex items-center justify-center rounded-full text-white" style={{ backgroundColor: colors.terracotta }}>
                  0
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-b" style={{ backgroundColor: colors.cream, borderColor: colors.gold }}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {['Home', 'Sobre', 'Catálogo', 'Cestas Personalizadas', 'Produtos Regionais', 'Pedidos', 'Contato'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="block px-3 py-2 text-base font-medium" style={{ color: colors.green }}>
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1592663527359-cf6642f54cff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Cesta de produtos regionais" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <Leaf className="mb-4" size={40} style={{ color: colors.gold }} />
          <h2 className={`text-5xl md:text-7xl text-white mb-6 leading-tight drop-shadow-lg ${style['font-title']}`}>
            Sabores que contam histórias.
          </h2>
          <p className="text-lg md:text-2xl text-white/90 mb-10 font-light drop-shadow-md">
            Presentes que criam memórias.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              className={`${style['hero-btn']} ${style['hero-btn-primary']} px-8 py-4 rounded-sm text-white font-medium flex items-center justify-center gap-2 shadow-lg`}
              style={{ backgroundColor: colors.terracotta }}
            >
              Ver Catálogo <ShoppingBasket size={18} />
            </button>
            <button 
              className={`${style['hero-btn']} px-8 py-4 rounded-sm font-medium flex items-center justify-center gap-2 backdrop-blur-sm`}
              style={{ backgroundColor: `${colors.cream}E6`, color: colors.green }}
            >
              Monte sua Cesta
            </button>
          </div>
        </div>
      </section>

      {/* HISTÓRICO / SOBRE NÓS */}
      <section id="sobre" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2 relative">
            <div className={`${style['border-ornament']} p-2`}>
              <img 
                src="https://images.unsplash.com/photo-1614088636750-0a25692634e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Produtos artesanais SaborRaiz" 
                className="w-full h-auto object-cover rounded-sm"
              />
            </div>
            {/* Símbolo decorativo flutuante */}
            <div className={`${style['floating-badge']} absolute -bottom-6 -right-6 w-24 h-24 rounded-full flex items-center justify-center shadow-xl`} style={{ backgroundColor: colors.green }}>
              <span className={`text-white text-3xl italic ${style['font-title']}`}>SR</span>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 space-y-6">
            <div className="flex items-center gap-4">
              <span className="h-px w-12" style={{ backgroundColor: colors.gold }}></span>
              <span className="uppercase tracking-widest text-sm font-semibold" style={{ color: colors.terracotta }}>Nossa História</span>
            </div>
            <h3 className={`text-4xl md:text-5xl ${style['font-title']}`} style={{ color: colors.green }}>
              Tradição e Qualidade em cada detalhe.
            </h3>
            
            <div className="space-y-4 text-base leading-relaxed" style={{ color: colors.brown }}>
              <p>
                A <strong style={{ color: colors.terracotta }}>SaborRaiz Cestas</strong> é uma empresa especializada em cestas artesanais, presentes afetivos e produtos regionais.
              </p>
              <p>
                Surgiu com a proposta de valorizar sabores locais, pequenos produtores e experiências de presente com identidade e carinho.
              </p>
              <p>
                A marca une tradição, qualidade e apresentação para oferecer cestas personalizadas para datas especiais, empresas e clientes que buscam autenticidade.
              </p>
            </div>
            
            <button className="group mt-4 flex items-center gap-2 pb-1 border-b-2 transition-all hover:gap-4" style={{ color: colors.green, borderColor: colors.gold }}>
              <span className="font-semibold">Conheça nossos produtores</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* DESTAQUES / CATEGORIAS */}
      <section id="catálogo" className="py-20" style={{ backgroundColor: `${colors.green}10` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Leaf className="mx-auto mb-4" size={32} style={{ color: colors.terracotta }} />
            <h3 className={`text-4xl md:text-5xl mb-4 ${style['font-title']}`} style={{ color: colors.green }}>Descubra Nossas Cestas</h3>
            <p className="max-w-2xl mx-auto" style={{ color: colors.brown }}>
              Montadas com cuidado, repletas de queijos artesanais, doces de compota, cafés especiais e muito afeto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className={`${style['catalog-card']} group bg-white rounded-sm overflow-hidden shadow-md border`} style={{ borderColor: `${colors.gold}40` }}>
              <div className="h-64 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Cestas Especiais" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h4 className={`absolute bottom-4 left-4 text-2xl text-white ${style['font-title']}`}>Cestas Comemorativas</h4>
              </div>
              <div className="p-6">
                <p className="text-sm mb-4" style={{ color: colors.brown }}>Ideais para aniversários, dia das mães e momentos inesquecíveis.</p>
                <button className={`${style['card-btn']} text-sm font-semibold uppercase tracking-wider flex items-center gap-2`} style={{ color: colors.terracotta }}>
                  Ver Opções <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className={`${style['catalog-card']} group bg-white rounded-sm overflow-hidden shadow-md border`} style={{ borderColor: `${colors.gold}40` }}>
              <div className="h-64 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1608686207856-001b95cf60ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Produtos Regionais" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h4 className={`absolute bottom-4 left-4 text-2xl text-white ${style['font-title']}`}>Produtos Avulsos</h4>
              </div>
              <div className="p-6">
                <p className="text-sm mb-4" style={{ color: colors.brown }}>Queijos, mel, doces e cafés diretamente do pequeno produtor para você.</p>
                <button className={`${style['card-btn']} text-sm font-semibold uppercase tracking-wider flex items-center gap-2`} style={{ color: colors.terracotta }}>
                  Comprar Agora <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className={`${style['catalog-card']} group bg-white rounded-sm overflow-hidden shadow-md border`} style={{ borderColor: `${colors.gold}40` }}>
              <div className="h-64 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Monte sua Cesta" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h4 className={`absolute bottom-4 left-4 text-2xl text-white ${style['font-title']}`}>Cestas Corporativas</h4>
              </div>
              <div className="p-6">
                <p className="text-sm mb-4" style={{ color: colors.brown }}>Presentes personalizados para encantar clientes e colaboradores.</p>
                <button className={`${style['card-btn']} text-sm font-semibold uppercase tracking-wider flex items-center gap-2`} style={{ color: colors.terracotta }}>
                  Solicitar Orçamento <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="py-16 border-y" style={{ borderColor: `${colors.gold}60`, backgroundColor: colors.cream }}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-around items-center gap-8 text-center">
          <div className="flex flex-col items-center max-w-xs">
            <Heart size={40} className="mb-4" style={{ color: colors.terracotta }} />
            <h5 className={`text-xl font-bold mb-2 ${style['font-title']}`} style={{ color: colors.green }}>Presentes Afetivos</h5>
            <p className="text-sm">Embalagens preparadas com dedicação para emocionar.</p>
          </div>
          <div className="flex flex-col items-center max-w-xs">
            <ShieldCheck size={40} className="mb-4" style={{ color: colors.terracotta }} />
            <h5 className={`text-xl font-bold mb-2 ${style['font-title']}`} style={{ color: colors.green }}>Pequenos Produtores</h5>
            <p className="text-sm">Garantimos a origem e a qualidade artesanal dos ingredientes.</p>
          </div>
          <div className="flex flex-col items-center max-w-xs">
            <Truck size={40} className="mb-4" style={{ color: colors.terracotta }} />
            <h5 className={`text-xl font-bold mb-2 ${style['font-title']}`} style={{ color: colors.green }}>Entrega Cuidadosa</h5>
            <p className="text-sm">Sua cesta chega intacta e linda ao destino final.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: colors.green, color: colors.cream }}>
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            <div className="col-span-1 md:col-span-2">
              <h2 className={`text-3xl mb-4 text-white ${style['font-title']}`}>SaborRaiz Cestas</h2>
              <p className="text-sm opacity-80 max-w-md mb-6 leading-relaxed">
                Sabores que conectam origens. Trabalhamos para levar a autêntica experiência regional em forma de presentes inesquecíveis para quem você ama.
              </p>
              <div className="flex space-x-4">
                <div className={`${style['social-icon']} w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/10`} style={{ border: `1px solid ${colors.gold}` }}>IG</div>
                <div className={`${style['social-icon']} w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/10`} style={{ border: `1px solid ${colors.gold}` }}>FB</div>
                <div className={`${style['social-icon']} w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/10`} style={{ border: `1px solid ${colors.gold}` }}>WA</div>
              </div>
            </div>

            <div>
              <h4 className={`text-xl mb-4 ${style['font-title']}`} style={{ color: colors.gold }}>Links Rápidos</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="#" className={style['footer-link']}>Catálogo Completo</a></li>
                <li><a href="#" className={style['footer-link']}>Montar Cesta Personalizada</a></li>
                <li><a href="#" className={style['footer-link']}>Área do Cliente (Pedidos)</a></li>
                <li><a href="#" className={style['footer-link']}>Termos e Condições</a></li>
              </ul>
            </div>

            <div>
              <h4 className={`text-xl mb-4 ${style['font-title']}`} style={{ color: colors.gold }}>Contato</h4>
              <ul className="space-y-3 text-sm opacity-80">
                <li className="flex items-start gap-2">
                  <MapPin size={16} className="mt-1 flex-shrink-0" style={{ color: colors.terracotta }} />
                  <span>Rua das Tradições, 123 - Centro<br/>Belo Horizonte, MG</span>
                </li>
                <li>contato@saborraizcestas.com.br</li>
                <li>(31) 99999-0000</li>
              </ul>
            </div>

          </div>
          
          <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-60" style={{ borderColor: `${colors.gold}40` }}>
            <p>&copy; {new Date().getFullYear()} SaborRaiz Cestas. Todos os direitos reservados.</p>
            <p>Desenvolvido para o Grupo 3 - Etapa 1</p>
          </div>
        </div>
      </footer>
    </div>
  );
}