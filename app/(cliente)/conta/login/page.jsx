'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Login.module.css';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { auth } from '@/lib/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import GoogleIcon from '@/components/ui/icons/GoogleIcon';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous errors

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();

      // Send ID token to your backend for session cookie creation
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: idToken }),
      });

      if (response.ok) {
        console.log('Login bem-sucedido! Redirecionando...');
        router.push('/admin/dashboard');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Falha no login. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao tentar logar:', error);
      setErrorMessage('Erro ao logar. Verifique suas credenciais.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous errors

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();

      // Optionally, send ID token to backend if registration also requires session cookie
      // For now, just log in the user after registration
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: idToken }),
      });

      if (response.ok) {
        console.log('Registro e login bem-sucedidos! Redirecionando...');
        router.push('/admin/dashboard');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Falha no registro e login. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao tentar registrar:', error);
      setErrorMessage('Erro ao registrar. O e-mail pode já estar em uso ou a senha é fraca.');
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMessage(''); // Clear previous errors

    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const idToken = await userCredential.user.getIdToken();

      // Send ID token to your backend for session cookie creation
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: idToken }),
      });

      if (response.ok) {
        console.log('Login com Google bem-sucedido! Redirecionando...');
        router.push('/admin/dashboard');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Falha no login com Google. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao tentar logar com Google:', error);
      setErrorMessage('Erro ao logar com Google. Tente novamente.');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h2>Login ou Cadastro</h2>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <Input
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
        />
        <Input
          label="Senha"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
        />
        <div className={styles.actions}>
          <Button onClick={handleLogin} type="submit">Entrar</Button>
          <Button onClick={handleRegister} type="button" variant="secondary">Cadastrar</Button>
        </div>
        <div className={styles.socialLogin}>
          <p>Ou entre com:</p>
          <Button onClick={handleGoogleLogin} type="button" variant="social">
            <GoogleIcon /> Entrar com Google
          </Button>
        </div>
      </form>
    </div>
  );
}
