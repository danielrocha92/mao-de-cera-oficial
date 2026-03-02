'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// Import ReactQuill dynamically to avoid SSR errors
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <div style={{ height: '300px', backgroundColor: '#f0f0f0', borderRadius: '4px', border: '1px solid #ccc' }}>Carregando editor...</div>,
});

const RichTextEditor = ({ value, onChange, placeholder }) => {
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'clean'],
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link',
  ];

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <ReactQuill
        theme="snow"
        value={value || ''}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        style={{ height: '300px', marginBottom: '40px' }} // Spacing for toolbar
      />
    </div>
  );
};

export default RichTextEditor;
