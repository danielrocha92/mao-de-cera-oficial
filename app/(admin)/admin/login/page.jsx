'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/lib/firebase';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import GoogleIcon from '@/components/ui/icons/GoogleIcon';
import styles from './AdminLogin.module.css';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Se o usuário já estiver logado no Firebase, verificar a sessão no backend
        try {
          const token = await user.getIdToken();
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          });

          if (response.ok) {
            setSuccess('Sessão existente detectada. Redirecionando...');
            router.push('/admin/dashboard');
          } else {
            // Se a sessão no backend não for válida, deslogar do Firebase
            await auth.signOut();
            setError('Sessão inválida. Por favor, faça login novamente.');
          }
        } catch (err) {
          console.error('Erro ao verificar sessão existente:', err);
          setError('Erro ao verificar sessão. Por favor, faça login novamente.');
        }
      }
    });
    return () => unsubscribe();
  }, [auth, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      console.log('Resposta bruta do backend (handleLogin):', response);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Falha ao criar a sessão.');
      }

      setSuccess('Login bem-sucedido! Redirecionando...');
      router.push('/admin/dashboard');

    } catch (err) {
      console.error('Erro no login:', err);
      // Firebase errors often have a 'code' property
      if (err.code === 'auth/invalid-email') {
        setError('Email inválido.');
      } else if (err.code === 'auth/user-disabled') {
        setError('Usuário desabilitado.');
      } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Email ou senha incorretos.');
      } else {
        setError(err.message || 'Ocorreu um erro durante o login.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setSuccess('');
    setLoading(true); // Usar o mesmo estado de loading para ambos os logins

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      console.log('Resposta bruta do backend (handleGoogleLogin):', response);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Falha ao criar a sessão com Google.');
      }

      setSuccess('Login com Google bem-sucedido! Redirecionando...');
      router.push('/admin/dashboard');

    } catch (err) {
      console.error('Erro no login com Google:', err);
      setError(err.message || 'Ocorreu um erro durante o login com Google.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleLogin}>
        <h2>Login do Administrador</h2>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
        <Input
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <Input
          label="Senha"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </Button>
        <div className={styles.divider}>OU</div>
        <Button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className={styles.googleButton}
        >
          <GoogleIcon size={20} />
          {loading ? 'Entrando com Google...' : 'Entrar com Google'}
        </Button>
      </form>
    </div>
  );
}
