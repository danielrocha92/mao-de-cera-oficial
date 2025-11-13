import styles from './Checkout.module.css';
import Button from '@/components/ui/Button';

export default function CheckoutPage() {
    // TODO:
    // 1. Get cart items
    // 2. Create form for user address and payment info
    // 3. On submit, call `/api/checkout/mercadopago`
    // 4. Redirect user to Mercado Pago's payment URL

    return (
        <div className={styles.container}>
            <h1>Finalizar Compra</h1>
            <div className={styles.grid}>
                <div className={styles.formSection}>
                    <h2>Endereço de Entrega</h2>
                    {/* TODO: Add address form */}
                    <p>Formulário de endereço aqui...</p>
                </div>
                <div className={styles.summarySection}>
                    <h2>Resumo do Pedido</h2>
                    {/* TODO: Add order summary */}
                    <p>Itens do carrinho aqui...</p>
                    <Button>Ir para Pagamento</Button>
                </div>
            </div>
        </div>
    );
}
