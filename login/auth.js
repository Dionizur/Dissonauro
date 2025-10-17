// login/auth.js
console.log('Auth.js iniciado');

// Aguardar o Supabase estar pronto
function waitForSupabase() {
    return new Promise((resolve, reject) => {
        let attempts = 0;
        const maxAttempts = 50;
        
        const checkSupabase = () => {
            attempts++;
            
            if (window.supabase && window.supabase.auth && typeof window.supabase.auth.signInWithPassword === 'function') {
                console.log('✅ Supabase carregado após', attempts, 'tentativas');
                resolve(window.supabase);
                return;
            }
            
            if (attempts >= maxAttempts) {
                reject(new Error('❌ Supabase não carregado após ' + maxAttempts + ' tentativas'));
                return;
            }
            
            setTimeout(checkSupabase, 100);
        };
        
        checkSupabase();
    });
}

// Função para mostrar mensagens
function showMessage(message, type = 'error') {
    console.log(`Mensagem [${type}]:`, message);
    
    // Remover mensagens existentes
    const existingMsg = document.getElementById('auth-message');
    if (existingMsg) {
        existingMsg.remove();
    }
    
    // Criar nova mensagem
    const msgDiv = document.createElement('div');
    msgDiv.id = 'auth-message';
    msgDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        font-size: 14px;
    `;
    
    msgDiv.textContent = message;
    msgDiv.style.backgroundColor = type === 'success' ? '#4CAF50' : '#f44336';
    
    document.body.appendChild(msgDiv);
    
    // Remover após 5 segundos
    setTimeout(() => {
        if (msgDiv.parentNode) {
            msgDiv.remove();
        }
    }, 5000);
}

// Configurar auth quando tudo estiver carregado
async function initializeAuth() {
    console.log('🚀 Inicializando auth...');
    
    try {
        // Aguardar Supabase carregar
        await waitForSupabase();
        console.log('✅ Supabase pronto, configurando auth...');
        
        // Verificar se já está logado
        await checkExistingSession();
        
        // Configurar interface
        setupInterface();
        
        // Configurar listener de auth state
        setupAuthListener();
        
        // Esconder loading e mostrar conteúdo
        showContent();
        
    } catch (error) {
        console.error('❌ Erro ao inicializar auth:', error);
        showMessage('Erro ao carregar sistema de autenticação: ' + error.message);
        showContent(); // Mostrar conteúdo mesmo com erro
    }
}

// Mostrar conteúdo após carregamento
function showContent() {
    const loading = document.getElementById('initial-loading');
    const container = document.querySelector('.container');
    
    if (loading) {
        loading.style.display = 'none';
    }
    if (container) {
        container.style.display = 'block';
    }
}

// Verificar sessão existente
async function checkExistingSession() {
    try {
        const { data: { session }, error } = await window.supabase.auth.getSession();
        
        if (error) {
            console.error('Erro ao verificar sessão:', error);
            return;
        }
        
        if (session) {
            console.log('✅ Usuário já logado:', session.user.email);
            showMessage('Você já está logado! Redirecionando...', 'success');
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 1000);
        }
    } catch (error) {
        console.error('Erro ao verificar sessão existente:', error);
    }
}

// Configurar listener de auth state
function setupAuthListener() {
    const { data: { subscription } } = window.supabase.auth.onAuthStateChange((event, session) => {
        console.log('🔄 Auth state changed:', event, session);
        
        if (event === 'SIGNED_IN' && session) {
            console.log('✅ Usuário autenticado:', session.user.email);
            showMessage('Login realizado com sucesso! Redirecionando...', 'success');
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 1500);
        } else if (event === 'SIGNED_OUT') {
            console.log('👋 Usuário deslogado');
        }
    });
}

// Configurar interface
function setupInterface() {
    console.log('🎨 Configurando interface...');
    
    const modeButtons = document.querySelectorAll('.mode-btn');
    const forms = document.querySelectorAll('.auth-form');
    const authTitle = document.getElementById('authTitle');
    const authSubtitle = document.getElementById('authSubtitle');

    // Função para trocar entre modos
    function setActiveMode(mode) {
        console.log('🔄 Mudando para modo:', mode);
        
        // Atualizar botões
        modeButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });
        
        // Atualizar formulários
        forms.forEach(form => {
            form.classList.toggle('active', form.id === mode + 'Form');
        });

        // Atualizar textos
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

    // Configurar eventos dos botões de modo
    modeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            setActiveMode(btn.dataset.mode);
        });
    });

    // Inicializar com modo login
    setActiveMode('login');

    // LOGIN - Form submission
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('🔐 Tentando login...');
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const button = e.target.querySelector('button[type="submit"]');
        
        if (!email || !password) {
            showMessage('Por favor, preencha todos os campos.');
            return;
        }

        // Mostrar loading
        const originalText = button.textContent;
        button.textContent = 'Entrando...';
        button.disabled = true;

        try {
            console.log('📤 Chamando signInWithPassword...');
            const { data, error } = await window.supabase.auth.signInWithPassword({
                email: email.trim(),
                password: password
            });

            if (error) {
                console.error('❌ Erro no login:', error);
                showMessage('Erro no login: ' + error.message);
            } else {
                console.log('✅ Login bem-sucedido:', data);
                // O redirecionamento será feito pelo auth state change
            }
        } catch (err) {
            console.error('💥 Erro inesperado no login:', err);
            showMessage('Erro inesperado: ' + err.message);
        } finally {
            // Restaurar botão
            button.textContent = originalText;
            button.disabled = false;
        }
    });

    // REGISTER - Form submission
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('📝 Tentando registro...');
        
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        const button = e.target.querySelector('button[type="submit"]');
        
        // Validações
        if (!name || !email || !password || !confirmPassword) {
            showMessage('Por favor, preencha todos os campos.');
            return;
        }
        
        if (password !== confirmPassword) {
            showMessage('As senhas não coincidem.');
            return;
        }
        
        if (password.length < 6) {
            showMessage('A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        // Mostrar loading
        const originalText = button.textContent;
        button.textContent = 'Registrando...';
        button.disabled = true;

        try {
            console.log('📤 Chamando signUp...');
            const { data, error } = await window.supabase.auth.signUp({
                email: email.trim(),
                password: password,
                options: {
                    data: {
                        name: name.trim(),
                        full_name: name.trim()
                    }
                }
            });

            if (error) {
                console.error('❌ Erro no registro:', error);
                showMessage('Erro no registro: ' + error.message);
            } else {
                console.log('✅ Registro bem-sucedido:', data);
                showMessage('Registro realizado! Verifique seu email para confirmação.', 'success');
                
                // Mudar para login após 2 segundos
                setTimeout(() => {
                    setActiveMode('login');
                }, 2000);
            }
        } catch (err) {
            console.error('💥 Erro inesperado no registro:', err);
            showMessage('Erro inesperado: ' + err.message);
        } finally {
            // Restaurar botão
            button.textContent = originalText;
            button.disabled = false;
        }
    });

    // FORGOT PASSWORD - Form submission
    document.getElementById('forgotForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('🔑 Tentando recuperação...');
        
        const email = document.getElementById('forgotEmail').value;
        const button = e.target.querySelector('button[type="submit"]');
        
        if (!email) {
            showMessage('Por favor, informe seu email.');
            return;
        }

        // Mostrar loading
        const originalText = button.textContent;
        button.textContent = 'Enviando...';
        button.disabled = true;

        try {
            console.log('📤 Chamando resetPasswordForEmail...');
            const { data, error } = await window.supabase.auth.resetPasswordForEmail(email.trim(), {
                redirectTo: window.location.origin + '/login/update-password.html'
            });

            if (error) {
                console.error('❌ Erro na recuperação:', error);
                showMessage('Erro ao enviar email: ' + error.message);
            } else {
                console.log('✅ Email de recuperação enviado:', data);
                showMessage('Instruções enviadas para seu email!', 'success');
                
                // Mudar para login após 2 segundos
                setTimeout(() => {
                    setActiveMode('login');
                }, 2000);
            }
        } catch (err) {
            console.error('💥 Erro inesperado na recuperação:', err);
            showMessage('Erro inesperado: ' + err.message);
        } finally {
            // Restaurar botão
            button.textContent = originalText;
            button.disabled = false;
        }
    });
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAuth);
} else {
    initializeAuth();
}