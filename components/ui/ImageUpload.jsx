'use client';

import { useState } from 'react';
import styles from './ImageUpload.module.css';
import { CldUploadWidget } from 'next-cloudinary';

export default function ImageUpload({ onUpload }) {
  const [previews, setPreviews] = useState([]);
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const handleUploadSuccess = (result) => {
    const newUrl = result.info.secure_url;
    setPreviews((prev) => [...prev, newUrl]);
    onUpload(newUrl);
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

      <CldUploadWidget
        uploadPreset={uploadPreset}
        onSuccess={handleUploadSuccess}
      >
        {({ open }) => {
          return (
            <button 
              className={styles.uploadButton} 
              onClick={() => open()}
              disabled={!uploadPreset}
            >
              {uploadPreset ? 'Upload an Image' : 'Configure Cloudinary Upload Preset'}
            </button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
