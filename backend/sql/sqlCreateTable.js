import pool from '../db.js';
async function criarTabelaTeste() {
try {
await pool.query(`
      CREATE TABLE IF NOT EXISTS tarefas_teste (
        id INT AUTO_INCREMENT PRIMARY KEY,
        descricao VARCHAR(255) NOT NULL,
        status BOOLEAN DEFAULT false,
        data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
console.log('Tabela tarefas_teste criada ou verificada com sucesso!');
} catch (error) {
console.error('Erro ao criar tabela:', error);
} finally {
await pool.end();
}
}
criarTabelaTeste()