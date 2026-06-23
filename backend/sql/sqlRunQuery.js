import pool from '../db.js';
async function executarQuery() {
try {
const sql = `
      SELECT id, descricao, status
      FROM tarefas
      WHERE status = false
      ORDER BY id DESC
    `;
const [resultado] = await pool.query(sql);
console.log('Resultado da query:');
console.table(resultado);
} catch (error) {
console.error('Erro ao executar query:', error);
} finally {
await pool.end();
}
}
executarQuery()