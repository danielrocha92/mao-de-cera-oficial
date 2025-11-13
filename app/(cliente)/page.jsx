import styles from './Home.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bem-vindo à Mão de Cera Oficial</h1>
      <p className={styles.subtitle}>Sua loja de produtos artesanais.</p>
      {/* TODO: Add featured products, banners, etc. */}
    </div>
  );
}
