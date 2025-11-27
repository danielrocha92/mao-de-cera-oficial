'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaFacebook, FaYoutube, FaPinterest, FaTiktok, FaInstagram } from 'react-icons/fa';
import { VisaIcon, MastercardIcon, AmexIcon, PixIcon } from '../icons/PaymentIcons';
import CustomLink from '../ui/CustomLink';
import styles from './Footer.module.css';
import { useTheme } from '@/app/context/ThemeContext';

const storeSettings = {
    codigos_externos: {
        gtm_id: "GTM-XXXXXX",
        ga4_id: "G-XXXXXX",
        fb_pixel_id: "FB-PIXEL-XXXXXX"
    },
    nome_loja: "Mão de Cera Oficial",
    email_contato: "maodeceraoficial@gmail.com",
    telefone_contato: "(11) 96130-9680",
    endereco: "Rua Padre José Antonio Romano 300",
    cnpj: "61.802.466/0001-03",
    horario_atendimento: "Seg. a Sex. das 9h às 18h"
};

const Footer = () => {
  const [openSection, setOpenSection] = useState(null);
  const { theme } = useTheme();
  const settings = storeSettings;

  const toggleSection = (section) => {
    if (window.innerWidth < 768) {
      setOpenSection(openSection === section ? null : section);
    }
  };

  return (
    <footer className={`${styles.footer} ${theme === 'dark' ? styles.darkTheme : ''}`}>
      {/* Newsletter Section */}
      <div className={styles.newsletter}>
        <div className={styles.newsletterContainer}>
          <div className={styles.newsletterText}>
            <h3>Receba ofertas exclusivas</h3>
            <p>Cadastre-se e receba novidades e promoções em primeira mão.</p>
          </div>
          <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Digite seu e-mail" required />
            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.linksGrid}>
          {/* Institucional */}
          <div className={styles.section}>
            <h4 onClick={() => toggleSection('institucional')}>
              Institucional
              <span className={styles.indicator}>{openSection === 'institucional' ? '-' : '+'}</span>
            </h4>
            <div className={`${styles.content} ${openSection === 'institucional' ? styles.open : ''}`}>
              <CustomLink href="/quem-somos">Quem Somos</CustomLink>
              <CustomLink href="/trabalhe-conosco">Trabalhe Conosco</CustomLink>
              <CustomLink href="/politica-de-privacidade">Política de Privacidade</CustomLink>
              <CustomLink href="/termos-de-uso">Termos de Uso</CustomLink>
            </div>
          </div>

          {/* Dúvidas */}
          <div className={styles.section}>
            <h4 onClick={() => toggleSection('duvidas')}>
              Dúvidas
              <span className={styles.indicator}>{openSection === 'duvidas' ? '-' : '+'}</span>
            </h4>
            <div className={`${styles.content} ${openSection === 'duvidas' ? styles.open : ''}`}>
              <CustomLink href="/como-comprar">Como Comprar</CustomLink>
              <CustomLink href="/trocas-e-devolucoes">Trocas e Devoluções</CustomLink>
              <CustomLink href="/prazos-e-entregas">Prazos e Entregas</CustomLink>
              <CustomLink href="/faq">Perguntas Frequentes</CustomLink>
            </div>
          </div>

          {/* Atendimento */}
          <div className={styles.section}>
            <h4 onClick={() => toggleSection('atendimento')}>
              Atendimento
              <span className={styles.indicator}>{openSection === 'atendimento' ? '-' : '+'}</span>
            </h4>
            <div className={`${styles.content} ${openSection === 'atendimento' ? styles.open : ''}`}>
              <p><strong>Telefone:</strong> {settings?.telefone_contato}</p>
              <p><strong>Email:</strong> {settings?.email_contato}</p>
              <p>Horário de atendimento: Seg. a Sex. das 9h às 18h</p>
              <CustomLink href="/contato" className={styles.contactLink}>Fale Conosco</CustomLink>
            </div>
          </div>

           {/* Redes Sociais (Mobile/Desktop integrated in grid for Fast Shop look) */}
           <div className={styles.section}>
            <h4 className={styles.noAccordion}>Siga-nos</h4>
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
        </div>

        <div className={styles.bottomBar}>
          <div className={styles.payment}>
            <h5>Formas de Pagamento</h5>
            <div className={styles.paymentIcons}>
              <div className={styles.iconWrapper} title="Visa">
                <VisaIcon />
              </div>
              <div className={styles.iconWrapper} title="Mastercard">
                <MastercardIcon />
              </div>
              <div className={styles.iconWrapper} title="Pix">
                <PixIcon />
              </div>
              <div className={styles.iconWrapper} title="American Express">
                <AmexIcon />
              </div>
              <div className={styles.iconWrapper} title="Elo">
                <Image src="/icons/elo.svg" alt="Elo" width={36} height={24} style={{ objectFit: 'contain' }} />
              </div>
              <div className={styles.iconWrapper} title="Hipercard">
                <Image src="/icons/hipercard.svg" alt="Hipercard" width={36} height={24} style={{ objectFit: 'contain' }} />
              </div>
            </div>
          </div>

          <div className={styles.security}>
             <h5>Segurança</h5>
             <div className={styles.securityIcons}>
                {/* Placeholder for security badges */}
                <div className={styles.securityBadge}>Site Seguro</div>
                <div className={styles.securityBadge}>SSL Blindado</div>
             </div>
          </div>
        </div>
      </div>

      <div className={styles.legal}>
        <div className={styles.legalContainer}>
            <p>
            &copy; {new Date().getFullYear()} {settings?.nome_loja}. Todos os direitos reservados.
            </p>
            <p>CNPJ: {settings?.cnpj} | Endereço: {settings?.endereco}</p>
            <p className={styles.developer}>
                Desenvolvido por <CustomLink href="https://rocha-tech-solutions.vercel.app/">Rocha Tech Solutions</CustomLink>
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
