import styles from '../quem-somos/QuemSomos.module.css';

export default function TrocasEDevolucoesPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Trocas e Devoluções</h1>
            <div className={styles.content}>
                <p>Aqui você encontra todas as informações sobre as nossas políticas de trocas e devoluções.</p>
                <h2>Condições Gerais</h2>
                <p>Todas as ocorrências que envolvam troca ou devolução devem ser feitas no prazo de até 7 (sete) dias, a contar da data de entrega, e devem ser comunicadas ao nosso setor de atendimento ao cliente.</p>
                <h2>Quando recusar o produto</h2>
                <p>Os produtos são enviados ao cliente exatamente como nos foram entregues pelo fabricante. Se ocorrer qualquer das hipóteses abaixo, recuse o recebimento e escreva o motivo da recusa no verso do Danfe:</p>
                <ul>
                    <li>embalagem aberta ou avariada;</li>
                    <li>produto avariado;</li>
                    <li>produto em desacordo com o pedido;</li>
                    <li>falta de acessórios.</li>
                </ul>
                <p>Se, ainda assim, você aceitar o produto, por favor, entre em contato com o setor de atendimento ao cliente em até 72 horas.</p>
                <h2>Troca ou cancelamento da compra</h2>
                <p>A devolução de qualquer produto só pode ser feita no prazo de até 7 (sete) dias, a contar da data de entrega. Nesse período, se o produto apresentar defeito, ou se você não estiver satisfeito(a) com a compra, comunique nosso setor de atendimento ao cliente e solicite a troca.</p>
            </div>
        </div>
    );
}
