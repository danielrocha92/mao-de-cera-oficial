import IPaymentGateway from './IPaymentGateway';

export default class PagarMeStrategy extends IPaymentGateway {
  async processCreditCard(payload) {
    console.log('[PagarMe] Processando Cartão de Crédito...');

    // Sucesso simulado
    return {
      success: true,
      transactionId: `PAGARME-CC-${Math.floor(Math.random() * 1000000)}`,
      status: 'approved',
      gateway: 'pagarme'
    };
  }

  async generatePix(payload) {
    console.log('[PagarMe] Gerando chave PIX...');
    return {
      success: true,
      qrCode: 'data:image/png;base64,xxxxxxxxxxxxx',
      copyPaste: '00020101021126580014br.gov.bcb.pix...PAGARME',
      transactionId: `PAGARME-PIX-${Math.floor(Math.random() * 1000000)}`
    };
  }
}
