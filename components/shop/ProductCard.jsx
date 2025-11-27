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

  return (
    <div className={styles.card}>
      <CustomLink href={`/produtos/${product.slug || product.id}`}>
        <Image
          src={mainImage}
          alt={product.nome || product.title}
          width={300}
          height={300}
          className={styles.image}
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

