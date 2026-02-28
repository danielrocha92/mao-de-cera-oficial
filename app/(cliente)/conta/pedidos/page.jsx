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
          // Removemos o orderBy no Firebase para não depender de Composite Indexes do Firestore.
          // Faremos o filtro principal no Firebase (apenas uid) e ordenamos em Javascript (client-side)
          const q = query(
            collection(db, 'pedidos'),
            where('clienteId', '==', user.uid)
          );

          const querySnapshot = await getDocs(q);
          const userOrders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

          // Ordena pelo mais recente usando JS
          userOrders.sort((a, b) => {
             const dateA = new Date(a.createdAt || 0).getTime();
             const dateB = new Date(b.createdAt || 0).getTime();
             return dateB - dateA;
          });

          setOrders(userOrders);
        } catch (error) {
          console.error("Erro ao buscar pedidos:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchOrders();
    }
  }, [user, authLoading, router]);

  if (authLoading || loading) return <p style={{ padding: '2rem', textAlign: 'center' }}>Carregando...</p>;

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Meus Pedidos</h2>
      {orders.length === 0 ? (
        <p style={{ color: 'var(--text-secondary)' }}>Você ainda não fez nenhum pedido.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          {orders.map(order => (
            <div key={order.id} style={{ border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '8px', backgroundColor: 'var(--surface)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Pedido #{order.id.slice(0, 8)}</strong>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '0.85rem',
                  fontWeight: '500',
                  backgroundColor: order.status === 'pendente' ? '#fff3cd' : order.status === 'entregue' ? '#d1e7dd' : '#f8d7da',
                  color: order.status === 'pendente' ? '#856404' : order.status === 'entregue' ? '#0f5132' : '#842029'
                }}>
                  {order.status || 'Pendente'}
                </span>
              </div>
              <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-secondary)' }}>Total: <strong>R$ {order.total?.toFixed(2) || '0.00'}</strong></p>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Data: {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
