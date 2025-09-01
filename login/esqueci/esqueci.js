document.getElementById('forgotForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;

    // Simulação de validação
    if (email) {
        // Animação de sucesso
        const button = document.querySelector('button');
        button.textContent = 'Enviando...';
        button.style.backgroundColor = '#ffb703';

        setTimeout(() => {
            alert('Instruções enviadas para o e-mail! Verifique sua caixa de entrada.');
            button.textContent = 'Enviar Instruções';
            button.style.backgroundColor = '#40916c';
            document.getElementById('forgotForm').reset();
        }, 1500);
    } else {
        alert('Por favor, insira seu e-mail!');
    }
});

// Efeito interativo no input
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.style.backgroundColor = '#fff';
        input.style.boxShadow = '0 0 8px #ffb703';
    });

    input.addEventListener('blur', () => {
        input.style.backgroundColor = '#f9f9f9';
        input.style.boxShadow = 'none';
    });
});
