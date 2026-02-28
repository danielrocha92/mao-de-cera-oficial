'use client';

import React, { useState } from 'react';
import { useCart } from '@/app/context/CartContext';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Checkout.module.css';

export default function CheckoutPage() {
  const { cart, total, isLoaded } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('pix');
  const [successData, setSuccessData] = useState(null);

  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
    installments: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateTotal = () => {
    // Exemplo: se for Pix, aplica -5%
    if (activeTab === 'pix') {
      return total * 0.95;
    }
    return total;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Cria o payload para o Roteador de Pagamentos (Backend Strategy)
      const payload = {
        items: cart,
        payer: {
          uid: user?.uid || null,
          email: user?.email || 'convidado@email.com',
          nome: user?.displayName || 'Convidado',
          cpf: '000.000.000-00' // O user preencheu antes / placeholder
        },
        paymentMethod: activeTab,
        creditCard: activeTab === 'credit-card' ? formData : null
      };

      const response = await fetch('/api/checkout/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        // Redireciona pra uma página de sucesso fictícia usando state com UX melhor do que alert
        setSuccessData(data);
        if (!data.qrCode) {
          setTimeout(() => {
            router.push('/conta/pedidos');
          }, 4000);
        }
      } else {
        alert(`Erro: ${data.error}`);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      alert('Erro inesperado ao processar checkout.');
      setLoading(false);
    }
  };

  // Previne Hydration mismatch e que o carrinho esvazie indevidamente
  if (!isLoaded) {
    return <p style={{ padding: '2rem', textAlign: 'center' }}>Carregando seu carrinho...</p>;
  }

  if (cart.length === 0) {
    router.push('/carrinho');
    return null;
  }

  // Desconto UI Logic
  const desconto = activeTab === 'pix' ? total * 0.05 : 0;
  const valorFinal = total - desconto; // Sem considerar frete para mockup

  return (
    <>
      {successData && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(255, 255, 255, 0.95)', zIndex: 9999,
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
        }}>
          <div style={{
            backgroundColor: '#27ae60', color: 'white', padding: '1.5rem', borderRadius: '50%',
            marginBottom: '1.5rem', fontSize: '3rem', width: '80px', height: '80px', display: 'flex',
            alignItems: 'center', justifyContent: 'center'
          }}>✓</div>
          <h2 style={{ fontSize: '2rem', color: '#2c3e50', marginBottom: '0.5rem' }}>Pedido Aprovado!</h2>
          <p style={{ color: '#7f8c8d', fontSize: '1.1rem', marginBottom: '1rem' }}>Sua transação ({successData.gateway || 'Transparente'}) foi processada com sucesso.</p>
          <div style={{ backgroundColor: '#f8f9fa', padding: '1rem 2rem', borderRadius: '8px', border: '1px solid #e9ecef', textAlign: 'center' }}>
             <p style={{ color: '#9b59b6', fontWeight: 'bold', margin: '0' }}>ID do Pedido: {successData.transactionId}</p>
             {successData.qrCode && (
               <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e9ecef' }}>
                 <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '0.5rem'}}>Escaneie o QR Code abaixo para pagar via Pix:</p>
                 <img src={successData.qrCode} alt="QR Code Pix" style={{ width: '150px', height: '150px', margin: '0 auto', display: 'block', padding: '5px', background: 'white', border: '1px solid #ddd', borderRadius: '8px' }} />
                 <p style={{ fontSize: '0.9rem', color: '#555', marginTop: '1rem', marginBottom: '0.5rem' }}>Ou utilize o recurso Copia e Cola:</p>
                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                   <input type="text" readOnly value={successData.copyPaste} style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc', fontSize: '0.8rem', width: '250px', background: '#fff' }} />
                   <button onClick={() => {
                     navigator.clipboard.writeText(successData.copyPaste);
                     alert("Código PIX copiado!");
                   }} style={{ padding: '0.5rem 1rem', background: '#9b59b6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}>Copiar</button>
                 </div>
               </div>
             )}
          </div>
          {successData.qrCode ? (
             <button onClick={() => router.push('/conta/pedidos')} style={{ marginTop: '2rem', padding: '0.8rem 2rem', background: '#2c3e50', color: 'white', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer', transition: 'background 0.2s', fontWeight: 'bold' }} onMouseOver={(e) => e.target.style.background = '#34495e'} onMouseOut={(e) => e.target.style.background = '#2c3e50'}>
               Ok, ir para Meus Pedidos
             </button>
          ) : (
             <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#bdc3c7' }}>Redirecionando para seus pedidos...</p>
          )}
        </div>
      )}

      <div className={styles.checkoutContainer}>

      {/* LADO ESQUERDO: Dados e Pagamento */}
      <section>

        {/* Bloco de Identificação e Entrega */}
        <article className={styles.dataBlock}>
          <h2 className={styles.sectionTitle}>Dados de Entrega</h2>
          <div className={styles.userInfoCard}>
            <p className={styles.userName}>{user?.displayName || 'Convidado'}</p>
            <p className={styles.userEmail}>{user?.email || 'Nenhum email'}</p>
            <hr className={styles.divider} />
            <p className={styles.userAddress}>
              Av. Paulista, 1578 - Bela Vista<br />
              São Paulo, SP - CEP 01310-200<br />
              Apto. 12 (Prédio Comercial)
            </p>
            <Link href="/conta/perfil" className={styles.editLink}>Corrigir informações</Link>
          </div>
        </article>

        {/* Bloco de Métodos de Pagamento */}
        <article className={styles.paymentBlock}>
          <h2 className={styles.sectionTitle}>Método de Pagamento</h2>

          <div className={styles.tabs}>
            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === 'pix' ? styles.active : ''}`}
              onClick={() => setActiveTab('pix')}
            >
              ❖ Pix
            </button>
            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === 'credit-card' ? styles.active : ''}`}
              onClick={() => setActiveTab('credit-card')}
            >
              💳 Cartão de Crédito
            </button>
          </div>

          <div className={styles.tabContentContainer}>

            {/* Aba 1: PIX */}
            {activeTab === 'pix' && (
              <div className={`${styles.tabContent} ${styles.active}`}>
                <div className={styles.pixNotice}>
                  <span className={styles.pixDiscount}>🎟️ Você ganha 5% de Desconto pagando no Pix!</span>
                  <p className={styles.pixInstructions}>
                    Ao clicar em finalizar, a integração via ASAAS gerará o QR Code e o &quot;Copia e Cola&quot; automaticamente. Liberação instantânea!
                  </p>
                </div>
              </div>
            )}

            {/* Aba 2: Cartão de Crédito */}
            {activeTab === 'credit-card' && (
              <div className={`${styles.tabContent} ${styles.active}`}>
                <div className={styles.ccForm}>

                  <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                    <label htmlFor="cardNumber">Número do Cartão (Simule erro: ERRO_MP)</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                    />
                  </div>

                  <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                    <label htmlFor="cardName">Nome impresso no cartão</label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      placeholder="NOME DO TITULAR"
                    />
                  </div>

                  <div className={styles.inputRow}>
                    <div className={`${styles.inputGroup} ${styles.halfWidth}`}>
                      <label htmlFor="cardExpiry">Validade</label>
                      <input
                        type="text"
                        id="cardExpiry"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        placeholder="MM/AA"
                        maxLength={5}
                      />
                    </div>

                    <div className={`${styles.inputGroup} ${styles.halfWidth}`}>
                      <label htmlFor="cardCvv">CVV</label>
                      <input
                        type="text"
                        id="cardCvv"
                        name="cardCvv"
                        value={formData.cardCvv}
                        onChange={handleChange}
                        placeholder="123"
                        maxLength={4}
                      />
                    </div>
                  </div>

                  <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                    <label htmlFor="installments">Parcelamento</label>
                    <select
                      id="installments"
                      name="installments"
                      value={formData.installments}
                      onChange={handleChange}
                    >
                      <option value="" disabled>Escolha o número de parcelas...</option>
                      <option value="1">1x de R$ {total.toFixed(2)} sem juros</option>
                      <option value="2">2x de R$ {(total/2).toFixed(2)} sem juros</option>
                    </select>
                  </div>

                </div>
              </div>
            )}

          </div>

        </article>

      </section>

      {/* LADO DIREITO: Resumo do Pedido */}
      <aside className={styles.checkoutSummary}>
        <h2 className={styles.sectionTitle}>Resumo da Compra</h2>

        <div className={styles.itemsList}>
          {cart.map((item, idx) => (
            <div key={idx} className={styles.orderItem}>
              <div className={styles.itemImagePlaceholder}>
                {item.imagemDestaque && (
                  <Image src={item.imagemDestaque} alt={item.nome} fill style={{ objectFit: 'cover' }} sizes="60px" />
                )}
              </div>
              <div className={styles.itemDetails}>
                <h3 className={styles.itemName}>{item.nome}</h3>
                <p className={styles.itemQty}>Qtd: {item.quantity} un</p>
              </div>
              <div className={styles.itemPrice}>R$ {(item.preco * item.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>

        <hr className={styles.divider} />

        <div className={styles.totals}>
          <div className={styles.totalsRow}>
            <span>Subtotal</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
          <div className={styles.totalsRow}>
            <span>Desconto (Pix)</span>
            {desconto > 0 ? (
              <span style={{ color: 'var(--primary)' }}>- R$ {desconto.toFixed(2)}</span>
            ) : (
              <span>R$ 0,00</span>
            )}
          </div>
          <div className={`${styles.totalsRow} ${styles.grandTotal}`}>
            <span>Total</span>
            <span>R$ {valorFinal.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={styles.ctaButton}
        >
          {loading ? 'Processando...' : activeTab === 'pix' ? 'Gerar QR Code Pix' : `Pagar R$ ${valorFinal.toFixed(2)}`}
        </button>
        <p className={styles.secureBadge}>🔒 Pagamento 100% cifrado e seguro</p>

      </aside>

    </div>
    </>
  );
}
