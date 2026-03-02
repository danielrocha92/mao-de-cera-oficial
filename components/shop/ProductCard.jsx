'use client';

import CustomLink from '../ui/CustomLink';
import Image from 'next/image';
import styles from './ProductCard.module.css';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { useFavorites } from '../../app/context/FavoritesContext';

const ProductCard = ({ product }) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!product) return null;

  const isFav = isFavorite(product.id);

  const numericPrice = parseFloat(product.price);
  const numericComparePrice = product.comparePrice ? parseFloat(product.comparePrice) : null;

  const images = (product.imagens || product.images || []).filter(url => !url.startsWith('blob:'));
  const mainImage = images[0] || "https://placehold.co/300";

  let safeSlug = product.slug || product.id;
  if (safeSlug && typeof safeSlug === 'string' && safeSlug.includes('http')) {
    const parts = safeSlug.split('/').filter(Boolean);
    safeSlug = parts[parts.length - 1] || product.id;
  }

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
  };

  return (
    <div className={styles.card}>
      <button
        className={`${styles.favoriteButton} ${isFav ? styles.isFavorite : ''}`}
        onClick={handleToggleFavorite}
        aria-label={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      >
        {isFav ? <MdFavorite size={20} /> : <MdFavoriteBorder size={20} />}
      </button>

      <CustomLink href={`/produtos/${safeSlug}`}>
        <div className={styles.imageContainer}>
          <img
            src={mainImage}
            alt={product.nome || product.title}
            className={styles.image}
          />
        </div>
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

