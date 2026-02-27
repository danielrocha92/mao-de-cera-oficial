// app.js - Vanilla JS para lógica de Abas (Tabs) do Pagamento

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  const btnFinalizar = document.getElementById('submitOrderBtn');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // 1. Remove classe 'active' de todas as abas e conteúdos
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // 2. Adiciona a classe 'active' na aba clicada
      tab.classList.add('active');

      // 3. Mostra o conteúdo correspondente
      const targetId = tab.getAttribute('data-tab');
      const targetContent = document.getElementById(targetId);

      if (targetContent) {
        targetContent.classList.add('active');

        // 4. Mudar o texto do botão de Ação dependendo do cenário
        if (targetId === 'pix') {
          btnFinalizar.textContent = 'Gerar QR Code Pix';
        } else if (targetId === 'credit-card') {
          btnFinalizar.textContent = 'Pagar R$ 275,00';
        }
      }
    });
  });

  // Listener Visual extra pro forms
  const creditCardForm = document.getElementById('creditCardForm');
  if (creditCardForm) {
    creditCardForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Integração em progresso... Enviando para a PaymentRouter Strategy!');
    });
  }
});
