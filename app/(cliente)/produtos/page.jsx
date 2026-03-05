'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/shop/ProductCard';
import styles from './Produtos.module.css';

function ProdutosContent() {
    const searchParams = useSearchParams();
    const categoriaSlug = searchParams.get('categoria');

    const [showSidebar, setShowSidebar] = useState(false);
    const [sortOption, setSortOption] = useState('mais-vendidos');
    const [selectedCollection, setSelectedCollection] = useState('Todos');

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [prodRes, catRes] = await Promise.all([
                    fetch('/api/produtos'),
                    fetch('/api/categorias')
                ]);

                if (prodRes.ok) {
                    const prodData = await prodRes.json();
                    setProducts(prodData);
                }

                if (catRes.ok) {
                    const catData = await catRes.json();
                    setCategories(catData);

                    if (categoriaSlug) {
                        const matchedCat = catData.find(c => c.slug === categoriaSlug);
                        if (matchedCat) {
                            setSelectedCollection(matchedCat.nome);
                        } else {
                            // verify if there's any direct match with the string itself
                            const directMatch = catData.find(c => c.nome.toLowerCase() === categoriaSlug.toLowerCase());
                            if (directMatch) {
                                setSelectedCollection(directMatch.nome);
                            } else {
                                setSelectedCollection(categoriaSlug);
                            }
                        }
                    }
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [categoriaSlug]);

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    const handleCollectionChange = (collection) => {
        setSelectedCollection(collection);
        setShowSidebar(false);
    };

    const isMatchCategory = (product, category) => {
       if (!category || category === 'Todos') return true;
       if (product.categorias && Array.isArray(product.categorias)) {
           return product.categorias.includes(category);
       }
       return product.collection === category;
    };

    const getSortedProducts = (productsArray) => {
        let sortedProducts = [...productsArray];

        switch (sortOption) {
            case 'menor-preco':
                sortedProducts.sort((a, b) => (a.preco || a.price || 0) - (b.preco || b.price || 0));
                break;
            case 'maior-preco':
                sortedProducts.sort((a, b) => (b.preco || b.price || 0) - (a.preco || a.price || 0));
                break;
            case 'mais-vendidos':
            default:
                break;
        }
        return sortedProducts;
    };

    const allSorted = getSortedProducts(products);

    const highlightedProducts = selectedCollection === 'Todos'
        ? allSorted
        : allSorted.filter(p => isMatchCategory(p, selectedCollection));

    const otherProducts = selectedCollection === 'Todos'
        ? []
        : allSorted.filter(p => !isMatchCategory(p, selectedCollection));

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
                    <h4>Categorias</h4>
                    <ul>
                        <li
                            onClick={() => handleCollectionChange('Todos')}
                            className={selectedCollection === 'Todos' ? styles.activeFilter : ''}
                        >
                            Todos
                        </li>
                        {categories.map(cat => (
                            <li
                                key={cat.id}
                                onClick={() => handleCollectionChange(cat.nome)}
                                className={selectedCollection === cat.nome ? styles.activeFilter : ''}
                            >
                                {cat.nome}
                            </li>
                        ))}
                    </ul>
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
                    <>
                       {selectedCollection !== 'Todos' && (
                           <div className={styles.sectionHeader}>
                               <h2>Produtos em: {selectedCollection}</h2>
                           </div>
                       )}
                       <div className={styles.grid}>
                           {highlightedProducts.length > 0 ? (
                               highlightedProducts.map(product => (
                                   <ProductCard key={product.id} product={product} />
                               ))
                           ) : (
                               <p>Nenhum produto encontrado nesta categoria.</p>
                           )}
                       </div>

                       {selectedCollection !== 'Todos' && otherProducts.length > 0 && (
                           <>
                               <div className={styles.sectionHeader} style={{ marginTop: '4rem' }}>
                                   <h2>Outros produtos</h2>
                               </div>
                               <div className={styles.grid}>
                                   {otherProducts.map(product => (
                                       <ProductCard key={product.id} product={product} />
                                   ))}
                               </div>
                           </>
                       )}
                    </>
                )}
            </main>
        </div>
    );
}

export default function ProdutosPage() {
    return (
        <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center' }}>Carregando catálogo...</div>}>
            <ProdutosContent />
        </Suspense>
    );
}
