'use client';

import { useState } from 'react';
import styles from './ImageUpload.module.css';
import { CldUploadWidget } from 'next-cloudinary';

export default function ImageUpload({ onUpload }) {
  const [previews, setPreviews] = useState([]);
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  console.log('Cloudinary Config:', {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    uploadPreset
  });

  const handleUploadSuccess = (result) => {
    const newUrl = result.info.secure_url;
    setPreviews((prev) => [...prev, newUrl]);
    onUpload(newUrl);
  };

  const handleUploadError = (error) => {
    console.error('Cloudinary Upload Error:', error);
    alert(`Erro no upload: ${error.statusText || error.message || 'Verifique o console para mais detalhes'}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.previews}>
        {previews.map((url, index) => (
          <div key={index} className={styles.preview}>
            <img src={url} alt={`Preview ${index + 1}`} />
          </div>
        ))}
      </div>

      {!uploadPreset ? (
        <div style={{ padding: '1rem', border: '1px dashed red', color: 'red', borderRadius: '4px' }}>
          <p><strong>Erro de Configuração:</strong></p>
          <p>O <code>NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET</code> não está definido.</p>
          <p>Por favor, configure-o no arquivo <code>.env.local</code>.</p>
        </div>
      ) : (
        <CldUploadWidget
          uploadPreset={uploadPreset}
          onSuccess={handleUploadSuccess}
          onError={handleUploadError}
        >
          {({ open }) => {
            return (
              <button
                className={styles.uploadButton}
                onClick={() => open()}
                type="button" // Prevent form submission
              >
                Upload an Image
              </button>
            );
          }}
        </CldUploadWidget>
      )}
    </div>
  );
}
