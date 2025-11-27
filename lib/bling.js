// lib/bling.js
// Helper para integração com a API do Bling

const BLING_API_KEY = process.env.BLING_API_KEY;
const BASE_URL = 'https://bling.com.br/Api/v2'; // Ou v3 dependendo da versão

export async function createNFe(pedido) {
  // Implementação futura da emissão de NF-e
  console.log('Emitindo NF-e para pedido:', pedido.id);
  // return fetch(...)
}

export async function getShippingQuote(cep) {
  // Implementação futura de cotação de frete
  console.log('Cotando frete para:', cep);
}
