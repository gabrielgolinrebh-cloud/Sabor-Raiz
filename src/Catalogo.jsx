import React, { useState } from 'react';
import styles from './Catalogo.module.css';

const PRODUTOS_MOCK = [
  {
    id: 1,
    nome: "Cesta Café Regional Premium",
    categoria: "cestas",
    preco: 189.90,
    descricao: "Café artesanal torrado, queijo meia cura, geleia de frutas vermelhas e biscoitos caseiros.",
    imagem: "https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&q=80&w=400"
  },    
  {
    id: 2,
    nome: "Queijo Artesanal Canastra",
    categoria: "produtos",
    preco: 64.90,
    descricao: "Queijo maturado de produção local, com sabor marcante e textura macia.",
    imagem: "https://images.unsplash.com/photo-1486297678162-ad2a14b34897?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 3,
    nome: "Mel de Flores Silvestres",
    categoria: "produtos",
    preco: 32.00,
    descricao: "Mel 100% puro e orgânico, colhido de forma sustentável por pequenos produtores.",
    imagem: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 4,
    nome: "Cesta Afeto e Tradição",
    categoria: "cestas",
    preco: 245.00,
    descricao: "Perfeita para presentes: mix de doces artesanais, vinhos da região e castanhas selecionadas.",
    imagem: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 5,
    nome: "Doce de Leite na Palha",
    categoria: "produtos",
    preco: 18.50,
    descricao: "Doce de leite tradicional cremoso, receita secular com menos açúcar.",
    imagem: "https://images.unsplash.com/photo-1548848221-0c2e497ed557?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 6,
    nome: "Cesta Personalizada Celebração",
    categoria: "cestas_personalizadas",
    preco: 310.00,
    descricao: "Monte com os itens favoritos do cliente. Inclui embalagem especial em vime.",
    imagem: "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=400"
  }
];

export default function Catalogo({ adicionarAoPedido }) {
  const [categoriaAtiva, setCategoriaAtiva] = useState('todos');

  const categorias = [
    { id: 'todos', nome: 'Todos os Produtos' },
    { id: 'cestas', nome: 'Cestas Prontas' },
    { id: 'produtos', nome: 'Produtos Regionais' },
    { id: 'cestas_personalizadas', nome: 'Cestas Personalizadas' }
  ];

  const produtosFiltrados = categoriaAtiva === 'todos' 
    ? PRODUTOS_MOCK 
    : PRODUTOS_MOCK.filter(p => p.categoria === categoriaAtiva);

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