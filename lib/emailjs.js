import emailjs from '@emailjs/browser';

// TODO: Add your EmailJS Public Key (from Account -> API Keys)
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
// TODO: Add your EmailJS Service ID
const SERVICE_ID = 'YOUR_SERVICE_ID';

/**
 * Sends an email using EmailJS
 * @param {string} templateId - The ID of the EmailJS template
 * @param {object} templateParams - Parameters for the template (e.g., { to_email, from_name, message })
 * @returns {Promise<any>}
 */
export const sendEmail = async (templateId, templateParams) => {
  try {
    console.log(`Sending email with template ${templateId}...`);
    const response = await emailjs.send(SERVICE_ID, templateId, templateParams, PUBLIC_KEY);
    console.log('EmailJS Success:', response.status, response.text);
    return response;
  } catch (error) {
    console.error('EmailJS Failed:', error);
    throw error;
  }
};
