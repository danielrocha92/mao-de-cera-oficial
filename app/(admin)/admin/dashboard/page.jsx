'use client';

import React from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '2rem' }}>

        <Link href="/admin/produtos/novo" style={{ textDecoration: 'none' }}>
          <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', cursor: 'pointer' }}>
            <h3>Cadastrar Produto</h3>
            <p>Adicione novos produtos à loja.</p>
          </div>
        </Link>

        <Link href="/admin/pedidos" style={{ textDecoration: 'none' }}>
          <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', cursor: 'pointer' }}>
            <h3>Pedidos</h3>
            <p>Gerencie os pedidos recebidos.</p>
          </div>
        </Link>

        <Link href="/admin/configuracoes" style={{ textDecoration: 'none' }}>
          <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', cursor: 'pointer' }}>
            <h3>Configurações</h3>
            <p>Edite dados da loja e integrações.</p>
          </div>
        </Link>

      </div>
    </div>
  );
}
