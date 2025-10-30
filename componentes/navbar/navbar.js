// componentes/navbar/navbar.js

// Aguardar carregamento do Supabase
function waitForSupabase(callback, maxAttempts = 50) {
    let attempts = 0;

    const checkSupabase = () => {
        attempts++;
        if (window.supabase) {
            console.log('✅ Supabase carregado na navbar, executando callback');
            callback();
        } else if (attempts < maxAttempts) {
            setTimeout(checkSupabase, 100);
        } else {
            console.error('❌ Supabase não carregou na navbar após', maxAttempts, 'tentativas');
            // Fallback: mostrar botão de login mesmo sem Supabase
            const basePath = getBasePath();
            const authContainer = document.getElementById('authContainer');
            if (authContainer) {
                authContainer.innerHTML = getLoginHTML(basePath);
            }
        }
    };

    checkSupabase();
}

// Função para determinar o caminho base correto
function getBasePath() {
    const currentPath = window.location.pathname;

    // Se estiver na raiz
    if (currentPath === '/' || currentPath === '/index.html') {
        return '';
    }

    // Conta quantos níveis de diretório temos que voltar
    const pathDepth = currentPath.split('/').length - 2;
    return '../'.repeat(pathDepth);
}

// Carregar navbar dinamicamente
let navbarInitialized = false;

document.addEventListener('DOMContentLoaded', function() {
    if (navbarInitialized) return;
    navbarInitialized = true;
    
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (navbarPlaceholder && !navbarPlaceholder.querySelector('.navbar')) {
        const basePath = getBasePath();
        
        const navbarHTML = `
            <nav class="navbar">
                <div class="navbar-container">
                    <a href="${basePath}index.html" class="navbar-logo">
                        <i class="fas fa-dinosaur logo-icon"></i>
                        Dinoco
                    </a>
                    <ul class="navbar-menu" id="navbarMenu">
                        <li class="navbar-item">
                            <a href="${basePath}index.html" class="navbar-link active">Início</a>
                        </li>
                        <li class="navbar-item">
                            <a href="${basePath}pages/periodos/periodos.html" class="navbar-link">Períodos</a>
                        </li>
                        <li class="navbar-item">
                            <a href="${basePath}pages/loja/loja.html" class="navbar-link">Loja</a>
                        </li>
                        <li class="navbar-item">
                            <a href="${basePath}pages/quiz/quiz.html" class="navbar-link">Quiz</a>
                        </li>
                        <li class="navbar-item">
                            <a href="${basePath}pages/sobre/sobre.html" class="navbar-link">Sobre</a>
                        </li>
                        <li class="navbar-item">
                            <a href="${basePath}pages/busca de dinos/busca.html" class="navbar-link">Busca</a>
                        </li>
                        <li class="navbar-item" id="authNavItem">
                            <div class="auth-container" id="authContainer">
                                <!-- Conteúdo será preenchido dinamicamente -->
                            </div>
                        </li>
                    </ul>
                    <div class="navbar-toggle" id="navbarToggle">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </nav>
        `;
        navbarPlaceholder.innerHTML = navbarHTML;

        // Configurar toggle do menu mobile
        const navbarToggle = document.getElementById('navbarToggle');
        const navbarMenu = document.getElementById('navbarMenu');

        if (navbarToggle && navbarMenu) {
            navbarToggle.addEventListener('click', function() {
                navbarMenu.classList.toggle('active');
                navbarToggle.classList.toggle('active');
            });

            const navbarLinks = document.querySelectorAll('.navbar-link');
            navbarLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    if (window.innerWidth <= 768) {
                        navbarMenu.classList.remove('active');
                        navbarToggle.classList.remove('active');
                    }
                });
            });

            document.addEventListener('click', function(event) {
                if (window.innerWidth <= 768 && 
                    !navbarToggle.contains(event.target) && 
                    !navbarMenu.contains(event.target)) {
                    navbarMenu.classList.remove('active');
                    navbarToggle.classList.remove('active');
                }
            });
        }

        // Efeito de scroll na navbar
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                    navbar.style.padding = '0';
                } else {
                    navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                }
            }
        });

        // Inicializar autenticação após carregamento do Supabase
        waitForSupabase(() => {
            console.log('🚀 Inicializando autenticação na navbar');

            // Atualizar estado de autenticação
            updateNavbarAuthState(basePath);

            // Listener para mudanças de autenticação
            window.supabase.auth.onAuthStateChange((event, session) => {
                console.log('🔄 Auth state changed in navbar:', event);
                updateNavbarAuthState(basePath);
            });
        });
    }
});

// Função para atualizar o estado de autenticação na navbar
async function updateNavbarAuthState(basePath = '') {
    const authContainer = document.getElementById('authContainer');
    
    if (!authContainer) {
        console.log('❌ Container de autenticação não encontrado');
        return;
    }

    try {
        // Verificar se supabase está disponível
        if (!window.supabase) {
            console.log('⏳ Supabase não carregado ainda');
            authContainer.innerHTML = getLoginHTML(basePath);
            return;
        }

        const { data: { session }, error } = await window.supabase.auth.getSession();
        
        if (error) {
            console.error('❌ Erro ao verificar sessão:', error);
            authContainer.innerHTML = getLoginHTML(basePath);
            return;
        }
        
        if (session) {
            // Usuário está logado - mostrar Perfil
            authContainer.innerHTML = getProfileHTML(session.user, basePath);
        } else {
            // Usuário não está logado - mostrar Login
            authContainer.innerHTML = getLoginHTML(basePath);
        }
    } catch (error) {
        console.error('💥 Erro ao atualizar estado de auth:', error);
        authContainer.innerHTML = getLoginHTML(basePath);
    }
}

// HTML para estado de Login
function getLoginHTML(basePath) {
    return `
        <a href="${basePath}login/login.html" class="login-btn">
            <i class="fas fa-sign-in-alt"></i>
            <span>Login</span>
        </a>
    `;
}

// HTML para estado de Perfil
function getProfileHTML(user, basePath) {
    const userName = user.user_metadata?.name || user.email || 'Perfil';
    const displayName = userName.length > 15 ? 'Perfil' : userName;

    return `
        <a href="${basePath}login/perfil.html" class="profile-btn">
            <i class="fas fa-user"></i>
            <span>${displayName}</span>
        </a>
    `;
}

// Configurar o botão de logout
function setupLogoutButton() {
    const logoutBtn = document.getElementById('navbarLogoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Confirmar logout
            if (confirm('Tem certeza que deseja sair?')) {
                logoutBtn.disabled = true;
                logoutBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span class="logout-text">Saindo...</span>';
                
                try {
                    const { error } = await window.supabase.auth.signOut();
                    if (error) {
                        console.error('❌ Erro ao fazer logout:', error);
                        alert('Erro ao fazer logout: ' + error.message);
                        return;
                    }
                    
                    console.log('✅ Logout realizado com sucesso');
                    // A navbar será atualizada automaticamente pelo auth state change
                    
                } catch (error) {
                    console.error('💥 Erro inesperado no logout:', error);
                    alert('Erro inesperado ao fazer logout');
                } finally {
                    logoutBtn.disabled = false;
                    logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i><span class="logout-text">Sair</span>';
                }
            }
        });
    }
}

// Função de logout (para usar no perfil)
async function handleLogout() {
    try {
        const { error } = await window.supabase.auth.signOut();
        if (error) {
            console.error('❌ Erro ao fazer logout:', error);
            alert('Erro ao fazer logout: ' + error.message);
            return;
        }
        
        console.log('✅ Logout realizado com sucesso');
        
        // Redirecionar para home
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 1000);
        
    } catch (error) {
        console.error('💥 Erro inesperado no logout:', error);
        alert('Erro inesperado ao fazer logout');
    }
}

// Função global para logout (acessível de qualquer lugar)
window.handleLogout = handleLogout;

// Exportar funções para uso externo
window.navbarAuth = {
    updateAuthState: () => updateNavbarAuthState(getBasePath()),
    logout: handleLogout
};