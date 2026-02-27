import PaymentRouter from './PaymentRouter.js';
import AsaasStrategy from './strategies/AsaasStrategy.js';
import MercadoPagoStrategy from './strategies/MercadoPagoStrategy.js';
import PagarMeStrategy from './strategies/PagarMeStrategy.js';

// Setup Mock Data
const payerData = {
  nome: 'Daniel',
  cpf: '123.456.789-00',
  amount: 250.00
};

async function testPaymentEnvironment() {
  console.log('====== TESTE DE ROTEAMENTO (PAYMENT CONTROLLER) ======\n');

  // --- Caso de Uso 1: Cliente escolhe pagar com Pix. Sabemos que as taxas do Asaas pro Pix são as menores no Brasil.
  console.log('🔹 CENÁRIO 1: Roteando pagamento Pix prioritário para o ASAAS');
  const pixRouter = new PaymentRouter(new AsaasStrategy());
  await pixRouter.processPix(payerData);
  console.log('\n');

  // --- Caso de Uso 2: Cliente escolhe Cartão. Nossa Estratégia primária é o Mercado Pago via Checkout. Mas, a API deles cai fora do ar!
  console.log('💳 CENÁRIO 2: Pagamento por Cartão com Sistema de Fallback');

  const mpPrimaryStrategy = new MercadoPagoStrategy();
  const pagarmeFallbackStrategy = new PagarMeStrategy();

  // Injeta a estratégia primária (injetada no construtor)
  const ccRouter = new PaymentRouter(mpPrimaryStrategy);

  try {
    // Para fins de dev: Enviamos o token mágico 'ERRO_MP' que configuramos dentro do Strategy MP para simular o Serviço Unavailabe (503)
    const mockCreditCardPayload = {
      cardNumber: 'ERRO_MP',
      cvv: '123',
      name: 'Daniel Sousa'
    };

    // O Sistema vai bater na Primary; perceber; engatilhar a `pagarmeFallbackStrategy` automática em 0ms. O cliente não nota!
    const result = await ccRouter.processCreditCardWithFallback(mockCreditCardPayload, pagarmeFallbackStrategy);

    console.log('[Controller] Transação finalizada e salva no DB com Sucesso! Resultado:', result);
  } catch (err) {
    console.error('[Controller] Venda falhou irreversívelmente:', err.message);
  }
}

testPaymentEnvironment();
