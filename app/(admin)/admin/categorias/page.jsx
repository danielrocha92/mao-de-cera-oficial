'use client';

import React, { useState, useEffect } from 'react';
import { FaTrash, FaCheckCircle, FaExclamationCircle, FaEdit, FaImage } from 'react-icons/fa';
import Modal from '@/components/ui/Modal';
import ImageUpload from '@/components/ui/ImageUpload';
import styles from './Categorias.module.css';

export default function CategoriasPage() {
  const [categories, setCategories] = useState([]);
  const [newCatName, setNewCatName] = useState('');
  const [newCatImage, setNewCatImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modal de Exclusão
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  // Modal de Edição
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [editCatName, setEditCatName] = useState('');
  const [editCatImage, setEditCatImage] = useState('');

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/categorias');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error("Erro ao carregar categorias", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    setIsSubmitting(true);
    try {
      // Cria slug simples
      const slug = newCatName.toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special chars
        .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with dashes
        .replace(/^-+|-+$/g, ''); // Trim dashes

      const response = await fetch('/api/categorias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome: newCatName, slug, imagem: newCatImage }),
      });

      if (response.ok) {
        setNewCatName('');
        setNewCatImage('');
        await fetchCategories(); // Recarrega
      } else {
        alert("Falha ao criar categoria.");
      }
    } catch (error) {
      console.error("Erro", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openDeleteModal = (cat) => {
    setCategoryToDelete(cat);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;
    try {
      const response = await fetch(`/api/categorias/${categoryToDelete.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        await fetchCategories();
      } else {
        alert("Falha ao excluir categoria");
      }
    } catch (error) {
       console.error(error);
    } finally {
      setIsModalOpen(false);
      setCategoryToDelete(null);
    }
  };

  const openEditModal = (cat) => {
    setCategoryToEdit(cat);
    setEditCatName(cat.nome);
    setEditCatImage(cat.imagem || '');
    setIsEditModalOpen(true);
  };

  const handleEditCategory = async (e) => {
    e.preventDefault();
    if (!editCatName.trim() || !categoryToEdit) return;

    setIsSubmitting(true);
    try {
      const slug = editCatName.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');

      const response = await fetch(`/api/categorias/${categoryToEdit.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome: editCatName, slug, imagem: editCatImage }),
      });

      if (response.ok) {
        await fetchCategories();
        setIsEditModalOpen(false);
        setCategoryToEdit(null);
        setEditCatName('');
        setEditCatImage('');
      } else {
        alert("Falha ao atualizar categoria.");
      }
    } catch (error) {
      console.error("Erro", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Categorias e Departamentos</h1>
      </div>

      <div className={styles.contentWrapper}>

        {/* Adicionar Nova */}
        <div className={styles.formCard}>
          <h3>Adicionar Nova Categoria</h3>
          <form className={styles.formRow} onSubmit={handleCreateCategory}>
             <div style={{ display: 'flex', gap: '10px', flexDirection: 'column', width: '100%' }}>
               <input
                 type="text"
                 className={styles.inputField}
                 placeholder="Nome da categoria (Ex: Velas Aromáticas)"
                 value={newCatName}
                 onChange={(e) => setNewCatName(e.target.value)}
                 required
                 disabled={isSubmitting}
                 style={{ width: '100%' }}
               />
               <input
                 type="text"
                 className={styles.inputField}
                 placeholder="URL da Imagem da Categoria (opcional)"
                 value={newCatImage}
                 onChange={(e) => setNewCatImage(e.target.value)}
                 disabled={isSubmitting}
                 style={{ width: '100%' }}
               />
               <div style={{ padding: '10px', backgroundColor: 'var(--surface)', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
                  <p style={{ fontSize: '0.85rem', marginBottom: '10px', color: 'var(--text-secondary)' }}>Você também pode enviar a imagem para o sistema clicando abaixo:</p>
                  <ImageUpload onUpload={(url) => setNewCatImage(url)} />
               </div>
               <button type="submit" className={styles.saveButton} disabled={isSubmitting || !newCatName.trim()}>
                  {isSubmitting ? 'Salvando...' : 'Adicionar Nova Categoria'}
               </button>
             </div>
          </form>
        </div>

        {/* Tabela de listagem */}
        <div className={styles.tableContainer}>
          {loading ? (
             <p style={{color: 'var(--text-secondary)'}}>Carregando categorias...</p>
          ) : categories.length === 0 ? (
             <p style={{color: 'var(--text-secondary)'}}>Ainda não há nenhuma categoria cadastrada. Crie a primeira acima!</p>
          ) : (
             <table className={styles.table}>
               <thead>
                 <tr>
                    <th>Nome da Categoria</th>
                    <th>Url Imagem</th>
                    <th>URL Amigável (Slug)</th>
                    <th style={{textAlign: 'right'}}>Ações</th>
                 </tr>
               </thead>
               <tbody>
                 {categories.map(cat => (
                   <tr key={cat.id}>
                     <td><strong>{cat.nome}</strong></td>
                     <td>
                        {cat.imagem ? (
                          <a href={cat.imagem} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.85rem', color: 'var(--primary)' }}>
                             <FaImage /> Ver Imagem
                          </a>
                        ) : (
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Sem Imagem</span>
                        )}
                     </td>
                     <td><span style={{backgroundColor: 'var(--background)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem'}}>{cat.slug}</span></td>
                     <td style={{textAlign: 'right'}}>
                       <button onClick={() => openEditModal(cat)} className={styles.editButton} title="Editar Categoria">
                          <FaEdit size={14} /> Editar
                       </button>
                       <button onClick={() => openDeleteModal(cat)} className={styles.deleteButton} title="Excluir Categoria">
                          <FaTrash size={14} /> Excluir
                       </button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        title="Confirmar Exclusão"
      >
        <p>Tem certeza de que deseja excluir a categoria <strong>{categoryToDelete?.nome}</strong>?</p>
        <p style={{fontSize: '0.85rem', color: '#e74c3c', marginTop: '10px'}}>
           <FaExclamationCircle /> Os produtos atrelados não serão deletados, mas ficarão sem essa categoria visível.
        </p>
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onConfirm={handleEditCategory}
        title="Editar Categoria"
      >
        <form className={styles.formRow} style={{ marginTop: '1rem', flexDirection: 'column', gap: '10px' }} onSubmit={handleEditCategory}>
          <input
            type="text"
            className={styles.inputField}
            placeholder="Nome da Categoria"
            value={editCatName}
            onChange={(e) => setEditCatName(e.target.value)}
            required
            disabled={isSubmitting}
            style={{ width: '100%' }}
          />
          <input
            type="text"
            className={styles.inputField}
            placeholder="URL da Imagem da Categoria (opcional)"
            value={editCatImage}
            onChange={(e) => setEditCatImage(e.target.value)}
            disabled={isSubmitting}
            style={{ width: '100%' }}
          />
          <div style={{ padding: '10px', backgroundColor: 'var(--surface)', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
             <p style={{ fontSize: '0.85rem', marginBottom: '10px', color: 'var(--text-secondary)' }}>Atualizar imagem pelo upload:</p>
             <ImageUpload onUpload={(url) => setEditCatImage(url)} />
          </div>
        </form>
      </Modal>
    </div>
  );
}
