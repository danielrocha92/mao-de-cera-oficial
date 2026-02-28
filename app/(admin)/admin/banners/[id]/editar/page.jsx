'use client';

import BannerForm from '../../BannerForm';
import styles from '../../Banners.module.css';
import Link from 'next/link';

export default function EditarBannerPage({ params }) {
  return (
    <div className={styles.bannersContainer}>
      <div className={styles.header}>
        <h1>Editar Banner</h1>
        <Link href="/admin/banners" className={styles.cancelButton} style={{textDecoration: 'none'}}>
          Voltar
        </Link>
      </div>
      <BannerForm isEditing bannerId={params.id} />
    </div>
  );
}
