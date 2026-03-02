import styles from '../styles/Pages.module.css';

export default function ComoComprarPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Como Comprar</h1>
            <div className={styles.content}>
                <p>Veja como é fácil e seguro comprar na <strong>Mão de Cera Ateliê</strong>:</p>
                <ol>
                    <li>Escolha o produto que você quer comprar, navegando por nossas coleções ou categorias;</li>
                    <li>Clique em <strong>&quot;Adicionar ao carrinho&quot;</strong>;</li>
                    <li>Você pode continuar adicionando outros produtos ao carrinho ou clicar em <strong>&quot;Iniciar compra&quot;</strong>;</li>
                    <li>Preencha seus dados de contato e clique em <strong>&quot;Continuar&quot;</strong>;</li>
                    <li>Informe o endereço onde você quer receber sua compra;</li>
                    <li>Selecione a forma de frete que desejar e clique em <strong>&quot;Continuar&quot;</strong>;</li>
                    <li>Escolha o meio de pagamento (Cartão de Crédito ou Pix);</li>
                    <li>Na página de confirmação você poderá revisar toda a informação da compra e confirmar;</li>
                    <li>Depois de confirmada, você receberá um e-mail com os detalhes do seu pedido;</li>
                    <li>Assim que o pagamento for confirmado, daremos início à preparação do seu pedido com todo carinho!</li>
                </ol>
            </div>
        </div>
    );
}
