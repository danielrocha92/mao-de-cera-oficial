'use client';

import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const q = query(collection(db, 'pedidos'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
        // Fallback without sort
        const snapshot = await getDocs(collection(db, 'pedidos'));
        setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    // Call API to update status or update directly if allowed
    alert(`Atualizar status do pedido ${orderId} para ${newStatus} (Implementar)`);
  };

  if (loading) return <div style={{ padding: '2rem' }}>Carregando pedidos...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Gestão de Pedidos</h1>
      <table style={{ width: '100%', marginTop: '2rem', borderCollapse: 'collapse', backgroundColor: 'white' }}>
        <thead>
          <tr style={{ backgroundColor: '#eee', textAlign: 'left' }}>
            <th style={{ padding: '1rem' }}>ID</th>
            <th style={{ padding: '1rem' }}>Cliente</th>
            <th style={{ padding: '1rem' }}>Total</th>
            <th style={{ padding: '1rem' }}>Status</th>
            <th style={{ padding: '1rem' }}>Data</th>
            <th style={{ padding: '1rem' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '1rem' }}>{order.id.slice(0, 8)}</td>
              <td style={{ padding: '1rem' }}>{order.cliente?.nome || 'Cliente'}</td>
              <td style={{ padding: '1rem' }}>R$ {order.total?.toFixed(2)}</td>
              <td style={{ padding: '1rem' }}>{order.status}</td>
              <td style={{ padding: '1rem' }}>{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '-'}</td>
              <td style={{ padding: '1rem' }}>
                <button onClick={() => handleStatusUpdate(order.id, 'enviado')} style={{ marginRight: '0.5rem' }}>Enviar</button>
                <button onClick={() => handleStatusUpdate(order.id, 'cancelado')}>Cancelar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
