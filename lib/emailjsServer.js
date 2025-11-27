export const sendEmailServer = async (templateParams) => {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY; // Ensure this is added to .env.local if needed

  const data = {
    service_id: serviceId,
    template_id: templateId,
    user_id: publicKey,
    template_params: templateParams,
    accessToken: privateKey, // Optional but recommended for server-side
  };

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`EmailJS Error: ${response.status} ${errorData}`);
    }

    console.log('Email sent successfully via EmailJS Server API');
  } catch (error) {
    console.error('Error sending email server-side:', error);
    // Don't throw to avoid crashing the webhook response, just log it
  }
};
