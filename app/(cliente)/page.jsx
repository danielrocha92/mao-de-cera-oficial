import React from 'react';
import { db } from '@/lib/firebaseAdmin';
import ProductCard from '@/components/shop/ProductCard';
import BannerCarousel from '@/components/shop/BannerCarousel';
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

async function getBanners() {
  try {
    const snapshot = await db.collection('banners').where('ativo', '==', true).get();
    const banners = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    // Return a default banner if not found
    if (banners.length === 0) {
       return [{
          id: 'default',
          tipo: 'video',
          mediaUrl: 'https://res.cloudinary.com/demo/video/upload/v1687253549/samples/sea-turtle.mp4',
          titulo: 'Ilumine seus momentos',
          descricao: 'Velas aromáticas artesanais feitas com amor e cera 100% vegetal.',
          link: '/produtos',
          textoBotao: 'Ver Coleção'
       }];
    }
    return banners;
  } catch (error) {
    console.error("Erro ao buscar banners:", error);
    return [{
       id: 'default',
       tipo: 'video',
       mediaUrl: 'https://res.cloudinary.com/demo/video/upload/v1687253549/samples/sea-turtle.mp4',
       titulo: 'Ilumine seus momentos',
       descricao: 'Velas aromáticas artesanais feitas com amor e cera 100% vegetal.',
       link: '/produtos',
       textoBotao: 'Ver Coleção'
    }];
  }
}

export default async function Home() {
  const products = await getProducts();
  const banners = await getBanners();

  return (
    <div className={styles.homeContainer}>
      {/* Hero Carousel Section */}
      <BannerCarousel banners={banners} />

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
