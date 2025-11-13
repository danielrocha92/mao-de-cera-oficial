import mercadopago from 'mercadopago';

// TODO: Add your Mercado Pago Access Token
const ACCESS_TOKEN = 'YOUR_MERCADO_PAGO_ACCESS_TOKEN';

// Configure Mercado Pago SDK
mercadopago.configure({
  access_token: ACCESS_TOKEN,
});

/**
 * Creates a payment preference in Mercado Pago
 * @param {object} preferenceData - The preference data including items, payer, etc.
 * @returns {Promise<any>}
 */
export const createPaymentPreference = async (preferenceData) => {
  try {
    const result = await mercadopago.preferences.create(preferenceData);
    console.log('Mercado Pago preference created:', result.body.id);
    return result.body;
  } catch (error) {
    console.error('Error creating Mercado Pago preference:', error);
    throw error;
  }
};
