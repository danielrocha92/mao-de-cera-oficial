'use client';

import React, { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaGoogle, FaEnvelope, FaLock } from 'react-icons/fa';
import Loading from '@/components/Loading/Loading';
import styles from './Login.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const { login, loginWithGoogle, user, loading: authLoading } = useAuth();
  const router = useRouter();

  // Automatiza o redirecionamento para quem já está logado
  React.useEffect(() => {
    // Só redireciona se o AuthContext já terminou de carregar (incluindo syncSession)
    if (user && !authLoading && !redirecting) {
      user.getIdTokenResult().then(idTokenResult => {
        const adminStatus = !!idTokenResult.claims.admin;
        const target = adminStatus ? '/admin/dashboard' : '/conta';

        // Evita loop se já estivermos tentando ir para o lugar certo
        if (window.location.pathname !== target) {
          console.log(`LoginPage: Redirecionando para ${target}...`);
          setRedirecting(true);
          window.location.href = target;
        }
      });
    }
  }, [user, authLoading, redirecting]);

  // Se já houver um usuário ou estiver redirecionando, mostramos o Lottie
  if (user || redirecting) {
    return <Loading />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const is_admin = await login(email, password);
      // Após o login com sucesso, AuthContext já terá resolvido a sessão
      setRedirecting(true);
      window.location.href = is_admin ? '/admin/dashboard' : '/conta';
    } catch (err) {
      console.error('Erro no login:', err);
      setError('Email ou senha inválidos. Tente novamente.');
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const is_admin = await loginWithGoogle();
      setRedirecting(true);
      window.location.href = is_admin ? '/admin/dashboard' : '/conta';
    } catch (err) {
      console.error('Erro no Google Login:', err);
      setError('Falha ao autenticar com o Google.');
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
