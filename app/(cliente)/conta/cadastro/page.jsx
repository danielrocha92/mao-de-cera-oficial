'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../login/Login.module.css'; // Re-using styles for consistency
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { registerSchema } from '@/lib/validationSchemas';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for the field being edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    setGeneralError(''); // Clear general error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setGeneralError('');

    try {
      // Client-side validation with Zod
      registerSchema.parse(formData);

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          // Zod errors from API (if any, though client-side should catch most)
          const apiErrors = {};
          data.errors.forEach(err => {
            if (err.path && err.path.length > 0) {
              apiErrors[err.path[0]] = err.message;
            }
          });
          setErrors(apiErrors);
        } else if (data.message) {
          setGeneralError(data.message);
        } else {
          setGeneralError('Ocorreu um erro inesperado. Tente novamente.');
        }
        return;
      }

      // Success
      alert('Cadastro realizado com sucesso! Você será redirecionado para a página de login.');
      router.push('/conta/login'); // Redirect to login page after successful registration

    } catch (error) {
      if (error.name === 'ZodError') {
        // Client-side Zod validation errors
        const newErrors = {};
        error.errors.forEach((err) => {
          if (err.path && err.path.length > 0) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        console.error('Erro no cadastro:', error);
        setGeneralError(error.message || 'Erro ao tentar cadastrar. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBackToLogin = () => {
    router.push('/conta/login');
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Criar Nova Conta</h2>

        {generalError && <p className={styles.errorMessage}>{generalError}</p>}

        <Input
          label="Nome"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Seu nome completo"
          error={errors.name}
        />
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="seu@email.com"
          error={errors.email}
        />
        <Input
          label="Senha"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="********"
          error={errors.password}
        />
        <Input
          label="Telefone (opcional)"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="(XX) XXXXX-XXXX"
          error={errors.phone}
        />
        <Input
          label="Endereço (opcional)"
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Rua, Número, Bairro, Cidade"
          error={errors.address}
        />

        <div className={styles.actions}>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Cadastrando...' : 'Cadastrar'}
          </Button>
          <Button type="button" variant="secondary" onClick={handleGoBackToLogin} disabled={isLoading}>
            Voltar para Login
          </Button>
        </div>
      </form>
    </div>
  );
}