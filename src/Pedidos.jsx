import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Clock, CheckCircle2, MapPin, CreditCard, ChevronRight, ShoppingBag, Copy, Check, QrCode, Trash2, Minus, Plus, AlertCircle } from 'lucide-react';

export default function Pedidos({ meusPedidos, setMeusPedidos, aoVoltar, colors }) {
  const [abaAtiva, setAbaAtiva] = useState('carrinho'); 
  
  const [editandoEnderecoId, setEditandoEnderecoId] = useState(null);
  const [enderecoTemporario, setEnderecoTemporario] = useState('');
  const [metodosPagamento, setMetodosPagamento] = useState({});
  const [codigoCopiado, setCodigoCopiado] = useState(null);
  const [exibirQrCodeId, setExibirQrCodeId] = useState(null);

  const [itensSelecionados, setItensSelecionados] = useState([]);
  const prevItemsLength = useRef(0);

  const carrinho = meusPedidos.find(p => p.status === "Em preparação" && !p.pago);
  const itensDoCarrinho = carrinho ? carrinho.items : [];

  useEffect(() => {
    if (carrinho) {
      if (carrinho.items.length > prevItemsLength.current) {
        const nomes = carrinho.items.map(i => i.nome);
        setItensSelecionados(nomes); 
      }
      prevItemsLength.current = carrinho.items.length;
    } else {
      prevItemsLength.current = 0;
    }
  }, [meusPedidos]);

  const alterarQuantidade = (nome, delta) => {
    setMeusPedidos(pedidos => pedidos.map(p => {
      if (p.status === "Em preparação" && !p.pago) {
        const novosItems = p.items.map(item => {
          if (item.nome === nome) {
            const novaQtd = Math.max(1, item.qtd + delta);
            return { ...item, qtd: novaQtd };
          }
          return item;
        });
        const novoTotal = novosItems.reduce((acc, item) => acc + (item.preco * item.qtd), 0);
        return { ...p, items: novosItems, total: novoTotal };
      }
      return p;
    }));
  };

  const removerItem = (nome) => {
    setMeusPedidos(pedidos => pedidos.map(p => {
      if (p.status === "Em preparação" && !p.pago) {
        const novosItems = p.items.filter(item => item.nome !== nome);
        const novoTotal = novosItems.reduce((acc, item) => acc + (item.preco * item.qtd), 0);
        return { ...p, items: novosItems, total: novoTotal };
      }
      return p;
    }).filter(p => !(p.status === "Em preparação" && p.items.length === 0)));
    
    setItensSelecionados(prev => prev.filter(n => n !== nome));
  };

  const toggleSelecao = (nome) => {
    setItensSelecionados(prev => 
      prev.includes(nome) ? prev.filter(n => n !== nome) : [...prev, nome]
    );
  };

  const toggleSelecionarTodos = () => {
    if (itensSelecionados.length === itensDoCarrinho.length) {
      setItensSelecionados([]);
    } else {
      setItensSelecionados(itensDoCarrinho.map(i => i.nome));
    }
  };

  const subtotalCarrinho = itensDoCarrinho
    .filter(item => itensSelecionados.includes(item.nome))
    .reduce((acc, item) => acc + (item.preco * item.qtd), 0);

  const qtdSelecionada = itensDoCarrinho
    .filter(item => itensSelecionados.includes(item.nome))
    .reduce((acc, item) => acc + item.qtd, 0);

  const fecharPedido = () => {
    if (!carrinho || qtdSelecionada === 0) return;

    const itemsToCheckout = carrinho.items.filter(item => itensSelecionados.includes(item.nome));
    const itemsToKeep = carrinho.items.filter(item => !itensSelecionados.includes(item.nome));

    const totalCheckout = itemsToCheckout.reduce((acc, item) => acc + (item.preco * item.qtd), 0);

    const novoPedido = {
      id: `#SR-${Math.floor(Math.random() * 9000) + 1000}`,
      data: new Date().toLocaleDateString('pt-BR'),
      status: "Aguardando Pagamento", 
      pago: false,
      total: totalCheckout,
      imagemPrincipal: itemsToCheckout[0].imagem || carrinho.imagemPrincipal,
      nomePrincipal: itemsToCheckout.length === 1 ? itemsToCheckout[0].nome : `Pedido com ${itemsToCheckout.length} itens`,
      items: itemsToCheckout,
      entrega: carrinho.entrega
    };

    setMeusPedidos(pedidosAtuais => {
      let novosPedidos = pedidosAtuais.filter(p => p.id !== carrinho.id);
      if (itemsToKeep.length > 0) {
        const cartTotal = itemsToKeep.reduce((acc, item) => acc + (item.preco * item.qtd), 0);
        novosPedidos.push({ ...carrinho, items: itemsToKeep, total: cartTotal });
      }
      return [novoPedido, ...novosPedidos];
    });

    setItensSelecionados([]);
    setAbaAtiva('ativos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const realizarPagamento = (id) => {
    setMeusPedidos(pedidosAtuais =>
      pedidosAtuais.map(p => p.id === id ? { ...p, pago: true, status: "Em Transporte" } : p)
    );
  };

  const marcarComoConcluido = (id) => {
    setMeusPedidos(pedidosAtuais =>
      pedidosAtuais.map(p => p.id === id ? { ...p, status: "Concluído" } : p)
    );
  };

  const salvarEndereco = (id) => {
    setMeusPedidos(pedidosAtuais =>
      pedidosAtuais.map(p => p.id === id ? { ...p, entrega: enderecoTemporario } : p)
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

  const obterPrazoAleatorio = (id) => {
    if (!id) return '3 a 5 dias úteis';
    const idString = String(id);
    const digito = idString.replace(/\D/g, '')[0] || '3';
    const min = parseInt(digito) % 2 === 0 ? 2 : 3;
    const max = min + 2;
    return `${min} a ${max} dias úteis`;
  };

  const pedidosAtivos = meusPedidos.filter(p => p.status !== "Concluído" && p.status !== "Em preparação");
  const pedidosConcluidos = meusPedidos.filter(p => p.status === "Concluído");

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#F6EBD9]/20">
      
      {/* Navegação Rápida */}
      <div className="flex flex-col items-start mb-8">
        <button 
          onClick={() => aoVoltar('catalogo')}
          className="flex items-center gap-1 text-sm font-support font-bold opacity-80 hover:opacity-100 transition-opacity mb-4"
          style={{ color: colors.brown }}
        >
          <ArrowLeft size={16} /> Continuar comprando
        </button>
        <h1 className="font-title text-4xl md:text-5xl font-bold m-0" style={{ color: colors.green }}>
          {abaAtiva === 'carrinho' ? 'Carrinho de Compras' : 'Meus Pedidos'}
        </h1>
      </div>

      <div className="flex border-b mb-8 gap-6 md:gap-10 font-support" style={{ borderColor: `${colors.gold}40` }}>
        <button
          onClick={() => setAbaAtiva('carrinho')}
          className={`pb-3 text-sm md:text-base font-semibold transition-all ${
            abaAtiva === 'carrinho' ? 'border-b-2 opacity-100' : 'opacity-50 hover:opacity-80'
          }`}
          style={{ borderColor: abaAtiva === 'carrinho' ? colors.terracotta : 'transparent', color: colors.brown }}
        >
          Carrinho ({itensDoCarrinho.length})
        </button>
        <button
          onClick={() => setAbaAtiva('ativos')}
          className={`pb-3 text-sm md:text-base font-semibold transition-all ${
            abaAtiva === 'ativos' ? 'border-b-2 opacity-100' : 'opacity-50 hover:opacity-80'
          }`}
          style={{ borderColor: abaAtiva === 'ativos' ? colors.green : 'transparent', color: colors.brown }}
        >
          Pagamentos e Entregas ({pedidosAtivos.length})
        </button>
        <button
          onClick={() => setAbaAtiva('concluidos')}
          className={`pb-3 text-sm md:text-base font-semibold transition-all ${
            abaAtiva === 'concluidos' ? 'border-b-2 opacity-100' : 'opacity-50 hover:opacity-80'
          }`}
          style={{ borderColor: abaAtiva === 'concluidos' ? colors.green : 'transparent', color: colors.brown }}
        >
          Histórico ({pedidosConcluidos.length})
        </button>
      </div>

      {abaAtiva === 'carrinho' && (
        <div className="w-full">
          {itensDoCarrinho.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-lg border border-dashed flex flex-col items-center shadow-sm" style={{ borderColor: `${colors.gold}60` }}>
              <ShoppingBag size={48} className="mb-4 opacity-30" style={{ color: colors.brown }} />
              <h2 className="font-title text-3xl font-bold mb-3" style={{ color: colors.brown }}>Seu carrinho está vazio.</h2>
              <p className="font-support opacity-70 mb-8 max-w-md">Os melhores produtos regionais estão esperando por você. Adicione itens e eles aparecerão aqui.</p>
              <button 
                onClick={() => aoVoltar('catalogo')}
                className="px-8 py-3 text-sm font-support font-bold text-white transition-transform active:scale-95 shadow-md rounded-full"
                style={{ backgroundColor: colors.green }}
              >
                Explorar Catálogo
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
              
              <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-sm border" style={{ borderColor: `${colors.gold}30` }}>
                
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <label className="flex items-center gap-3 cursor-pointer font-support text-sm font-semibold" style={{ color: colors.brown }}>
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 cursor-pointer rounded border-gray-300 focus:ring-0"
                      style={{ accentColor: colors.green }}
                      checked={itensSelecionados.length === itensDoCarrinho.length && itensDoCarrinho.length > 0}
                      onChange={toggleSelecionarTodos}
                    />
                    Selecionar todos os itens
                  </label>
                  <span className="font-support text-sm font-semibold opacity-60 hidden sm:block" style={{ color: colors.brown }}>Preço</span>
                </div>

                <div className="divide-y divide-gray-100">
                  {itensDoCarrinho.map((item) => (
                    <div key={item.nome} className="flex gap-4 py-6">
                      
                      <div className="pt-2">
                        <input 
                          type="checkbox" 
                          className="w-5 h-5 cursor-pointer rounded border-gray-300 focus:ring-0"
                          style={{ accentColor: colors.green }}
                          checked={itensSelecionados.includes(item.nome)}
                          onChange={() => toggleSelecao(item.nome)}
                        />
                      </div>
                      
                      <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 bg-[#F6EBD9]/30 rounded-md border overflow-hidden" style={{ borderColor: `${colors.gold}40` }}>
                        <img 
                          src={item.imagem || carrinho.imagemPrincipal} 
                          alt={item.nome} 
                          className="w-full h-full object-cover mix-blend-multiply"
                        />
                      </div>
                      
                      <div className="flex-grow flex flex-col justify-between">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                          <div className="pr-4">
                            <h3 className="font-title text-xl font-bold leading-tight mb-1" style={{ color: colors.brown }}>{item.nome}</h3>
                            <p className="font-support text-xs font-bold mt-2" style={{ color: colors.green }}>Em estoque</p>
                          </div>
                          
                          <div className="text-left sm:text-right flex-shrink-0">
                            <p className="font-support text-lg sm:text-xl font-bold" style={{ color: colors.brown }}>
                              {(item.preco * item.qtd).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </p>
                            {item.qtd > 1 && (
                              <p className="font-support text-xs opacity-60 mt-1" style={{ color: colors.brown }}>
                                ({item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} / unid)
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 mt-4">
                          <div className="flex items-center border rounded-full overflow-hidden h-8 bg-white" style={{ borderColor: `${colors.gold}80` }}>
                            <button onClick={() => alterarQuantidade(item.nome, -1)} className="px-3 hover:bg-gray-50 transition-colors font-support font-medium flex items-center h-full" style={{ color: colors.brown }}><Minus size={14} /></button>
                            <span className="px-4 font-support text-sm font-bold h-full flex items-center bg-[#F6EBD9]/30" style={{ color: colors.brown }}>{item.qtd}</span>
                            <button onClick={() => alterarQuantidade(item.nome, 1)} className="px-3 hover:bg-gray-50 transition-colors font-support font-medium flex items-center h-full" style={{ color: colors.brown }}><Plus size={14} /></button>
                          </div>
                          <div className="h-4 border-l hidden sm:block" style={{ borderColor: `${colors.gold}60` }}></div>
                          <button onClick={() => removerItem(item.nome)} className="flex items-center gap-1.5 font-support text-sm font-medium hover:text-red-700 transition-colors opacity-70 hover:opacity-100" style={{ color: colors.brown }}><Trash2 size={15} /> Excluir</button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-1 lg:sticky lg:top-8 bg-white p-6 rounded-lg shadow-md border" style={{ borderColor: `${colors.gold}50` }}>
                <h2 className="font-support text-lg font-bold mb-4 border-b pb-3" style={{ color: colors.brown, borderColor: `${colors.gold}30` }}>
                  Resumo da Compra
                </h2>
                <div className="flex justify-between font-support text-sm font-medium mb-3 opacity-80" style={{ color: colors.brown }}>
                  <span>Itens ({qtdSelecionada}):</span>
                  <span>{subtotalCarrinho.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                </div>
                <div className="flex justify-between font-support text-sm font-medium mb-5 opacity-80 border-b pb-4" style={{ color: colors.brown, borderColor: `${colors.gold}30` }}>
                  <span>Frete:</span>
                  <span className="font-bold" style={{ color: colors.green }}>Calcular na Entrega</span>
                </div>
                <div className="flex justify-between items-end font-support mb-6">
                  <span className="text-base font-bold" style={{ color: colors.brown }}>Total:</span>
                  <span className="text-xl font-bold" style={{ color: colors.green }}>
                    {subtotalCarrinho.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>
                <button 
                  onClick={fecharPedido}
                  disabled={qtdSelecionada === 0}
                  className="w-full py-3.5 rounded-full font-support font-bold text-white transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:active:scale-100 disabled:cursor-not-allowed"
                  style={{ backgroundColor: colors.green }}
                >
                  Fechar pedido ({qtdSelecionada} {qtdSelecionada === 1 ? 'item' : 'itens'})
                </button>
              </div>

            </div>
          )}
        </div>
      )}

      {(abaAtiva === 'ativos' || abaAtiva === 'concluidos') && (
        <div className="space-y-6">
          
          {(abaAtiva === 'ativos' ? pedidosAtivos : pedidosConcluidos).length === 0 ? (
            <div className="text-center py-20 bg-white rounded-lg border border-dashed shadow-sm" style={{ borderColor: `${colors.gold}60` }}>
              <p className="font-support font-medium opacity-70 text-lg" style={{ color: colors.brown }}>
                Nenhum pedido nesta seção.
              </p>
            </div>
          ) : (
            (abaAtiva === 'ativos' ? pedidosAtivos : pedidosConcluidos).map((pedido) => {
              const idSeguro = String(pedido.id);
              const pagamentoSelecionado = metodosPagamento[pedido.id] || 'Pix';
              const isPago = pedido.pago || pedido.status === "Concluído";
              const codigoPixFake = `00020126580014br.gov.bcb.pix0136sabor-raiz-${idSeguro.replace('#', '')}-key5204000053039865802BR5910SaborRaiz6009Curitiba62070503***6304`;
              
              const isEnderecoPreenchido = pedido.entrega && pedido.entrega.trim() !== '';

              return (
                <div key={pedido.id} className="bg-white rounded-lg border shadow-sm p-4 sm:p-6 transition-all overflow-hidden relative" style={{ borderColor: `${colors.gold}40` }}>
                  
                  <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: pedido.status === "Concluído" ? colors.green : (!isPago ? colors.terracotta : colors.green) }} />

                  {/* Topo do Card */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 mb-4 pl-3" style={{ borderColor: `${colors.gold}20` }}>
                    <div className="flex gap-6">
                      <div>
                        <span className="font-support text-[10px] font-bold uppercase tracking-widest opacity-60" style={{ color: colors.brown }}>Pedido</span>
                        <h3 className="font-support text-sm font-bold mt-0.5" style={{ color: colors.brown }}>{pedido.id}</h3>
                      </div>
                      <div>
                        <span className="font-support text-[10px] font-bold uppercase tracking-widest opacity-60" style={{ color: colors.brown }}>Data</span>
                        <h3 className="font-support text-sm font-bold mt-0.5" style={{ color: colors.brown }}>{pedido.data}</h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-sm font-support text-[11px] font-bold uppercase tracking-wider self-start sm:self-auto"
                      style={{ 
                        backgroundColor: pedido.status === "Concluído" ? `${colors.green}15` : (!isPago ? `${colors.terracotta}15` : `${colors.green}15`),
                        color: pedido.status === "Concluído" ? colors.green : (!isPago ? colors.terracotta : colors.green)
                      }}
                    >
                      {pedido.status === "Concluído" ? <><CheckCircle2 size={12} /> Entregue</> : <><Clock size={12} /> {!isPago ? "Aguardando Pagamento" : pedido.status}</>}
                    </div>
                  </div>

                  {/* Corpo do Card */}
                  <div className="pl-3 grid grid-cols-1 md:grid-cols-12 gap-6">
                    
                    {/* Itens do Pedido */}
                    <div className="md:col-span-5">
                      <span className="font-support text-xs font-bold uppercase tracking-widest opacity-60 block mb-2" style={{ color: colors.brown }}>Itens do Pedido</span>
                      <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                        {pedido.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-gray-50 p-2 rounded border" style={{ borderColor: `${colors.gold}20` }}>
                            <div className="flex items-center gap-2">
                              <img src={item.imagem || pedido.imagemPrincipal} className="w-8 h-8 rounded object-cover border border-gray-200" alt={item.nome}/>
                              <span className="font-support text-xs" style={{ color: colors.brown }}><b>{item.qtd}x</b> {item.nome}</span>
                            </div>
                            <span className="font-support font-bold text-xs" style={{ color: colors.brown }}>
                              {(item.preco * item.qtd).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Endereço de Entrega */}
                    <div className="md:col-span-4 flex flex-col">
                      <div className="flex items-center gap-1.5 font-support text-xs font-bold uppercase tracking-widest opacity-80 mb-2" style={{ color: colors.brown }}>
                        <MapPin size={14} style={{ color: colors.terracotta }} /> Entrega
                      </div>
                      
                      <div className="flex-grow bg-[#F6EBD9]/30 p-3 rounded border" style={{ borderColor: `${colors.gold}30` }}>
                        {editandoEnderecoId === pedido.id ? (
                          <div className="space-y-2">
                            <textarea
                              value={enderecoTemporario}
                              onChange={(e) => setEnderecoTemporario(e.target.value)}
                              placeholder="Rua, Número, Bairro, Cidade..."
                              className="w-full p-2 font-support text-xs border rounded bg-white focus:outline-none"
                              style={{ borderColor: colors.gold }}
                              rows="3"
                            />
                            <div className="flex gap-2">
                              <button onClick={() => salvarEndereco(pedido.id)} disabled={!enderecoTemporario.trim()} className="px-3 py-1.5 font-support text-[10px] font-bold uppercase tracking-wider text-white rounded disabled:opacity-50" style={{ backgroundColor: colors.green }}>Salvar</button>
                              <button onClick={() => setEditandoEnderecoId(null)} className="px-3 py-1.5 font-support text-[10px] font-bold uppercase tracking-wider border rounded bg-white" style={{ color: colors.brown, borderColor: colors.brown }}>Cancelar</button>
                            </div>
                          </div>
                        ) : (
                          <div className="h-full flex flex-col justify-center">
                            {!isEnderecoPreenchido ? (
                              <div className="text-center py-2">
                                <AlertCircle size={20} className="mx-auto mb-1 opacity-70" style={{ color: colors.terracotta }} />
                                <p className="font-support text-xs font-bold mb-2" style={{ color: colors.terracotta }}>Endereço pendente</p>
                                <button onClick={() => { setEditandoEnderecoId(pedido.id); setEnderecoTemporario(''); }} className="font-support text-xs font-bold underline transition-colors" style={{ color: colors.brown }}>
                                  Adicionar Endereço
                                </button>
                              </div>
                            ) : (
                              <>
                                <p className="font-support text-xs font-medium leading-relaxed" style={{ color: colors.brown }}>{pedido.entrega}</p>
                                {!isPago && (
                                  <button onClick={() => { setEditandoEnderecoId(pedido.id); setEnderecoTemporario(pedido.entrega); }} className="font-support text-[10px] font-bold underline mt-2 text-left" style={{ color: colors.terracotta }}>
                                    Alterar Endereço
                                  </button>
                                )}
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Pagamento e Prazo (Atualizado) */}
                    <div className="md:col-span-3 flex flex-col">
                      <div className="mb-4">
                        <div className="font-support text-xs font-bold uppercase tracking-widest opacity-80 mb-1" style={{ color: colors.brown }}>Previsão de Entrega</div>
                        <p className="font-support text-xs font-bold" style={{ color: colors.green }}>
                          {/* Modificado aqui: Exibe o prazo se o endereço for preenchido, antes mesmo do pagamento */}
                          {!isEnderecoPreenchido ? "Insira o endereço" : (pedido.status === "Concluído" ? "Entregue!" : obterPrazoAleatorio(pedido.id))}
                        </p>
                      </div>

                      <div className="flex-grow">
                        <div className="flex items-center gap-1.5 font-support text-xs font-bold uppercase tracking-widest opacity-80 mb-2" style={{ color: colors.brown }}>
                          <CreditCard size={14} style={{ color: colors.green }} /> Pagamento
                        </div>
                        <div className="flex gap-1.5 flex-wrap">
                          {['Pix', 'Cartão', 'Boleto'].map(metodo => (
                            <button
                              key={metodo}
                              onClick={() => selecionarPagamento(pedido.id, metodo)}
                              disabled={isPago || !isEnderecoPreenchido}
                              className={`font-support text-[10px] font-bold px-2.5 py-1.5 border uppercase tracking-widest rounded transition-all ${
                                pagamentoSelecionado === metodo ? 'shadow-inner' : 'opacity-60 bg-white hover:opacity-100'
                              }`}
                              style={{ 
                                backgroundColor: pagamentoSelecionado === metodo ? colors.brown : 'white',
                                color: pagamentoSelecionado === metodo ? colors.cream : colors.brown,
                                borderColor: colors.brown,
                                cursor: (isPago || !isEnderecoPreenchido) ? 'not-allowed' : 'pointer'
                              }}
                            >
                              {metodo}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* QR Code Pix Condicional */}
                  {!isPago && pagamentoSelecionado === 'Pix' && isEnderecoPreenchido && (
                    <div className="ml-3 mt-4 bg-white border rounded p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm" style={{ borderColor: `${colors.gold}60` }}>
                      <div className="text-left w-full sm:w-auto">
                        <p className="font-support text-xs font-bold mb-2" style={{ color: colors.brown }}>Escaneie ou copie o código Pix:</p>
                        <div className="flex items-center gap-2 max-w-sm">
                          <input type="text" readOnly value={codigoPixFake} className="font-support text-[10px] w-full p-2 bg-gray-50 border border-gray-200 rounded text-gray-500 overflow-hidden whitespace-nowrap text-ellipsis"/>
                          <button onClick={() => copiarPix(codigoPixFake, pedido.id)} className="p-2 border rounded transition-colors bg-gray-50" style={{ borderColor: colors.gold }}>
                            {codigoCopiado === pedido.id ? <Check size={14} className="text-green-600" /> : <Copy size={14} style={{ color: colors.brown }} />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex-shrink-0">
                        {exibirQrCodeId === pedido.id ? (
                          <div className="p-1.5 bg-white border rounded">
                            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&color=2f5d50&data=${encodeURIComponent(codigoPixFake)}`} alt="QR Code Pix" className="w-20 h-20"/>
                          </div>
                        ) : (
                          <button onClick={() => setExibirQrCodeId(pedido.id)} className="px-3 py-2 font-support text-[10px] font-bold uppercase tracking-wider text-white rounded transition-opacity hover:opacity-90 flex items-center gap-1.5" style={{ backgroundColor: colors.green }}>
                            <QrCode size={14} /> Mostrar QR
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Rodapé do Card */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-5 pt-4 pl-3 border-t bg-gray-50/50 -mx-4 sm:-mx-6 -mb-4 sm:-mb-6 px-4 sm:px-6 pb-4 sm:pb-6" style={{ borderColor: `${colors.gold}20` }}>
                    <div className="w-full sm:w-auto text-center sm:text-left mt-2">
                      <span className="font-support text-xs font-bold uppercase tracking-widest opacity-60 block mb-0.5" style={{ color: colors.brown }}>Total a Pagar</span>
                      <span className="font-support text-2xl font-bold tracking-tight" style={{ color: colors.green }}>
                        {pedido.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </span>
                    </div>

                    <div className="w-full sm:w-auto mt-2">
                      {!isPago ? (
                        <button 
                          onClick={() => realizarPagamento(pedido.id)} 
                          disabled={!isEnderecoPreenchido}
                          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 font-support text-xs font-bold uppercase tracking-wider text-white rounded shadow-sm active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100" 
                          style={{ backgroundColor: colors.terracotta }}
                        >
                          Confirmar Pagamento <ChevronRight size={16} />
                        </button>
                      ) : (
                        pedido.status !== "Concluído" && (
                          <button onClick={() => marcarComoConcluido(pedido.id)} className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 font-support text-xs font-bold uppercase tracking-wider text-white rounded shadow-sm active:scale-95 transition-all" style={{ backgroundColor: colors.green }}>
                            Recebi o Pedido <CheckCircle2 size={16} />
                          </button>
                        )
                      )}
                    </div>
                  </div>

                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}