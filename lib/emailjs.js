import emailjs from '@emailjs/browser';

// Inicialização se necessário, mas geralmente usado no frontend diretamente ou via API
// Se for usar no backend (Node.js), precisaria de uma lib específica ou fetch na API REST do EmailJS

export const sendEmail = async (templateParams) => {
  // Exemplo de uso no client-side
  try {
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      templateParams,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    );
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    throw error;
  }
};
