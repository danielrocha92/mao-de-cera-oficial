import styles from '../quem-somos/QuemSomos.module.css';

export default function ContatoPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Fale Conosco</h1>
            <div className={styles.content}>
                <p>Tem alguma dúvida, sugestão ou reclamação? Entre em contato conosco através dos nossos canais de atendimento.</p>
                <h2>E-mail</h2>
                <p>Envie um e-mail para: <a href="mailto:maodeceraoficial@gmail.com">maodeceraoficial@gmail.com</a></p>
                <h2>Telefone/WhatsApp</h2>
                <p>Ligue para: (11) 96130-9680</p>
                <h2>Endereço</h2>
                <p>Rua Padre José Antonio Romano 300</p>
            </div>
        </div>
    );
}
