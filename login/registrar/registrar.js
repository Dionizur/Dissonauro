// Função de registro
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        showMessage('As senhas não coincidem.');
        return;
    }

    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: name
                }
            }
        });

        if (error) {
            showMessage('Erro no registro: ' + error.message);
        } else {
            showMessage('Registro realizado com sucesso! Verifique seu e-mail para confirmação.', 'success');
            // Opcional: redirecionar após registro
            // window.location.href = '/login/login.html';
        }
    } catch (err) {
        showMessage('Erro inesperado: ' + err.message);
    }
});
