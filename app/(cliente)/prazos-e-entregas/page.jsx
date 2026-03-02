import styles from '../quem-somos/QuemSomos.module.css';

export default function PrazosEntregasPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Prazos e Entregas</h1>
            <div className={styles.content}>
                <p>Na <strong>Mão de Cera Ateliê</strong>, cada vela é produzida com carinho e atenção aos detalhes. Confira as informações sobre nossos prazos e métodos de entrega:</p>

                <h2>1. Prazo de Postagem</h2>
                <p>Após a confirmação do pagamento, seu pedido entra em fase de processamento e separação. O prazo de postagem nos Correios ou transportadora é de até <strong>3 (três) dias úteis</strong>. Como nossos produtos são artesanais, esse tempo é necessário para garantir a qualidade final de cada item.</p>

                <h2>2. Prazo de Entrega</h2>
                <p>O tempo total de entrega é a soma do prazo de postagem mais o prazo da transportadora (Correios ou transportadoras parceiras). O prazo final depende da sua localidade e do método de envio escolhido (PAC, SEDEX, etc.) e será informado no checkout.</p>

                <h2>3. Rastreamento</h2>
                <p>Assim que seu pedido for postado, você receberá um e-mail com o código de rastreamento para acompanhar cada etapa da entrega diretamente no site do transportador.</p>

                <h2>4. Formas de Envio</h2>
                <p>Enviamos para todo o Brasil através dos Correios (PAC e SEDEX) e transportadoras selecionadas. O cálculo do frete é feito automaticamente no carrinho de compras ao informar o seu CEP.</p>

                <p><strong>Atenção:</strong> Certifique-se de que haverá alguém disponível para receber o pedido no endereço informado. Em casos de endereços incorretos ou ausência do destinatário após as tentativas de entrega, o custo do reenvio será de responsabilidade do cliente.</p>
            </div>
        </div>
    );
}
