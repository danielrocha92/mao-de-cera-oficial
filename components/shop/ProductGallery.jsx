'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './ProductGallery.module.css';

const ProductGallery = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = useState(images[0] || "https://placehold.co/500");

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImage}>
        <Image
          src={selectedImage}
          alt={productName}
          width={600}
          height={600}
          priority
          className={styles.mainImg}
        />
      </div>
      <div className={styles.thumbnails}>
        {images.map((img, index) => (
          <div
            key={index}
            className={`${styles.thumbnail} ${selectedImage === img ? styles.selected : ''}`}
            onClick={() => setSelectedImage(img)}
          >
            <Image
              src={img}
              alt={`${productName} - ${index + 1}`}
              width={80}
              height={80}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
