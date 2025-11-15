import styles from '../quem-somos/QuemSomos.module.css';

export default function ContatoPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Fale Conosco</h1>
            <div className={styles.content}>
                <p>Tem alguma dúvida, sugestão ou reclamação? Entre em contato conosco através dos nossos canais de atendimento.</p>
                <h2>E-mail</h2>
                <p>Envie um e-mail para: <a href="mailto:contato@maodecera.com.br">contato@maodecera.com.br</a></p>
                <h2>Telefone</h2>
                <p>Ligue para: (00) 12345-6789</p>
            </div>
        </div>
    );
}
