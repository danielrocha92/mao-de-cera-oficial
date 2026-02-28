import CustomLink from '../ui/CustomLink';
import Image from 'next/image';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  if (!product) return null;

  const numericPrice = parseFloat(product.price);
  const numericComparePrice = product.comparePrice ? parseFloat(product.comparePrice) : null;

  const displayPrice = numericComparePrice || numericPrice;

  const images = (product.imagens || product.images || []).filter(url => !url.startsWith('blob:'));
  const mainImage = images[0] || "https://placehold.co/300";

  let safeSlug = product.slug || product.id;
  if (safeSlug && typeof safeSlug === 'string' && safeSlug.includes('http')) {
    const parts = safeSlug.split('/').filter(Boolean);
    safeSlug = parts[parts.length - 1] || product.id;
  }

  return (
    <div className={styles.card}>
      <CustomLink href={`/produtos/${safeSlug}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mainImage}
          alt={product.nome || product.title}
          width={300}
          height={300}
          className={styles.image}
          style={{ objectFit: 'cover' }}
        />
        <h3 className={styles.name}>{product.nome || product.title}</h3>
        <div className={styles.priceContainer}>
          {(product.preco_promocional || product.comparePrice) && (
            <span className={styles.oldPrice}>R$ {Number(product.preco || product.price).toFixed(2)}</span>
          )}
          <span className={styles.price}>
            R$ {Number(product.preco_promocional || product.comparePrice || product.preco || product.price).toFixed(2)}
          </span>
        </div>
      </CustomLink>
    </div>
  );
};

export default ProductCard;

