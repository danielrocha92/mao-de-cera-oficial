'use client';

import { useState } from 'react';
import CustomLink from '../ui/CustomLink';
import styles from './Footer.module.css';

const Footer = ({ settings }) => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    if (window.innerWidth < 768) {
      setOpenSection(openSection === section ? null : section);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.links}>
          <div className={styles.section}>
            <h4 onClick={() => toggleSection('atendimento')}>Atendimento</h4>
            <div className={`${styles.content} ${openSection === 'atendimento' ? styles.open : ''}`}>
              <CustomLink href="/faq">Perguntas Frequentes</CustomLink>
              <CustomLink href="/trocas-e-devolucoes">Trocas e Devoluções</CustomLink>
              <CustomLink href="/contato">Fale Conosco</CustomLink>
            </div>
          </div>
          <div className={styles.section}>
            <h4 onClick={() => toggleSection('institucional')}>Institucional</h4>
            <div className={`${styles.content} ${openSection === 'institucional' ? styles.open : ''}`}>
              <CustomLink href="/quem-somos">Sobre Nós</CustomLink>
              <CustomLink href="/trabalhe-conosco">Trabalhe Conosco</CustomLink>
            </div>
          </div>
          <div className={styles.section}>
            <h4 onClick={() => toggleSection('politicas')}>Nossas Políticas</h4>
            <div className={`${styles.content} ${openSection === 'politicas' ? styles.open : ''}`}>
              <CustomLink href="/politica-de-privacidade">Política de Privacidade</CustomLink>
              <CustomLink href="/termos-de-uso">Termos de Uso</CustomLink>
            </div>
          </div>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.social}>
            <h5>Siga-nos</h5>
            <div className={styles.socialIcons}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img src="/icons/instagram.svg" alt="Instagram" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="/icons/facebook.svg" alt="Facebook" />
              </a>
            </div>
          </div>
          <div className={styles.payment}>
            <h5>Formas de Pagamento</h5>
            <div className={styles.paymentIcons}>
              <img src="/icons/visa.svg" alt="Visa" />
              <img src="/icons/mastercard.svg" alt="Mastercard" />
              <img src="/icons/pix.svg" alt="Pix" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.legal}>
        <p>&copy; {new Date().getFullYear()} {settings?.nome_loja || 'Mão de Cera Oficial'}. Todos os direitos reservados.</p>
        <p>CNPJ: {settings?.cnpj || '00.000.000/0000-00'} | Endereço: {settings?.endereco || 'Rua Fictícia, 123'}</p>
      </div>
    </footer>
  );
};

export default Footer;
