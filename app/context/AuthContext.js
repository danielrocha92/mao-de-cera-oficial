'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Loading from '@/components/Loading/Loading';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // onAuthStateChanged apenas monitora o estado do *cliente*
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const tokenResult = await firebaseUser.getIdTokenResult();
          setIsAdmin(tokenResult.claims.admin === true);

          // Sincroniza a sessão se necessário (silenciosamente)
          await syncSession(firebaseUser);
        } catch (e) {
          console.error("Erro ao processar login inicial:", e);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      if (auth.isMock) {
        throw new Error("Firebase keys missing. Check your .env.local file.");
      }
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);

      const idToken = await userCredential.user.getIdToken();
      await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      const tokenResult = await userCredential.user.getIdTokenResult();
      return tokenResult.claims.admin === true;
    } catch (error) {
      console.error("Erro no login com Google:", error);
      throw error;
    }
  };

  const syncSession = async (targetUser) => {
    if (!targetUser) return;
    try {
      const idToken = await targetUser.getIdToken();
      await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });
    } catch (e) {
      console.error("Erro ao sincronizar sessão:", e);
    }
  };

  const login = async (email, password) => {
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
      throw error; // Repassa o erro para a página de login tratar
    }
  };

  const logout = async () => {
    try {
      // 1. Faz logout no cliente (Firebase Auth)
      await signOut(auth);

      // 2. Envia para a API destruir o cookie de sessão
      await fetch('/api/auth/session', {
        method: 'DELETE',
      });

      // Limpa o estado local
      setUser(null);
      router.push('/conta/login'); // Redireciona para o login

    } catch (error) {
      console.error("Erro no logout:", error);
    }
  };

  const value = {
    user,
    isAdmin,
    loading,
    login,
    loginWithGoogle,
    logout,
    syncSession,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Loading />
        </div>
      ) : children}
    </AuthContext.Provider>
  );
};