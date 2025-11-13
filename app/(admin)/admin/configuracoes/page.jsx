'use client';

import { useState, useEffect } from 'react';
import styles from './Configuracoes.module.css';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function ConfiguracoesPage() {
  const [settings, setSettings] = useState({
    nome_loja: '', cnpj: '', email_contato: '', telefone_contato: '',
    endereco_loja: { rua: '', numero: '', cidade: '', estado: '', cep: '' },
    codigos_externos: { gtm_id: '', ga4_id: '', fb_pixel_id: '' },
    meios_pagamento: { mercado_pago_keys: { public_key: '', access_token: '' } }
  });

  // TODO: Fetch current settings from Firestore on component mount
  useEffect(() => {
    // const fetchSettings = async () => {
    //   // const res = await fetch('/api/configuracoes');
    //   // const data = await res.json();
    //   // setSettings(data);
    // }
    // fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    
    if (keys.length > 1) {
      setSettings(prev => {
        const newState = { ...prev };
        let current = newState;
        for (let i = 0; i < keys.length - 1; i++) {
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        return newState;
      });
    } else {
      setSettings(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Make a POST/PUT request to an API endpoint to save the settings
    console.log('Saving settings:', settings);
    alert('Configurações salvas!');
  };

  return (
    <div>
      <h1>Configurações da Loja</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <fieldset>
          <legend>Informações de Contato</legend>
          <Input name="nome_loja" label="Nome da Loja" value={settings.nome_loja} onChange={handleChange} />
          <Input name="cnpj" label="CNPJ" value={settings.cnpj} onChange={handleChange} />
          <Input name="email_contato" label="Email de Contato" value={settings.email_contato} onChange={handleChange} />
          <Input name="telefone_contato" label="Telefone de Contato" value={settings.telefone_contato} onChange={handleChange} />
        </fieldset>

        <fieldset>
          <legend>Endereço da Loja</legend>
          <Input name="endereco_loja.rua" label="Rua" value={settings.endereco_loja.rua} onChange={handleChange} />
          <Input name="endereco_loja.numero" label="Número" value={settings.endereco_loja.numero} onChange={handleChange} />
          <Input name="endereco_loja.cidade" label="Cidade" value={settings.endereco_loja.cidade} onChange={handleChange} />
          <Input name="endereco_loja.estado" label="Estado" value={settings.endereco_loja.estado} onChange={handleChange} />
          <Input name="endereco_loja.cep" label="CEP" value={settings.endereco_loja.cep} onChange={handleChange} />
        </fieldset>

        <fieldset>
          <legend>Códigos Externos (Tracking)</legend>
          <Input name="codigos_externos.gtm_id" label="Google Tag Manager ID" value={settings.codigos_externos.gtm_id} onChange={handleChange} />
          <Input name="codigos_externos.ga4_id" label="Google Analytics 4 ID" value={settings.codigos_externos.ga4_id} onChange={handleChange} />
          <Input name="codigos_externos.fb_pixel_id" label="Facebook Pixel ID" value={settings.codigos_externos.fb_pixel_id} onChange={handleChange} />
        </fieldset>

        <fieldset>
          <legend>Chaves de API</legend>
          <Input name="meios_pagamento.mercado_pago_keys.public_key" label="Mercado Pago - Public Key" value={settings.meios_pagamento.mercado_pago_keys.public_key} onChange={handleChange} />
          <Input name="meios_pagamento.mercado_pago_keys.access_token" label="Mercado Pago - Access Token" value={settings.meios_pagamento.mercado_pago_keys.access_token} onChange={handleChange} />
          {/* TODO: Add fields for Bling, EmailJS keys */}
        </fieldset>

        <Button type="submit">Salvar Configurações</Button>
      </form>
    </div>
  );
}
