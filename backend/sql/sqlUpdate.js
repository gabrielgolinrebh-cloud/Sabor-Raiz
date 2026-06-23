import pool from '../db.js';
async function atualizarTarefa() {
try {
const id = 1;
const novaDescricao = 'Estudar React, Node.js e MySQL';
const novoStatus = true;
const [resultado] = await pool.execute(
`
        UPDATE tarefas
        SET descricao = ?, status = ?
        WHERE id = ?
      `,
[novaDescricao, novoStatus, id]
);
if (resultado.affectedRows === 0) {
console.log('Nenhuma tarefa encontrada com esse ID.');
return;
}
console.log('Tarefa atualizada com sucesso!');
} catch (error) {
console.error('Erro ao atualizar tarefa:', error);
} finally {
await pool.end();
}
}
atualizarTarefa()