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
      categorias: [], // Changed to array
      tags_busca: '', seo: { titulo: '', meta_descricao: '' },
      video_link: '',
      exibir_preco: true,
      tipo_fisico: true,
      tipo_digital_servico: false,
      estoque_tipo: 'infinito',
      motivo_estoque: '',
      codigo_barras: '',
      mpn: '',
      faixa_etaria: '',
      sexo: ''
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
  
    const handleCategoryChange = (e) => {
      const { name, checked } = e.target;
      const categoryName = name.replace('categoria_', '').replace(/_/g, ' '); // Convert name back to category string
      setProduct(prev => {
        if (checked) {
          return { ...prev, categorias: [...prev.categorias, categoryName] };
        } else {
          return { ...prev, categorias: prev.categorias.filter(cat => cat !== categoryName) };
        }
      });
    };
  
    const handleImageUpload = async (e) => {
      const files = Array.from(e.target.files);
      if (files.length > 0) {
        // In a real app, show a loading state
        const uploadPromises = files.map(file => uploadToCloudinary(file));
        const imageUrls = await Promise.all(uploadPromises);
        setProduct(prev => ({ ...prev, imagens: [...prev.imagens, ...imageUrls] }));
      }
    };
  
    const handleDeleteImage = (indexToDelete) => {
      setProduct(prev => ({
        ...prev,
        imagens: prev.imagens.filter((_, index) => index !== indexToDelete)
      }));
    };
  
    const handleSetMainImage = (indexToSet) => {
      setProduct(prev => {
        const newImages = [...prev.imagens];
        const [mainImage] = newImages.splice(indexToSet, 1);
        newImages.unshift(mainImage); // Move to the beginning
        return { ...prev, imagens: newImages };
      });
    };
  
    const calculateProfitMargin = () => {
      if (product.preco > 0 && product.custo > 0) {
        return (((product.preco - product.custo) / product.preco) * 100).toFixed(2);
      }
      return '0.00';
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // TODO: Add validation
      const res = await fetch('/api/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...product,
          // categories are already an array
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
          <div>
            <label htmlFor="descricao">Descrição:</label>
            <textarea 
              id="descricao"
              name="descricao" 
              placeholder="Descrição" 
              value={product.descricao} 
              onChange={handleChange} 
              className={styles.textarea}
            ></textarea>
            <Button type="button" onClick={() => console.log('Gerar descrição com IA')}>Gerar com IA</Button>
          </div>
          
          <fieldset className={styles.fieldset}>
            <legend>Preços</legend>
            <div className={styles.formGrid}>
              <Input name="preco" label="Preço de venda" type="number" value={product.preco} onChange={handleChange} />
              <Input name="preco_promocional" label="Preço promocional" type="number" value={product.preco_promocional} onChange={handleChange} />
              <Input name="custo" label="Custo" type="number" value={product.custo} onChange={handleChange} />
              <div>
                <label className={styles.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    name="exibir_preco" 
                    checked={product.exibir_preco} 
                    onChange={(e) => setProduct(prev => ({ ...prev, exibir_preco: e.target.checked }))} 
                  />
                  Exibir o preço na loja
                </label>
              </div>
              <div className={styles.profitMargin}>
                <span>Margem de lucro: </span>
                <span>{calculateProfitMargin()}%</span>
              </div>
            </div>
          </fieldset>
  
          <fieldset className={styles.fieldset}>
            <legend>Tipo de produto</legend>
            <div>
              <label className={styles.checkboxLabel}>
                <input 
                  type="checkbox" 
                  name="tipo_fisico" 
                  checked={product.tipo_fisico} 
                  onChange={(e) => setProduct(prev => ({ ...prev, tipo_fisico: e.target.checked }))} 
                />
                Físico
              </label>
              <label className={styles.checkboxLabel}>
                <input 
                  type="checkbox" 
                  name="tipo_digital_servico" 
                  checked={product.tipo_digital_servico} 
                  onChange={(e) => setProduct(prev => ({ ...prev, tipo_digital_servico: e.target.checked }))} 
                />
                Digital / serviço
              </label>
            </div>
          </fieldset>
  
          <fieldset className={styles.fieldset}>
            <legend>Inventário</legend>
            <div>
              <label className={styles.radioLabel}>
                <input 
                  type="radio" 
                  name="estoque_tipo" 
                  value="infinito" 
                  checked={product.estoque_tipo === 'infinito'} 
                  onChange={(e) => setProduct(prev => ({ ...prev, estoque_tipo: e.target.value }))} 
                />
                Infinito
              </label>
              <label className={styles.radioLabel}>
                <input 
                  type="radio" 
                  name="estoque_tipo" 
                  value="limitado" 
                  checked={product.estoque_tipo === 'limitado'} 
                  onChange={(e) => setProduct(prev => ({ ...prev, estoque_tipo: e.target.value }))} 
                />
                Limitado
              </label>
            </div>
            {product.estoque_tipo === 'limitado' && (
              <>
                <Input name="estoque" label="Quantidade em estoque" type="number" value={product.estoque} onChange={handleChange} />
                <textarea 
                  name="motivo_estoque" 
                  placeholder="Motivo (opcional)" 
                  value={product.motivo_estoque || ''} 
                  onChange={handleChange} 
                  className={styles.textarea}
                  maxLength={40}
                ></textarea>
                <div className={styles.inventoryActions}>
                  <Button type="button" variant="secondary">Cancelar</Button>
                  <Button type="button">Salvar</Button>
                  <Button type="button" variant="link">Ver histórico de estoque</Button>
                </div>
              </>
            )}
          </fieldset>
  
          <fieldset className={styles.fieldset}>
            <legend>Códigos</legend>
            <Input name="sku" label="SKU" value={product.sku} onChange={handleChange} />
            <Input name="codigo_barras" label="Código de barras" value={product.codigo_barras || ''} onChange={handleChange} />
          </fieldset>
  
          <fieldset className={styles.fieldset}>
            <legend>Peso e dimensões</legend>
            <p className={styles.helpText}>Preencha os dados para calcular o custo de envio dos produtos e mostrar os meios de envio na sua loja.</p>
            <Button type="button" onClick={() => console.log('Gerar peso e dimensões com IA')}>Gerar com IA</Button>
            <div className={styles.formGrid}>
              <Input name="peso_kg" label="Peso (kg)" type="number" value={product.peso_kg} onChange={handleChange} />
              <Input name="dimensoes_cm.comprimento" label="Comprimento (cm)" type="number" value={product.dimensoes_cm.comprimento} onChange={handleChange} />
              <Input name="dimensoes_cm.largura" label="Largura (cm)" type="number" value={product.dimensoes_cm.largura} onChange={handleChange} />
              <Input name="dimensoes_cm.altura" label="Altura (cm)" type="number" value={product.dimensoes_cm.altura} onChange={handleChange} />
            </div>
            <p className={styles.helpText}>
              <a href="#" onClick={(e) => { e.preventDefault(); console.log('Mais sobre calcular peso e dimensões'); }}>Mais sobre calcular peso e dimensões</a>
            </p>
          </fieldset>
  
          <fieldset className={styles.fieldset}>
            <legend>Instagram e Google Shopping</legend>
            <p className={styles.helpText}>Destaque seus produtos nas vitrines virtuais do Instagram e do Google gratuitamente.</p>
            <Input name="mpn" label="MPN" value={product.mpn || ''} onChange={handleChange} />
            <div>
              <label htmlFor="faixa_etaria">Faixa etária</label>
              <select 
                id="faixa_etaria" 
                name="faixa_etaria" 
                value={product.faixa_etaria || ''} 
                onChange={handleChange} 
                className={styles.select}
              >
                <option value="">Selecione a faixa etária</option>
                <option value="infant">Infantil</option>
                <option value="adult">Adulto</option>
                <option value="all">Todas</option>
              </select>
            </div>
            <div>
              <label htmlFor="sexo">Sexo</label>
              <select 
                id="sexo" 
                name="sexo" 
                value={product.sexo || ''} 
                onChange={handleChange} 
                className={styles.select}
              >
                <option value="">Selecione o sexo</option>
                <option value="male">Masculino</option>
                <option value="female">Feminino</option>
                <option value="unisex">Unissex</option>
              </select>
            </div>
            <p className={styles.helpText}>
              <a href="#" onClick={(e) => { e.preventDefault(); console.log('Como preencher essas informações?'); }}>Como preencher essas informações?</a>
            </p>
          </fieldset>
  
          <fieldset className={styles.fieldset}>
            <legend>Categorias</legend>
            {/* Placeholder for category selection */}
            <div className={styles.categorySelection}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" name="categoria_velas" checked={product.categorias.includes('Velas')} onChange={handleCategoryChange} />
                Velas
              </label>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" name="categoria_ofertas" checked={product.categorias.includes('Ofertas')} onChange={handleCategoryChange} />
                Ofertas
              </label>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" name="categoria_colecoes" checked={product.categorias.includes('Coleções')} onChange={handleCategoryChange} />
                Coleções
              </label>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" name="categoria_cera_e_frutas" checked={product.categorias.includes('Cera e Frutas')} onChange={handleCategoryChange} />
                Cera e Frutas
              </label>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" name="categoria_black_friday" checked={product.categorias.includes('Black Friday')} onChange={handleCategoryChange} />
                Black Friday
              </label>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" name="categoria_compre4pague3" checked={product.categorias.includes('Compre 4 Pague 3')} onChange={handleCategoryChange} />
                Compre 4 Pague 3
              </label>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" name="categoria_compre3pague2" checked={product.categorias.includes('Compre 3 Pague 2')} onChange={handleCategoryChange} />
                Compre 3 Pague 2
              </label>
            </div>
            <Button type="button" variant="link" onClick={() => console.log('Editar categorias')}>Editar categorias</Button>
          </fieldset>
  
          <fieldset className={styles.fieldset}>
          <legend>Variações</legend>
          <p className={styles.helpText}>Combine diferentes propriedades do seu produto. Exemplo: cor + tamanho.</p>
          <Button type="button" onClick={() => console.log('Adicionar variações')}>Adicionar variações</Button>
        </fieldset>

        <Input name="tags_busca" label="Tags de Busca (separadas por vírgula)" value={product.tags_busca} onChange={handleChange} />

        <fieldset className={styles.fieldset}>
          <legend>Fotos e vídeo</legend>
          <div>
            <label>Arraste e solte, ou selecione fotos do produto</label>
            <Input type="file" name="imagem" onChange={handleImageUpload} multiple accept="image/*" />
            <p className={styles.imageUploadHint}>Tamanho mínimo recomendado: 1024px / Formatos recomendados: WEBP, PNG, JPEG ou GIF</p>
          </div>
          <div className={styles.imageList}>
            {product.imagens.map((url, index) => (
              <div key={url} className={styles.imagePreviewContainer}>
                <Image src={url} alt="Preview" width={100} height={100} style={{ objectFit: 'cover', borderRadius: '5px' }}/>
                <button type="button" className={styles.deleteImageButton} onClick={() => handleDeleteImage(index)}>X</button>
                <label className={styles.mainImageCheckbox}>
                  <input 
                    type="radio" 
                    name="mainImage" 
                    checked={product.imagens[0] === url} 
                    onChange={() => handleSetMainImage(index)} 
                  />
                  Principal
                </label>
              </div>
            ))}
          </div>
          <Input 
            name="video_link" 
            label="Link externo (Youtube ou Vimeo)" 
            value={product.video_link || ''} 
            onChange={handleChange} 
            placeholder="Cole um link do Youtube ou do Vimeo"
          />
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
