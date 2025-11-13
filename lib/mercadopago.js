import { MercadoPagoConfig, Preference } from 'mercadopago';

// TODO: Add your Mercado Pago Access Token
const ACCESS_TOKEN = 'YOUR_MERCADO_PAGO_ACCESS_TOKEN';

// Initialize the Mercado Pago client
const client = new MercadoPagoConfig({ 
    accessToken: ACCESS_TOKEN,
    options: { timeout: 5000 }
});

/**
 * Creates a payment preference in Mercado Pago
 * @param {object} preferenceData - The preference data including items, payer, etc.
 * @returns {Promise<any>}
 */
export const createPaymentPreference = async (preferenceData) => {
  try {
    const preference = new Preference(client);
    const result = await preference.create({ body: preferenceData });
    
    console.log('Mercado Pago preference created:', result.id);
    return result;
  } catch (error) {
    console.error('Error creating Mercado Pago preference:', error);
    throw error;
  }
};
