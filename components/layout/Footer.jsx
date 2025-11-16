'use client';

import { useState } from 'react';
import { FaFacebook, FaYoutube, FaPinterest, FaTiktok, FaInstagram } from 'react-icons/fa';
import CustomLink from '../ui/CustomLink';
import styles from './Footer.module.css';
import { useTheme } from '@/app/context/ThemeContext';

const Footer = ({ settings }) => {
  const [openSection, setOpenSection] = useState(null);
  const { theme } = useTheme();

  const toggleSection = (section) => {
    if (window.innerWidth < 768) {
      setOpenSection(openSection === section ? null : section);
    }
  };

  return (
    <footer className={`${styles.footer} ${theme === 'dark' ? styles.darkTheme : ''}`}>
      <div className={styles.container}>
        <div className={styles.links}>
          <div className={styles.section}>
            <h4 onClick={() => toggleSection('atendimento')}>
              <span>Atendimento</span>
              <span className={styles.indicator}>{openSection === 'atendimento' ? '-' : '+'}</span>
            </h4>
            <div className={`${styles.content} ${openSection === 'atendimento' ? styles.open : ''}`}>
              <p>Telefone: (11) 96130 9680</p>
              <p>Email: maodeceraoficial@gmail.com</p>
              <CustomLink href="/como-comprar">Como Comprar</CustomLink>
              <CustomLink href="/trocas-e-devolucoes">Trocas e Devoluções</CustomLink>
            </div>
          </div>
          <div className={styles.section}>
            <h4 onClick={() => toggleSection('institucional')}>
              <span>Institucional</span>
              <span className={styles.indicator}>{openSection === 'institucional' ? '-' : '+'}</span>
            </h4>
            <div className={`${styles.content} ${openSection === 'institucional' ? styles.open : ''}`}>
              <CustomLink href="/quem-somos">Quem Somos</CustomLink>
              <CustomLink href="/politica-de-privacidade">Política de Privacidade</CustomLink>
            </div>
          </div>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.social}>
            <h5>Siga-nos</h5>
            <div className={styles.socialIcons}>
              <a href="https://www.facebook.com/people/M%C3%A3o-de-Cera-Ateli%C3%AA/61580997951290/" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={24} />
              </a>
              <a href="https://www.youtube.com/@M%C3%A3oDeCeraAteli%C3%AA" target="_blank" rel="noopener noreferrer">
                <FaYoutube size={24} />
              </a>
              <a href="https://br.pinterest.com/maodeceraoficial/" target="_blank" rel="noopener noreferrer">
                <FaPinterest size={24} />
              </a>
              <a href="https://www.instagram.com/maodeceraoficial/" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={24} />
              </a>
              <a href="https://www.tiktok.com/@maodeceraoficial" target="_blank" rel="noopener noreferrer">
                <FaTiktok size={24} />
              </a>
            </div>
          </div>
          <div className={styles.payment}>
            <h5>Formas de Pagamento</h5>
            <div className={styles.paymentIcons}>
              <img src="/icons/visa.svg" alt="Visa" />
              <img src="/icons/mastercard.svg" alt="Mastercard" />
              <img src="/icons/pix.svg" alt="Pix" />
              {/* Adicionando outros ícones de pagamento conforme o site */}
              <img src="/icons/amex.svg" alt="American Express" />
              <img src="/icons/elo.svg" alt="Elo" />
              <img src="/icons/hipercard.svg" alt="Hipercard" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.legal}>
        <p>
          &copy; {new Date().getFullYear()} Mão de Cera Oficial. Todos os direitos reservados. Desenvolvido por{' '}
          <CustomLink href="https://rocha-tech-solutions.vercel.app/">
            Rocha Tech Solutions
          </CustomLink>
          .
        </p>
        <p>CNPJ: 53.479.439/0001-37 | Endereço: Rua Padre José Antonio Romano 300</p>
      </div>
    </footer>
  );
};

export default Footer;
