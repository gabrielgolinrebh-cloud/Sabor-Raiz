import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import pool from './db.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const hashPassword = (senha) => crypto.createHash('sha256').update(senha).digest('hex');

const createTables = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(120) NOT NULL,
      email VARCHAR(160) NOT NULL UNIQUE,
      senha VARCHAR(255) NOT NULL,
      role VARCHAR(20) NOT NULL DEFAULT 'cliente',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  try {
    await pool.query('ALTER TABLE usuarios ADD COLUMN role VARCHAR(20) NOT NULL DEFAULT "cliente"');
  } catch (error) {
    if (!String(error.message).includes('Duplicate column')) {
      console.warn('Aviso ao ajustar coluna role:', error.message);
    }
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(160) NOT NULL,
      categoria VARCHAR(80) NOT NULL,
      preco DECIMAL(10,2) NOT NULL,
      descricao TEXT,
      imagem TEXT,
      usuario_id INT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  try {
    await pool.query('ALTER TABLE produtos MODIFY COLUMN imagem TEXT NULL');
  } catch (error) {
    if (!String(error.message).includes('Unknown column') && !String(error.message).includes('Incorrect column name')) {
      console.warn('Aviso ao ajustar coluna imagem:', error.message);
    }
  }

  try {
    await pool.query('ALTER TABLE produtos ADD COLUMN usuario_id INT NULL');
  } catch (error) {
    if (!String(error.message).includes('Duplicate column')) {
      console.warn('Aviso ao ajustar coluna usuario_id:', error.message);
    }
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS carrinho (
      id INT AUTO_INCREMENT PRIMARY KEY,
      usuario_id INT NOT NULL,
      produto_id INT NOT NULL,
      quantidade INT NOT NULL DEFAULT 1,
      added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
      FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE,
      UNIQUE KEY unique_cart_item (usuario_id, produto_id)
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS pedidos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      usuario_id INT NOT NULL,
      status VARCHAR(40) NOT NULL DEFAULT 'Em preparação',
      total DECIMAL(10,2) NOT NULL,
      endereco VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS itens_pedido (
      id INT AUTO_INCREMENT PRIMARY KEY,
      pedido_id INT NOT NULL,
      produto_id INT NOT NULL,
      quantidade INT NOT NULL,
      preco DECIMAL(10,2) NOT NULL,
      FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
      FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE
    )
  `);

  const [existingAdminRows] = await pool.query('SELECT id FROM usuarios WHERE email = ?', ['admin@saborraiz.com']);
  if (existingAdminRows.length === 0) {
    await pool.query(
      'INSERT INTO usuarios (nome, email, senha, role) VALUES (?, ?, ?, ?)',
      ['Administrador', 'admin@saborraiz.com', hashPassword('admin123'), 'admin']
    );
  } else {
    await pool.query(
      'UPDATE usuarios SET senha = ?, role = ? WHERE email = ?',
      [hashPassword('admin123'), 'admin', 'admin@saborraiz.com']
    );
  }

  const [countRows] = await pool.query('SELECT COUNT(*) AS total FROM produtos');
  if (countRows[0].total === 0) {
    const produtosIniciais = [
      {
        nome: 'Cesta Café Regional Premium',
        categoria: 'cestas',
        preco: 189.90,
        descricao: 'Café artesanal torrado, queijo meia cura, geleia e biscoitos caseiros.',
        imagem: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&q=80&w=400',
      },
      {
        nome: 'Queijo Artesanal Canastra',
        categoria: 'produtos',
        preco: 64.90,
        descricao: 'Queijo maturado de produção local, com sabor marcante e textura macia.',
        imagem: 'https://images.unsplash.com/photo-1486297678162-ad2a14b34897?auto=format&fit=crop&q=80&w=400',
      },
      {
        nome: 'Mel de Flores Silvestres',
        categoria: 'produtos',
        preco: 32.00,
        descricao: 'Mel 100% puro e orgânico, colhido de forma sustentável.',
        imagem: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=400',
      },
      {
        nome: 'Cesta Afeto e Tradição',
        categoria: 'cestas',
        preco: 245.00,
        descricao: 'Mix de doces artesanais, vinhos da região e castanhas selecionadas.',
        imagem: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400',
      },
      {
        nome: 'Doce de Leite na Palha',
        categoria: 'produtos',
        preco: 18.50,
        descricao: 'Doce de leite tradicional cremoso, receita secular com menos açúcar.',
        imagem: 'https://images.unsplash.com/photo-1548848221-0c2e497ed557?auto=format&fit=crop&q=80&w=400',
      },
      {
        nome: 'Cesta Personalizada Celebração',
        categoria: 'cestas_personalizadas',
        preco: 310.00,
        descricao: 'Monte com os itens favoritos do cliente e embalagem especial em vime.',
        imagem: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=400',
      },
    ];

    const [adminRows] = await pool.query('SELECT id FROM usuarios WHERE role = ? LIMIT 1', ['admin']);
    const ownerId = adminRows[0]?.id || null;

    for (const produto of produtosIniciais) {
      await pool.query(
        'INSERT INTO produtos (nome, categoria, preco, descricao, imagem, usuario_id) VALUES (?, ?, ?, ?, ?, ?)',
        [produto.nome, produto.categoria, produto.preco, produto.descricao, produto.imagem, ownerId]
      );
    }
  }
};

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.post('/api/auth/register', async (req, res) => {
  try {
    const { nome, email, senha, role } = req.body;
    if (!nome || !email || !senha) {
      return res.status(400).json({ success: false, error: 'Nome, e-mail e senha são obrigatórios.' });
    }

    const [existing] = await pool.query('SELECT id FROM usuarios WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ success: false, error: 'Este e-mail já está cadastrado.' });
    }

    const senhaHash = hashPassword(senha);
    const [result] = await pool.query(
      'INSERT INTO usuarios (nome, email, senha, role) VALUES (?, ?, ?, ?)',
      [nome, email, senhaHash, role || 'cliente']
    );

    const [users] = await pool.query('SELECT id, nome, email, role FROM usuarios WHERE id = ?', [result.insertId]);
    res.json({ success: true, user: users[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Erro ao cadastrar usuário.' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(400).json({ success: false, error: 'E-mail e senha são obrigatórios.' });
    }

    const [rows] = await pool.query('SELECT id, nome, email, role, senha FROM usuarios WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ success: false, error: 'Credenciais inválidas.' });
    }

    const usuario = rows[0];
    if (usuario.senha !== hashPassword(senha)) {
      return res.status(401).json({ success: false, error: 'Credenciais inválidas.' });
    }

    const { senha: _senha, ...dadosUsuario } = usuario;
    res.json({ success: true, user: dadosUsuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Erro ao fazer login.' });
  }
});

app.get('/api/produtos', async (_req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT p.*, u.nome AS usuario_nome
       FROM produtos p
       LEFT JOIN usuarios u ON u.id = p.usuario_id
       ORDER BY p.id DESC`
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar produtos.' });
  }
});

app.post('/api/produtos', async (req, res) => {
  try {
    const { nome, categoria, preco, descricao, imagem, usuarioId, usuario_id } = req.body;
    if (!nome || !categoria || !preco) {
      return res.status(400).json({ error: 'Nome, categoria e preço são obrigatórios.' });
    }

    const ownerId = usuarioId ?? usuario_id ?? null;
    const [result] = await pool.query(
      'INSERT INTO produtos (nome, categoria, preco, descricao, imagem, usuario_id) VALUES (?, ?, ?, ?, ?, ?)',
      [nome, categoria, preco, descricao || '', imagem || '', ownerId]
    );

    const [rows] = await pool.query(
      `SELECT p.*, u.nome AS usuario_nome
       FROM produtos p
       LEFT JOIN usuarios u ON u.id = p.usuario_id
       WHERE p.id = ?`,
      [result.insertId]
    );
    res.status(201).json({ success: true, produto: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao adicionar produto.' });
  }
});

app.put('/api/produtos/:id', async (req, res) => {
  try {
    const { nome, categoria, preco, descricao, imagem, usuarioId, usuario_id } = req.body;
    if (!nome || !categoria || !preco) {
      return res.status(400).json({ error: 'Nome, categoria e preço são obrigatórios.' });
    }

    const ownerId = usuarioId ?? usuario_id ?? null;
    await pool.query(
      'UPDATE produtos SET nome = ?, categoria = ?, preco = ?, descricao = ?, imagem = ?, usuario_id = ? WHERE id = ?',
      [nome, categoria, preco, descricao || '', imagem || '', ownerId, req.params.id]
    );

    const [rows] = await pool.query(
      `SELECT p.*, u.nome AS usuario_nome
       FROM produtos p
       LEFT JOIN usuarios u ON u.id = p.usuario_id
       WHERE p.id = ?`,
      [req.params.id]
    );

    res.json({ success: true, produto: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar produto.' });
  }
});

app.delete('/api/produtos/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM produtos WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao remover produto.' });
  }
});

app.get('/api/carrinho/:userId', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT c.id, c.quantidade, c.produto_id, p.nome, p.categoria, p.preco, p.descricao, p.imagem, c.added_at
       FROM carrinho c
       JOIN produtos p ON p.id = c.produto_id
       WHERE c.usuario_id = ?
       ORDER BY c.added_at DESC`,
      [req.params.userId]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar carrinho.' });
  }
});

app.post('/api/carrinho/:userId/add', async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    if (!productId) {
      return res.status(400).json({ error: 'produto inválido.' });
    }

    await pool.query(
      `INSERT INTO carrinho (usuario_id, produto_id, quantidade)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE quantidade = quantidade + VALUES(quantidade)`,
      [req.params.userId, productId, quantity]
    );

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao registrar item no carrinho.' });
  }
});

app.delete('/api/carrinho/:userId/remove/:productId', async (req, res) => {
  try {
    await pool.query('DELETE FROM carrinho WHERE usuario_id = ? AND produto_id = ?', [req.params.userId, req.params.productId]);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao remover item do carrinho.' });
  }
});

app.get('/api/admin/usuarios', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, nome, email, role FROM usuarios ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar usuários.' });
  }
});

app.post('/api/admin/usuarios', async (req, res) => {
  try {
    const { nome, email, senha, role = 'cliente' } = req.body;
    if (!nome || !email || !senha) {
      return res.status(400).json({ error: 'Dados incompletos para criar usuário.' });
    }

    const [result] = await pool.query(
      'INSERT INTO usuarios (nome, email, senha, role) VALUES (?, ?, ?, ?)',
      [nome, email, hashPassword(senha), role]
    );

    const [rows] = await pool.query('SELECT id, nome, email, role FROM usuarios WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, usuario: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar usuário.' });
  }
});

app.put('/api/admin/usuarios/:id', async (req, res) => {
  try {
    const { nome, email, senha, role = 'cliente' } = req.body;
    if (!nome || !email) {
      return res.status(400).json({ error: 'Nome e e-mail são obrigatórios.' });
    }

    if (senha) {
      await pool.query(
        'UPDATE usuarios SET nome = ?, email = ?, senha = ?, role = ? WHERE id = ?',
        [nome, email, hashPassword(senha), role, req.params.id]
      );
    } else {
      await pool.query(
        'UPDATE usuarios SET nome = ?, email = ?, role = ? WHERE id = ?',
        [nome, email, role, req.params.id]
      );
    }

    const [rows] = await pool.query('SELECT id, nome, email, role FROM usuarios WHERE id = ?', [req.params.id]);
    res.json({ success: true, usuario: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar usuário.' });
  }
});

app.delete('/api/admin/usuarios/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM usuarios WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao remover usuário.' });
  }
});

app.get('/api/admin/carrinho', async (_req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT c.id, c.usuario_id, u.nome AS usuario_nome, c.produto_id, p.nome AS produto_nome, p.preco, c.quantidade, c.added_at
       FROM carrinho c
       JOIN usuarios u ON u.id = c.usuario_id
       JOIN produtos p ON p.id = c.produto_id
       ORDER BY c.added_at DESC`
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar carrinho administrativo.' });
  }
});

app.delete('/api/admin/carrinho/:userId/:productId', async (req, res) => {
  try {
    await pool.query('DELETE FROM carrinho WHERE usuario_id = ? AND produto_id = ?', [req.params.userId, req.params.productId]);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao remover item do carrinho.' });
  }
});

const startServer = async () => {
  try {
    await createTables();
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
  }
};

startServer();