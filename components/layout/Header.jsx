import Link from 'next/link';
import styles from './Header.module.css';

const Header = ({ settings }) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">{settings?.nome_loja || 'Mão de Cera'}</Link>
        </div>
        <nav className={styles.nav}>
          <Link href="/produtos">Produtos</Link>
          <Link href="/carrinho">Carrinho</Link>
          <Link href="/conta/pedidos">Meus Pedidos</Link>
          <Link href="/conta/login">Login</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
