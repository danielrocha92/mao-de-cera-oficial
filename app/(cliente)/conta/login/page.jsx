'use client';

import React, { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaGoogle, FaEnvelope, FaLock } from 'react-icons/fa';
import styles from './Login.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle, user } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (user) {
      user.getIdTokenResult().then(idTokenResult => {
        const adminStatus = !!idTokenResult.claims.admin;
        if (adminStatus) {
          router.push('/admin/dashboard');
        } else {
          router.push('/conta');
        }
      });
    }
  }, [user, router]);

  if (user) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Acessando sua conta...</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
    } catch (err) {
      setError('Email ou senha inválidos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await loginWithGoogle();
    } catch (err) {
      setError('Falha ao autenticar com o Google.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <h1>Bem-vindo(a)</h1>
          <p>Acesse ou crie sua conta para continuar</p>
        </div>

        {error && <div className={styles.errorAlert}>{error}</div>}

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className={styles.googleButton}
        >
          <FaGoogle /> Continuar com Google
        </button>

        <div className={styles.divider}>
          <span>ou use seu email</span>
        </div>

        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.inputGroup}>
            <FaEnvelope className={styles.inputIcon} />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <FaLock className={styles.inputIcon} />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className={styles.input}
            />
          </div>

          <div className={styles.forgotPassword}>
            {/* Opcional: Adicionar Link para Recuperar Senha depois */}
            <a href="#" onClick={(e) => e.preventDefault()}>Esqueceu a senha?</a>
          </div>

          <button type="submit" disabled={loading} className={styles.mainButton}>
            {loading ? 'Aguarde...' : 'Entrar'}
          </button>
        </form>

        <div className={styles.footer}>
          <p>Não tem uma conta?</p>
          <Link href="/conta/cadastro" className={styles.registerLink}>
            Criar minha conta agora
          </Link>
        </div>
      </div>
    </div>
  );
}
