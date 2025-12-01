'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Loading from '@/components/Loading/Loading';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // Não precisamos mais do 'isAdmin' aqui, o layout do servidor cuida disso
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // onAuthStateChanged apenas monitora o estado do *cliente*
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // 1. Faz login no cliente (Firebase Auth)
      if (auth.isMock) {
        throw new Error("Firebase keys missing. Check your .env.local file.");
      }
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // 2. Pega o ID Token do usuário
      const idToken = await userCredential.user.getIdToken();

      // 3. Envia o token para a API criar o cookie de sessão
      await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      // 4. Retorna se é admin para quem chamou decidir o redirect
      const tokenResult = await userCredential.user.getIdTokenResult();
      return tokenResult.claims.admin === true;

    } catch (error) {
      console.error("Erro no login:", error);
      setLoading(false);
      throw error; // Repassa o erro para a página de login tratar
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      // 1. Faz logout no cliente (Firebase Auth)
      await signOut(auth);

      // 2. Envia para a API destruir o cookie de sessão
      await fetch('/api/auth/session', {
        method: 'DELETE',
      });

      // Limpa o estado local
      setUser(null);
      router.push('/login'); // Redireciona para o login

    } catch (error) {
      console.error("Erro no logout:", error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    // isAdmin não é mais necessário aqui
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};