import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { db } from '@/lib/firebaseAdmin';
import AddToCartButton from '@/components/shop/AddToCartButton'; // We'll create this component
import FreightCalculator from '@/components/shop/FreightCalculator'; // We'll create this component
import ProductGallery from '@/components/shop/ProductGallery';
import styles from './page.module.css';

async function getProduct(slugOrId) {
  try {
    const decodedSlug = decodeURIComponent(slugOrId).trim();
    console.log(`Looking up product: "${slugOrId}" (decoded: "${decodedSlug}")`);

    // Try by slug first (exact match)
    let snapshot = await db.collection('produtos').where('slug', '==', slugOrId).limit(1).get();

    // Try by decoded slug if different
    if (snapshot.empty && slugOrId !== decodedSlug) {
       snapshot = await db.collection('produtos').where('slug', '==', decodedSlug).limit(1).get();
    }

    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    }

    // If not found by slug, try by ID
    const doc = await db.collection('produtos').doc(slugOrId).get();
    if (doc.exists) {
      return { id: doc.id, ...doc.data() };
    }

    return null;
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    return null;
  }
}

export default async function ProductPage({ params }) {
  console.log('--- ProductPage Debug ---');
  console.log('Params:', params);

  const product = await getProduct(params.slug);
  console.log('Product result:', product ? `Found (ID: ${product.id})` : 'Not Found');

  if (product) {
    // Filter out blob URLs
    const originalImages = product.imagens || product.images || [];
    const validImages = originalImages.filter(url => !url.startsWith('blob:'));
    console.log('Images filtered:', { original: originalImages.length, valid: validImages.length });

    product.imagens = validImages;
    product.images = validImages;
  }

  if (!product) {
    console.log('Triggering notFound()');
    notFound();
  }

  return (
    <div className={styles.container}>
      {/* Breadcrumbs Placeholder */}
      <div className={styles.breadcrumbs}>
        Home / Produtos / {product.nome || product.title}
      </div>

      <div className={styles.grid}>
        {/* Gallery */}
        <ProductGallery
          images={product.imagens || product.images || []}
          productName={product.nome || product.title}
        />

        {/* Info */}
        <div className={styles.info}>
          <h1 className={styles.title}>{product.nome || product.title}</h1>
          <span className={styles.sku}>Cód: {product.id.substring(0, 8).toUpperCase()}</span>

          <div className={styles.priceBox}>
            <div className={styles.priceWrapper}>
              {(product.preco_promocional || product.comparePrice) && (
                 <span className={styles.oldPrice}>De: R$ {Number(product.preco || product.price).toFixed(2)}</span>
              )}
              <span className={styles.price}>
                R$ {Number(product.preco_promocional || product.comparePrice || product.preco || product.price).toFixed(2)}
              </span>
              <span className={styles.installments}>
                à vista no Pix com <strong>10% OFF</strong>
              </span>
              <span className={styles.installments}>
                ou até 3x de R$ {(Number(product.preco_promocional || product.comparePrice || product.preco || product.price) / 3).toFixed(2)} sem juros
              </span>
            </div>

            <div className={styles.actions}>
              <AddToCartButton product={product} />
            </div>

            <div className={styles.freight}>
              <FreightCalculator />
            </div>
          </div>

          <div className={styles.description}>
            <h2>Descrição do Produto</h2>
            <p>{product.descricao || product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );

}
