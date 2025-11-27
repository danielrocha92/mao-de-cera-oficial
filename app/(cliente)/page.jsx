import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/firebaseAdmin';
import ProductCard from '@/components/shop/ProductCard';
import CategoryCarousel from '@/components/shop/CategoryCarousel';
import PaymentIcons from '@/components/shop/PaymentIcons';
import ProductCarousel from '@/components/shop/ProductCarousel';
import GoogleReviews from '@/components/shop/GoogleReviews';
import styles from './page.module.css';

// Fetch products directly from Firestore (Server Component)
async function getProducts() {
  try {
    const snapshot = await db.collection('produtos').limit(8).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className={styles.homeContainer}>
      {/* Hero Section */}
      {/* Hero Section with Video Background */}
      <section className={styles.hero}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className={styles.videoBackground}
          // poster="/images/hero-poster.jpg" // Removed to avoid 404
        >
          <source src="https://res.cloudinary.com/demo/video/upload/v1687253549/samples/sea-turtle.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos HTML5.
        </video>
        <div className={styles.heroOverlay}></div>

        <div className={styles.heroContent}>
          <h1>Ilumine seus momentos</h1>
          <p>Velas aromáticas artesanais feitas com amor e cera 100% vegetal.</p>
          <Link href="/produtos" className={styles.ctaButton}>
            Ver Coleção
          </Link>
        </div>
      </section>

      {/* Category Carousel */}
      <CategoryCarousel />

      {/* Payment Icons */}
      <PaymentIcons />

      {/* Lançamentos */}
      <ProductCarousel
        title="Lançamentos"
        products={products.filter(p => p.isLancamento)}
      />

      {/* Ofertas Sazonais */}
      <ProductCarousel
        title="Ofertas Sazonais"
        products={products.filter(p => p.isOferta)}
      />

      {/* Avaliações */}
      <GoogleReviews />

      {/* Featured Products (Mantendo como fallback ou seção geral) */}
      <section className={styles.featured}>
        <h2>Todos os Produtos</h2>
        <div className={styles.grid}>
          {products.length > 0 ? (
            products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>Nenhum produto encontrado.</p>
          )}
        </div>
      </section>


    </div>
  );
}
