'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FaBoxOpen, FaClipboardList, FaCog, FaMoneyBillWave,
  FaChartLine, FaUsers, FaExclamationCircle,
  FaShoppingCart, FaUndo, FaTruck, FaTags,
  FaStar, FaSitemap, FaStopwatch, FaStoreSlash
} from 'react-icons/fa';
import styles from './Dashboard.module.css';

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState({
    faturamentoHoje: 0,
    pedidosMesCount: 0,
    ticketMedio: 0,
    visitantesAtivos: 0,
    alertas: {
        estoqueBaixo: [],
        pedidosPendentes: 0
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/admin/dashboard');
        if (response.ok) {
          const data = await response.json();
          setMetrics(data);
        }
      } catch (error) {
        console.error("Erro ao carregar os dados do dashboard", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatMoney = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Dashboard</h1>

      {/* VISÃO GERAL */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Visão Geral</h2>

        {/* Métricas */}
        <div className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <h4>Faturamento (Hoje)</h4>
              <FaMoneyBillWave className={styles.metricIcon} />
            </div>
            <p className={styles.metricValue}>{loading ? '...' : formatMoney(metrics.faturamentoHoje)}</p>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <h4>Pedidos do Mês</h4>
              <FaShoppingCart className={styles.metricIcon} />
            </div>
            <p className={styles.metricValue}>{loading ? '...' : metrics.pedidosMesCount}</p>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
               <h4>Ticket Médio</h4>
               <FaChartLine className={styles.metricIcon} />
            </div>
            <p className={styles.metricValue}>{loading ? '...' : formatMoney(metrics.ticketMedio)}</p>
          </div>

          <div className={styles.metricCard}>
             <div className={styles.metricHeader}>
                <h4>Visitantes Ativos</h4>
                <FaUsers className={styles.metricIcon} />
             </div>
             <p className={styles.metricValue}>
                 {loading ? '...' : metrics.visitantesAtivos}
                 <span style={{fontSize: '0.6rem', color: '#27ae60', marginLeft: '5px'}}>● Live</span>
             </p>
          </div>
        </div>

        {/* Alertas */}
        <div className={styles.alertsContainer}>
           {metrics.alertas.estoqueBaixo.map((prod, idx) => (
               <div key={`estoque-${idx}`} className={`${styles.alertItem} ${styles.alertWarning}`}>
                  <FaExclamationCircle className={styles.alertIcon}/>
                  <span>O estoque de <strong>"{prod.nome}"</strong> está acabando (Apenas {prod.estoque} restantes).</span>
               </div>
           ))}

           {metrics.alertas.pedidosPendentes > 0 && (
               <div className={`${styles.alertItem} ${styles.alertInfo}`}>
                  <FaClipboardList className={styles.alertIcon}/>
                  <span>Você tem <strong>{metrics.alertas.pedidosPendentes} novo(s) pedido(s)</strong> aguardando liberação.</span>
               </div>
           )}

           {!loading && metrics.alertas.estoqueBaixo.length === 0 && metrics.alertas.pedidosPendentes === 0 && (
               <div className={`${styles.alertItem} ${styles.alertInfo}`} style={{backgroundColor: 'var(--surface)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)'}}>
                  <FaStar className={styles.alertIcon} style={{color: 'gold'}}/>
                  <span>Tudo em dia! Sem alertas crudos no momento.</span>
               </div>
           )}
        </div>
      </section>

      {/* PEDIDOS E VENDAS */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Gestão de Vendas</h2>
        <div className={styles.statsGrid}>
          <Link href="/admin/pedidos" className={styles.statCard}>
            <div className={styles.iconWrapper}><FaClipboardList className={styles.icon} /></div>
            <div className={styles.statInfo}>
              <h3>Todos os Pedidos</h3>
              <p>Gerencie todos os pedidos da loja.</p>
            </div>
          </Link>
          <Link href="/admin/pedidos?status=pendente" className={styles.statCard}>
            <div className={styles.iconWrapper}><FaStopwatch className={styles.icon} /></div>
            <div className={styles.statInfo}>
              <h3>Pendentes / Em Proc.</h3>
              <p>Aguardando pagamento ou separação.</p>
            </div>
          </Link>
          <Link href="/admin/pedidos?status=enviado" className={styles.statCard}>
            <div className={styles.iconWrapper}><FaTruck className={styles.icon} /></div>
            <div className={styles.statInfo}>
              <h3>Enviados / Concluídos</h3>
              <p>Gestão de rastreio e logística.</p>
            </div>
          </Link>
          <Link href="/admin/carrinhos-abandonados" className={styles.statCard}>
            <div className={styles.iconWrapper}><FaStoreSlash className={styles.icon} /></div>
            <div className={styles.statInfo}>
              <h3>Carrinhos Abandonados</h3>
              <p>Recupere vendas não finalizadas pra remarketing.</p>
            </div>
          </Link>
          <Link href="/admin/devolucoes" className={styles.statCard}>
            <div className={styles.iconWrapper}><FaUndo className={styles.icon} /></div>
            <div className={styles.statInfo}>
              <h3>Devoluções / Reembolsos</h3>
              <p>Controle de logística reversa e estornos.</p>
            </div>
          </Link>
        </div>
      </section>

      {/* PRODUTOS E CATÁLOGO */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Catálogo e Estoque</h2>
        <div className={styles.statsGrid}>
          <Link href="/admin/produtos" className={styles.statCard}>
            <div className={styles.iconWrapper}><FaBoxOpen className={styles.icon} /></div>
            <div className={styles.statInfo}>
              <h3>Lista de Produtos</h3>
              <p>Adicione, edite, inative ou exclua itens.</p>
            </div>
          </Link>
          <Link href="/admin/categorias" className={styles.statCard}>
            <div className={styles.iconWrapper}><FaSitemap className={styles.icon} /></div>
            <div className={styles.statInfo}>
              <h3>Categorias</h3>
              <p>Árvore de navegação e departamentos.</p>
            </div>
          </Link>
          <Link href="/admin/estoque" className={styles.statCard}>
            <div className={styles.iconWrapper}><FaTags className={styles.icon} /></div>
            <div className={styles.statInfo}>
              <h3>Controle de Estoque</h3>
              <p>Ajuste quantidades e acompanhe por item.</p>
            </div>
          </Link>
          <Link href="/admin/avaliacoes" className={styles.statCard}>
            <div className={styles.iconWrapper}><FaStar className={styles.icon} /></div>
            <div className={styles.statInfo}>
              <h3>Avaliações de Clientes</h3>
              <p>Moderação e aprovação de depoimentos.</p>
            </div>
          </Link>

          <Link href="/admin/configuracoes" className={styles.statCard}>
            <div className={styles.iconWrapper}>
                <FaCog className={styles.icon} />
            </div>
            <div className={styles.statInfo}>
                <h3>Configurações Globais</h3>
                <p>Edite dados gerais da loja virtual.</p>
            </div>
          </Link>
        </div>
      </section>

    </div>
  );
}
