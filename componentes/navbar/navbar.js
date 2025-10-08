// componentes/navbar/navbar.js

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
                            <a href="${basePath}login/index.html" class="navbar-link" id="authLink">
                                <i class="fas fa-sign-in-alt" id="authIcon"></i>
                                <span id="authText">Login</span>
                            </a>
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

        // Atualizar estado de autenticação
        updateNavbarAuthState(basePath);

        // Listener para mudanças de autenticação
        if (window.supabase) {
            window.supabase.auth.onAuthStateChange((event, session) => {
                console.log('🔄 Auth state changed in navbar:', event);
                updateNavbarAuthState(basePath);
            });
        }

        // Verificar a cada 2 segundos se o Supabase carregou (fallback)
        let checkAttempts = 0;
        const checkSupabaseLoaded = setInterval(() => {
            checkAttempts++;
            if (window.supabase) {
                clearInterval(checkSupabaseLoaded);
                updateNavbarAuthState(basePath);
            }
            if (checkAttempts > 10) {
                clearInterval(checkSupabaseLoaded);
            }
        }, 2000);
    }
});

// Função para atualizar o estado de autenticação na navbar
async function updateNavbarAuthState(basePath = '') {
    const authLink = document.getElementById('authLink');
    const authText = document.getElementById('authText');
    const authIcon = document.getElementById('authIcon');
    
    if (!authLink || !authText || !authIcon) {
        console.log('❌ Elementos da navbar não encontrados');
        return;
    }

    try {
        // Verificar se supabase está disponível
        if (!window.supabase) {
            console.log('⏳ Supabase não carregado ainda');
            return;
        }

        const { data: { session }, error } = await window.supabase.auth.getSession();
        
        if (error) {
            console.error('❌ Erro ao verificar sessão:', error);
            setLoginState(basePath);
            return;
        }
        
        if (session) {
            // Usuário está logado - mostrar "Perfil"
            setProfileState(session.user, basePath);
        } else {
            // Usuário não está logado - mostrar "Login"
            setLoginState(basePath);
        }
    } catch (error) {
        console.error('💥 Erro ao atualizar estado de auth:', error);
        setLoginState(basePath);
    }
}

// Configurar estado de Login
function setLoginState(basePath) {
    const authLink = document.getElementById('authLink');
    const authText = document.getElementById('authText');
    const authIcon = document.getElementById('authIcon');
    
    if (authLink) authLink.href = `${basePath}login/index.html`;
    if (authText) authText.textContent = 'Login';
    if (authIcon) {
        authIcon.className = 'fas fa-sign-in-alt';
        authIcon.style.marginRight = '8px';
    }
    
    console.log('🔓 Navbar: Estado de login definido');
}

// Configurar estado de Perfil
function setProfileState(user, basePath) {
    const authLink = document.getElementById('authLink');
    const authText = document.getElementById('authText');
    const authIcon = document.getElementById('authIcon');
    
    if (authLink) authLink.href = `${basePath}login/perfil/perfil.html`;
    if (authText) {
        // Mostrar nome do usuário ou "Perfil"
        const userName = user.user_metadata?.name || user.email || 'Perfil';
        authText.textContent = userName.length > 15 ? 'Perfil' : userName;
    }
    if (authIcon) {
        authIcon.className = 'fas fa-user';
        authIcon.style.marginRight = '8px';
    }
    
    console.log('🔐 Navbar: Estado de perfil definido para:', user.email);
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