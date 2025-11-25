'use client';

import React, { useEffect, useState } from 'react';
import styles from './PromocardsAdmin.module.css'; // Will create this CSS module

const AdminPromocardsPage = () => {
  const [promoCards, setPromoCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ title: '', image: '', link: '' });
  const [editingCardId, setEditingCardId] = useState(null);

  const fetchPromoCards = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/promocards');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPromoCards(data);
    } catch (e) {
      console.error("Failed to fetch promotional cards:", e);
      setError("Falha ao carregar cards promocionais.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromoCards();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const method = editingCardId ? 'PUT' : 'POST';
    const url = editingCardId ? `/api/promocards/${editingCardId}` : '/api/promocards';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      setFormData({ title: '', image: '', link: '' });
      setEditingCardId(null);
      fetchPromoCards(); // Re-fetch cards to update the list
    } catch (e) {
      console.error("Failed to save promotional card:", e);
      setError(`Falha ao salvar card: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (card) => {
    setEditingCardId(card.id);
    setFormData({ title: card.title, image: card.image, link: card.link });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este card promocional?")) {
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/promocards/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      fetchPromoCards(); // Re-fetch cards to update the list
    } catch (e) {
      console.error("Failed to delete promotional card:", e);
      setError(`Falha ao excluir card: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Gerenciar Cards Promocionais</h1>

      {loading && <p>Carregando...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Título do Card"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        <input
          type="url"
          name="image"
          placeholder="URL da Imagem"
          value={formData.image}
          onChange={handleInputChange}
          required
        />
        <input
          type="url"
          name="link"
          placeholder="URL do Link"
          value={formData.link}
          onChange={handleInputChange}
          required
        />
        <button type="submit" disabled={loading}>
          {editingCardId ? 'Atualizar Card' : 'Adicionar Novo Card'}
        </button>
        {editingCardId && (
          <button type="button" onClick={() => { setEditingCardId(null); setFormData({ title: '', image: '', link: '' }); }} disabled={loading}>
            Cancelar Edição
          </button>
        )}
      </form>

      <div className={styles.cardList}>
        {promoCards.map((card) => (
          <div key={card.id} className={styles.cardItem}>
            <h3>{card.title}</h3>
            <p>Imagem: <a href={card.image} target="_blank" rel="noopener noreferrer">{card.image}</a></p>
            <p>Link: <a href={card.link} target="_blank" rel="noopener noreferrer">{card.link}</a></p>
            <div className={styles.cardActions}>
              <button onClick={() => handleEdit(card)} disabled={loading}>Editar</button>
              <button onClick={() => handleDelete(card.id)} disabled={loading}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPromocardsPage;