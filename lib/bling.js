// TODO: Add your Bling API Token
const BLING_API_TOKEN = 'YOUR_BLING_API_TOKEN';
const BLING_API_URL = 'https://bling.com.br/Api/v2';

/**
 * Helper function to interact with the Bling API
 * @param {string} endpoint - The API endpoint (e.g., /produto/json/)
 * @param {string} method - HTTP method (GET, POST, etc.)
 * @param {object} [data] - Data to send in the request body
 * @returns {Promise<any>}
 */
async function blingRequest(endpoint, method = 'GET', data = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    };

    const url = new URL(`${BLING_API_URL}${endpoint}`);
    
    // Bling uses form data and expects the apikey in the body/params
    const formData = new URLSearchParams();
    formData.append('apikey', BLING_API_TOKEN);

    if (data && method === 'POST') {
        // Bling's API for creating products/NFe expects an XML string in a field
        // This needs to be carefully constructed based on their documentation
        formData.append('xml', data.xml); 
    }
    
    options.body = formData.toString();

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Bling API Error: ${response.statusText} - ${errorText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error calling Bling API:", error);
        throw error;
    }
}

/**
 * Emits an NFe on Bling
 * @param {object} orderData - The order data formatted for Bling
 * @returns {Promise<any>}
 */
export async function emitirNFeBling(orderData) {
    // TODO: Implement the logic to convert orderData to the XML format Bling expects
    const xmlData = `<pedido>...</pedido>`; // Placeholder
    return blingRequest('/notafiscal/json/', 'POST', { xml: xmlData });
}

/**
 * Calculates shipping using Bling's integration
 * @param {object} shippingInfo - Info like CEP, product weight/dimensions
 * @returns {Promise<any>}
 */
export async function calcularFreteBling(shippingInfo) {
    // TODO: Implement the logic to call Bling's shipping calculation endpoint
    // This might be a different endpoint or require a different format
    return blingRequest(`/transporte/calculaFrete/json/`, 'POST', { ...shippingInfo });
}
