import React, { useState } from 'react';
import { X, ArrowRight, Leaf, Lock, Mail } from 'lucide-react';
import styles from './Login.module.css';
import { loginUsuario } from './services/api';

export default function Login({ aoVoltar, aoMudarParaCadastro, aoLogar }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const colors = {
    green: '#2F5D50',
    terracotta: '#B96A43',
    gold: '#D1A054',
    cream: '#F6EBD9',
    brown: '#4A3428',
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      const resposta = await loginUsuario({ email, senha });
      if (resposta.success && aoLogar) {
        aoLogar(resposta.user);
        aoVoltar();
      }
    } catch (error) {
      setErro(error.message);
    }
  };

  return (
    <div className={styles.container} style={{ backgroundColor: colors.cream, fontFamily: "'Montserrat', sans-serif" }}>
      <button onClick={aoVoltar} className={styles.botaoFechar} style={{ color: colors.green }} aria-label="Voltar para a Home">
        <X size={28} />
      </button>

      <div className={styles.card} style={{ borderColor: `${colors.gold}40` }}>
        <div className={styles.header}>
          <Leaf size={32} style={{ color: colors.gold }} className={styles.iconeLogo} />
          <h2 className={styles.titulo} style={{ color: colors.green }}>
            Sabor<span style={{ color: colors.terracotta }}>Raiz</span>
          </h2>
          <p className={styles.subtitulo} style={{ color: colors.brown }}>Acesse sua conta para gerenciar seus pedidos</p>
        </div>

        <form onSubmit={handleLogin} className={styles.formulario}>
          <div className={styles.grupoInput}>
            <label className={styles.label} style={{ color: colors.brown }}>E-mail</label>
            <div className={styles.wrapperInput}>
              <Mail size={18} className={styles.iconeInput} style={{ color: colors.gold }} />
              <input 
                type="email" 
                required 
                placeholder="seuemail@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                style={{ color: colors.brown, borderColor: `${colors.gold}60` }}
              />
            </div>
          </div>

          <div className={styles.grupoInput}>
            <label className={styles.label} style={{ color: colors.brown }}>Senha</label>
            <div className={styles.wrapperInput}>
              <Lock size={18} className={styles.iconeInput} style={{ color: colors.gold }} />
              <input 
                type="password" 
                required 
                placeholder="Sua senha secreta"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className={styles.input}
                style={{ color: colors.brown, borderColor: `${colors.gold}60` }}
              />
            </div>
          </div>

          {erro && <p style={{ color: colors.terracotta, fontSize: '0.95rem' }}>{erro}</p>}

          <button type="submit" className={styles.botaoEnviar} style={{ backgroundColor: colors.terracotta }}>
            Entrar <ArrowRight size={18} />
          </button>
        </form>

        <div className={styles.footerAlternar}>
          <p style={{ color: colors.brown }}>
            Não tem uma conta?{' '}
            <button onClick={aoMudarParaCadastro} className={styles.linkAlternar} style={{ color: colors.green }}>
              Cadastre-se aqui
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}