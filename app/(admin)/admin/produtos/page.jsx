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
            <p>Carregando produtos...</p>
          ) : (
            <table className={styles.produtosTable}>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Preço</th>
                  <th>Estoque</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.title || product.nome}</td>
                    <td>{`R$ ${Number(product.price || product.preco).toFixed(2)}`}</td>
                    <td>{product.stock !== undefined ? product.stock : product.estoque}</td>
                    <td>
                      <span className={`${styles.status} ${styles[getStatus(product).toLowerCase()]}`}>
                        {getStatus(product)}
                      </span>
                    </td>
                    <td className={styles.actions}>
                      <Link href={`/admin/produtos/${product.id}/editar`}>
                        <button className={styles.editButton}>Editar</button>
                      </Link>
                      <button onClick={() => handleDelete(product.id)} className={styles.deleteButton}>
                        Excluir
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
        <p>Tem certeza de que deseja excluir este produto? Esta ação é irreversível.</p>
      </Modal>
    </>
  );
}

