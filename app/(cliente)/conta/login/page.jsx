'use client';

import { useState } from 'react';
import styles from './Login.module.css';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Implement Firebase login logic
    console.log('Login with:', email, password);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // TODO: Implement Firebase registration logic
    console.log('Register with:', email, password);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h2>Login ou Cadastro</h2>
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
      </form>
    </div>
  );
}
