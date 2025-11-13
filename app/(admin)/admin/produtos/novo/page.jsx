'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './FormProduto.module.css';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { uploadToCloudinary } from '@/lib/cloudinary';

export default function NovoProdutoPage() {
  const [product, setProduct] = useState({
    nome: '', slug: '', descricao: '', imagens: [], preco: 0,
    preco_promocional: 0, custo: 0, sku: '', estoque: 0, peso_kg: 0,
    dimensoes_cm: { comprimento: 0, largura: 0, altura: 0 },
    categorias: '', tags_busca: '', seo: { titulo: '', meta_descricao: '' }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProduct(prev => ({ ...prev, [parent]: { ...prev[parent], [child]: value } }));
    } else {
      setProduct(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, show a loading state
      const imageUrl = await uploadToCloudinary(file);
      setProduct(prev => ({ ...prev, imagens: [...prev.imagens, imageUrl] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Add validation
    const res = await fetch('/api/produtos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...product,
        categorias: product.categorias.split(',').map(s => s.trim()),
        tags_busca: product.tags_busca.split(',').map(s => s.trim()),
      })
    });
    if (res.ok) {
      alert('Produto criado com sucesso!');
      // TODO: Redirect or clear form
    } else {
      alert('Falha ao criar produto.');
    }
  };

  return (
    <div>
      <h1>Novo Produto</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input name="nome" label="Nome do Produto" value={product.nome} onChange={handleChange} />
        <Input name="slug" label="Slug (URL)" value={product.slug} onChange={handleChange} />
        <textarea name="descricao" placeholder="Descrição" value={product.descricao} onChange={handleChange} className={styles.textarea}></textarea>
        
        <div className={styles.formGrid}>
          <Input name="preco" label="Preço" type="number" value={product.preco} onChange={handleChange} />
          <Input name="preco_promocional" label="Preço Promocional" type="number" value={product.preco_promocional} onChange={handleChange} />
          <Input name="custo" label="Custo" type="number" value={product.custo} onChange={handleChange} />
          <Input name="sku" label="SKU" value={product.sku} onChange={handleChange} />
          <Input name="estoque" label="Estoque (-1 para infinito)" type="number" value={product.estoque} onChange={handleChange} />
          <Input name="peso_kg" label="Peso (kg)" type="number" value={product.peso_kg} onChange={handleChange} />
        </div>

        <fieldset className={styles.fieldset}>
          <legend>Dimensões (cm)</legend>
          <div className={styles.formGrid}>
            <Input name="dimensoes_cm.comprimento" label="Comprimento" type="number" value={product.dimensoes_cm.comprimento} onChange={handleChange} />
            <Input name="dimensoes_cm.largura" label="Largura" type="number" value={product.dimensoes_cm.largura} onChange={handleChange} />
            <Input name="dimensoes_cm.altura" label="Altura" type="number" value={product.dimensoes_cm.altura} onChange={handleChange} />
          </div>
        </fieldset>

        <Input name="categorias" label="Categorias (separadas por vírgula)" value={product.categorias} onChange={handleChange} />
        <Input name="tags_busca" label="Tags de Busca (separadas por vírgula)" value={product.tags_busca} onChange={handleChange} />

        <fieldset className={styles.fieldset}>
          <legend>Imagens</legend>
          <Input type="file" name="imagem" label="Adicionar Imagem" onChange={handleImageUpload} />
          <div className={styles.imageList}>
            {product.imagens.map(url => (
              <Image key={url} src={url} alt="Preview" width={100} height={100} style={{ objectFit: 'cover', borderRadius: '5px' }}/>
            ))}
          </div>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend>SEO</legend>
          <Input name="seo.titulo" label="Título SEO" value={product.seo.titulo} onChange={handleChange} />
          <Input name="seo.meta_descricao" label="Meta Descrição SEO" value={product.seo.meta_descricao} onChange={handleChange} />
        </fieldset>

        <Button type="submit">Salvar Produto</Button>
      </form>
    </div>
  );
}
