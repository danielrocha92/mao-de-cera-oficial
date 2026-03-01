<h1 align="center"> 🕯️ Mão de Cera Oficial - Portal de Serviços e Leads <img src="https://vercelbadge.vercel.app/api/danielrocha92/mao-de-cera-oficial" alt="Vercel Status"></h1>

<p><strong>Plataforma institucional e sistema de captação de leads para serviços estéticos.</strong><br>
💡 Projeto Full-Stack desenvolvido para modernizar a marca e criar um sistema de vendas digitais eficiente.</p>

<p>🔗 <strong><a href="https://mao-de-cera-oficial.vercel.app/">Acesse o site</a></strong></p>

<hr>

<h2>🛠️ Tecnologias Utilizadas</h2>

<ul>
    <li><strong>Next.js</strong> &mdash; Front-End de alta performance, SEO e renderização avançada.</li>
    <li><strong>Node.js &amp; Express</strong> &mdash; Backend customizado para gestão de dados.</li>
    <li><strong>Firebase (Firestore)</strong> &mdash; Banco de dados para persistência de leads.</li>
    <li><strong>HTML5 &amp; CSS3</strong> &mdash; Estrutura semântica e estilização modular (CSS Dedicado).</li>
    <li><strong>Framer Motion</strong> &mdash; Animações e micro-interações para uma UX aprimorada.</li>
</ul>

<hr>

<h2>🎯 Propósito e Impacto no Negócio</h2>

<p>O foco central do <b>Mão de Cera Oficial</b> é a <b>captação de leads</b> e a <b>modernização da marca</b> no ambiente digital, usando a tecnologia para impulsionar o crescimento do negócio:</p>

<ul>
    <li>✅ <b>Geração de Leads:</b> Implementação de formulários e CTAs estratégicos para converter visitantes em clientes potenciais.</li>
    <li>✅ <b>Posicionamento no Mercado:</b> Uso do Next.js para garantir a performance e o SEO necessários para competir em um mercado concorrido.</li>
    <li>✅ <b>Gestão de Dados:</b> Criação de uma API Back-End para receber e gerenciar os dados de leads de forma organizada no Firebase.</li>
    <li>✅ <b>UX Visual:</b> Design limpo e profissional, utilizando <b>CSS Dedicado</b> e animações sutis para criar uma experiência premium.</li>
</ul>

<hr>

<h2>🖼️ Arquitetura do Projeto (Full-Stack Next.js 14 App Router)</h2>

<pre><code>mao-de-cera-oficial/
├── app/
│   ├── (admin)/             # Rotas e layouts do Painel Administrativo
│   ├── (cliente)/           # Rotas e layouts da loja front-facing
│   ├── api/                 # Rotas da API e Webhooks (Mercado Pago, Bling)
│   ├── globals.css          # Estilos Globais
│   └── layout.jsx           # Root Layout principal
├── components/              # Componentes de UI modulares
│   ├── layout/              # Header, Footer, Sidebar
│   ├── shop/                # Componentes específicos de e-commerce (Carrosséis, Cards)
│   └── ui/                  # Botões, Inputs, Modais base
├── lib/                     # Utilitários, hooks customizados e validações (Zod)
├── public/                  # Assets estáticos (imagens, ícones)
└── package.json
</code></pre>

<hr>

<h2>🌱 Principais Aprendizados Técnicos</h2>

<ol>
    <li>
        <p><strong>Estratégia Full-Stack com Next.js:</strong></p>
        <ul>
            <li><strong>Lição:</strong> Combinação de Front-End de alta velocidade (Next.js) com um Back-End de dados (Node.js/Firebase), garantindo que a aplicação seja rápida e funcional.</li>
        </ul>
    </li>
    <li>
        <p><strong>Desenvolvimento Mobile-First com CSS Puro:</strong></p>
        <ul>
            <li><strong>Lição:</strong> Transição arquitetural completa para <b>Mobile First</b>. Todos os componentes foram refatorados para usar <code>min-width</code> ao invés de <code>max-width</code>, com CSS puro em formato de modularização (CSS Modules). Garantindo renderização nativa rápida no mobile e escalonamento responsivo fluido para desktop.</li>
        </ul>
    </li>
    <li>
        <p><strong>Persistência de Dados (BaaS):</strong></p>
        <ul>
            <li><strong>Lição:</strong> Utilização do Firebase (Firestore e Auth) para gerenciamento completo do catálogo, pedidos, clientes e integração de pagamentos (Mercado Pago), sem depender de CMS engessados.</li>
        </ul>
    </li>
</ol>

<hr>

<h2>🚀 Como Rodar Localmente</h2>

<p>Clone o repositório:</p>

<pre><code>git clone https://github.com/danielrocha92/mao-de-cera-oficial.git
cd mao-de-cera-oficial
npm install
npm run dev
</code></pre>

<p>Acesse: <code>http://localhost:3000</code></p>

<hr>

<h2>👨‍💻 Autor</h2>

<p><strong>Daniel Rocha</strong><br>
Developer Web Full-Stack com foco em Soluções de Negócios e Produto.</p>

<ul>
    <li><strong>📫 LinkedIn:</strong> <a href="https://www.linkedin.com/in/danielrocha92">Daniel Rocha</a></li>
</ul>
