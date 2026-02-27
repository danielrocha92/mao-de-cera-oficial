import IPaymentGateway from './IPaymentGateway';

export default class MercadoPagoStrategy extends IPaymentGateway {
  async processCreditCard(payload) {
    console.log('[MercadoPago] Processando Cartão de Crédito...');

    // Simulando uma integração real.
    // Em produção, isso faria o fetch para a API enviando o token do cartão.
    if (payload.cardNumber === 'ERRO_MP') {
        throw new Error('503 Service Unavailable: Mercado Pago apresentou falha.');
    }

    // Sucesso simulado
    return {
      success: true,
      transactionId: `MP-CC-${Math.floor(Math.random() * 1000000)}`,
      status: 'approved'
    };
  }

  async generatePix(payload) {
    console.log('[MercadoPago] Gerando chave PIX...');
    return {
      success: true,
      qrCode: 'data:image/png;base64,xxxxxxxxxxxxx',
      copyPaste: '00020101021126580014br.gov.bcb.pix...',
      transactionId: `MP-PIX-${Math.floor(Math.random() * 1000000)}`
    };
  }
}
