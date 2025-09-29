document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const button = document.querySelector('button');
    const errorDiv = document.getElementById('error-message') || createErrorDiv();

    // Limpar mensagens anteriores
    errorDiv.textContent = '';

    if (!email || !password) {
        showError('Por favor, preencha todos os campos!');
        return;
    }

    try {
        // Mostrar loading
        button.textContent = 'Entrando...';
        button.disabled = true;

        // Tentar login
        const user = await auth.login(email, password);

        // Sucesso
        showSuccess('Login realizado com sucesso! Redirecionando...');

        setTimeout(() => {
            window.location.href = '/index.html';
        }, 1500);

    } catch (error) {
        showError(error.message);
        resetButton();
    }

    function showError(message) {
        errorDiv.textContent = message;
        errorDiv.className = 'error-message';
        resetButton();
    }

    function showSuccess(message) {
        errorDiv.textContent = message;
        errorDiv.className = 'success-message';
    }

    function resetButton() {
        button.textContent = 'Entrar na Pré-História';
        button.disabled = false;
    }

    function createErrorDiv() {
        const div = document.createElement('div');
        div.id = 'error-message';
        document.querySelector('.links').before(div);
        return div;
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