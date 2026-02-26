'use client';

import React, { useState, useEffect } from 'react';
import { FaTrash, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import Modal from '@/components/ui/Modal';
import styles from './Categorias.module.css';

export default function CategoriasPage() {
  const [categories, setCategories] = useState([]);
  const [newCatName, setNewCatName] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modal de Exclusão
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

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
        body: JSON.stringify({ nome: newCatName, slug }),
      });

      if (response.ok) {
        setNewCatName('');
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
             <input
               type="text"
               className={styles.inputField}
               placeholder="Ex: Velas Aromáticas, Acessórios..."
               value={newCatName}
               onChange={(e) => setNewCatName(e.target.value)}
               required
               disabled={isSubmitting}
             />
             <button type="submit" className={styles.saveButton} disabled={isSubmitting || !newCatName.trim()}>
                {isSubmitting ? 'Salvando...' : 'Adicionar'}
             </button>
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
                    <th>URL Amigável (Slug)</th>
                    <th style={{textAlign: 'right'}}>Ações</th>
                 </tr>
               </thead>
               <tbody>
                 {categories.map(cat => (
                   <tr key={cat.id}>
                     <td><strong>{cat.nome}</strong></td>
                     <td><span style={{backgroundColor: 'var(--background)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem'}}>{cat.slug}</span></td>
                     <td style={{textAlign: 'right'}}>
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
    </div>
  );
}
