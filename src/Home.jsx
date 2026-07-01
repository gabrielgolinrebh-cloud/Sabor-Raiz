import React, { useEffect } from 'react';
import { ShoppingBasket, Leaf, Heart, ShieldCheck, Truck, Star, Quote, Award, Users } from 'lucide-react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import styles from './Home.module.css';

// --- NOVO: COMPONENTE DO CONTADOR ANIMADO ---
function AnimatedCounter({ from = 0, to, suffix = "" }) {
  const nodeRef = React.useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    const node = nodeRef.current;
    // Cria um controle de animação de 0 até o número alvo
    const controls = animate(from, to, {
      duration: 2, // Tempo da animação em segundos
      ease: "easeOut",
      onUpdate(value) {
        // Atualiza o texto com o número arredondado + o sufixo (ex: + ou k)
        node.textContent = Math.floor(value) + suffix;
      },
    });

    return () => controls.stop();
  }, [isInView, from, to, suffix]);

  return <span ref={nodeRef}>{from}{suffix}</span>;
}

const FAKE_PRODUCTS = [
  { id: 1, name: "Cesta Manhã na Fazenda", price: "R$ 189,90", img: "https://images.unsplash.com/photo-1592663527359-cf6642f54cff?w=500&q=80" },
  { id: 2, name: "Kit Queijos & Vinhos", price: "R$ 289,90", img: "https://images.unsplash.com/photo-1596450514735-111a2fe02935?w=500&q=80" },
  { id: 3, name: "Afeto Regional", price: "R$ 145,00", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyLAWMaT64DWajGmKRcYF7sIlS7JbVGB2cj7hlOsYxnwbfximsYwh9TsI&s=10" }
];

const FAKE_TESTIMONIALS = [
  { id: 1, name: "Mariana Silva", text: "A cesta chegou impecável! Os produtos são fresquinhos e a embalagem é um presente à parte." },
  { id: 2, name: "Carlos Eduardo", text: "Comprei para o aniversário de casamento e minha escolha oficial para presentear amigos." },
  { id: 3, name: "Fernanda Costa", text: "Dá para sentir o carinho de quem montou. Qualidade surreal no acabamento." }
];

// Alteramos a estrutura do STATS para separar o número puro do seu sufixo (+ ou k)
const STATS = [
  { id: 1, icon: <Award size={32} />, targetNumber: 10, suffix: "+", label: "Anos de Tradição" },
  { id: 2, icon: <ShoppingBasket size={32} />, targetNumber: 15, suffix: "k", label: "Cestas Entregues" },
  { id: 3, icon: <Users size={32} />, targetNumber: 50, suffix: "+", label: "Produtores Locais" }
];

// --- COMPONENTE PRINCIPAL ---
export default function Home({ colors, setTelaAtual }) {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1592663527359-cf6642f54cff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Cesta de produtos regionais" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <motion.div 
          initial="hidden" animate="visible" variants={fadeUp}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center"
        >
          <Leaf className="mb-4" size={40} style={{ color: colors.gold }} />
          <h2 className={`font-title text-4xl sm:text-5xl md:text-7xl text-white mb-6 leading-tight drop-shadow-lg ${styles['font-title']}`}>
            Sabores que contam histórias.
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-10 font-light max-w-2xl drop-shadow-md">
            Presentes que criam memórias inesquecíveis, com o verdadeiro gosto da nossa terra.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button 
              onClick={() => setTelaAtual && setTelaAtual('catalogo')} 
              className={`w-full sm:w-auto px-8 py-4 rounded-sm text-white font-semibold flex items-center justify-center gap-2 ${styles['hero-btn']} ${styles['hero-btn-primary']}`} 
              style={{ backgroundColor: colors.terracotta }}
            >
              Ver Catálogo <ShoppingBasket size={18} />
            </button>
            <button 
              className={`w-full sm:w-auto px-8 py-4 rounded-sm font-semibold flex items-center justify-center gap-2 backdrop-blur-md ${styles['hero-btn']}`} 
              style={{ backgroundColor: `${colors.cream}E6`, color: colors.green }}
            >
              Monte sua Cesta
            </button>
          </div>
        </motion.div>
      </section>

      {/* SEÇÃO DE ESTATÍSTICAS ATUALIZADA COM O CONTADOR REAL */}
      <section className="py-10 border-b relative -mt-8 z-20 mx-4 sm:mx-10 rounded-lg shadow-xl" style={{ backgroundColor: colors.cream, borderColor: `${colors.gold}40` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x" style={{ borderColor: `${colors.gold}40` }}
          >
            {STATS.map((stat) => (
              <motion.div key={stat.id} variants={fadeUp} className="flex flex-col items-center pt-4 sm:pt-0">
                <div style={{ color: colors.terracotta }} className="mb-2">{stat.icon}</div>
                <h4 className={`text-4xl font-bold mb-1 ${styles['font-title']}`} style={{ color: colors.green }}>
                  {/* Chamada do componente dinâmico que faz a contagem crescer */}
                  <AnimatedCounter from={0} to={stat.targetNumber} suffix={stat.suffix} />
                </h4>
                <p className="text-sm uppercase tracking-wider font-semibold" style={{ color: colors.brown }}>{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* HISTÓRICO / SOBRE NÓS */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full overflow-hidden">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
            className="w-full md:w-1/2 relative px-4"
          >
            <div className={`p-2 ${styles['border-ornament']}`}>
              <img src="https://images.unsplash.com/photo-1614088636750-0a25692634e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Produtos artesanais SaborRaiz" className="w-full h-auto object-cover rounded-sm" />
            </div>
            <div className={`absolute -bottom-6 -right-2 w-24 h-24 rounded-full flex items-center justify-center shadow-2xl z-10 ${styles['floating-badge']}`} style={{ backgroundColor: colors.green }}>
              <span className={`text-white text-3xl italic ${styles['font-title']}`}>SR</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
            className="w-full md:w-1/2 space-y-6 text-left"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-12" style={{ backgroundColor: colors.gold }}></span>
              <span className="uppercase tracking-widest text-sm font-bold" style={{ color: colors.terracotta }}>Nossa História</span>
            </div>
            <h3 className={`text-4xl lg:text-5xl leading-tight ${styles['font-title']}`} style={{ color: colors.green }}>
              Tradição e Qualidade em cada detalhe.
            </h3>
            <div className="space-y-4 text-base leading-relaxed" style={{ color: colors.brown }}>
              <p>A <strong style={{ color: colors.terracotta }}>SaborRaiz Cestas</strong> nasceu do desejo de resgatar memórias através do paladar. Somos uma empresa artesanal especializada em cestas sob medida e presentes afetivos.</p>
              <p>Trabalhamos lado a lado com pequenos produtores para garantir que cada geleia, queijo ou pão chegue até você com o frescor e a energia de um produto feito com alma.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PRODUTOS EM DESTAQUE */}
      <section className="py-20 bg-stone-50" style={{ backgroundColor: `${colors.cream}30` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className={`text-4xl mb-4 ${styles['font-title']}`} style={{ color: colors.green }}>Mais Desejadas</h3>
            <p className="text-lg" style={{ color: colors.brown }}>As cestas favoritas dos nossos clientes para momentos especiais.</p>
          </div>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          >
            {FAKE_PRODUCTS.map((product) => (
              <motion.div key={product.id} variants={fadeUp} className={`bg-white rounded-md overflow-hidden ${styles['catalog-card']}`}>
                <div className="h-64 overflow-hidden relative">
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                </div>
                <div className="p-6 text-center">
                  <h4 className={`text-xl font-bold mb-2 ${styles['font-title']}`} style={{ color: colors.green }}>{product.name}</h4>
                  <p className="text-lg font-semibold mb-4" style={{ color: colors.terracotta }}>{product.price}</p>
                  <button className={`inline-block pb-1 uppercase tracking-wider text-sm font-bold ${styles['card-btn']}`} style={{ color: colors.brown }}>
                    Ver Detalhes
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="py-20 border-y" style={{ borderColor: `${colors.gold}40`, backgroundColor: colors.cream }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center"
          >
            {[
              { icon: <Heart size={40} />, title: "Presentes Afetivos", text: "Embalagens personalizadas com cartões escritos à mão que contam histórias únicas." },
              { icon: <ShieldCheck size={40} />, title: "Pequenos Produtores", text: "Ingredientes frescos comprados diretamente de cooperativas e fazendas locais." },
              { icon: <Truck size={40} />, title: "Entrega Cuidadosa", text: "Logística especializada e frota climatizada para garantir integridade premium." }
            ].map((diff, index) => (
              <motion.div key={index} variants={fadeUp} className="flex flex-col items-center max-w-sm mx-auto">
                <div className="mb-5 p-4 rounded-full bg-white shadow-md" style={{ color: colors.terracotta }}>
                  {diff.icon}
                </div>
                <h5 className={`text-2xl font-bold mb-3 ${styles['font-title']}`} style={{ color: colors.green }}>{diff.title}</h5>
                <p className="text-base opacity-90 leading-relaxed" style={{ color: colors.brown }}>{diff.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Quote size={40} className="mx-auto mb-4 opacity-20" style={{ color: colors.green }} />
          <h3 className={`text-4xl ${styles['font-title']}`} style={{ color: colors.green }}>O que dizem sobre nós</h3>
        </div>
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {FAKE_TESTIMONIALS.map((test) => (
            <motion.div key={test.id} variants={fadeUp} className="p-8 rounded-tr-3xl rounded-bl-3xl relative" style={{ backgroundColor: `${colors.cream}50`, border: `1px solid ${colors.gold}30` }}>
              <div className="flex gap-1 mb-4" style={{ color: colors.gold }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="italic mb-6 leading-relaxed" style={{ color: colors.brown }}>"{test.text}"</p>
              <p className="font-bold uppercase tracking-wider text-sm" style={{ color: colors.terracotta }}>- {test.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
}