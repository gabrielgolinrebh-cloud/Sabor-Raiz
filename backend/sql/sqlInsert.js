import pool from '../db.js';
async function inserirTarefa() {
try {
const descricao = 'Estudar consultas SQL pelo Node.js';
const [resultado] = await pool.execute(
'INSERT INTO tarefas (descricao) VALUES (?)',
[descricao]
);
console.log('Tarefa inserida com sucesso!');
console.log('ID criado:', resultado.insertId);
} catch (error) {
console.error('Erro ao inserir tarefa:', error);
} finally {
await pool.end();
}
}
inserirTarefa();