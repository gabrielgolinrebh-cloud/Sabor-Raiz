import React from 'react';
import { ShoppingBasket, ArrowRight, Leaf, Heart, ShieldCheck, Truck } from 'lucide-react';

export default function Home({ colors, setTelaAtual }) {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative h-[75vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1592663527359-cf6642f54cff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Cesta de produtos regionais" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/45"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
          <Leaf className="mb-4 text-amber-400" size={36} style={{ color: colors.gold }} />
          <h2 className="font-title text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4 sm:mb-6 leading-tight drop-shadow-lg">Sabores que contam histórias.</h2>
          <p className="text-base sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-10 font-light max-w-2xl drop-shadow-md">Presentes que criam memórias.</p>
          <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 w-full sm:w-auto">
            <button onClick={() => setTelaAtual('catalogo')} className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 rounded-sm text-white font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-md" style={{ backgroundColor: colors.terracotta }}>
              Ver Catálogo <ShoppingBasket size={18} />
            </button>
            <button className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 rounded-sm font-semibold transition-all flex items-center justify-center gap-2 backdrop-blur-sm" style={{ backgroundColor: `${colors.cream}E6`, color: colors.green }}>
              Monte sua Cesta
            </button>
          </div>
        </div>
      </section>

      {/* HISTÓRICO / SOBRE NÓS RESUMIDO */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row gap-10 lg:gap-16 items-center">
          <div className="w-full md:w-1/2 relative px-2 sm:px-4">
            <div className="border-ornament p-1.5 sm:p-2.5">
              <img src="https://images.unsplash.com/photo-1614088636750-0a25692634e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Produtos artesanais SaborRaiz" className="w-full h-auto object-cover rounded-sm" />
            </div>
            <div className="floating-badge absolute -bottom-4 -right-2 sm:-bottom-6 sm:right-2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-lg z-10" style={{ backgroundColor: colors.green }}>
              <span className="font-title text-white text-xl sm:text-2xl md:text-3xl italic">SR</span>
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-5 sm:space-y-6 text-left">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 sm:w-12" style={{ backgroundColor: colors.gold }}></span>
              <span className="uppercase tracking-widest text-xs sm:text-sm font-bold" style={{ color: colors.terracotta }}>Nossa História</span>
            </div>
            <h3 className="font-title text-3xl sm:text-4xl lg:text-5xl leading-tight" style={{ color: colors.green }}>Tradição e Qualidade em cada detalhe.</h3>
            <div className="space-y-4 text-sm sm:text-base leading-relaxed" style={{ color: colors.brown }}>
              <p>A <strong style={{ color: colors.terracotta }}>SaborRaiz Cestas</strong> é uma empresa artesanal especializada em cestas sob medida, presentes afetivos e produtos típicos brasileiros.</p>
            </div>
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="py-12 md:py-16 border-y" style={{ borderColor: `${colors.gold}40`, backgroundColor: colors.cream }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center max-w-sm mx-auto">
              <Heart size={36} className="mb-3.5" style={{ color: colors.terracotta }} />
              <h5 className="font-title text-lg sm:text-xl font-bold mb-1.5" style={{ color: colors.green }}>Presentes Afetivos</h5>
              <p className="text-xs sm:text-sm opacity-90">Embalagens personalizadas que contam histórias.</p>
            </div>
            <div className="flex flex-col items-center max-w-sm mx-auto">
              <ShieldCheck size={36} className="mb-3.5" style={{ color: colors.terracotta }} />
              <h5 className="font-title text-lg sm:text-xl font-bold mb-1.5" style={{ color: colors.green }}>Pequenos Produtores</h5>
              <p className="text-xs sm:text-sm opacity-90">Ingredientes frescos comprados diretamente de cooperativas locais.</p>
            </div>
            <div className="flex flex-col items-center max-w-sm mx-auto">
              <Truck size={36} className="mb-3.5" style={{ color: colors.terracotta }} />
              <h5 className="font-title text-lg sm:text-xl font-bold mb-1.5" style={{ color: colors.green }}>Entrega Cuidadosa</h5>
              <p className="text-xs sm:text-sm opacity-90">Frota climatizada para garantir integridade premium.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}