/**
 * Interface Base para Gateways de Pagamento (IPaymentGateway)
 * Usando JSDoc para tipagem abstrata no JavaScript.
 *
 * @interface
 */
export default class IPaymentGateway {
  /**
   * Processa um pagamento via Cartão de Crédito.
   * @param {Object} payload Dados do cartão e comprador.
   * @returns {Promise<{success: boolean, transactionId?: string, error?: string}>}
   */
  async processCreditCard(payload) {
    throw new Error('Método processCreditCard deve ser implementado');
  }

  /**
   * Gera uma cobrança via Pix.
   * @param {Object} payload Dados do comprador e valor.
   * @returns {Promise<{success: boolean, qrCode?: string, copyPaste?: string, error?: string}>}
   */
  async generatePix(payload) {
    throw new Error('Método generatePix deve ser implementado');
  }
}
