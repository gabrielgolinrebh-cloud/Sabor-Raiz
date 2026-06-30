import React from 'react';
import { Leaf, Heart, ShieldCheck, Truck } from 'lucide-react';

export default function Sobre() {
  // Paleta de Cores Oficial da Marca
  const colors = {
    green: '#2F5D50',
    terracotta: '#B96A43',
    gold: '#D1A054',
    cream: '#F6EBD9',
    brown: '#4A3428',
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-between" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      {/* Importação de fontes e estilos customizados */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Montserrat:wght=300;400;500;600&display=swap');
          
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
        `}
      </style>

      {/* IMAGEM DE FUNDO GERAL COM OVERLAY DA COR DA MARCA */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1595855759920-86582396756a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')` 
        }}
      >
        {/* Camada que suaviza a foto de fundo usando o tom Creme da marca, mantendo o ambiente claro e legível */}
        <div className="absolute inset-0 opacity-90" style={{ backgroundColor: colors.cream }}></div>
      </div>

      {/* CONTEÚDO PRINCIPAL (Z-INDEX 10 PARA FICAR ACIMA DO FUNDO) */}
      <main className="relative z-10 flex-grow py-20 px-4 md:px-8 max-w-5xl mx-auto flex flex-col justify-center items-center">
        
        {/* Cabeçalho de Introdução */}
        <div className="text-center mb-12">
          <Leaf className="mx-auto mb-3" size={36} style={{ color: colors.terracotta }} />
          <div className="flex items-center justify-center gap-4 mb-2">
            <span className="h-px w-8" style={{ backgroundColor: colors.gold }}></span>
            <span className="uppercase tracking-widest text-xs font-semibold" style={{ color: colors.terracotta }}>Quem Somos</span>
            <span className="h-px w-8" style={{ backgroundColor: colors.gold }}></span>
          </div>
          <h2 className="font-title text-4xl md:text-6xl font-semibold leading-tight mt-2" style={{ color: colors.green }}>
            Conheça a SaborRaiz
          </h2>
        </div>

        {/* Bloco de Texto Expandido da Marca */}
        <div className="w-full space-y-6 text-center md:text-left text-base md:text-lg leading-relaxed max-w-4xl border-ornament p-8 md:p-12 bg-white/40 backdrop-blur-xs rounded-sm shadow-xs" style={{ color: colors.brown }}>
          <p>
            A <strong style={{ color: colors.terracotta }}>SaborRaiz</strong> nasceu do desejo profundo de resgatar, valorizar e compartilhar a riqueza cultural e gastronômica das nossas origens regionais. Mais do que montar cestas de presentes artesanais, nós nos dedicamos a tecer conexões genuínas entre o campo e a cidade, transformando ingredientes selecionados em verdadeiras experiências afetivas e memórias inesquecíveis.
          </p>
          <p>
            Nossa missão principal é apoiar diretamente o pequeno produtor local e incentivar a agricultura familiar. Acreditamos que a verdadeira sofisticação está na simplicidade bem cuidada. Por isso, trazemos para a nossa curadoria queijos maturados com paciência, doces de compota que despertam lembranças de infância, cafés especiais de aroma inigualável e peças de puro artesanato que carregam a identidade e a alma da nossa gente.
          </p>
          <p>
            Cada detalhe, desde a escolha rigorosa dos insumos até a montagem manual e cuidadosa de cada embalagem, reflete nosso compromisso absoluto com o comércio justo e o consumo consciente. A SaborRaiz é a tradução física do afeto, do respeito às tradições e do prazer de celebrar momentos importantes com autenticidade, identidade e, acima de tudo, carinho.
          </p>
        </div>

        {/* SEÇÃO INTERNA: NOSSOS PILARES */}
        <div className="w-full mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            
            {/* Pilar 1 */}
            <div className="p-6 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 shadow-xs" style={{ backgroundColor: `${colors.green}15` }}>
                <Heart size={26} style={{ color: colors.green }} />
              </div>
              <h4 className="font-title text-xl font-bold mb-2" style={{ color: colors.green }}>Alimentado por Afeto</h4>
              <p className="text-sm leading-relaxed opacity-90">
                Criamos designs e curadorias pensadas exclusivamente para aproximar pessoas e emocionar quem recebe.
              </p>
            </div>

            {/* Pilar 2 */}
            <div className="p-6 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 shadow-xs" style={{ backgroundColor: `${colors.green}15` }}>
                <ShieldCheck size={26} style={{ color: colors.green }} />
              </div>
              <h4 className="font-title text-xl font-bold mb-2" style={{ color: colors.green }}>Origem Sustentável</h4>
              <p className="text-sm leading-relaxed opacity-90">
                Parcerias diretas com famílias produtoras, garantindo a procedência limpa e artesanal de cada item.
              </p>
            </div>

            {/* Pilar 3 */}
            <div className="p-6 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 shadow-xs" style={{ backgroundColor: `${colors.green}15` }}>
                <Truck size={26} style={{ color: colors.green }} />
              </div>
              <h4 className="font-title text-xl font-bold mb-2" style={{ color: colors.green }}>Cuidado Logístico</h4>
              <p className="text-sm leading-relaxed opacity-90">
                Processo de entrega minucioso e seguro, garantindo que o capricho da montagem chegue impecável ao destino.
              </p>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}