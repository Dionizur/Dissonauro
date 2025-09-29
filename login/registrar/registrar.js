document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const button = document.querySelector('button');
    const errorDiv = document.getElementById('error-message') || createErrorDiv();

    // Limpar mensagens anteriores
    errorDiv.textContent = '';

    // Validação básica
    if (!name || !email || !password || !confirmPassword) {
        showError('Por favor, preencha todos os campos!');
        return;
    }

    if (password !== confirmPassword) {
        showError('As senhas não coincidem!');
        return;
    }

    if (password.length < 6) {
        showError('A senha deve ter pelo menos 6 caracteres!');
        return;
    }

    try {
        // Mostrar loading
        button.textContent = 'Registrando...';
        button.disabled = true;

        // Tentar registro
        const user = await auth.register({ name, email, password });

        // Sucesso
        showSuccess('Conta criada com sucesso! Redirecionando para login...');

        setTimeout(() => {
            window.location.href = '/login/login.html';
        }, 2000);

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
        button.textContent = 'Registrar';
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
