import styles from '../quem-somos/QuemSomos.module.css';

export default function TrabalheConoscoPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Trabalhe Conosco</h1>
            <div className={styles.content}>
                <p>A Mão de Cera é mais do que um ateliê, é um lugar onde a criatividade e a paixão se encontram. Se você é apaixonado por aromas, design e por criar experiências memoráveis, queremos conhecer você.</p>
                <p>Estamos sempre em busca de novos talentos para se juntar à nossa equipe. Se você se identifica com a nossa marca e acredita que pode contribuir para o nosso crescimento, envie o seu currículo para o e-mail: <a href="mailto:contato@maodecera.com.br">contato@maodecera.com.br</a></p>
                <p>Ficaremos felizes em conhecer você e suas habilidades.</p>
                <p>Com carinho,<br/>Mão de Cera Ateliê.</p>
            </div>
        </div>
    );
}
