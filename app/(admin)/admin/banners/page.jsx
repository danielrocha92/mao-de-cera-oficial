'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Banners.module.css';
import Modal from '@/components/ui/Modal';

export default function BannersPage() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState(null);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/banners');
      if (!response.ok) {
        throw new Error('Falha ao buscar banners');
      }
      const data = await response.json();
      setBanners(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleDelete = (bannerId) => {
    setBannerToDelete(bannerId);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!bannerToDelete) return;

    try {
      const response = await fetch(`/api/admin/banners/${bannerToDelete}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Falha ao excluir banner');
      }

      await fetchBanners(); // Re-fetch list
    } catch (error) {
      console.error(error);
    } finally {
      setIsModalOpen(false);
      setBannerToDelete(null);
    }
  };

  return (
    <>
      <div className={styles.bannersContainer}>
        <div className={styles.header}>
          <h1>Banners e Vídeos (Página Inicial)</h1>
          <Link href="/admin/banners/novo" className={styles.addButton}>
            Adicionar Banner
          </Link>
        </div>
        <div className={styles.tableContainer}>
          {loading ? (
            <p>Carregando banners...</p>
          ) : (
            <table className={styles.bannersTable}>
              <thead>
                <tr>
                  <th>Mídia</th>
                  <th>Título</th>
                  <th>Tipo</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {banners.map((banner) => (
                  <tr key={banner.id}>
                    <td>
                      {banner.tipo === 'video' ? (
                        <video src={banner.mediaUrl} className={styles.mediaPreview} muted />
                      ) : banner.mediaUrl ? (
                         <div style={{ position: 'relative', width: '100px', height: '60px' }}>
                           <Image src={banner.mediaUrl} alt={banner.titulo || 'Banner'} fill style={{objectFit: 'cover', borderRadius: '5px'}} />
                         </div>
                      ) : (
                         <div className={styles.mediaPreview}>Sem mídia</div>
                      )}
                    </td>
                    <td>{banner.titulo || 'Sem título'}</td>
                    <td>{banner.tipo === 'video' ? 'Vídeo' : 'Imagem'}</td>
                    <td>
                      <span className={`${styles.status} ${banner.ativo ? styles.ativo : styles.inativo}`}>
                        {banner.ativo ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className={styles.actions}>
                      <Link href={`/admin/banners/${banner.id}/editar`}>
                        <button className={styles.editButton}>Editar</button>
                      </Link>
                      <button onClick={() => handleDelete(banner.id)} className={styles.deleteButton}>
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
                {banners.length === 0 && !loading && (
                    <tr>
                        <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>
                            Nenhum banner cadastrado. Adicione um para destacar na página inicial.
                        </td>
                    </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        title="Confirmar Exclusão"
      >
        <p>Tem certeza de que deseja excluir este banner? Esta ação é irreversível.</p>
      </Modal>
    </>
  );
}
