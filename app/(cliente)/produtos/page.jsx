import ProductCard from '@/components/shop/ProductCard';
import styles from './Produtos.module.css';

// Mock data
const mockProducts = [
  { id: 1, slug: 'vela-lavanda', nome: 'Vela Aromática de Lavanda', preco: 49.90, imagens: ['/placeholder.jpg'] },
  { id: 2, slug: 'sabonete-alecrim', nome: 'Sabonete Artesanal de Alecrim', preco: 24.90, preco_promocional: 19.90, imagens: ['/placeholder.jpg'] },
];

export default function ProdutosPage() {
    // TODO: Fetch products from Firestore
    const products = mockProducts;

    return (
        <div className={styles.container}>
            <h1>Nossos Produtos</h1>
            <div className={styles.grid}>
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
