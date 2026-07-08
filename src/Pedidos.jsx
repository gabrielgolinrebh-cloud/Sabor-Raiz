import React, { useState } from 'react';
import { ArrowLeft, Clock, CheckCircle2, MapPin, CreditCard, ChevronRight, ShoppingBag, Copy, Check, QrCode } from 'lucide-react';

export default function Pedidos({ meusPedidos, setMeusPedidos, aoVoltar, colors }) {
  const [abaAtiva, setAbaAtiva] = useState('ativos');
  const [editandoEnderecoId, setEditandoEnderecoId] = useState(null);
  const [enderecoTemporario, setEnderecoTemporario] = useState('');
  
  // Controles de pagamento e exibição de QR Code
  const [metodosPagamento, setMetodosPagamento] = useState({});
  const [codigoCopiado, setCodigoCopiado] = useState(null);
  const [exibirQrCodeId, setExibirQrCodeId] = useState(null);

  const realizarPagamento = (id) => {
    setMeusPedidos(pedidosAtuais =>
      pedidosAtuais.map(p => 
        p.id === id ? { ...p, pago: true, status: "Em preparação" } : p
      )
    );
  };

  const marcarComoConcluido = (id) => {
    setMeusPedidos(pedidosAtuais =>
      pedidosAtuais.map(p => 
        p.id === id ? { ...p, status: "Concluído" } : p
      )
    );
  };

  const salvarEndereco = (id) => {
    setMeusPedidos(pedidosAtuais =>
      pedidosAtuais.map(p => 
        p.id === id ? { ...p, entrega: enderecoTemporario } : p
      )
    );
    setEditandoEnderecoId(null);
  };

  const selecionarPagamento = (pedidoId, metodo) => {
    setMetodosPagamento(prev => ({ ...prev, [pedidoId]: metodo }));
  };

  const copiarPix = (codigo, pedidoId) => {
    navigator.clipboard.writeText(codigo);
    setCodigoCopiado(pedidoId);
    setTimeout(() => setCodigoCopiado(null), 3000);
  };

  const pedidosFiltrados = meusPedidos.filter(p => {
    if (abaAtiva === 'ativos') return p.status !== "Concluído";
    return p.status === "Concluído";
  });

  // Correção segura convertendo id para String para evitar quebra de tela branca
  const obterPrazoAleatorio = (id) => {
    if (!id) return '3 a 5 dias úteis';
    const idString = String(id);
    const digito = idString.replace(/\D/g, '')[0] || '3';
    const min = parseInt(digito) % 2 === 0 ? 2 : 3;
    const max = min + 2;
    return `${min} a ${max} dias úteis`;
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      {/* CABEÇALHO ELEGANTE */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left mb-16">
        <h1 className="font-title text-4xl md:text-5xl font-bold m-0 tracking-tight" style={{ color: colors.green }}>
          Meus Pedidos
        </h1>
        <button 
          onClick={() => aoVoltar('catalogo')}
          className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest opacity-40 hover:opacity-90 transition-all mt-4 hover:translate-x-[-2px]"
          style={{ color: colors.brown }}
        >
          <ArrowLeft size={13} /> Continuar Comprando
        </button>
      </div>

      {/* SELEÇÃO DE ABAS CENTRALIZADA */}
      <div className="flex justify-center border-b mb-12" style={{ borderColor: `${colors.gold}30` }}>
        <div className="flex gap-2 sm:gap-8">
          <button
            onClick={() => setAbaAtiva('ativos')}
            className={`pb-4 px-4 sm:px-8 text-xs sm:text-sm font-bold uppercase tracking-widest border-b-2 transition-all ${
              abaAtiva === 'ativos' ? 'opacity-100' : 'opacity-40 hover:opacity-80'
            }`}
            style={{ 
              borderColor: abaAtiva === 'ativos' ? colors.terracotta : 'transparent',
              color: colors.green 
            }}
          >
            Em Andamento ({meusPedidos.filter(p => p.status !== "Concluído").length})
          </button>
          
          <button
            onClick={() => setAbaAtiva('concluidos')}
            className={`pb-4 px-4 sm:px-8 text-xs sm:text-sm font-bold uppercase tracking-widest border-b-2 transition-all ${
              abaAtiva === 'concluidos' ? 'opacity-100' : 'opacity-40 hover:opacity-80'
            }`}
            style={{ 
              borderColor: abaAtiva === 'concluidos' ? colors.green : 'transparent',
              color: colors.green 
            }}
          >
            Concluídos ({meusPedidos.filter(p => p.status === "Concluído").length})
          </button>
        </div>
      </div>

      {/* LISTA DE PEDIDOS */}
      <div className="space-y-10">
        {pedidosFiltrados.length === 0 ? (
          <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-sm border border-dashed shadow-sm flex flex-col items-center" style={{ borderColor: `${colors.gold}60` }}>
            <ShoppingBag size={48} className="mb-4 opacity-30" style={{ color: colors.brown }} />
            <p className="font-medium opacity-70 mb-6 text-lg" style={{ color: colors.brown }}>
              {abaAtiva === 'ativos' ? 'Você não tem pedidos em andamento.' : 'Seu histórico de compras está vazio.'}
            </p>
            <button 
              onClick={() => aoVoltar('catalogo')}
              className="px-8 py-3 text-xs font-bold uppercase tracking-widest text-white transition-transform active:scale-95 shadow-md"
              style={{ backgroundColor: colors.green }}
            >
              Explorar Catálogo
            </button>
          </div>
        ) : (
          pedidosFiltrados.map((pedido) => {
            const idSeguro = String(pedido.id);
            const pagamentoSelecionado = metodosPagamento[pedido.id] || 'Pix';
            const isPago = pedido.pago || pedido.status === "Concluído";
            const codigoPixFake = `00020126580014br.gov.bcb.pix0136sabor-raiz-${idSeguro.replace('#', '')}-key5204000053039865802BR5910SaborRaiz6009Curitiba62070503***6304`;

            return (
              <div 
                key={pedido.id} 
                className="bg-white rounded-sm border shadow-md p-6 md:p-8 transition-all hover:shadow-lg overflow-hidden relative"
                style={{ borderColor: `${colors.gold}40` }}
              >
                {/* Indicador lateral robusto baseado no status */}
                <div 
                  className="absolute left-0 top-0 bottom-0 w-1.5"
                  style={{ backgroundColor: pedido.status === "Concluído" ? colors.green : (!isPago ? colors.terracotta : colors.green) }}
                />

                {/* CABEÇALHO DO CARD */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4 mb-6 pl-2" style={{ borderColor: `${colors.gold}20` }}>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest opacity-60" style={{ color: colors.brown }}>
                      Data da Compra
                    </span>
                    <h3 className="text-base font-bold mt-0.5" style={{ color: colors.brown }}>
                      {pedido.data}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 px-4 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider"
                    style={{ 
                      backgroundColor: pedido.status === "Concluído" ? `${colors.green}15` : (!isPago ? `${colors.terracotta}15` : `${colors.green}15`),
                      color: pedido.status === "Concluído" ? colors.green : (!isPago ? colors.terracotta : colors.green)
                    }}
                  >
                    {pedido.status === "Concluído" ? (
                      <><CheckCircle2 size={14} /> Entregue</>
                    ) : (
                      <><Clock size={14} /> {!isPago ? "Aguardando Pagamento" : "Em Preparação / Transporte"}</>
                    )}
                  </div>
                </div>

                {/* RESUMO E FOTO */}
                <div className="flex flex-col md:flex-row gap-8 mb-8 pl-2">
                  {pedido.imagemPrincipal && (
                    <div className="w-full md:w-32 h-32 md:h-auto flex-shrink-0 rounded-sm overflow-hidden border bg-gray-50" style={{ borderColor: `${colors.gold}30` }}>
                      <img 
                        src={pedido.imagemPrincipal} 
                        alt={pedido.nomePrincipal} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="flex-grow space-y-3">
                    <span className="text-xs font-bold uppercase tracking-widest opacity-60 block" style={{ color: colors.brown }}>
                      Itens do Pedido
                    </span>
                    {pedido.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-xs w-6 h-6 flex items-center justify-center rounded-full" style={{ backgroundColor: `${colors.green}10`, color: colors.green }}>
                            {item.qtd}
                          </span>
                          <span className="font-medium" style={{ color: colors.brown }}>{item.nome}</span>
                        </div>
                        <span className="font-title font-bold text-lg" style={{ color: colors.green }}>
                          {(item.preco * item.qtd).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* GRID DE LOGÍSTICA E PAGAMENTO COM IDENTIDADE VISUAL */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 rounded-sm border mb-6 ml-2" style={{ backgroundColor: `${colors.cream}40`, borderColor: `${colors.gold}25` }}>
                  
                  {/* Seção Endereço */}
                  <div className="space-y-3 border-b md:border-b-0 md:border-r pb-4 md:pb-0 md:pr-6" style={{ borderColor: `${colors.gold}30` }}>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-70" style={{ color: colors.brown }}>
                      <MapPin size={14} style={{ color: colors.terracotta }} /> Endereço de Entrega
                    </div>
                    
                    {editandoEnderecoId === pedido.id ? (
                      <div className="space-y-2">
                        <textarea
                          value={enderecoTemporario}
                          onChange={(e) => setEnderecoTemporario(e.target.value)}
                          className="w-full p-3 text-sm border rounded-none bg-white focus:outline-none"
                          style={{ borderColor: colors.gold }}
                          rows="2"
                        />
                        <div className="flex gap-2">
                          <button 
                            onClick={() => salvarEndereco(pedido.id)}
                            className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white"
                            style={{ backgroundColor: colors.green }}
                          >
                            Salvar
                          </button>
                          <button 
                            onClick={() => setEditandoEnderecoId(null)}
                            className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider border hover:bg-gray-100"
                            style={{ color: colors.brown, borderColor: colors.brown }}
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm font-medium leading-relaxed" style={{ color: colors.brown }}>
                          {pedido.entrega}
                        </p>
                        {!isPago && (
                          <button
                            onClick={() => {
                              setEditandoEnderecoId(pedido.id);
                              setEnderecoTemporario(pedido.entrega);
                            }}
                            className="text-xs font-bold underline mt-2 block transition-colors"
                            style={{ color: colors.terracotta }}
                          >
                            Editar Endereço
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Prazos e Pagamento */}
                  <div className="space-y-5">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1" style={{ color: colors.brown }}>
                        Previsão de Entrega
                      </div>
                      <p className="text-sm font-bold" style={{ color: colors.green }}>
                        {!isPago ? "Disponível após o pagamento" : (pedido.status === "Concluído" ? "Entregue!" : obterPrazoAleatorio(pedido.id))}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-70 mb-2" style={{ color: colors.brown }}>
                        <CreditCard size={14} style={{ color: colors.green }} /> Método de Pagamento
                      </div>
                      <div className="flex gap-2 flex-wrap mb-4">
                        {['Pix', 'Cartão', 'Boleto'].map(metodo => (
                          <button
                            key={metodo}
                            onClick={() => selecionarPagamento(pedido.id, metodo)}
                            disabled={isPago}
                            className={`text-[11px] font-bold px-4 py-1.5 border uppercase tracking-widest transition-all ${
                              pagamentoSelecionado === metodo ? 'shadow-inner' : 'opacity-50 bg-white'
                            }`}
                            style={{ 
                              backgroundColor: pagamentoSelecionado === metodo ? colors.brown : 'white',
                              color: pagamentoSelecionado === metodo ? colors.cream : colors.brown,
                              borderColor: colors.brown,
                              cursor: isPago ? 'default' : 'pointer'
                            }}
                          >
                            {metodo}
                          </button>
                        ))}
                      </div>

                      {/* AREA PIX REPROJETADA COM CORES E INSTANT QR CODE */}
                      {!isPago && pagamentoSelecionado === 'Pix' && (
                        <div className="bg-white border p-4 text-center space-y-3 shadow-inner" style={{ borderColor: `${colors.gold}60` }}>
                          <p className="text-xs font-semibold" style={{ color: colors.brown }}>
                            Realize o pagamento para liberar o envio:
                          </p>
                          
                          {/* Botão Interativo para Revelar QR Code */}
                          {exibirQrCodeId === pedido.id ? (
                            <div className="flex flex-col items-center justify-center p-2 bg-white rounded-sm border animate-fadeIn mx-auto w-40 h-40">
                              <img 
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&color=2f5d50&data=${encodeURIComponent(codigoPixFake)}`} 
                                alt="QR Code Pix Sabor Raiz"
                                className="w-full h-full object-contain"
                              />
                            </div>
                          ) : (
                            <button
                              onClick={() => setExibirQrCodeId(pedido.id)}
                              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-opacity hover:opacity-90"
                              style={{ backgroundColor: colors.green }}
                            >
                              <QrCode size={14} /> Mostrar QR Code
                            </button>
                          )}

                          <div className="flex items-center gap-2 pt-1">
                            <input 
                              type="text" 
                              readOnly 
                              value={codigoPixFake} 
                              className="text-[10px] w-full p-2 bg-gray-50 border border-gray-200 rounded-none text-gray-400 font-mono overflow-hidden whitespace-nowrap text-ellipsis"
                            />
                            <button 
                              onClick={() => copiarPix(codigoPixFake, pedido.id)}
                              className="p-2 border transition-colors bg-gray-50 flex-shrink-0"
                              style={{ borderColor: colors.gold }}
                              title="Copiar Código"
                            >
                              {codigoCopiado === pedido.id ? <Check size={14} className="text-green-600" /> : <Copy size={14} style={{ color: colors.brown }} />}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                </div>

                {/* RODAPÉ: VALOR TOTAL E TRAVA LOGICIAL DE BOTÕES */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 mt-2 pl-2 border-t" style={{ borderColor: `${colors.gold}20` }}>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest opacity-60 block mb-1" style={{ color: colors.brown }}>
                      Valor Total
                    </span>
                    <span className="text-3xl font-bold font-title tracking-tight" style={{ color: colors.green }}>
                      {pedido.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  </div>

                  {/* Exibição condicional de segurança contra fraudes */}
                  {!isPago ? (
                    <button
                      onClick={() => realizarPagamento(pedido.id)}
                      className="flex items-center gap-2 px-8 py-3 text-xs font-bold uppercase tracking-widest text-white transition-all active:scale-95 shadow-md hover:brightness-110"
                      style={{ backgroundColor: colors.terracotta }}
                    >
                      Pagar e Finalizar <ChevronRight size={16} />
                    </button>
                  ) : (
                    pedido.status !== "Concluído" && (
                      <button
                        onClick={() => marcarComoConcluido(pedido.id)}
                        className="flex items-center gap-2 px-7 py-3 text-xs font-bold uppercase tracking-widest text-white transition-all active:scale-95 shadow-md hover:brightness-105"
                        style={{ backgroundColor: colors.green }}
                      >
                        Confirmar Recebimento <CheckCircle2 size={16} />
                      </button>
                    )
                  )}
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
}