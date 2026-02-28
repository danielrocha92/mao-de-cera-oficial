'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './Banners.module.css';

export default function BannerForm({ isEditing = false, bannerId = null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    tipo: 'imagem', // 'imagem' ou 'video'
    mediaUrl: '',
    link: '/produtos',
    textoBotao: 'Ver Coleção',
    ativo: true,
  });

  useEffect(() => {
    if (isEditing && bannerId) {
      const fetchBanner = async () => {
        try {
          const response = await fetch(`/api/admin/banners/${bannerId}`);
          if (response.ok) {
            const data = await response.json();
            setFormData(data);
          }
        } catch (error) {
          console.error("Erro ao carregar banner", error);
        }
      };
      fetchBanner();
    }
  }, [isEditing, bannerId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (formData.tipo === 'video' && !file.type.startsWith('video/')) {
        alert('Por favor, selecione um arquivo de vídeo.');
        return;
      }
      if (formData.tipo === 'imagem' && !file.type.startsWith('image/')) {
        alert('Por favor, selecione um arquivo de imagem.');
        return;
      }

      setIsUploading(true);
      setUploadProgress(0);

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

      // Se o Cloudinary estiver configurado, usa a API deles (evitando erro 500 de Base64 muito longo)
      if (cloudName && uploadPreset) {
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
        const fd = new FormData();
        fd.append('file', file);
        fd.append('upload_preset', uploadPreset);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            setUploadProgress(Math.round((event.loaded / event.total) * 100));
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            setFormData((prev) => ({ ...prev, mediaUrl: response.secure_url }));
          } else {
            console.error('Erro Cloudinary:', xhr.responseText);
            alert('Falha ao fazer upload da mídia.');
          }
          setIsUploading(false);
        };

        xhr.onerror = () => {
          alert('Falha na comunicação com servidor de upload.');
          setIsUploading(false);
        };

        xhr.send(fd);
      } else {
        // Fallback antigo (pode causar erro 500 caso o arquivo seja grande)
        const reader = new FileReader();
        reader.onprogress = (event) => {
          if (event.lengthComputable) {
            setUploadProgress(Math.round((event.loaded / event.total) * 100));
          }
        };
        reader.onloadend = () => {
          setFormData((prev) => ({ ...prev, mediaUrl: reader.result }));
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Evita o erro 500 do Firestore caso não use Cloudinary e envie um base64 gigante
      if (formData.mediaUrl && formData.mediaUrl.startsWith('data:') && formData.mediaUrl.length > 900000) {
        alert('A mídia é muito grande para ser salva diretamente no banco de dados. Configure o Cloudinary no arquivo .env.local (NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME e NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET) para permitir mídias maiores.');
        setLoading(false);
        return;
      }

      const url = isEditing ? `/api/admin/banners/${bannerId}` : '/api/admin/banners';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(`Falha ao salvar banner: ${errData.details || errData.error || response.statusText}`);
      }

      router.push('/admin/banners');
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao salvar o banner.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>{isEditing ? 'Editar Banner' : 'Novo Banner'}</h2>
      <form onSubmit={handleSubmit}>

        <div className={styles.formGroup}>
          <label htmlFor="tipo">Tipo de Mídia</label>
          <select id="tipo" name="tipo" value={formData.tipo} onChange={handleChange} required>
            <option value="imagem">Imagem</option>
            <option value="video">Vídeo</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Mídia (Upload)</label>
          <div className={styles.imageUploadGroup}>
            <input
               type="file"
               accept={formData.tipo === 'video' ? "video/*" : "image/*"}
               onChange={handleImageUpload}
               disabled={isUploading}
            />

            {isUploading && (
              <div style={{ width: '100%', marginTop: '10px' }}>
                <progress value={uploadProgress} max="100" style={{ width: '100%', height: '20px' }}></progress>
                <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-color)' }}>
                  Carregando mídia: {uploadProgress}%
                </div>
              </div>
            )}

            {formData.mediaUrl && formData.tipo === 'imagem' && !isUploading && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={formData.mediaUrl} alt="Preview" className={styles.imagePreview} />
            )}
            {formData.mediaUrl && formData.tipo === 'video' && !isUploading && (
              <video src={formData.mediaUrl} className={styles.imagePreview} autoPlay muted loop />
            )}
          </div>
          <small>Ou insira a URL direta da mídia abaixo (ex: Cloudinary ou Firebase Storage):</small>
        </div>

        <div className={styles.formGroup}>
           <label htmlFor="mediaUrl">URL da Mídia Externa</label>
           <input
              type="text"
              id="mediaUrl"
              name="mediaUrl"
              value={formData.mediaUrl}
              onChange={handleChange}
              placeholder="https://exemplo.com/media.mp4"
              required
           />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="titulo">Título Principal</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            placeholder="Ex: Ilumine seus momentos"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="descricao">Descrição (Subtítulo)</label>
          <textarea
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            placeholder="Ex: Velas aromáticas artesanais feitas com amor."
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="link">Link de Redirecionamento</label>
          <input
            type="text"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="/produtos"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="textoBotao">Texto do Botão</label>
          <input
            type="text"
            id="textoBotao"
            name="textoBotao"
            value={formData.textoBotao}
            onChange={handleChange}
            placeholder="Ex: Ver Coleção"
          />
        </div>

        <div className={styles.formGroup}>
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="ativo"
              name="ativo"
              checked={formData.ativo}
              onChange={handleChange}
            />
            <label htmlFor="ativo" style={{ margin: 0 }}>Banner Ativo no Site</label>
          </div>
        </div>

        <div className={styles.formActions}>
          <button type="button" onClick={() => router.push('/admin/banners')} className={styles.cancelButton}>
            Cancelar
          </button>
          <button type="submit" disabled={loading} className={styles.submitButton}>
            {loading ? 'Salvando...' : 'Salvar Banner'}
          </button>
        </div>

      </form>
    </div>
  );
}
