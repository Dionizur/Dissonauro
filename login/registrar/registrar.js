document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Simulação de validação
    if (name && email && password && confirmPassword) {
        if (password !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }
        // Animação de sucesso
        const button = document.querySelector('button');
        button.textContent = 'Registrando...';
        button.style.backgroundColor = '#ffb703';

        setTimeout(() => {
            alert('Conta registrada com sucesso! Bem-vindo à era dos dinossauros!');
            button.textContent = 'Registrar';
            button.style.backgroundColor = '#40916c';
            document.getElementById('registerForm').reset();
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
