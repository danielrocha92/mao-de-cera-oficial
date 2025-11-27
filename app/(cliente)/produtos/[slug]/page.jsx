import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { db } from '@/lib/firebaseAdmin';
import AddToCartButton from '@/components/shop/AddToCartButton'; // We'll create this component
import FreightCalculator from '@/components/shop/FreightCalculator'; // We'll create this component
import styles from './page.module.css';

async function getProduct(slug) {
  try {
    const snapshot = await db.collection('produtos').where('slug', '==', slug).limit(1).get();
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    return null;
  }
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {/* Gallery */}
        <div className={styles.gallery}>
          <div className={styles.mainImage}>
             <Image
               src={product.imagens?.[0] || product.images?.[0] || "https://placehold.co/500"}
               alt={product.nome || product.title}
               width={500}
               height={500}
               priority
             />
          </div>
          <div className={styles.thumbnails}>
            {(product.imagens || product.images)?.map((img, index) => (
              <div key={index} className={styles.thumbnail}>
                <Image src={img} alt={`${product.nome || product.title} - ${index + 1}`} width={80} height={80} />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className={styles.info}>
          <h1 className={styles.title}>{product.nome || product.title}</h1>
          <div className={styles.priceWrapper}>
            {(product.preco_promocional || product.comparePrice) && (
               <span className={styles.oldPrice}>R$ {Number(product.preco || product.price).toFixed(2)}</span>
            )}
            <span className={styles.price}>
              R$ {Number(product.preco_promocional || product.comparePrice || product.preco || product.price).toFixed(2)}
            </span>
          </div>

          <div className={styles.description}>
            <p>{product.descricao || product.description}</p>
          </div>

          <div className={styles.actions}>
            <AddToCartButton product={product} />
          </div>

          <div className={styles.freight}>
            <FreightCalculator />
          </div>
        </div>
      </div>
    </div>
  );
}
