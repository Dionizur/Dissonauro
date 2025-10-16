// Funções comuns de autenticação

// Verificar se há um evento de autenticação na URL (para confirmação de email)
async function handleAuthRedirect() {
    const { data, error } = await window.supabase.auth.getSessionFromUrl();
    if (error) {
        console.error('Erro ao processar redirecionamento:', error.message);
    } else if (data.session) {
        console.log('Usuário autenticado com sucesso:', data);
        // Redirecionar para a página principal
        window.location.href = '../index.html';
    }
}

// Chame essa função ao carregar a página
handleAuthRedirect();

// Listener para mudanças de estado de autenticação
window.supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' && session) {
        // Redirecionar para a página principal após login/registro
        window.location.href = '../index.html';
    }
});

// Função para mostrar mensagens de erro/sucesso
function showMessage(message, type = 'error') {
    // Criar elemento de mensagem se não existir
    let msgDiv = document.getElementById('auth-message');
    if (!msgDiv) {
        msgDiv = document.createElement('div');
        msgDiv.id = 'auth-message';
        msgDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 10px 20px;
            border-radius: 5px;
            color: white;
            font-weight: bold;
            z-index: 1000;
        `;
        document.body.appendChild(msgDiv);
    }

    msgDiv.textContent = message;
    msgDiv.style.backgroundColor = type === 'success' ? '#4CAF50' : '#f44336';

    // Remover após 5 segundos
    setTimeout(() => {
        if (msgDiv) msgDiv.remove();
    }, 5000);
}

// Função para verificar se usuário está logado (opcional, para proteger páginas)
async function checkAuth() {
    const { data: { session } } = await window.supabase.auth.getSession();
    return session;
}

document.addEventListener('DOMContentLoaded', () => {
    const modeButtons = document.querySelectorAll('.mode-btn');
    const forms = document.querySelectorAll('.auth-form');
    const authTitle = document.getElementById('authTitle');
    const authSubtitle = document.getElementById('authSubtitle');

    function setActiveMode(mode) {
        modeButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });
        forms.forEach(form => {
            form.classList.toggle('active', form.id === mode + 'Form');
        });

        switch (mode) {
            case 'login':
                authTitle.textContent = 'DinoLogin';
                authSubtitle.textContent = 'Entre na era dos dinossauros!';
                break;
            case 'register':
                authTitle.textContent = 'Registrar Conta';
                authSubtitle.textContent = 'Junte-se à era dos dinossauros!';
                break;
            case 'forgot':
                authTitle.textContent = 'Esqueci a Senha';
                authSubtitle.textContent = 'Recupere sua senha pré-histórica!';
                break;
        }
    }

    modeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            setActiveMode(btn.dataset.mode);
        });
    });

    // Initialize with login mode
    setActiveMode('login');

    // Login form submission
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        try {
            const { data, error } = await window.supabase.auth.signInWithPassword({
                email: email,
                password: password
            });
            if (error) {
                showMessage('Erro no login: ' + error.message);
            } else {
                showMessage('Login realizado com sucesso!', 'success');
                // Redirect or update UI accordingly
            }
        } catch (err) {
            showMessage('Erro inesperado: ' + err.message);
        }
    });

    // Register form submission
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        if (password !== confirmPassword) {
            showMessage('As senhas não coincidem.');
            return;
        }
        try {
            const { data, error } = await window.supabase.auth.signUp({
                email: email,
                password: password
            });
            if (error) {
                showMessage('Erro no registro: ' + error.message);
            } else {
                showMessage('Registro realizado com sucesso! Verifique seu e-mail para confirmação.', 'success');
                setActiveMode('login');
            }
        } catch (err) {
            showMessage('Erro inesperado: ' + err.message);
        }
    });

    // Forgot password form submission
    document.getElementById('forgotForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('forgotEmail').value;
        try {
            const { data, error } = await window.supabase.auth.resetPasswordForEmail(email);
            if (error) {
                showMessage('Erro ao enviar instruções: ' + error.message);
            } else {
                showMessage('Instruções enviadas para o e-mail.', 'success');
                setActiveMode('login');
            }
        } catch (err) {
            showMessage('Erro inesperado: ' + err.message);
        }
    });
});
