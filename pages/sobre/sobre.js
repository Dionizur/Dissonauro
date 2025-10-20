// Configuração da API
const API_BASE = 'http://localhost:3000';

// Função para carregar dados da empresa
async function carregarDadosEmpresa() {
    try {
        const response = await fetch(`${API_BASE}/empresa`);
        const empresa = await response.json();
        atualizarHero(empresa);
        atualizarMissao(empresa);
        atualizarContato(empresa);
    } catch (error) {
        console.error('Erro ao carregar dados da empresa:', error);
    }
}

// Função para carregar valores
async function carregarValores() {
    try {
        const response = await fetch(`${API_BASE}/valores`);
        const valores = await response.json();
        atualizarValores(valores);
    } catch (error) {
        console.error('Erro ao carregar valores:', error);
    }
}

// Função para carregar equipe
async function carregarEquipe() {
    try {
        const response = await fetch(`${API_BASE}/equipe`);
        const equipe = await response.json();
        atualizarEquipe(equipe);
    } catch (error) {
        console.error('Erro ao carregar equipe:', error);
    }
}

// Função para carregar linha do tempo
async function carregarLinhaDoTempo() {
    try {
        const response = await fetch(`${API_BASE}/linhaDoTempo`);
        const timeline = await response.json();
        atualizarTimeline(timeline);
    } catch (error) {
        console.error('Erro ao carregar linha do tempo:', error);
    }
}

// Funções de atualização do DOM
function atualizarHero(empresa) {
    const heroDesc = document.getElementById('hero-desc');
    if (heroDesc) {
        heroDesc.textContent = empresa.descricao;
    }
}

function atualizarMissao(empresa) {
    const missaoText = document.getElementById('missao-text');
    if (missaoText) {
        missaoText.textContent = empresa.missao;
    }
}

function atualizarValores(valores) {
    const valoresGrid = document.getElementById('valores-grid');
    if (valoresGrid) {
        valoresGrid.innerHTML = valores.map(valor => `
            <div class="card value-card fade-in">
                <div class="card-content">
                    <div class="value-icon">
                        <i class="${valor.icone}"></i>
                    </div>
                    <h3 class="card-title">${valor.titulo}</h3>
                    <p>${valor.descricao}</p>
                </div>
            </div>
        `).join('');

        // Re-inicializar animações para os novos elementos
        setTimeout(() => inicializarAnimacoes(), 100);
    }
}

function atualizarEquipe(equipe) {
    const teamGrid = document.getElementById('team-grid');
    if (teamGrid) {
        teamGrid.innerHTML = equipe.map(membro => `
            <div class="card team-member fade-in">
                <div class="image-container">
                    <img src="${membro.imagem || ''}" alt="${membro.nome}" onerror="this.style.display='none'">
                </div>
                <div class="card-content">
                    <h3>${membro.nome}</h3>
                    <p class="role" style="color: var(--amber-600); font-weight: 600;">${membro.cargo}</p>
                    <p>${membro.descricao}</p>
                    <div class="member-expertise">
                        ${membro.expertises.map(expertise => 
                            `<span class="badge">${expertise}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `).join('');

        // Re-inicializar animações para os novos elementos
        setTimeout(() => inicializarAnimacoes(), 100);
    }
}

function atualizarTimeline(timeline) {
    const milestonesContainer = document.getElementById('milestones-container');
    if (milestonesContainer) {
        milestonesContainer.innerHTML = timeline.map(item => `
            <div class="milestone milestone-${item.lado} slide-in-${item.lado === 'left' ? 'left' : 'right'}">
                ${item.lado === 'left' ? `
                    <div class="milestone-content">
                        <div class="card">
                            <div class="card-content">
                                <div class="milestone-year">${item.ano}</div>
                                <h3>${item.titulo}</h3>
                                <p>${item.descricao}</p>
                            </div>
                        </div>
                    </div>
                    <div class="milestone-dot"></div>
                    <div class="milestone-spacer"></div>
                ` : `
                    <div class="milestone-spacer"></div>
                    <div class="milestone-dot"></div>
                    <div class="milestone-content">
                        <div class="card">
                            <div class="card-content">
                                <div class="milestone-year">${item.ano}</div>
                                <h3>${item.titulo}</h3>
                                <p>${item.descricao}</p>
                            </div>
                        </div>
                    </div>
                `}
            </div>
        `).join('');

        // Re-inicializar animações para os novos elementos
        setTimeout(() => inicializarAnimacoes(), 100);
    }
}

function atualizarContato(empresa) {
    const contactInfo = document.getElementById('contact-info');
    if (contactInfo && empresa.contato) {
        contactInfo.textContent = `${empresa.contato.email} | ${empresa.contato.telefone}`;
    }
}

// Sistema de animações
function inicializarAnimacoes() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observar elementos com animação
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        // Reset para garantir que a animação funcione
        el.classList.remove('visible');
        observer.observe(el);
    });

    const slideLeftElements = document.querySelectorAll('.slide-in-left');
    slideLeftElements.forEach(el => {
        el.classList.remove('visible');
        observer.observe(el);
    });

    const slideRightElements = document.querySelectorAll('.slide-in-right');
    slideRightElements.forEach(el => {
        el.classList.remove('visible');
        observer.observe(el);
    });

    // Adicionar atrasos para animação em cascata
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach((card, index) => {
        card.style.transitionDelay = `${0.1 + index * 0.1}s`;
    });

    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach((member, index) => {
        member.style.transitionDelay = `${0.1 + index * 0.1}s`;
    });

    const milestones = document.querySelectorAll('.milestone');
    milestones.forEach((milestone, index) => {
        milestone.style.transitionDelay = `${0.1 + index * 0.1}s`;
    });
}

// Inicialização da aplicação
async function inicializar() {
    try {
        console.log('Iniciando carregamento dos dados...');
        
        // Carregar todos os dados
        await Promise.all([
            carregarDadosEmpresa(),
            carregarValores(),
            carregarEquipe(),
            carregarLinhaDoTempo()
        ]);
        
        console.log('Dados carregados com sucesso!');
        
        // Inicializar animações após carregar os dados
        setTimeout(() => {
            inicializarAnimacoes();
            console.log('Animações inicializadas!');
        }, 500);
        
    } catch (error) {
        console.error('Erro ao inicializar aplicação:', error);
    }
}

// Tratamento de erros para imagens
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG') {
            console.log('Imagem não carregada:', e.target.src);
            e.target.style.display = 'none';
        }
    }, true);

    // Inicializar a aplicação
    inicializar();
});