import React from 'react';
import { FaTruckFast, FaCreditCard, FaLock } from 'react-icons/fa6';
import styles from './PaymentIcons.module.css';

const PaymentIcons = () => {
  return (
    <section className={styles.container}>
      <div className={styles.item}>
        <FaTruckFast className={styles.icon} />
        <div className={styles.text}>
          <h3>Enviamos suas compras</h3>
          <p>Entrega em todo o país</p>
        </div>
      </div>

      <div className={styles.item}>
        <FaCreditCard className={styles.icon} />
        <div className={styles.text}>
          <h3>Em até 3x sem juros!</h3>
          <p>Cartões de crédito ou 10% no Pix</p>
        </div>
      </div>

      <div className={styles.item}>
        <FaLock className={styles.icon} />
        <div className={styles.text}>
          <h3>Compre com segurança</h3>
          <p>Seus dados sempre estão protegidos.</p>
        </div>
      </div>
    </section>
  );
};

export default PaymentIcons;
