import { NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';

export async function GET() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // 1. Fetch Orders (Pedidos)
    // We'll fetch all orders created in this month. If there are too many, this could be slow,
    // but for an initial dashboard it serves well.
    let faturamentoHoje = 0;
    let pedidosMesCount = 0;
    let totalValorMes = 0;
    let pedidosPendentesCount = 0;

    const pedidosSnapshot = await db.collection('pedidos').get();

    pedidosSnapshot.forEach(doc => {
        const p = doc.data();
        // Assuming order has createdAt field (ISO string or Timestamp) and total (number)
        const dStr = p.createdAt || p.dataCriacao;
        if (!dStr) return;

        let orderDate;
        if (dStr.toDate) {
             orderDate = dStr.toDate();
        } else {
             orderDate = new Date(dStr);
        }

        const valor = Number(p.total) || 0;

        // Count for the month
        if (orderDate >= firstDayOfMonth) {
            pedidosMesCount++;
            totalValorMes += valor;
        }

        // Count for today
        if (orderDate >= today) {
            faturamentoHoje += valor;
        }

        // Pending orders
        const status = (p.status || '').toLowerCase();
        if (status === 'pendente' || status === 'em processamento' || status === 'novo') {
            pedidosPendentesCount++;
        }
    });

    const ticketMedio = pedidosMesCount > 0 ? (totalValorMes / pedidosMesCount) : 0;

    // 2. Fetch Products for Low Stock Alerts
    const produtosSnapshot = await db.collection('produtos').get();
    const estoqueBaixo = [];

    produtosSnapshot.forEach(doc => {
        const prod = doc.data();
        const stock = prod.stock !== undefined ? prod.stock : prod.estoque;
        const name = prod.title || prod.nome;
        if (typeof stock === 'number' && stock <= 5) {
            estoqueBaixo.push({ id: doc.id, nome: name, estoque: stock });
        }
    });

    // 3. Fake Visitantes Ativos (to simulate Google Analytics until integrated)
    const visitantesAtivos = Math.floor(Math.random() * (15 - 3 + 1)) + 3; // Random between 3 and 15

    return NextResponse.json({
      faturamentoHoje,
      pedidosMesCount,
      ticketMedio,
      visitantesAtivos,
      alertas: {
          estoqueBaixo,
          pedidosPendentes: pedidosPendentesCount
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Erro ao buscar dashboard data:', error);
    return NextResponse.json({ error: 'Erro ao buscar dashboard API' }, { status: 500 });
  }
}
