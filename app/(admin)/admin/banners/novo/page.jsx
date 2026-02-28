'use client';

import BannerForm from '../BannerForm';
import styles from '../Banners.module.css';
import Link from 'next/link';

export default function NovoBannerPage() {
  return (
    <div className={styles.bannersContainer}>
      <div className={styles.header}>
        <h1>Novo Banner</h1>
        <Link href="/admin/banners" className={styles.cancelButton} style={{textDecoration: 'none'}}>
          Voltar
        </Link>
      </div>
      <BannerForm />
    </div>
  );
}
