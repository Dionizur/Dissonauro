// Funções comuns de autenticação

// Verificar se há um evento de autenticação na URL (para confirmação de email)
async function handleAuthRedirect() {
    const { data, error } = await window.supabase.auth.getSessionFromUrl();
    if (error) {
        console.error('Erro ao processar redirecionamento:', error.message);
    } else if (data.session) {
        console.log('Usuário autenticado com sucesso:', data);
        // Redirecionar para a página principal
        window.location.href = '/index.html';
    }
}

// Chame essa função ao carregar a página
handleAuthRedirect();

// Listener para mudanças de estado de autenticação
window.supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' && session) {
        // Redirecionar para a página principal após login/registro
        window.location.href = '/index.html';
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
