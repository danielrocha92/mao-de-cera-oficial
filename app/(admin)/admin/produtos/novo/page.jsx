'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    slug: '',
    descricao: '',
    preco: '',
    preco_promocional: '',
    custo: '',
    sku: '',
    estoque: '',
    peso_kg: '',
    comprimento: '',
    largura: '',
    altura: '',
    categorias: '',
    tags_busca: '',
    seo_titulo: '',
    seo_descricao: '',
    imagens: [], // URLs
    isLancamento: false,
    isOferta: false
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleImageUpload = async (e) => {
    // Placeholder for Cloudinary upload
    // In a real app, we would upload to Cloudinary and get the URL
    const file = e.target.files[0];
    if (file) {
      // Mock URL for now
      const mockUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, imagens: [...prev.imagens, mockUrl] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare data
      const productData = {
        ...formData,
        preco: Number(formData.preco),
        preco_promocional: Number(formData.preco_promocional),
        custo: Number(formData.custo),
        estoque: Number(formData.estoque),
        peso_kg: Number(formData.peso_kg),
        dimensoes_cm: {
          comprimento: Number(formData.comprimento),
          largura: Number(formData.largura),
          altura: Number(formData.altura)
        },
        categorias: formData.categorias.split(',').map(s => s.trim()),
        tags_busca: formData.tags_busca.split(',').map(s => s.trim()),
        seo: {
          titulo: formData.seo_titulo,
          meta_descricao: formData.seo_descricao
        }
      };

      // Remove flat fields that are now nested
      delete productData.comprimento;
      delete productData.largura;
      delete productData.altura;
      delete productData.seo_titulo;
      delete productData.seo_descricao;

      const res = await fetch('/api/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });

      if (res.ok) {
        alert('Produto criado com sucesso!');
        router.push('/admin/dashboard');
      } else {
        alert('Erro ao criar produto');
      }

    } catch (error) {
      console.error(error);
      alert('Erro ao criar produto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Novo Produto</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>

        <section>
          <h3>Informações Básicas</h3>
          <input name="nome" placeholder="Nome do Produto" value={formData.nome} onChange={handleChange} required style={{ width: '100%', padding: '0.5rem' }} />
          <input name="slug" placeholder="Slug (URL)" value={formData.slug} onChange={handleChange} required style={{ width: '100%', padding: '0.5rem' }} />
          <textarea name="descricao" placeholder="Descrição" value={formData.descricao} onChange={handleChange} rows={5} style={{ width: '100%', padding: '0.5rem' }} />
          <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" name="isLancamento" checked={formData.isLancamento} onChange={handleChange} />
              Lançamento
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" name="isOferta" checked={formData.isOferta} onChange={handleChange} />
              Oferta Sazonal
            </label>
          </div>
        </section>

        <section>
          <h3>Preço e Estoque</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input name="preco" type="number" placeholder="Preço (R$)" value={formData.preco} onChange={handleChange} required style={{ flex: 1, padding: '0.5rem' }} />
            <input name="preco_promocional" type="number" placeholder="Preço Promocional (R$)" value={formData.preco_promocional} onChange={handleChange} style={{ flex: 1, padding: '0.5rem' }} />
            <input name="custo" type="number" placeholder="Custo (R$)" value={formData.custo} onChange={handleChange} style={{ flex: 1, padding: '0.5rem' }} />
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <input name="sku" placeholder="SKU" value={formData.sku} onChange={handleChange} style={{ flex: 1, padding: '0.5rem' }} />
            <input name="estoque" type="number" placeholder="Estoque" value={formData.estoque} onChange={handleChange} required style={{ flex: 1, padding: '0.5rem' }} />
          </div>
        </section>

        <section>
          <h3>Frete (Dimensões e Peso)</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input name="peso_kg" type="number" step="0.001" placeholder="Peso (kg)" value={formData.peso_kg} onChange={handleChange} required style={{ flex: 1, padding: '0.5rem' }} />
            <input name="comprimento" type="number" placeholder="Comp (cm)" value={formData.comprimento} onChange={handleChange} required style={{ flex: 1, padding: '0.5rem' }} />
            <input name="largura" type="number" placeholder="Larg (cm)" value={formData.largura} onChange={handleChange} required style={{ flex: 1, padding: '0.5rem' }} />
            <input name="altura" type="number" placeholder="Alt (cm)" value={formData.altura} onChange={handleChange} required style={{ flex: 1, padding: '0.5rem' }} />
          </div>
        </section>

        <section>
          <h3>Categorias e SEO</h3>
          <input name="categorias" placeholder="Categorias (separadas por vírgula)" value={formData.categorias} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }} />
          <input name="tags_busca" placeholder="Tags de Busca (separadas por vírgula)" value={formData.tags_busca} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }} />
          <input name="seo_titulo" placeholder="Título SEO" value={formData.seo_titulo} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }} />
          <input name="seo_descricao" placeholder="Meta Descrição" value={formData.seo_descricao} onChange={handleChange} style={{ width: '100%', padding: '0.5rem' }} />
        </section>

        <section>
          <h3>Imagens</h3>
          <input type="file" onChange={handleImageUpload} accept="image/*" />
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            {formData.imagens.map((img, idx) => (
              <img key={idx} src={img} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
            ))}
          </div>
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
          {loading ? 'Salvando...' : 'Salvar Produto'}
        </button>
      </form>
    </div>
  );
}