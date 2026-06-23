import { useEffect, useState } from 'react';
import {
  buscarTarefas,
  criarTarefa,
  atualizarTarefa,
  deletarTarefa
} from './services/api';
function App() {
  const [tarefas, setTarefas] = useState([]);
  const [descricao, setDescricao] = useState('');
  useEffect(() => {
    carregarTarefas();
  }, []);
  async function carregarTarefas() {
    const dados = await buscarTarefas();
    setTarefas(dados);
  }
  async function adicionarTarefa(event) {
    event.preventDefault();
    if (!descricao.trim()) return;
    await criarTarefa(descricao);
    setDescricao('');
    carregarTarefas();
  }
  async function alternarStatus(tarefa) {
    await atualizarTarefa(
      tarefa.id,
      tarefa.descricao,
      !tarefa.status
    );
    carregarTarefas();
  }
  async function excluirTarefa(id) {
    await deletarTarefa(id);
    carregarTarefas();
  }
  return (
<<<<<<< HEAD
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Faaaaaaaala rapaziada tudo certo?</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
=======
    <div>
      <h1>Lista de Tarefas</h1>
      <form onSubmit={adicionarTarefa}>
        <input
          value={descricao}
          onChange={(event) => setDescricao(event.target.value)}
          placeholder="Digite uma tarefa"
        />
        <button type="submit">Adicionar</button>
      </form>
      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>
            <span>
              {tarefa.descricao} - {tarefa.status ? 'Concluida' : 'Pendente'}
            </span>
            <button onClick={() => alternarStatus(tarefa)}>
              Alterar status
            </button>
            <button onClick={() => excluirTarefa(tarefa.id)}>
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
>>>>>>> d868aa2fb36d5a947e2fa5115703bada4256fe58
}
export default App;