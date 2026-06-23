import pool from '../db.js';
async function apagarTabelaTeste() {
try {
await pool.query(`
      DROP TABLE IF EXISTS tarefas_teste
    `);
console.log('Tabela tarefas_teste apagada com sucesso!');
} catch (error) {
console.error('Erro ao apagar tabela:', error);
} finally {
await pool.end();
}
}
apagarTabelaTeste();