'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { db, auth } from '@/lib/firebase'; // Client SDK for reading own orders
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

export default function OrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/conta/login');
    } else if (user) {
      const fetchOrders = async () => {
        try {
          const q = query(
            collection(db, 'pedidos'),
            where('clienteId', '==', user.uid),
            orderBy('createdAt', 'desc') // Requires index
          );
          // Fallback if index missing: client-side sort or remove orderBy
          // For now, let's try without orderBy if it fails, or just handle error

          const querySnapshot = await getDocs(q);
          const userOrders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setOrders(userOrders);
        } catch (error) {
          console.error("Erro ao buscar pedidos:", error);
          // Fallback for missing index error
          if (error.code === 'failed-precondition') {
             console.warn("Index missing, trying without sort");
             const q2 = query(collection(db, 'pedidos'), where('clienteId', '==', user.uid));
             const qs2 = await getDocs(q2);
             setOrders(qs2.docs.map(doc => ({ id: doc.id, ...doc.data() })));
          }
        } finally {
          setLoading(false);
        }
      };
      fetchOrders();
    }
  }, [user, authLoading, router]);

  if (authLoading || loading) return <p style={{ padding: '2rem', textAlign: 'center' }}>Carregando...</p>;

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Minha Conta</h1>
        <button onClick={() => auth.signOut()} style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', background: 'transparent', cursor: 'pointer' }}>
          Sair
        </button>
      </div>

      <section style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Meus Dados</h2>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>ID do Cliente:</strong> {user?.uid}</p>
      </section>

      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Meus Pedidos</h2>
      {orders.length === 0 ? (
        <p>Você ainda não fez nenhum pedido.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          {orders.map(order => (
            <div key={order.id} style={{ border: '1px solid #eee', padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>Pedido #{order.id.slice(0, 8)}</strong>
                <span>{order.status}</span>
              </div>
              <p>Total: R$ {order.total?.toFixed(2)}</p>
              <p>Data: {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
