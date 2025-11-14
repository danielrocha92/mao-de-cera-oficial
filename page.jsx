import styles from './trocas-e-devolucoes.module.css';

export default function TrocasPage() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1>Política de Trocas e Devoluções</h1>
        <p>A Mão de Cera valoriza cada cliente e deseja que sua experiência seja encantadora. Elaboramos esta Política em conformidade com o Código de Defesa do Consumidor (Lei nº 8.078/1990), garantindo clareza, respeito e segurança.</p>

        <h2>1. Prazo para Solicitação</h2>
        <ul>
          <li><strong>Devolução por Arrependimento:</strong> Até 7 (sete) dias corridos após o recebimento do pedido (Art. 49 do CDC).</li>
          <li><strong>Troca/Devolução por Defeito:</strong> Até 30 (trinta) dias corridos após o recebimento.</li>
        </ul>
        <p>Passado esse prazo, não será possível realizar a troca ou devolução.</p>

        <h2>2. Condições do Produto</h2>
        <p>O produto deve ser devolvido sem indícios de uso, sem violação do lacre (se houver), em embalagem original e com todos os itens que o acompanham (tampas, brindes, etc.).</p>
        <p><strong>Atenção:</strong> Produtos que apresentarem sinais de uso, como velas já acesas ou derretidas, não poderão ser aceitos.</p>

        <h2>3. Como Solicitar</h2>
        <p>Entre em contato através do nosso e-mail oficial ou WhatsApp de atendimento, informando: Nome completo, Número do pedido e Motivo da solicitação (anexar fotos em caso de defeito).</p>
        <ul>
          <li><strong>E-mail:</strong> maodeceraoficial@gmail.com</li>
          <li><strong>WhatsApp:</strong> (11) 96130-9680</li>
        </ul>
        <p>Nosso time retornará com as instruções em até 3 (três) dias úteis.</p>

        <h2>4. Custos de Envio (Frete)</h2>
        <ul>
          <li><strong>Arrependimento:</strong> O frete de devolução e reenvio (se houver) será de responsabilidade do comprador.</li>
          <li><strong>Defeito ou Erro no Envio:</strong> Todos os custos de frete serão arcados pela Mão de Cera.</li>
        </ul>

        <h2>5. Reembolso</h2>
        <p>O reembolso será realizado após o recebimento e análise do produto em nosso ateliê. O valor será restituído conforme o método de pagamento original (Cartão de crédito, Pix ou Boleto).</p>

        <h2>6. Atenção: Produtos Artesanais</h2>
        <p>Por serem velas artesanais, produzidas manualmente, pequenas variações de cor, textura ou leve diferença no peso não são consideradas defeitos. Esses detalhes fazem parte da identidade e autenticidade do produto.</p>
      </div>
    </main>
  );
}