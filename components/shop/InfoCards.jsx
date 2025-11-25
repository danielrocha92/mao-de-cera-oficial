import React from 'react';
import styles from './InfoCards.module.css';
// Import icons from react-icons
import { FaTruck, FaCreditCard, FaLock } from 'react-icons/fa';

const InfoCard = ({ icon: IconComponent, title, description }) => (
  <div className={styles.infoCard}>
    {IconComponent && <IconComponent className={styles.cardIcon} />}
    <h3 className={styles.cardTitle}>{title}</h3>
    <p className={styles.cardDescription}>{description}</p>
  </div>
);

const InfoCards = () => {
  const cardsData = [
    {
      icon: FaTruck, // react-icons Truck icon for shipping
      title: 'Enviamos suas compras',
      description: 'Entrega em todo o país',
    },
    {
      icon: FaCreditCard, // react-icons Credit Card icon for payment
      title: 'Em até 3x sem juros!',
      description: 'Cartões de crédito ou 10% no Pix',
    },
    {
      icon: FaLock, // react-icons Lock icon for security
      title: 'Compre com segurança',
      description: 'Seus dados sempre protegidos',
    },
  ];

  return (
    <section className={styles.infoCardsSection}>
      {cardsData.map((card, index) => (
        <InfoCard key={index} icon={card.icon} title={card.title} description={card.description} />
      ))}
    </section>
  );
};

export default InfoCards;

