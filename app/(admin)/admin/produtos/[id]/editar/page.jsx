'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import styles from '../../novo/NovoProduto.module.css'; // Reusing the same styles
import ImageUpload from '@/components/ui/ImageUpload';
import VariationsManager from '@/components/admin/VariationsManager';
import RichTextEditor from '@/components/admin/RichTextEditor';

export default function EditarProdutoPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [product, setProduct] = useState({
    title: '',
    slug: '',
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
    categories: [],
    brand: '',
    tags: '',
    isLancamento: false,
    isOferta: false,
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [availableCategories, setAvailableCategories] = useState([]);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await fetch('/api/categorias');
        if (res.ok) {
          const data = await res.json();
          setAvailableCategories(data);
        }
      } catch (error) {
         console.error(error);
      }
    };
    fetchCats();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`/api/produtos/${id}`);
          if (!response.ok) {
            throw new Error('Falha ao buscar produto');
          }
          const data = await response.json();

          // Normalize data to handle both schemas (English/Portuguese)
          setProduct({
            ...data,
            title: data.title || data.nome || '',
            slug: data.slug || '',
            description: data.description || data.descricao || '',
            price: data.price || data.preco || '',
            comparePrice: data.comparePrice || data.preco_promocional || '',
            stock: data.stock || data.estoque || '',
            images: (data.images || data.imagens || []).filter(url => !url.startsWith('blob:')),
            weight: data.weight || data.peso_kg || '',
            length: data.length || data.dimensoes_cm?.comprimento || '',
            width: data.width || data.dimensoes_cm?.largura || '',
            height: data.height || data.dimensoes_cm?.altura || '',
            categories: Array.isArray(data.categorias)
              ? data.categorias
              : (data.category ? data.category.split(',').map(s=>s.trim()) : []),
            tags: data.tags || (Array.isArray(data.tags_busca) ? data.tags_busca.join(', ') : data.tags_busca) || '',
            isLancamento: !!data.isLancamento,
            isOferta: !!data.isOferta,
          });
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

  const handleCategoryToggle = (catName) => {
    setProduct((prev) => {
      const isSelected = prev.categories.includes(catName);
      return {
        ...prev,
        categories: isSelected
          ? prev.categories.filter((c) => c !== catName)
          : [...prev.categories, catName]
      };
    });
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
      // Prepare data mapping to BOTH schemas to ensure compatibility
      const productData = {
        ...product,
        // English schema
        title: product.title,
        price: Number(product.price),
        comparePrice: product.comparePrice ? Number(product.comparePrice) : null,
        stock: Number(product.stock),
        weight: Number(product.weight),
        length: Number(product.length),
        width: Number(product.width),
        height: Number(product.height),

        // Portuguese schema (syncing)
        nome: product.title,
        descricao: product.description,
        preco: Number(product.price),
        preco_promocional: product.comparePrice ? Number(product.comparePrice) : null,
        estoque: Number(product.stock),
        peso_kg: Number(product.weight),
        dimensoes_cm: {
            comprimento: Number(product.length),
            largura: Number(product.width),
        altura: Number(product.height)
        },
        imagens: product.images,
        categorias: product.categories,
        tags_busca: product.tags.split(',').map(s => s.trim()),
      };

      const response = await fetch(`/api/produtos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
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
            <label htmlFor="slug">Slug / URL (Opcional - Pode manter esse gerado pelo sistema)</label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={product.slug}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="description">Descrição</label>
            <RichTextEditor
              value={product.description}
              onChange={(content) => setProduct(prev => ({ ...prev, description: content }))}
              placeholder="Descrição completa do produto..."
            />
          </div>
          <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" name="isLancamento" checked={product.isLancamento} onChange={handleChange} />
              Lançamento
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" name="isOferta" checked={product.isOferta} onChange={handleChange} />
              Oferta Sazonal
            </label>
          </div>
        </div>

        <div className={styles.card}>
            <h2>Imagens</h2>
            <ImageUpload onUpload={handleImageUpload} />
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                {product.images.map((img, idx) => (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img key={idx} src={img} alt={`Imagem ${idx + 1}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                ))}
            </div>
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
                <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                    <label>Categorias</label>
                    {availableCategories.length === 0 ? (
                      <p style={{ fontSize: '0.85rem', color: '#666' }}>Nenhuma categoria disponível.</p>
                    ) : (
                      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem', marginBottom: '1rem', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: 'var(--surface)' }}>
                        {availableCategories.map((cat) => (
                           <label key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                              <input
                                type="checkbox"
                                checked={product.categories.includes(cat.nome)}
                                onChange={() => handleCategoryToggle(cat.nome)}
                              />
                              {cat.nome}
                           </label>
                        ))}
                      </div>
                    )}
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