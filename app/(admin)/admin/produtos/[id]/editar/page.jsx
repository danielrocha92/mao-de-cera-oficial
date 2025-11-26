'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import styles from '../../novo/NovoProduto.module.css'; // Reusing the same styles
import ImageUpload from '@/components/ui/ImageUpload';
import VariationsManager from '@/components/admin/VariationsManager';

export default function EditarProdutoPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    comparePrice: '',
    sku: '',
    stock: '',
    allowPurchaseWithoutStock: false,
    weight: '',
    length: '',
    width: '',
    height: '',
    images: [],
    variations: [],
    skus: {},
    category: '',
    brand: '',
    tags: '',
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`/api/produtos/${id}`);
          if (!response.ok) {
            throw new Error('Falha ao buscar produto');
          }
          const data = await response.json();
          setProduct(data);
        } catch (error) {
          console.error(error);
          setMessage('Erro ao carregar produto.');
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageUpload = (url) => {
    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, url],
    }));
  };

  const handleVariationsChange = useCallback((variations) => {
    setProduct((prev) => ({
        ...prev,
        variations: variations,
    }));
  }, []);

  const handleSkusChange = useCallback((skus) => {
    setProduct((prev) => ({
        ...prev,
        skus: skus,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`/api/produtos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error('Falha ao atualizar produto');
      }

      setMessage('Produto atualizado com sucesso!');
      setTimeout(() => {
        router.push('/admin/produtos');
      }, 2000);
    } catch (error) {
      console.error(error);
      setMessage('Erro ao atualizar produto.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.novoProdutoContainer}>
      <h1>Editar Produto</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.card}>
          <h2>Informações Principais</h2>
          <div className={styles.formGroup}>
            <label htmlFor="title">Título</label>
            <input
              type="text"
              id="title"
              name="title"
              value={product.title}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
        </div>

        <div className={styles.card}>
            <h2>Imagens</h2>
            <ImageUpload onUpload={handleImageUpload} />
        </div>
        
        <div className={styles.card}>
            <VariationsManager 
                initialVariations={product.variations} 
                onChange={handleVariationsChange} 
                onSkuChange={handleSkusChange}
            />
        </div>

        <div className={styles.card}>
          <h2>Preços</h2>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="price">Preço de Venda</label>
              <input
                type="number"
                id="price"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="comparePrice">Preço de Comparação (Opcional)</label>
              <input
                type="number"
                id="comparePrice"
                name="comparePrice"
                value={product.comparePrice}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
          </div>
        </div>

        <div className={styles.card}>
            <h2>Organização</h2>
            <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                    <label htmlFor="category">Categoria</label>
                    <input type="text" id="category" name="category" value={product.category} onChange={handleChange} autoComplete="off" />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="brand">Marca</label>
                    <input type="text" id="brand" name="brand" value={product.brand} onChange={handleChange} autoComplete="off" />
                </div>
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="tags">Tags (separadas por vírgula)</label>
                <input type="text" id="tags" name="tags" value={product.tags} onChange={handleChange} autoComplete="off" />
            </div>
        </div>

        <div className={styles.card}>
            <h2>Inventário</h2>
            <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                    <label htmlFor="sku">SKU (Código)</label>
                    <input type="text" id="sku" name="sku" value={product.sku} onChange={handleChange} autoComplete="off" />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="stock">Estoque</label>
                    <input type="number" id="stock" name="stock" value={product.stock} onChange={handleChange} autoComplete="off" />
                </div>
            </div>
            <div className={styles.formGroup}>
                <label className={styles.checkboxLabel}>
                    <input type="checkbox" name="allowPurchaseWithoutStock" checked={product.allowPurchaseWithoutStock} onChange={handleChange} />
                    <span>Permitir compra mesmo sem estoque</span>
                </label>
            </div>
        </div>

        <div className={styles.card}>
            <h2>Envio</h2>
            <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                    <label htmlFor="weight">Peso (kg)</label>
                    <input type="number" id="weight" name="weight" value={product.weight} onChange={handleChange} autoComplete="off" />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="length">Comprimento (cm)</label>
                    <input type="number" id="length" name="length" value={product.length} onChange={handleChange} autoComplete="off" />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="width">Largura (cm)</label>
                    <input type="number" id="width" name="width" value={product.width} onChange={handleChange} autoComplete="off" />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="height">Altura (cm)</label>
                    <input type="number" id="height" name="height" value={product.height} onChange={handleChange} autoComplete="off" />
                </div>
            </div>
        </div>
        <div className={styles.actions}>
          <button type="submit" className={styles.saveButton} disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </form>
    </div>
  );
}