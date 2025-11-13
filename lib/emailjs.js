import emailjs from 'emailjs-com';

// TODO: Add your EmailJS User ID
const USER_ID = 'YOUR_USER_ID';
// TODO: Add your EmailJS Service ID
const SERVICE_ID = 'YOUR_SERVICE_ID';

// Initialize EmailJS
emailjs.init(USER_ID);

/**
 * Sends an email using EmailJS
 * @param {string} templateId - The ID of the EmailJS template
 * @param {object} templateParams - Parameters for the template (e.g., { to_email, from_name, message })
 * @returns {Promise<any>}
 */
export const sendEmail = async (templateId, templateParams) => {
  try {
    console.log(`Sending email with template ${templateId}...`);
    const response = await emailjs.send(SERVICE_ID, templateId, templateParams);
    console.log('EmailJS Success:', response.status, response.text);
    return response;
  } catch (error) {
    console.error('EmailJS Failed:', error);
    throw error;
  }
};
