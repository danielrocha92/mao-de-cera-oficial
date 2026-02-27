export default class PaymentRouter {
  /**
   * @param {import('./strategies/IPaymentGateway').default} strategy Estratégia Inicial/Primária
   */
  constructor(strategy) {
    this.strategy = strategy;
  }

  /**
   * Troca a estratégia em tempo de execução
   * @param {import('./strategies/IPaymentGateway').default} strategy
   */
  setStrategy(strategy) {
    this.strategy = strategy;
  }

  /**
   * Executa a estratégia de pagamento via Pix selecionada
   * @param {Object} payload
   */
  async processPix(payload) {
    if (!this.strategy) throw new Error("A Strategy (Gateway) must be defined before processing.");

    return await this.strategy.generatePix(payload);
  }

  /**
   * Executa a estratégia Primária. Em caso de falha/timeout, redireciona magicamente pro provedor Fallback.
   *
   * @param {Object} payload Payload do cartão de crédito contendo token etc.
   * @param {import('./strategies/IPaymentGateway').default} fallbackGatewayGateway A classe (não instanciada) ou instância do gateway reserva.
   */
  async processCreditCardWithFallback(payload, FallbackStrategyClass) {
    if (!this.strategy) {
      throw new Error("A Strategy (Gateway) primary must be defined before processing fallback.");
    }

    try {
      console.log(`[Router] Iniciando transação com a Estratégia Primária: ${this.strategy.constructor.name}`);
      const result = await this.strategy.processCreditCard(payload);

      console.log(`[Router] ✅ Transação Aprovada - Gateway Primário (${this.strategy.constructor.name})`);
      return result;

    } catch (error) {
      // Cenário de erro: Timeout da API, Falha Generalizada no Provedor (ex: 503)
      console.error(`[Router] ❌ Falha CRÍTICA na Estratégia Primária (${this.strategy.constructor.name}):`, error.message);

      if (!FallbackStrategyClass) {
        throw new Error('Nenhum Fallback Gateway definido. Compra Recusada!');
      }

      console.warn(`[Router] 🔄 Executando Fallback: Redirecionando a transação via ${FallbackStrategyClass.constructor.name}...`);

      // Trocando a estratégia em tempo de execução
      this.setStrategy(FallbackStrategyClass);

      try {
        const fallbackResult = await this.strategy.processCreditCard(payload);
        console.log(`[Router] ✨ Transação Aprovada - Gateway Retaguarda (Fallback via ${this.strategy.constructor.name}) salvou a venda!`);
        return {
           ...fallbackResult,
           isFallback: true, // Flag para relatórios
        };
      } catch (fallbackError) {
        // Se o fallback também falhar, recusamos a compra de vez.
        console.error(`[Router] 💥 Falha fatal no Fallback também (${this.strategy.constructor.name}). Pagamento recusado integralmente.`);
        throw new Error("Não foi possível processar o pagamento com nenhum gateway disponível. Verifique o saldo do cartão ou tente mais tarde.");
      }
    }
  }
}
