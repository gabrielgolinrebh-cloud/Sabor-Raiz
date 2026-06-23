import pool from '../db.js';
async function listarTarefas() {
try {
const [tarefas] = await pool.query(`
      SELECT id, descricao, status, data_criacao
      FROM tarefas
      ORDER BY data_criacao DESC
    `);
console.log('Tarefas cadastradas:');
console.table(tarefas);
} catch (error) {
console.error('Erro ao listar tarefas:', error);
} finally {
await pool.end();
}
}
listarTarefas();