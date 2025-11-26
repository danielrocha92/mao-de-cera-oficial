'use client';

import React, { useState, useEffect } from 'react';
import ProductCard from '@/components/shop/ProductCard';
import styles from './Produtos.module.css';

const collections = ['Todos', 'Velas Aromáticas', 'Kits', 'Acessórios'];

export default function ProdutosPage() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [sortOption, setSortOption] = useState('mais-vendidos');
    const [selectedCollection, setSelectedCollection] = useState('Todos');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    const handleCollectionChange = (collection) => {
        setSelectedCollection(collection);
        setShowSidebar(false); // Close sidebar after selecting a filter on mobile
    };

    const getFilteredProducts = (productsArray) => {
        if (selectedCollection === 'Todos') {
            return productsArray;
        }
        return productsArray.filter(product => product.collection === selectedCollection);
    };

    const getSortedProducts = (productsArray) => {
        let sortedProducts = [...productsArray];

        switch (sortOption) {
            case 'menor-preco':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'maior-preco':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'mais-vendidos':
            default:
                break;
        }
        return sortedProducts;
    };

    const filteredProducts = getFilteredProducts(products);
    const productsToDisplay = getSortedProducts(filteredProducts);

    return (
        <div className={styles.pageLayout}>
            <button 
                className={styles.filterToggleButton} 
                onClick={() => setShowSidebar(!showSidebar)}
            >
                {showSidebar ? 'Fechar Filtros' : 'Abrir Filtros'}
            </button>
            <aside className={`${styles.sidebar} ${showSidebar ? styles.showSidebar : ''}`}>
                <h3>Filtros</h3>
                <div className={styles.filterSection}>
                    <h4>Coleções</h4>
                    <ul>
                        {collections.map(collection => (
                            <li 
                                key={collection} 
                                onClick={() => handleCollectionChange(collection)}
                                className={selectedCollection === collection ? styles.activeFilter : ''}
                            >
                                {collection}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.filterSection}>
                    <h4>Preço</h4>
                    <input type="range" min="0" max="100" />
                </div>
            </aside>
            <main className={styles.mainContent}>
                <div className={styles.sortOptions}>
                    <span>Ordenar por:</span>
                    <select onChange={handleSortChange} value={sortOption}>
                        <option value="mais-vendidos">Mais vendidos</option>
                        <option value="menor-preco">Menor preço</option>
                        <option value="maior-preco">Maior preço</option>
                    </select>
                </div>
                {loading ? (
                    <p>Carregando produtos...</p>
                ) : (
                    <div className={styles.grid}>
                        {productsToDisplay.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
                <div className={styles.pagination}>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                </div>
            </main>
        </div>
    );
}
