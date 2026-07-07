import React, { useEffect, useState } from 'react';
import { Plus, Trash2, ArrowLeft, UserPlus, ShoppingCart } from 'lucide-react';
import {
  adicionarProduto,
  criarUsuarioAdmin,
  listarCarrinhoAdmin,
  listarProdutos,
  listarUsuarios,
  removerItemCarrinhoAdmin,
  removerProduto,
  removerUsuario,
} from './services/api';

export default function AreaAdmin({ colors, usuario, onVoltar }) {
  const [produtos, setProdutos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [itensCarrinho, setItensCarrinho] = useState([]);
  const [formProduto, setFormProduto] = useState({ nome: '', categoria: 'produtos', preco: '', descricao: '', imagem: '', usuarioId: '' });
  const [formUsuario, setFormUsuario] = useState({ nome: '', email: '', senha: '', role: 'admin' });
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [cardsVisiveis, setCardsVisiveis] = useState({ produto: false, usuario: false, produtos: false, carrinho: false, usuarios: false });

  const carregarDados = async () => {
    try {
      const [produtosResp, usuariosResp, carrinhoResp] = await Promise.allSettled([
        listarProdutos(),
        listarUsuarios(),
        listarCarrinhoAdmin(),
      ]);

      const produtosCarregados = produtosResp.status === 'fulfilled' ? produtosResp.value : [];
      const usuariosCarregados = usuariosResp.status === 'fulfilled' ? usuariosResp.value : [];
      const carrinhoCarregado = carrinhoResp.status === 'fulfilled' ? carrinhoResp.value : [];

      setProdutos(produtosCarregados);
      setUsuarios(usuariosCarregados);
      setItensCarrinho(carrinhoCarregado);

      const falhas = [produtosResp, usuariosResp, carrinhoResp]
        .filter((resultado) => resultado.status === 'rejected')
        .map((resultado) => resultado.reason?.message || 'Erro desconhecido');

      if (falhas.length > 0) {
        setErro(falhas.join(' • '));
      } else {
        setErro('');
      }
    } catch (error) {
      setErro(error.message);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const toggleCard = (chave) => {
    setCardsVisiveis((estadoAnterior) => ({
      ...estadoAnterior,
      [chave]: !estadoAnterior[chave],
    }));
  };

  const handleProdutoSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    try {
      const payload = {
        ...formProduto,
        preco: Number(formProduto.preco),
        usuarioId: formProduto.usuarioId ? Number(formProduto.usuarioId) : null,
      };
      const resposta = await adicionarProduto(payload);
      if (resposta.success) {
        setSucesso('Produto adicionado com sucesso.');
        setFormProduto({ nome: '', categoria: 'produtos', preco: '', descricao: '', imagem: '', usuarioId: '' });
        carregarDados();
      }
    } catch (error) {
      setErro(error.message);
    }
  };

  const handleUsuarioSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    try {
      const resposta = await criarUsuarioAdmin(formUsuario);
      if (resposta.success) {
        setSucesso('Usuário criado com sucesso.');
        setFormUsuario({ nome: '', email: '', senha: '', role: 'admin' });
        carregarDados();
      }
    } catch (error) {
      setErro(error.message);
    }
  };

  const removerProdutoLocal = async (id) => {
    try {
      await removerProduto(id);
      setSucesso('Produto removido.');
      carregarDados();
    } catch (error) {
      setErro(error.message);
    }
  };

  const removerUsuarioLocal = async (id) => {
    try {
      await removerUsuario(id);
      setSucesso('Usuário removido.');
      carregarDados();
    } catch (error) {
      setErro(error.message);
    }
  };

  const removerItemCarrinhoLocal = async (userId, productId) => {
    try {
      await removerItemCarrinhoAdmin(userId, productId);
      setSucesso('Item removido do carrinho.');
      carregarDados();
    } catch (error) {
      setErro(error.message);
    }
  };

  if (usuario?.role !== 'admin') {
    return (
      <div style={{ backgroundColor: colors.cream, minHeight: '100vh', color: colors.brown, padding: '2rem' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', backgroundColor: '#fff', borderRadius: '12px', padding: '2rem', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h2 style={{ color: colors.terracotta, marginBottom: '0.5rem' }}>Acesso restrito</h2>
          <p>Esta área é exclusiva para administradores do Sabor Raiz.</p>
          <button onClick={onVoltar} style={{ marginTop: '1rem', backgroundColor: colors.green, color: '#fff', border: 'none', padding: '0.75rem 1rem', borderRadius: '6px', cursor: 'pointer' }}>
            <ArrowLeft size={16} style={{ display: 'inline', marginRight: '0.35rem' }} /> Voltar ao site
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: colors.cream, minHeight: '100vh', color: colors.brown, padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gap: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ color: colors.green, marginBottom: '0.25rem' }}>Área Admin</h2>
            <p>Gerencie cadastros, produtos, donos dos itens e carrinhos do site.</p>
          </div>
          <button onClick={onVoltar} style={{ backgroundColor: colors.green, color: '#fff', border: 'none', padding: '0.7rem 1rem', borderRadius: '6px', cursor: 'pointer' }}>
            <ArrowLeft size={16} style={{ display: 'inline', marginRight: '0.35rem' }} /> Voltar
          </button>
        </div>

        {erro && <div style={{ backgroundColor: '#fff1f0', color: colors.terracotta, padding: '0.8rem 1rem', borderRadius: '6px' }}>{erro}</div>}
        {sucesso && <div style={{ backgroundColor: '#f2fff4', color: colors.green, padding: '0.8rem 1rem', borderRadius: '6px' }}>{sucesso}</div>}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <button type="button" onClick={() => toggleCard('produto')} style={{ backgroundColor: colors.terracotta, color: '#fff', border: 'none', padding: '0.75rem 1rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Plus size={16} /> Adicionar produto
          </button>
          <button type="button" onClick={() => toggleCard('usuario')} style={{ backgroundColor: colors.green, color: '#fff', border: 'none', padding: '0.75rem 1rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <UserPlus size={16} /> Criar usuário
          </button>
          <button type="button" onClick={() => toggleCard('produtos')} style={{ backgroundColor: '#fff', color: colors.brown, border: '1px solid #ddd', padding: '0.75rem 1rem', borderRadius: '6px', cursor: 'pointer' }}>
            Produtos cadastrados
          </button>
          <button type="button" onClick={() => toggleCard('carrinho')} style={{ backgroundColor: '#fff', color: colors.brown, border: '1px solid #ddd', padding: '0.75rem 1rem', borderRadius: '6px', cursor: 'pointer' }}>
            Itens no carrinho
          </button>
          <button type="button" onClick={() => toggleCard('usuarios')} style={{ backgroundColor: '#fff', color: colors.brown, border: '1px solid #ddd', padding: '0.75rem 1rem', borderRadius: '6px', cursor: 'pointer' }}>
            Usuários cadastrados
          </button>
        </div>

        {cardsVisiveis.produto && (
          <section style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <h3 style={{ color: colors.green, marginBottom: '1rem' }}>Adicionar produto</h3>
            <form onSubmit={handleProdutoSubmit} style={{ display: 'grid', gap: '0.75rem' }}>
              <input value={formProduto.nome} onChange={(e) => setFormProduto({ ...formProduto, nome: e.target.value })} placeholder="Nome" required style={{ padding: '0.7rem', border: '1px solid #ddd', borderRadius: '6px' }} />
              <input value={formProduto.categoria} onChange={(e) => setFormProduto({ ...formProduto, categoria: e.target.value })} placeholder="Categoria" required style={{ padding: '0.7rem', border: '1px solid #ddd', borderRadius: '6px' }} />
              <input value={formProduto.preco} onChange={(e) => setFormProduto({ ...formProduto, preco: e.target.value })} type="number" step="0.01" placeholder="Preço" required style={{ padding: '0.7rem', border: '1px solid #ddd', borderRadius: '6px' }} />
              <select value={formProduto.usuarioId} onChange={(e) => setFormProduto({ ...formProduto, usuarioId: e.target.value })} style={{ padding: '0.7rem', border: '1px solid #ddd', borderRadius: '6px' }}>
                <option value="">Associar a um usuário (opcional)</option>
                {usuarios.map((usuarioItem) => (
                  <option key={usuarioItem.id} value={usuarioItem.id}>{usuarioItem.nome} ({usuarioItem.role})</option>
                ))}
              </select>
              <input value={formProduto.imagem} onChange={(e) => setFormProduto({ ...formProduto, imagem: e.target.value })} placeholder="URL da imagem" style={{ padding: '0.7rem', border: '1px solid #ddd', borderRadius: '6px' }} />
              <textarea value={formProduto.descricao} onChange={(e) => setFormProduto({ ...formProduto, descricao: e.target.value })} placeholder="Descrição" rows="3" style={{ padding: '0.7rem', border: '1px solid #ddd', borderRadius: '6px' }} />
              <button type="submit" style={{ backgroundColor: colors.terracotta, color: '#fff', border: 'none', padding: '0.8rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                <Plus size={16} /> Adicionar produto
              </button>
            </form>
          </section>
        )}

        {cardsVisiveis.usuario && (
          <section style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <h3 style={{ color: colors.green, marginBottom: '1rem' }}>Criar usuário</h3>
            <form onSubmit={handleUsuarioSubmit} style={{ display: 'grid', gap: '0.75rem' }}>
              <input value={formUsuario.nome} onChange={(e) => setFormUsuario({ ...formUsuario, nome: e.target.value })} placeholder="Nome" required style={{ padding: '0.7rem', border: '1px solid #ddd', borderRadius: '6px' }} />
              <input value={formUsuario.email} onChange={(e) => setFormUsuario({ ...formUsuario, email: e.target.value })} placeholder="E-mail" type="email" required style={{ padding: '0.7rem', border: '1px solid #ddd', borderRadius: '6px' }} />
              <input value={formUsuario.senha} onChange={(e) => setFormUsuario({ ...formUsuario, senha: e.target.value })} placeholder="Senha" type="password" required style={{ padding: '0.7rem', border: '1px solid #ddd', borderRadius: '6px' }} />
              <select value={formUsuario.role} onChange={(e) => setFormUsuario({ ...formUsuario, role: e.target.value })} style={{ padding: '0.7rem', border: '1px solid #ddd', borderRadius: '6px' }}>
                <option value="admin">Funcionário</option>
              </select>
              <button type="submit" style={{ backgroundColor: colors.green, color: '#fff', border: 'none', padding: '0.8rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                <UserPlus size={16} /> Criar usuário
              </button>
            </form>
          </section>
        )}

        {cardsVisiveis.produtos && (
          <section style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <h3 style={{ color: colors.green, marginBottom: '1rem' }}>Produtos cadastrados</h3>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {produtos.map((produto) => (
                <div key={produto.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', border: '1px solid #eee', padding: '0.85rem', borderRadius: '8px' }}>
                  <div>
                    <strong>{produto.nome}</strong>
                    <div style={{ color: '#666', fontSize: '0.9rem' }}>
                      {produto.categoria} • R$ {Number(produto.preco).toFixed(2)} • {produto.usuario_nome || 'Sem dono'}
                    </div>
                  </div>
                  <button onClick={() => removerProdutoLocal(produto.id)} style={{ border: 'none', backgroundColor: colors.terracotta, color: '#fff', padding: '0.55rem 0.75rem', borderRadius: '6px', cursor: 'pointer' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {cardsVisiveis.carrinho && (
          <section style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <h3 style={{ color: colors.green, marginBottom: '1rem' }}>Itens no carrinho</h3>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {itensCarrinho.map((item) => (
                <div key={`${item.usuario_id}-${item.produto_id}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', border: '1px solid #eee', padding: '0.85rem', borderRadius: '8px' }}>
                  <div>
                    <strong>{item.produto_nome}</strong>
                    <div style={{ color: '#666', fontSize: '0.9rem' }}>
                      {item.usuario_nome} • qtd {item.quantidade} • R$ {Number(item.preco).toFixed(2)}
                    </div>
                  </div>
                  <button onClick={() => removerItemCarrinhoLocal(item.usuario_id, item.produto_id)} style={{ border: 'none', backgroundColor: colors.terracotta, color: '#fff', padding: '0.55rem 0.75rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <ShoppingCart size={14} /> Remover
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {cardsVisiveis.usuarios && (
          <section style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <h3 style={{ color: colors.green, marginBottom: '1rem' }}>Usuários cadastrados</h3>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {usuarios.filter((u) => u.id !== usuario?.id).map((usuarioItem) => (
                <div key={usuarioItem.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', border: '1px solid #eee', padding: '0.85rem', borderRadius: '8px' }}>
                  <div>
                    <strong>{usuarioItem.nome}</strong>
                    <div style={{ color: '#666', fontSize: '0.9rem' }}>{usuarioItem.email} • {usuarioItem.role}</div>
                  </div>
                  <button onClick={() => removerUsuarioLocal(usuarioItem.id)} style={{ border: 'none', backgroundColor: colors.terracotta, color: '#fff', padding: '0.55rem 0.75rem', borderRadius: '6px', cursor: 'pointer' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
