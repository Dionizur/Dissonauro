document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simulação de validação
    if (email && password) {
        // Animação de sucesso
        const button = document.querySelector('button');
        button.textContent = 'Entrando...';
        button.style.backgroundColor = '#ffb703';
        
        setTimeout(() => {
            alert('Login bem-sucedido! Bem-vindo à era dos dinossauros!');
            button.textContent = 'Entrar na Pré-História';
            button.style.backgroundColor = '#fb8500';
            document.getElementById('loginForm').reset();
        }, 1500);
    } else {
        alert('Por favor, preencha todos os campos!');
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