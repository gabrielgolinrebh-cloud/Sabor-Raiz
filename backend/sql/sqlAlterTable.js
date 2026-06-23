import pool from '../db.js';
async function alterarTabelaTarefas() {
try {
const [colunas] = await pool.query(`
      SELECT COLUMN_NAME
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'tarefas'
        AND COLUMN_NAME = 'prioridade'
    `);
if (colunas.length > 0) {
console.log('A coluna prioridade já existe. Nenhuma alteração foi feita.');
return;
}
await pool.query(`
      ALTER TABLE tarefas
      ADD COLUMN prioridade VARCHAR(20) DEFAULT 'normal'
    `);
console.log('Coluna prioridade adicionada com sucesso!');
} catch (error) {
console.error('Erro ao alterar tabela:', error);
} finally {
await pool.end();
}
}
alterarTabelaTarefas()