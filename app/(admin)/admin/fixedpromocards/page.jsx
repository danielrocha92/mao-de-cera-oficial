'use client';

import React, { useEffect, useState } from 'react';
import styles from './FixedPromocardsAdmin.module.css';

const AdminFixedPromocardsPage = () => {
  const [fixedPromoCards, setFixedPromoCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', image: '', link: '', order: 0 });
  const [editingCardId, setEditingCardId] = useState(null);

  const fetchFixedPromoCards = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/fixedpromocards');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setFixedPromoCards(data);
    } catch (e) {
      console.error("Failed to fetch fixed promotional cards:", e);
      setError("Falha ao carregar cards promocionais fixos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFixedPromoCards();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: name === 'order' ? parseInt(value) : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    let method = 'POST';
    let url = '/api/fixedpromocards';
    let bodyData = { ...formData };

    if (editingCardId) {
      method = 'PUT';
      bodyData = { id: editingCardId, ...formData };
    }

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      setFormData({ title: '', description: '', image: '', link: '', order: 0 });
      setEditingCardId(null);
      fetchFixedPromoCards();
    } catch (e) {
      console.error("Failed to save fixed promotional card:", e);
      setError(`Falha ao salvar card: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (card) => {
    setEditingCardId(card.id);
    setFormData({ title: card.title, description: card.description, image: card.image, link: card.link, order: card.order });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este card promocional fixo?")) {
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/fixedpromocards', { // DELETE expects ID in body
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      fetchFixedPromoCards();
    } catch (e) {
      console.error("Failed to delete fixed promotional card:", e);
      setError(`Falha ao excluir card: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Gerenciar Cards Promocionais Fixos</h1>

      {loading && <p>Carregando...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {fixedPromoCards.length >= 3 && !editingCardId ? (
        <p className={styles.infoMessage}>Você atingiu o limite de 3 cards promocionais fixos. Edite um existente para fazer alterações.</p>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="title"
            placeholder="Título do Card"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Descrição do Card"
            value={formData.description}
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
          <input
            type="number"
            name="order"
            placeholder="Ordem (ex: 1, 2, 3)"
            value={formData.order}
            onChange={handleInputChange}
            required
          />
          <button type="submit" disabled={loading}>
            {editingCardId ? 'Atualizar Card Fixo' : 'Adicionar Novo Card Fixo'}
          </button>
          {editingCardId && (
            <button type="button" onClick={() => { setEditingCardId(null); setFormData({ title: '', description: '', image: '', link: '', order: 0 }); }} disabled={loading}>
              Cancelar Edição
            </button>
          )}
        </form>
      )}

      <div className={styles.cardList}>
        {fixedPromoCards.map((card) => (
          <div key={card.id} className={styles.cardItem}>
            <h3>{card.title} (Ordem: {card.order})</h3>
            <p>{card.description}</p>
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

export default AdminFixedPromocardsPage;
