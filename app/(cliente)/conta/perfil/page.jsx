'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    phone: '',
    dataNascimento: ''
  });
  const [loadingForm, setLoadingForm] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/conta/login');
    } else if (user) {
      // Carrega os dados adicionais do usuário logado do firestore
      const fetchUserData = async () => {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setFormData({
              name: data.name || user.displayName || '',
              cpf: data.cpf || '',
              phone: data.phone || '',
              dataNascimento: data.dataNascimento || ''
            });
          } else {
             // Caso tenha logado com Google e ainda não tenha doc
             setFormData(prev => ({ ...prev, name: user.displayName || '' }));
          }
        } catch (error) {
          console.error("Erro ao buscar dados do perfil:", error);
        }
      };
      fetchUserData();
    }
  }, [user, authLoading, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Formatação de CPF básica enquanto digita: 000.000.000-00
    if (name === 'cpf') {
      let v = value.replace(/\D/g, "");
      if (v.length <= 11) {
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      } else {
         v = v.substring(0, 14); // Limita tamanho max formatado
      }
      setFormData(prev => ({ ...prev, cpf: v }));
      return;
    }

    // Formatação de Telefone: (00) 00000-0000
    if (name === 'phone') {
      let v = value.replace(/\D/g, "");
      if (v.length <= 11) {
        v = v.replace(/^(\d{2})(\d)/g,"($1) $2");
        v = v.replace(/(\d)(\d{4})$/,"$1-$2");
      } else {
        v = v.substring(0, 15);
      }
      setFormData(prev => ({ ...prev, phone: v }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoadingForm(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      await setDoc(doc(db, 'users', user.uid), {
        ...formData,
        email: user.email,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      setSuccessMsg('Dados atualizados com sucesso!');
      setTimeout(() => setSuccessMsg(''), 3000); // clear after 3s
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
      setErrorMsg('Não foi possível salvar as alterações. Tente novamente.');
    } finally {
      setLoadingForm(false);
    }
  };

  if (authLoading || !user) {
    return <p style={{ padding: '2rem', textAlign: 'center' }}>Carregando...</p>;
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Meus Dados Pessoais</h2>

      {successMsg && <div style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#d1e7dd', color: '#0f5132', borderRadius: '8px', border: '1px solid #badbcc' }}>{successMsg}</div>}
      {errorMsg && <div style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#f8d7da', color: '#842029', borderRadius: '8px', border: '1px solid #f5c2c7' }}>{errorMsg}</div>}

      <div style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '2rem'
      }}>
        <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem' }}>

          <div style={{ gridColumn: '1 / -1' }}>
            <Input
              label="Email Principal"
              type="email"
              value={user.email}
              disabled
              name="email"
              placeholder=""
              onChange={() => {}}
            />
            <small style={{ color: 'var(--text-muted)', display: 'block', marginTop: '-0.5rem' }}>O e-mail não pode ser alterado por aqui pois está atrelado ao seu login.</small>
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <Input
              label="Nome Completo *"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Digite seu nome completo"
            />
          </div>

          <div>
            <Input
              label="CPF *"
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              placeholder="000.000.000-00"
            />
            <small style={{ color: 'var(--text-muted)', display: 'block', marginTop: '-0.5rem' }}>Necessário para processar compras.</small>
          </div>

          <div>
            <Input
              label="Data de Nascimento"
              type="date"
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleChange}
              placeholder=""
            />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <Input
              label="Celular (WhatsApp)"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(00) 00000-0000"
            />
          </div>

          <div style={{ gridColumn: '1 / -1', marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              disabled={loadingForm}
            >
              {loadingForm ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </div>

        </form>
      </div>

      <div style={{
        marginTop: '1.5rem',
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '2rem'
      }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Segurança</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>Sua autenticação e redefinição de senhas são gerenciadas com segurança diretamente através da página de acesso principal ou autenticadores vinculados (como o Google).</p>
      </div>

    </div>
  );
}
