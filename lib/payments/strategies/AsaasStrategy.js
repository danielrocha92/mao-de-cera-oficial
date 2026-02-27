import IPaymentGateway from './IPaymentGateway';

export default class AsaasStrategy extends IPaymentGateway {
  async processCreditCard(payload) {
    console.log('[Asaas] Processamento Válido, mas o Asaas foca no Pix (Simulando sucesso)...');
    return { success: true, transactionId: `ASAAS-CC-${Math.random()}` };
  }

  async generatePix(payload) {
    console.log('[Asaas] Gerando chave PIX super-otimizada...');
    return {
      success: true,
      qrCode: 'data:image/png;base64,ASAAS123123PIX123123',
      copyPaste: '00020101021126580014br.gov.bcb.pix...ASAAS',
      transactionId: `ASAAS-PIX-${Math.floor(Math.random() * 1000000)}`
    };
  }
}
