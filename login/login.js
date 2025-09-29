// Função de login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const { data, error } = await window.supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            showMessage('Erro no login: ' + error.message);
        } else {
            showMessage('Login realizado com sucesso!', 'success');
            // O listener em auth.js redirecionará automaticamente
        }
    } catch (err) {
        showMessage('Erro inesperado: ' + err.message);
    }
});
