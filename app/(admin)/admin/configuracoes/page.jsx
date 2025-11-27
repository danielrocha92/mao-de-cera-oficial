'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase'; // Client SDK for reading settings
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome_loja: '',
    cnpj: '',
    email_contato: '',
    telefone_contato: '',
    endereco_loja: '',
    gtm_id: '',
    ga4_id: '',
    fb_pixel_id: '',
    mercado_pago_public_key: '',
    mercado_pago_access_token: ''
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'configuracoes', 'loja');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            ...data,
            gtm_id: data.codigos_externos?.gtm_id || '',
            ga4_id: data.codigos_externos?.ga4_id || '',
            fb_pixel_id: data.codigos_externos?.fb_pixel_id || '',
            mercado_pago_public_key: data.meios_pagamento?.mercado_pago_keys?.public_key || '',
            mercado_pago_access_token: data.meios_pagamento?.mercado_pago_keys?.access_token || ''
          });
        }
      } catch (error) {
        console.error("Erro ao buscar configurações:", error);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const settingsData = {
        nome_loja: formData.nome_loja,
        cnpj: formData.cnpj,
        email_contato: formData.email_contato,
        telefone_contato: formData.telefone_contato,
        endereco_loja: formData.endereco_loja,
        codigos_externos: {
          gtm_id: formData.gtm_id,
          ga4_id: formData.ga4_id,
          fb_pixel_id: formData.fb_pixel_id
        },
        meios_pagamento: {
          mercado_pago_keys: {
            public_key: formData.mercado_pago_public_key,
            access_token: formData.mercado_pago_access_token
          }
        }
      };

      await setDoc(doc(db, 'configuracoes', 'loja'), settingsData);
      alert('Configurações salvas com sucesso!');

    } catch (error) {
      console.error(error);
      alert('Erro ao salvar configurações');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Configurações da Loja</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>

        <section>
          <h3>Dados da Empresa</h3>
          <input name="nome_loja" placeholder="Nome da Loja" value={formData.nome_loja} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }} />
          <input name="cnpj" placeholder="CNPJ" value={formData.cnpj} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }} />
          <input name="email_contato" placeholder="E-mail de Contato" value={formData.email_contato} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }} />
          <input name="telefone_contato" placeholder="Telefone" value={formData.telefone_contato} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }} />
          <input name="endereco_loja" placeholder="Endereço Completo" value={formData.endereco_loja} onChange={handleChange} style={{ width: '100%', padding: '0.5rem' }} />
        </section>

        <section>
          <h3>Códigos Externos</h3>
          <input name="gtm_id" placeholder="Google Tag Manager ID" value={formData.gtm_id} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }} />
          <input name="ga4_id" placeholder="Google Analytics 4 ID" value={formData.ga4_id} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }} />
          <input name="fb_pixel_id" placeholder="Facebook Pixel ID" value={formData.fb_pixel_id} onChange={handleChange} style={{ width: '100%', padding: '0.5rem' }} />
        </section>

        <section>
          <h3>Meios de Pagamento (Mercado Pago)</h3>
          <input name="mercado_pago_public_key" placeholder="Public Key" value={formData.mercado_pago_public_key} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }} />
          <input name="mercado_pago_access_token" placeholder="Access Token" value={formData.mercado_pago_access_token} onChange={handleChange} style={{ width: '100%', padding: '0.5rem' }} />
        </section>

        <button type="submit" disabled={loading} style={{
          padding: '1rem',
          backgroundColor: 'var(--primary)',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1.1rem',
          marginTop: '1rem'
        }}>
          {loading ? 'Salvando...' : 'Salvar Configurações'}
        </button>
      </form>
    </div>
  );
}
