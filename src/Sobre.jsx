import React from 'react';
import { Heart, ShieldCheck, Truck, ArrowRight } from 'lucide-react';
// Buscando a imagem de forma segura diretamente da pasta especificada
import imagemSobre from '../docs/imagens/imagem_sobre.jpg';
import logosaborraizTerracota from '../docs/imagens/logosaborraizTerracota.png'; 

export default function Sobre({ aoVoltar }) {
  const colors = {
    green: '#2F5D50',
    terracotta: '#B96A43',
    gold: '#D1A054',
    cream: '#F6EBD9',
    brown: '#4A3428',
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-between overflow-y-auto" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght=0,400;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
          
          .font-title {
            font-family: 'Cormorant Garamond', serif;
          }
          
          .border-ornament-top {
            border-top: 1px solid ${colors.gold}60;
            position: relative;
          }
          
          .border-ornament-top::before {
            content: '❖';
            position: absolute;
            color: ${colors.gold};
            font-size: 14px;
            background: #fff;
            padding: 0 12px;
            top: -11px;
            left: 50%;
            transform: translateX(-50%);
          }
        `}
      </style>

      {/* IMAGEM DE FUNDO OTIMIZADA (SEM TRÁFEGO DE BLUR) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${imagemSobre})` 
        }}
      >
        {/* Substituído o backdrop-blur por um overlay de cor sólida ligeiramente mais opaca para simular o efeito sem pesar */}
        <div className="absolute inset-0" style={{ backgroundColor: `${colors.cream}F2` }}></div>
      </div>

      {/* PAINEL CENTRAL FLUTUANTE */}
      <main className="relative z-10 flex-grow py-16 px-4 md:px-8 max-w-4xl w-full mx-auto flex flex-col justify-center items-center">
        
                <div className="w-full bg-white/70 rounded-sm border p-8 md:p-14 shadow-xl border-gray-100 flex flex-col items-center">
          
          {/* Topo Decorado */}
          <div className="text-center mb-8"> 
            <img src={logosaborraizTerracota} alt="Logo Sabor Raiz" className="mx-auto mb-1 w-24 h-auto" loading="lazy" />
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="h-px w-6" style={{ backgroundColor: colors.gold }}></span>
              <span className="uppercase tracking-[0.25em] text-[10px] font-bold" style={{ color: colors.terracotta }}>Nossa Origem</span>
              <span className="h-px w-6" style={{ backgroundColor: colors.gold }}></span>
            </div>
            <h2 className="font-title text-4xl md:text-5xl font-semibold leading-tight mt-1" style={{ color: colors.green }}>
              Tradição que se vive à mesa
            </h2>
          </div>

          {/* Texto Institucional Poético */}
          <div className="w-full text-center text-base md:text-lg leading-relaxed max-w-2xl mb-10" style={{ color: colors.brown }}>
            <p className="mb-4 font-light">
              A <strong className="font-semibold" style={{ color: colors.terracotta }}>SaborRaiz</strong> nasceu do desejo de honrar as pausas, o afeto e as receitas feitas sem pressa. Unimos a quietude acolhedora do campo à sofisticação da vida urbana através de uma curadoria gastronômica rigorosa.
            </p>
            <p className="font-light">
              Trabalhando lado a lado com produtores familiares locais, entregamos cafés colhidos de forma seletiva, queijos maturados no tempo certo da natureza e pequenos luxos artesanais embalados à mão em formato de presentes inesquecíveis.
            </p>
          </div>

          {/* Pilares com Ícones */}
          <div className="w-full border-ornament-top pt-10 mt-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              
              <div className="p-2 flex flex-col items-center">
                <Heart size={20} className="mb-2" style={{ color: colors.terracotta }} />
                <h4 className="font-title text-lg font-bold mb-1" style={{ color: colors.green }}>Curadoria Afetiva</h4>
                <p className="text-xs leading-relaxed opacity-80" style={{ color: colors.brown }}>
                  Produtos escolhidos a dedo para evocar memórias e estreitar laços sinceros.
                </p>
              </div>

              <div className="p-2 flex flex-col items-center">
                <ShieldCheck size={20} className="mb-2" style={{ color: colors.terracotta }} />
                <h4 className="font-title text-lg font-bold mb-1" style={{ color: colors.green }}>Comércio Justo</h4>
                <p className="text-xs leading-relaxed opacity-80" style={{ color: colors.brown }}>
                  Valorização direta do pequeno agricultor e fomento às tradições regionais.
                </p>
              </div>

              <div className="p-2 flex flex-col items-center">
                <Truck size={20} className="mb-2" style={{ color: colors.terracotta }} />
                <h4 className="font-title text-lg font-bold mb-1" style={{ color: colors.green }}>Zelo Absoluto</h4>
                <p className="text-xs leading-relaxed opacity-80" style={{ color: colors.brown }}>
                  Logística delicada que preserva o frescor e a estética da fazenda até você.
                </p>
              </div>

            </div>
          </div>

          {/* Botão de Navegação Direta */}
          <div className="mt-10">
            <button 
              onClick={() => aoVoltar('catalogo')} 
              className="group flex items-center gap-2 px-9 py-3 text-[11px] font-bold uppercase tracking-widest border transition-all duration-300 rounded-none"
              style={{ 
                borderColor: colors.green, 
                color: colors.green,
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.green;
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = colors.green;
              }}
            >
              Conhecer Nosso Catálogo
              <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

      </main>
    </div>
  );
}