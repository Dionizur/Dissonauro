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
                        <li class="navbar-item">
                            <a href="${basePath}login/index.html" class="navbar-link" id="loginLink">Login</a>
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

        // Resto do código permanece igual...
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

        updateNavbarForAuth(basePath);

        window.supabase.auth.onAuthStateChange((event, session) => {
            updateNavbarForAuth(basePath);
        });
    }
});

// Atualizar a função de auth para usar o basePath
async function updateNavbarForAuth(basePath = '') {
    const loginLink = document.getElementById('loginLink');
    if (loginLink) {
        try {
            const { data: { session } } = await window.supabase.auth.getSession();
            if (session) {
                loginLink.textContent = 'Perfil';
                loginLink.href = `${basePath}login/perfil/perfil.html`;
            } else {
                loginLink.textContent = 'Login';
                loginLink.href = `${basePath}login/index.html`;
            }
        } catch (error) {
            console.error('Erro ao verificar sessão:', error);
            loginLink.textContent = 'Login';
            loginLink.href = `${basePath}login/index.html`;
        }
    }
}