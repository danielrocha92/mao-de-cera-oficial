import styles from './PedidosAdmin.module.css';

// Mock data
const mockPedidos = [
  { id: '123', data: '2023-10-27', cliente: 'João Silva', status: 'Processando', total: 150.00 },
  { id: '124', data: '2023-10-25', cliente: 'Maria Souza', status: 'Pago', total: 89.90 },
];

export default function PedidosAdminPage() {
  // TODO: Fetch all orders from Firestore
  const pedidos = mockPedidos;

  return (
    <div>
      <h1>Gerenciar Pedidos</h1>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Pedido</th>
              <th>Data</th>
              <th>Cliente</th>
              <th>Total</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map(pedido => (
              <tr key={pedido.id}>
                <td>#{pedido.id}</td>
                <td>{pedido.data}</td>
                <td>{pedido.cliente}</td>
                <td>R$ {pedido.total.toFixed(2)}</td>
                <td>{pedido.status}</td>
                <td><a href="#">Ver Detalhes</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
