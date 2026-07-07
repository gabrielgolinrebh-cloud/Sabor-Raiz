import React, { useState } from 'react';
import { Menu, X, ShoppingBasket, User, Search, ShieldCheck } from 'lucide-react';

export default function Header({ colors, setTelaAtual, totalItens, usuario, onSair }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navegarPara = (tela) => {
    setTelaAtual(tela);
    setIsMenuOpen(false); // Fecha o menu mobile ao clicar
  };

  return (
    <header className="sticky top-0 z-50 shadow-sm transition-all duration-300" style={{ backgroundColor: colors.cream }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b" style={{ borderColor: `${colors.gold}40` }}>
        <div className="flex justify-between items-center h-20 md:h-24">
          
          {/* Menu Mobile Button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              style={{ color: colors.green }}
              className="p-1 hover:opacity-80 transition-opacity focus:outline-none"
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          {/* Logo Textual */}
          <div className="flex-shrink-0 flex items-center justify-center cursor-pointer select-none" onClick={() => navegarPara('home')}>
            <h1 className="font-title text-xl sm:text-2xl md:text-3xl font-semibold" style={{ color: colors.terracotta }}>
              Sabor<span style={{ color: colors.green }}>Raiz</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 lg:space-x-6">
            <button onClick={() => navegarPara('home')} className="text-sm font-medium transition-all hover:opacity-75 py-2 cursor-pointer" style={{ color: colors.green }}>Home</button>
            <button onClick={() => navegarPara('sobre')} className="text-sm font-medium transition-all hover:opacity-75 py-2 cursor-pointer" style={{ color: colors.green }}>Sobre</button>
            <button onClick={() => navegarPara('catalogo')} className="text-sm font-medium transition-all hover:opacity-75 py-2 cursor-pointer" style={{ color: colors.green }}>Catálogo</button>
            <button onClick={() => navegarPara('contatos')} className="text-sm font-medium transition-all hover:opacity-75 py-2 cursor-pointer" style={{ color: colors.green }}>Contatos</button>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-6" style={{ color: colors.green }}>
            <button className="hover:opacity-70 p-1 hidden sm:block"><Search size={20} /></button>
            {usuario?.role === 'admin' && (
              <button onClick={() => navegarPara('admin')} className="hover:opacity-70 p-1 hidden sm:block" title="Admin">
                <ShieldCheck size={20} />
              </button>
            )}
            <button onClick={() => navegarPara(usuario ? 'home' : 'cadastro')} className="hover:opacity-70 p-1 hidden sm:block"><User size={20} /></button>
            {usuario && (
              <button onClick={onSair} className="text-sm font-medium hidden sm:block" style={{ color: colors.terracotta }}>
                Sair
              </button>
            )}
            
            <button onClick={() => navegarPara('pedidos')} className="hover:opacity-70 p-1 relative flex items-center gap-1.5 focus:outline-none">
              <ShoppingBasket size={24} />
              {totalItens > 0 && (
                <span 
                  className="absolute -top-1 -right-1 text-[9px] w-4 h-4 flex items-center justify-center rounded-full text-white font-semibold transition-all" 
                  style={{ backgroundColor: colors.terracotta }}
                >
                  {totalItens}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Flutuante */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full shadow-lg border-b md:hidden z-50" style={{ backgroundColor: colors.cream, borderColor: colors.gold }}>
          <nav className="px-4 pt-3 pb-6 space-y-2 flex flex-col items-start">
            <button onClick={() => navegarPara('home')} className="w-full text-left px-3 py-2.5 text-base font-medium" style={{ color: colors.green }}>Home</button>
            <button onClick={() => navegarPara('sobre')} className="w-full text-left px-3 py-2.5 text-base font-medium" style={{ color: colors.green }}>Sobre</button>
            <button onClick={() => navegarPara('catalogo')} className="w-full text-left px-3 py-2.5 text-base font-medium" style={{ color: colors.green }}>Catálogo</button>
            <button onClick={() => navegarPara('contatos')} className="w-full text-left px-3 py-2.5 text-base font-medium" style={{ color: colors.green }}>Contatos</button>
            <button onClick={() => navegarPara(usuario ? 'home' : 'cadastro')} className="w-full text-left block px-3 py-2.5 text-base font-medium" style={{ color: colors.green }}>{usuario ? 'Minha Conta' : 'Minha Conta / Cadastro'}</button>
            {usuario?.role === 'admin' && (
              <button onClick={() => navegarPara('admin')} className="w-full text-left px-3 py-2.5 text-base font-medium" style={{ color: colors.green }}>Admin</button>
            )}
            {usuario && (
              <button onClick={onSair} className="w-full text-left px-3 py-2.5 text-base font-medium" style={{ color: colors.terracotta }}>Sair</button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}