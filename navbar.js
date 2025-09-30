// Carregar navbar dinamicamente
document.addEventListener('DOMContentLoaded', function() {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (navbarPlaceholder) {
        const navbarHTML = `
            <nav class="navbar">
                <div class="navbar-container">
                    <a href="/index.html" class="navbar-logo">
                        <i class="fas fa-dinosaur logo-icon"></i>
                        DinoVerse
                    </a>
                    <ul class="navbar-menu" id="navbarMenu">
                        <li class="navbar-item">
                            <a href="/index.html" class="navbar-link active">Início</a>
                        </li>
                        <li class="navbar-item">
                            <a href="/pages/periodos/periodos.html" class="navbar-link">Períodos</a>
                        </li>
                        <li class="navbar-item">
                            <a href="/pages/loja/loja.html" class="navbar-link">Loja</a>
                        </li>
                        <li class="navbar-item">
                            <a href="/pages/quiz/quiz.html" class="navbar-link">Quiz</a>
                        </li>
                        <li class="navbar-item">
                            <a href="/pages/sobre/sobre.html" class="navbar-link">Sobre</a>
                        </li>
                        <li class="navbar-item">
                            <a href="/login/login.html" class="navbar-link" id="loginLink">Login</a>
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

        // Funcionalidade do menu mobile
        const navbarToggle = document.getElementById('navbarToggle');
        const navbarMenu = document.getElementById('navbarMenu');

        if (navbarToggle && navbarMenu) {
            navbarToggle.addEventListener('click', function() {
                navbarMenu.classList.toggle('active');
                navbarToggle.classList.toggle('active');
            });

            // Fechar o menu ao clicar em um link (em dispositivos móveis)
            const navbarLinks = document.querySelectorAll('.navbar-link');
            navbarLinks.forEach(link => {
                link.addEventListener('click', function() {
                    if (window.innerWidth <= 768) {
                        navbarMenu.classList.remove('active');
                        navbarToggle.classList.remove('active');
                    }
                });
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

        // Atualizar navbar baseado no status de login
        updateNavbarForAuth();

        // Listener para mudanças de estado de autenticação
        window.supabase.auth.onAuthStateChange((event, session) => {
            updateNavbarForAuth();
        });
    }
});

// Função para atualizar navbar baseado na autenticação
async function updateNavbarForAuth() {
    const loginLink = document.getElementById('loginLink');
    if (loginLink) {
        try {
            const { data: { session } } = await window.supabase.auth.getSession();
            console.log('Sessão atual:', session);
            if (session) {
                // Usuário logado
                console.log('Usuário logado, mudando para Perfil');
                loginLink.textContent = 'Perfil';
                loginLink.href = '/perfil.html'; // Página de perfil (criar depois)
            } else {
                // Usuário não logado
                console.log('Usuário não logado, mantendo Login');
                loginLink.textContent = 'Login';
                loginLink.href = '/login/login.html';
            }
        } catch (error) {
            console.error('Erro ao verificar sessão:', error);
            loginLink.textContent = 'Login';
            loginLink.href = '/login/login.html';
        }
    }
}
