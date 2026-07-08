const API_BASE_URL = 'http://localhost:3000/api';

async function request(path, options = {}) {
  const resposta = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const dados = await resposta.json().catch(() => ({}));

  if (!resposta.ok) {
    throw new Error(dados.error || 'Erro ao comunicar com a API');
  }

  return dados;
}

export async function registrarUsuario(payload) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function loginUsuario(payload) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function listarProdutos() {
  return request('/produtos');
}

export async function adicionarProduto(produto) {
  return request('/produtos', {
    method: 'POST',
    body: JSON.stringify(produto),
  });
}

export async function atualizarProduto(id, produto) {
  return request(`/produtos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(produto),
  });
}

export async function removerProduto(id) {
  return request(`/produtos/${id}`, {
    method: 'DELETE',
  });
}

export async function listarCarrinho(userId) {
  return request(`/carrinho/${userId}`);
}

export async function adicionarAoCarrinho(userId, productId, quantity = 1) {
  return request(`/carrinho/${userId}/add`, {
    method: 'POST',
    body: JSON.stringify({ productId, quantity }),
  });
}

export async function removerDoCarrinho(userId, productId) {
  return request(`/carrinho/${userId}/remove/${productId}`, {
    method: 'DELETE',
  });
}

export async function listarUsuarios() {
  return request('/admin/usuarios');
}

export async function criarUsuarioAdmin(payload) {
  return request('/admin/usuarios', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function atualizarUsuario(id, payload) {
  return request(`/admin/usuarios/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function removerUsuario(id) {
  return request(`/admin/usuarios/${id}`, {
    method: 'DELETE',
  });
}

export async function listarCarrinhoAdmin() {
  return request('/admin/carrinho');
}

export async function removerItemCarrinhoAdmin(userId, productId) {
  return request(`/admin/carrinho/${userId}/${productId}`, {
    method: 'DELETE',
  });
}
