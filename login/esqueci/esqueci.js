// Função de recuperação de senha
document.getElementById('forgotForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();

    try {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email);

        if (error) {
            showMessage('Erro ao enviar instruções: ' + error.message);
        } else {
            showMessage('Instruções enviadas para o seu e-mail.', 'success');
        }
    } catch (err) {
        showMessage('Erro inesperado: ' + err.message);
    }
});
