import React, { useEffect, useState } from 'react';
import styles from './Catalogo.module.css';
import { listarProdutos } from './services/api';

export default function Catalogo({ adicionarAoPedido, categoriaInicial = 'todos' }) {
  const [categoriaAtiva, setCategoriaAtiva] = useState(categoriaInicial);
  const [produtos, setProdutos] = useState([]);

  const categorias = [
    { id: 'todos', nome: 'Todos os Produtos' },
    { id: 'cestas', nome: 'Cestas Prontas' },
    { id: 'produtos', nome: 'Produtos Regionais' },
    { id: 'cestas_personalizadas', nome: 'Cestas Personalizadas' }
  ];

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const dados = await listarProdutos();
        setProdutos(dados);
      } catch (error) {
        console.error(error);
      }
    }

    carregarProdutos();
  }, []);

  const produtosFiltrados = categoriaAtiva === 'todos'
    ? produtos
    : produtos.filter((p) => p.categoria === categoriaAtiva);

  return (
    <div className={styles.catalogoContainer}>
      <header className={styles.header}>
        <span className={styles.subtitulo}>Sabores que contam histórias</span>
        <h1 className={styles.titulo}>Nosso Catálogo</h1>
        <p className={styles.descricaoBreve}>
          Explore nossa seleção de produtos artesanais feitos com carinho, 
          valorizando o pequeno produtor e a tradição regional.
        </p>
      </header>

      <nav className={styles.filtros}>
        {categorias.map(cat => (
          <button
            key={cat.id}
            className={`${styles.botaoFiltro} ${categoriaAtiva === cat.id ? styles.ativo : ''}`}
            onClick={() => setCategoriaAtiva(cat.id)}
          >
            {cat.nome}
          </button>
        ))}
      </nav>

      <main className={styles.gridProdutos}>
        {produtosFiltrados.map(produto => (
          <article key={produto.id} className={styles.cardProduto}>
            <div className={styles.wrapperImagem}>
              <img src={produto.imagem} alt={produto.nome} className={styles.imagem} />
            </div>
            <div className={styles.infoProduto}>
              <h3 className={styles.nomeProduto}>{produto.nome}</h3>
              <p className={styles.descricaoProduto}>{produto.descricao}</p>
              <div className={styles.footerCard}>
                <span className={styles.preco}>
                  {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
                <button 
                  className={styles.botaoAdicionar}
                  onClick={() => adicionarAoPedido(produto)}
                >
                  Adicionar
                </button>
              </div>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}