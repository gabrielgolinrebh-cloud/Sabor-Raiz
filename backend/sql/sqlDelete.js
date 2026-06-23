import pool from '../db.js';
async function excluirTarefa() {
try {
const id = 1;
const [resultado] = await pool.execute(
'DELETE FROM tarefas WHERE id = ?',
[id]
);
if (resultado.affectedRows === 0) {
console.log('Nenhuma tarefa encontrada com esse ID.');
return;
}
console.log('Tarefa excluída com sucesso!');
} catch (error) {
console.error('Erro ao excluir tarefa:', error);
} finally {
await pool.end();
}
}
excluirTarefa();