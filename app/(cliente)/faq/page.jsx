'use client';
import { useState } from 'react';
import styles from '../styles/Pages.module.css';

export default function FaqPage() {
  const [open, setOpen] = useState(null);
  const toggle = (i) => setOpen(open === i ? null : i);
  const items = [
    { q: 'Como comprar?', a: 'Para comprar em nossa loja, basta escolher o produto desejado, clicar em "Adicionar ao carrinho" e seguir as instruções para finalizar o pedido.' },
    { q: 'Quais as formas de pagamento?', a: 'Aceitamos cartões de crédito Visa e Mastercard, além de pagamentos via Pix.' },
    { q: 'Qual o prazo de entrega?', a: 'O prazo de entrega varia de acordo com a sua localidade e o método de frete escolhido. É informado no checkout.' },
    { q: 'Como faço a troca ou devolução?', a: 'Consulte nossa política de Trocas e Devoluções na página "Prazos e Entregas".' },
    // adicione mais perguntas conforme necessário
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Perguntas Frequentes</h1>
      <div className={styles.accordion}>
        {items.map((item, i) => (
          <div key={i} className={styles.accordionItem}>
            <button className={styles.question} onClick={() => toggle(i)}>
              {item.q}
              <span>{open === i ? '–' : '+'}</span>
            </button>
            {open === i && <div className={styles.answer}>{item.a}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
