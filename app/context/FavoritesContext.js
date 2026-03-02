'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { db } from '@/lib/firebase';
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  query
} from 'firebase/firestore';

const FavoritesContext = createContext({
  favorites: [],
  toggleFavorite: async () => {},
  isFavorite: () => false,
  loading: true
});

export function useFavorites() {
  const context = useContext(FavoritesContext);
  return context;
}

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load favorites from Firestore if user is logged in
  useEffect(() => {
    if (!user) {
      const localFavs = typeof window !== 'undefined' ? localStorage.getItem('favorites') : null;
      if (localFavs) {
        setFavorites(JSON.parse(localFavs));
      } else {
        setFavorites([]);
      }
      setLoading(false);
      return;
    }

    const q = query(collection(db, `users/${user.uid}/favorites`));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const favs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFavorites(favs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Sync with local storage for guest users
  useEffect(() => {
    if (!user && typeof window !== 'undefined') {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites, user]);

  const toggleFavorite = async (product) => {
    if (!product || (!product.id && !product.slug)) return;
    const prodId = String(product.id || product.slug);

    const isFav = favorites.some(fav => String(fav.id) === prodId);

    if (user) {
      const favDocRef = doc(db, `users/${user.uid}/favorites`, prodId);
      if (isFav) {
        await deleteDoc(favDocRef);
      } else {
        await setDoc(favDocRef, {
          productId: prodId,
          nome: product.nome || product.title,
          preco: product.preco || product.price,
          preco_promocional: product.preco_promocional || product.comparePrice || null,
          imagem: (product.imagens?.[0] || product.images?.[0] || product.imagem || ""),
          slug: product.slug || product.id,
          createdAt: new Date().toISOString()
        });
      }
    } else {
      // Local storage logic
      if (isFav) {
        setFavorites(prev => prev.filter(fav => String(fav.id) !== prodId));
      } else {
        setFavorites(prev => [...prev, {
          id: prodId,
          nome: product.nome || product.title,
          preco: product.preco || product.price,
          preco_promocional: product.preco_promocional || product.comparePrice || null,
          imagem: (product.imagens?.[0] || product.images?.[0] || product.imagem || ""),
          slug: product.slug || product.id
        }]);
      }
    }
  };

  const isFavorite = (productId) => {
    return favorites.some(fav => String(fav.id) === String(productId));
  };

  const value = { favorites, toggleFavorite, isFavorite, loading };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
