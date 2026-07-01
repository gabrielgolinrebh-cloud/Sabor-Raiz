import React, { useState } from 'react';
import { Package, ChevronDown, ChevronUp, ShoppingBag, MapPin, Calendar } from 'lucide-react';

export default function Pedidos({ meusPedidos }) {
  // Estado para controlar quais pedidos estão expandidos para ver detalhes
  const [expandedPedido, setExpandedPedido] = useState(null);
  // Estado para filtrar os pedidos por status
  const [filtro, setFiltro] = useState('todos');

  // Paleta de Cores da Marca SaborRaiz
  const colors = {
    green: '#2F5D50',
    terracotta: '#B96A43',
    gold: '#D1A054',
    cream: '#F6EBD9',
    brown: '#4A3428',
  };

  const toggleExpand = (id) => {
    setExpandedPedido(expandedPedido === id ? null : id);
  };

  // Filtra usando os dados que vieram do App.jsx (meusPedidos)
  const pedidosFiltrados = meusPedidos.filter(pedido => {
    if (filtro === 'todos') return true;
    if (filtro === 'andamento') return pedido.status !== 'Entregue';
    if (filtro === 'concluidos') return pedido.status === 'Entregue';
    return true;
  });

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: colors.cream, color: colors.brown, fontFamily: "'Montserrat', sans-serif" }}>
      <div className="max-w-4xl mx-auto">
        
        {/* TÍTULO DA PÁGINA */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold mb-2" style={{ color: colors.green }}>
            Meus Pedidos
          </h2>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="h-px w-8" style={{ backgroundColor: colors.gold }}></span>
            <span className="text-xs tracking-[0.3em] font-medium" style={{ color: colors.brown }}>ACOMPANHAMENTO</span>
            <span className="h-px w-8" style={{ backgroundColor: colors.gold }}></span>
          </div>
        </div>

        {/* FILTROS DE STATUS */}
        <div className="flex justify-center gap-4 mb-8">
          {['todos', 'andamento', 'concluidos'].map((tipo) => (
            <button
              key={tipo}
              onClick={() => setFiltro(tipo)}
              className="px-4 py-2 rounded-sm text-sm font-medium transition-all duration-200 uppercase tracking-wider border"
              style={{
                backgroundColor: filtro === tipo ? colors.green : 'transparent',
                borderColor: colors.green,
                color: filtro === tipo ? '#fff' : colors.green
              }}
            >
              {tipo === 'todos' ? 'Todos' : tipo === 'andamento' ? 'Em Andamento' : 'Concluídos'}
            </button>
          ))}
        </div>

        {/* LISTA DE PEDIDOS */}
        <div className="space-y-4">
          {pedidosFiltrados.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-sm border p-8 shadow-sm" style={{ borderColor: `${colors.gold}40` }}>
              <ShoppingBag size={48} className="mx-auto mb-4 opacity-40" style={{ color: colors.terracotta }} />
              <p className="text-lg font-medium">Nenhum pedido encontrado nesta categoria.</p>
            </div>
          ) : (
            pedidosFiltrados.map((pedido) => {
              const IconeStatus = pedido.statusIcon;
              const isExpanded = expandedPedido === pedido.id;

              return (
                <div 
                  key={pedido.id} 
                  className="bg-white rounded-sm border shadow-sm overflow-hidden transition-all duration-300"
                  style={{ borderColor: `${colors.gold}40` }}
                >
                  {/* CABEÇALHO DO CARD (RESUMO) */}
                  <div 
                    onClick={() => toggleExpand(pedido.id)}
                    className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-pointer hover:bg-black/[0.01] transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-lg" style={{ color: colors.green }}>{pedido.id}</span>
                        <span 
                          className="text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1"
                          style={{ backgroundColor: `${pedido.statusColor}15`, color: pedido.statusColor }}
                        >
                          <IconeStatus size={14} />
                          {pedido.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm opacity-80 mt-1">
                        <span className="flex items-center gap-1"><Calendar size={14} /> {pedido.data}</span>
                        <span className="font-medium">Total: {pedido.total}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center font-semibold text-sm" style={{ color: colors.terracotta }}>
                      {isExpanded ? 'Ocultar detalhes' : 'Ver detalhes'}
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </div>

                  {/* DETALHES EXPANSÍVEIS DO PEDIDO */}
                  {isExpanded && (
                    <div className="px-6 pb-6 pt-2 border-t text-sm space-y-4" style={{ borderColor: `${colors.gold}20`, backgroundColor: `${colors.cream}20` }}>
                      
                      {/* Itens do Pedido */}
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2" style={{ color: colors.green }}>
                          <Package size={16} /> Itens do Pedido
                        </h4>
                        <div className="bg-white rounded-sm border divide-y overflow-hidden" style={{ borderColor: `${colors.gold}30` }}>
                          {pedido.items.map((item, index) => (
                            <div key={index} className="p-3 flex justify-between items-center">
                              <div>
                                <span className="font-medium">{item.nome}</span>
                                <span className="text-xs ml-2 opacity-60">x{item.qtd}</span>
                              </div>
                              <span className="font-medium opacity-80">{item.preco}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Endereço de Entrega */}
                      <div>
                        <h4 className="font-semibold mb-1 flex items-center gap-2" style={{ color: colors.green }}>
                          <MapPin size={16} /> Endereço de Entrega
                        </h4>
                        <p className="opacity-80 pl-6">{pedido.entrega}</p>
                      </div>

                      {/* Botão de Suporte */}
                      <div className="pt-2 flex justify-end">
                        <button 
                          className="text-xs font-semibold uppercase tracking-wider px-4 py-2 border rounded-sm transition-colors"
                          style={{ borderColor: colors.terracotta, color: colors.terracotta }}
                          onClick={(e) => {
                            e.stopPropagation();
                            alert(`Suporte acionado para o pedido ${pedido.id}`);
                          }}
                        >
                          Preciso de ajuda com este pedido
                        </button>
                      </div>

                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}