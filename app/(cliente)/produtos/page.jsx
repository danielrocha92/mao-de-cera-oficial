import ProductCard from '@/components/shop/ProductCard';
import styles from './Produtos.module.css';

// Mock data based on real products from the website
const mockProducts = [
  { id: 1, slug: 'vela-morango-flor-de-lotus-100g', nome: 'Vela Aromática Morango e Flor de Lótus 100g', preco: 19.90, imagens: ['/placeholder.jpg'] },
  { id: 2, slug: 'vela-melancia-limao-100g', nome: 'Vela Aromática Melancia e Limão 100g', preco: 19.90, imagens: ['/placeholder.jpg'] },
  { id: 3, slug: 'vela-framboesa-pimenta-rosa-55g', nome: 'Vela Aromática Framboesa e Pimenta Rosa 55g', preco: 19.90, imagens: ['/placeholder.jpg'] },
  { id: 4, slug: 'vela-frutas-da-barra-100g', nome: 'Vela Frutas da Barra 100g - Manga e Maracujá Azedinho', preco: 19.90, imagens: ['/placeholder.jpg'] },
  { id: 5, slug: 'vela-maca-verde-cascas-folhas-55g', nome: 'Vela Aromática Maçã Verde com Cascas e Folhas 55g', preco: 23.90, imagens: ['/placeholder.jpg'] },
  { id: 6, slug: 'vela-gabriela-cravo-canela-85g', nome: 'Vela Aromática Gabriela Cravo e Canela 85g - Cravo, Canela e Cacau', preco: 23.90, imagens: ['/placeholder.jpg'] },
  { id: 7, slug: 'vela-verbena-85g', nome: 'Vela Aromática Verbena 85g - Frutas Cítricas', preco: 23.90, imagens: ['/placeholder.jpg'] },
  { id: 8, slug: 'vela-maca-com-canela-90g', nome: 'Vela Aromática Maçã com Canela 90g', preco: 23.90, imagens: ['/placeholder.jpg'] },
];

export default function ProdutosPage() {
    // TODO: Fetch products from Firestore
    const products = mockProducts;

    return (
        <div className={styles.pageLayout}> {/* New wrapper for the two-column layout */}
            <aside className={styles.sidebar}>
                {/* Placeholder for filters */}
                <h3>Filtros</h3>
                <div className={styles.filterSection}>
                    <h4>Categorias</h4>
                    <ul>
                        <li>Velas Aromáticas</li>
                        <li>Difusores</li>
                        <li>Sprays</li>
                    </ul>
                </div>
                <div className={styles.filterSection}>
                    <h4>Preço</h4>
                    <input type="range" min="0" max="100" />
                </div>
            </aside>
            <div className={styles.mainContent}>
                <h1>Nossos Produtos</h1>
                <div className={styles.sortOptions}>
                    <span>Ordenar por:</span>
                    <select>
                        <option>Mais vendidos</option>
                        <option>Menor preço</option>
                        <option>Maior preço</option>
                    </select>
                </div>
                <div className={styles.grid}>
                    {products.map(product => (
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
