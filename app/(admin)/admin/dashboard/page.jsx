import styles from './Dashboard.module.css';

export default function DashboardPage() {
  return (
    <div>
      <h1 className={styles.dashboardTitle}>Dashboard</h1>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Vendas (Hoje)</h3>
          <p>R$ 1,234.56</p>
        </div>
        <div className={styles.statCard}>
          <h3>Pedidos Pendentes</h3>
          <p>12</p>
        </div>
        <div className={styles.statCard}>
          <h3>Novos Clientes</h3>
          <p>5</p>
        </div>
      </div>
      {/* TODO: Add more charts and data */}
    </div>
  );
}
