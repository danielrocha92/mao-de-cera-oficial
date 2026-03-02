'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Produtos.module.css';
import Modal from '@/components/ui/Modal';

export default function ProdutosPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/produtos');
      if (!response.ok) {
        throw new Error('Falha ao buscar produtos');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
      // TODO: Handle error with a user-facing message
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = (productId) => {
    setProductToDelete(productId);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    try {
      const response = await fetch(`/api/produtos/${productToDelete}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Falha ao excluir produto');
      }

      await fetchProducts(); // Re-fetch products to update the list
    } catch (error) {
      console.error(error);
      // TODO: Handle error with a user-facing message
    } finally {
      setIsModalOpen(false);
      setProductToDelete(null);
    }
  };

  const getStatus = (product) => {
      const stock = product.stock !== undefined ? product.stock : product.estoque;
      if(stock > 0) return 'Ativo';
      return 'Esgotado';
  }

  return (
    <>
      <div className={styles.produtosContainer}>
        <div className={styles.header}>
          <h1>Produtos</h1>
          <Link href="/admin/produtos/novo" className={styles.addButton}>
            Adicionar Produto
          </Link>
        </div>
        <div className={styles.tableContainer}>
          {loading ? (
            <p style={{ padding: '2rem', textAlign: 'center' }}>Carregando produtos...</p>
          ) : (
            <table className={styles.produtosTable}>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Preço</th>
                  <th>Estoque</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className={styles.productNameCell}>
                        <span>{product.title || product.nome}</span>
                        <span>{product.category || 'Geral'}</span>
                      </div>
                    </td>
                    <td style={{ fontWeight: '600' }}>{`R$ ${Number(product.price || product.preco).toFixed(2)}`}</td>
                    <td>{product.stock !== undefined ? product.stock : product.estoque}</td>
                    <td>
                      <span className={`${styles.status} ${styles[getStatus(product).toLowerCase()]}`}>
                        {getStatus(product)}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actions} style={{ justifyContent: 'flex-end' }}>
                        <Link href={`/admin/produtos/${product.id}/editar`} className={styles.editButton} title="Editar">
                           Editar
                        </Link>
                        <button onClick={() => handleDelete(product.id)} className={styles.deleteButton} title="Excluir">
                           Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                      Nenhum produto cadastrado.
                    </td>
                  </tr>
                )}
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
        <p>Tem certeza de que deseja excluir este produto? Esta ação é irreversível.</p>
      </Modal>
    </>
  );
}

