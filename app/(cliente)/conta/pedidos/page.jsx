import styles from './Pedidos.module.css';

// Mock data, replace with data from Firestore
const mockPedidos = [
  { id: '123', data: '2023-10-27', status: 'Enviado', total: 150.00 },
  { id: '124', data: '2023-10-25', status: 'Entregue', total: 89.90 },
];

export default function PedidosPage() {
  // TODO: Fetch user's orders from Firestore
  const pedidos = mockPedidos;

  return (
    <div className={styles.container}>
      <h1>Meus Pedidos</h1>
      <div className={styles.pedidosList}>
        {pedidos.map(pedido => (
          <div key={pedido.id} className={styles.pedidoItem}>
            <div><strong>Pedido:</strong> #{pedido.id}</div>
            <div><strong>Data:</strong> {pedido.data}</div>
            <div><strong>Total:</strong> R$ {pedido.total.toFixed(2)}</div>
            <div><strong>Status:</strong> <span className={styles.status}>{pedido.status}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}
