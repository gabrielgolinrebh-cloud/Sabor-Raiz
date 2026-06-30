import React, { useState } from 'react';
import { X, ArrowRight, Leaf, User, Mail, Lock } from 'lucide-react';
import styles from './Cadastro.module.css';

export default function Cadastro({ aoVoltar, aoMudarParaLogin }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const colors = {
    green: '#2F5D50',
    terracotta: '#B96A43',
    gold: '#D1A054',
    cream: '#F6EBD9',
    brown: '#4A3428',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Cadastro enviado:', { nome, email, senha });
  };

  return (
    <div className={styles.container} style={{ backgroundColor: colors.cream, fontFamily: "'Montserrat', sans-serif" }}>
      <button onClick={aoVoltar} className={styles.botaoFechar} style={{ color: colors.green }}>
        <X size={28} />
      </button>

      <div className={styles.card} style={{ borderColor: `${colors.gold}40` }}>
        <div className={styles.header}>
          <Leaf size={32} style={{ color: colors.gold }} className={styles.iconeLogo} />
          <h2 className={styles.titulo} style={{ color: colors.green }}>
            Sabor<span style={{ color: colors.terracotta }}>Raiz</span>
          </h2>
          <p className={styles.subtitulo} style={{ color: colors.brown }}>Crie sua conta para uma experiência personalizada</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.formulario}>
          <div className={styles.grupoInput}>
            <label className={styles.label} style={{ color: colors.brown }}>Nome Completo</label>
            <div className={styles.wrapperInput}>
              <User size={18} className={styles.iconeInput} style={{ color: colors.gold }} />
              <input 
                type="text" 
                required 
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className={styles.input}
                style={{ color: colors.brown, borderColor: `${colors.gold}60` }}
              />
            </div>
          </div>

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
                placeholder="Crie uma senha forte"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className={styles.input}
                style={{ color: colors.brown, borderColor: `${colors.gold}60` }}
              />
            </div>
          </div>

          <button type="submit" className={styles.botaoEnviar} style={{ backgroundColor: colors.terracotta }}>
            Cadastrar <ArrowRight size={18} />
          </button>
        </form>

        <div className={styles.footerAlternar}>
          <p style={{ color: colors.brown }}>
            Já possui uma conta?{' '}
            <button onClick={aoMudarParaLogin} className={styles.linkAlternar} style={{ color: colors.green }}>
              Faça login aqui
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}