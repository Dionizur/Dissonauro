// Função de registro
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validar se senhas coincidem
    if (password !== confirmPassword) {
        showMessage('As senhas não coincidem!');
        return;
    }

    try {
        const { data, error } = await window.supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    name: name
                }
            }
        });

        if (error) {
            showMessage('Erro no registro: ' + error.message);
        } else {
            showMessage('Registro realizado! Verifique seu email para confirmar.', 'success');
            // O listener em auth.js redirecionará após confirmação
        }
    } catch (err) {
        showMessage('Erro inesperado: ' + err.message);
    }
});
