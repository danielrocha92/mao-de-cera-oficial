import CustomLink from '../ui/CustomLink';
import Image from 'next/image';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  if (!product) return null;

  const numericPrice = parseFloat(product.price);
  const numericComparePrice = product.comparePrice ? parseFloat(product.comparePrice) : null;

  const displayPrice = numericComparePrice || numericPrice;

  return (
    <div className={styles.card}>
      <CustomLink href={`/produtos/${product.slug}`}>
        <Image
          src={product.images?.[0] || "https://via.placeholder.com/300"}
          alt={product.title}
          width={300}
          height={300}
          className={styles.image}
        />
        <h3 className={styles.name}>{product.title}</h3>
        <div className={styles.priceContainer}>
          {numericComparePrice && !isNaN(numericPrice) && (
            <span className={styles.oldPrice}>R$ {numericPrice.toFixed(2)}</span>
          )}
          {!isNaN(displayPrice) && (
            <span className={styles.price}>R$ {displayPrice.toFixed(2)}</span>
          )}
        </div>
      </CustomLink>
    </div>
  );
};

export default ProductCard;

