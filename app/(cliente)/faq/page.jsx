import styles from '../quem-somos/QuemSomos.module.css';

export default function FaqPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Perguntas Frequentes</h1>
            <div className={styles.content}>
                <p>Aqui você encontra as respostas para as dúvidas mais comuns sobre a Mão de Cera.</p>
                <h2>Como comprar?</h2>
                <p>Para comprar em nossa loja, basta escolher o produto desejado, clicar em &quot;Comprar&quot; e seguir as instruções para finalizar o pedido.</p>
                <h2>Quais as formas de pagamento?</h2>
                <p>Aceitamos cartões de crédito Visa e Mastercard, além de pagamentos via Pix.</p>
                <h2>Qual o prazo de entrega?</h2>
                <p>O prazo de entrega varia de acordo com a sua localidade. Você pode calcular o prazo e o valor do frete na página do produto ou no carrinho de compras.</p>
            </div>
        </div>
    );
}
