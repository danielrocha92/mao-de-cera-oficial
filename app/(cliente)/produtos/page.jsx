'use client';

import React, { useState } from 'react';
import ProductCard from '@/components/shop/ProductCard';
import styles from './Produtos.module.css';

// Mock data based on real products from the website
const mockProducts = [
  { id: 1, slug: 'vela-morango-flor-de-lotus-100g', nome: 'Vela Aromática Morango e Flor de Lótus 100g', preco: 19.90, imagens: ['/placeholder.jpg'], collection: 'Velas Aromáticas' },
  { id: 2, slug: 'vela-melancia-limao-100g', nome: 'Vela Aromática Melancia e Limão 100g', preco: 19.90, imagens: ['/placeholder.jpg'], collection: 'Velas Aromáticas' },
  { id: 3, slug: 'vela-framboesa-pimenta-rosa-55g', nome: 'Vela Aromática Framboesa e Pimenta Rosa 55g', preco: 19.90, imagens: ['/placeholder.jpg'], collection: 'Velas Aromáticas' },
  { id: 4, slug: 'vela-frutas-da-barra-100g', nome: 'Vela Frutas da Barra 100g - Manga e Maracujá Azedinho', preco: 19.90, imagens: ['/placeholder.jpg'], collection: 'Velas Aromáticas' },
  { id: 5, slug: 'vela-maca-verde-cascas-folhas-55g', nome: 'Vela Aromática Maçã Verde com Cascas e Folhas 55g', preco: 23.90, imagens: ['/placeholder.jpg'], collection: 'Acessórios' },
  { id: 6, slug: 'vela-gabriela-cravo-canela-85g', nome: 'Vela Aromática Gabriela Cravo e Canela 85g - Cravo, Canela e Cacau', preco: 23.90, imagens: ['/placeholder.jpg'], collection: 'Kits' },
  { id: 7, slug: 'vela-verbena-85g', nome: 'Vela Aromática Verbena 85g - Frutas Cítricas', preco: 23.90, imagens: ['/placeholder.jpg'], collection: 'Velas Aromáticas' },
  { id: 8, slug: 'vela-maca-com-canela-90g', nome: 'Vela Aromática Maçã com Canela 90g', preco: 23.90, imagens: ['/placeholder.jpg'], collection: 'Acessórios' },
];

const collections = ['Todos', 'Velas Aromáticas', 'Kits', 'Acessórios'];

export default function ProdutosPage() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [sortOption, setSortOption] = useState('mais-vendidos'); // Default sort option
    const [selectedCollection, setSelectedCollection] = useState('Todos'); // Default filter
    // TODO: Fetch products from Firestore
    const products = mockProducts;

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
        let sortedProducts = [...productsArray]; // Create a shallow copy to avoid direct state mutation

        switch (sortOption) {
            case 'menor-preco':
                sortedProducts.sort((a, b) => a.preco - b.preco);
                break;
            case 'maior-preco':
                sortedProducts.sort((a, b) => b.preco - a.preco);
                break;
            case 'mais-vendidos':
            default:
                // For 'mais-vendidos' or any other default, we can assume a default order or add a specific logic if available
                // For now, it will maintain the original mock order if no specific 'mais-vendidos' property exists
                break;
        }
        return sortedProducts;
    };

    const filteredProducts = getFilteredProducts(products);
    const productsToDisplay = getSortedProducts(filteredProducts);

    return (
        <div className={styles.pageLayout}> {/* New wrapper for the two-column layout */}
            <button 
                className={styles.filterToggleButton} 
                onClick={() => setShowSidebar(!showSidebar)}
            >
                {showSidebar ? 'Fechar Filtros' : 'Abrir Filtros'}
            </button>
            <aside className={`${styles.sidebar} ${showSidebar ? styles.showSidebar : ''}`}>
                {/* Placeholder for filters */}
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
            <div className={styles.mainContent}>
                <div className={styles.sortOptions}>
                    <span>Ordenar por:</span>
                    <select onChange={handleSortChange} value={sortOption}>
                        <option value="mais-vendidos">Mais vendidos</option>
                        <option value="menor-preco">Menor preço</option>
                        <option value="maior-preco">Maior preço</option>
                    </select>
                </div>
                <div className={styles.grid}>
                    {productsToDisplay.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                {/* Placeholder for pagination */}
                <div className={styles.pagination}>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                </div>
            </div>
        </div>
    );
}
