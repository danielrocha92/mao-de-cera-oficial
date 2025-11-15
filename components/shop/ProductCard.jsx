import CustomLink from '../ui/CustomLink';
import Image from 'next/image';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  if (!product) return null;

  const displayPrice = product.preco_promocional || product.preco;

  return (
    <div className={styles.card}>
      <CustomLink href={`/produtos/${product.slug}`}>
        <Image
          src={product.imagens?.[0] || "https://via.placeholder.com/300"}
          alt={product.nome}
          width={300}
          height={300}
          className={styles.image}
        />
        <h3 className={styles.name}>{product.nome}</h3>
        <div className={styles.priceContainer}>
          {product.preco_promocional && (
            <span className={styles.oldPrice}>R$ {product.preco.toFixed(2)}</span>
          )}
          <span className={styles.price}>R$ {displayPrice.toFixed(2)}</span>
        </div>
      </CustomLink>
    </div>
  );
};

export default ProductCard;
