import styles from './Carrinho.module.css';
import Button from '@/components/ui/Button';

// Mock data
const mockItems = [
    { id: 1, name: 'Vela Aromática de Lavanda', price: 49.90, quantity: 1 },
    { id: 2, name: 'Sabonete Artesanal de Alecrim', price: 19.90, quantity: 2 },
];

export default function CarrinhoPage() {
    // TODO: Get cart items from localStorage or a global state
    const items = mockItems;
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className={styles.container}>
            <h1>Carrinho de Compras</h1>
            <div className={styles.itemsList}>
                {items.map(item => (
                    <div key={item.id} className={styles.item}>
                        <span>{item.name} (x{item.quantity})</span>
                        <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
            </div>
            <div className={styles.summary}>
                <h3>Total: R$ {total.toFixed(2)}</h3>
                <Button>Finalizar Compra</Button>
            </div>
        </div>
    );
}
