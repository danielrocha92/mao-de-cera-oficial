import styles from './Footer.module.css';

const Footer = ({ settings }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; {new Date().getFullYear()} {settings?.nome_loja || 'Mão de Cera Oficial'}. Todos os direitos reservados.</p>
        <div className={styles.contact}>
          <p>Email: {settings?.email_contato || 'contato@example.com'}</p>
          <p>Telefone: {settings?.telefone_contato || '(00) 12345-6789'}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
