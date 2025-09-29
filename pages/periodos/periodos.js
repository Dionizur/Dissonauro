    // Dados dos períodos
const periodData = {
    "Triássico": {
        timeRange: "252 - 201 milhões de anos atrás",
        description: "O período Triássico marca o início da era Mesozoica e o surgimento dos primeiros dinossauros. O clima era quente e seco, e o supercontinente Pangeia ainda estava unido.",
        characteristics: [
            "Surgimento dos primeiros dinossauros",
            "Pangeia ainda era um supercontinente unido", 
            "Clima quente e árido predominante",
            "Evolução dos primeiros mamíferos",
            "Grandes répteis marinhos nos oceanos"
        ],
        colorClass: "triassic-color",
        bgClass: "triassic-bg",
        icon: "🌵"
    },
    "Jurássico": {
        timeRange: "201 - 145 milhões de anos atrás",
        description: "O período Jurássico é conhecido como a 'Idade de Ouro' dos dinossauros, com o surgimento de gigantes como o Brontossauro e o temível Alossauro.",
        characteristics: [
            "Apogeu dos dinossauros gigantes",
            "Surgimento dos primeiros pássaros",
            "Florestas exuberantes de coníferas",
            "Separação gradual da Pangeia",
            "Mares rasos cobriam grande parte da Europa"
        ],
        colorClass: "jurassic-color",
        bgClass: "jurassic-bg",
        icon: "🌿"
    },
    "Cretáceo": {
        timeRange: "145 - 66 milhões de anos atrás",
        description: "O período Cretáceo foi o último e mais longo período da era Mesozoica, terminando com a extinção dos dinossauros não-avianos.",
        characteristics: [
            "Maior diversidade de dinossauros",
            "Surgimento das primeiras plantas com flores",
            "T-Rex e Triceratops viveram neste período",
            "Formação de grandes depósitos de petróleo",
            "Extinção em massa há 66 milhões de anos"
        ],
        colorClass: "cretaceous-color",
        bgClass: "cretaceous-bg",
        icon: "🌺"
    }
};

// Dados dos dinossauros (simulando uma API)
const dinosaurs = [
    {
        id: 1,
        name: "Coelophysis",
        scientific_name: "Coelophysis bauri",
        period: "Triássico",
        diet: "Carnívoro",
        length: "3m",
        weight: "27kg",
        description: "Um dos primeiros dinossauros, era ágil e esguio.",
        image: "data:image/jpeg;base64,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"
    },
    {
        id: 2,
        name: "Plateosaurus",
        scientific_name: "Plateosaurus engelhardti",
        period: "Triássico",
        diet: "Herbívoro",
        length: "8m",
        weight: "4000kg",
        description: "Um dos primeiros dinossauros herbívoros de grande porte.",
        image: "https://images.unsplash.com/photo-1638749909554-5ae5e9adad1f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    },
    {
        id: 3,
        name: "Allosaurus",
        scientific_name: "Allosaurus fragilis",
        period: "Jurássico",
        diet: "Carnívoro",
        length: "12m",
        weight: "2300kg",
        description: "Um dos maiores predadores do período Jurássico.",
        image: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    },
    {
        id: 4,
        name: "Stegosaurus",
        scientific_name: "Stegosaurus stenops",
        period: "Jurássico",
        diet: "Herbívoro",
        length: "9m",
        weight: "5000kg",
        description: "Conhecido pelas placas ósseas nas costas e espigões na cauda.",
        image: "https://images.unsplash.com/photo-1574786351927-5c5dd5dec0eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    },
    {
        id: 5,
        name: "Tyrannosaurus Rex",
        scientific_name: "Tyrannosaurus rex",
        period: "Cretáceo",
        diet: "Carnívoro",
        length: "12m",
        weight: "8000kg",
        description: "Um dos maiores carnívoros terrestres de todos os tempos.",
        image: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    },
    {
        id: 6,
        name: "Triceratops",
        scientific_name: "Triceratops horridus",
        period: "Cretáceo",
        diet: "Herbívoro",
        length: "9m",
        weight: "12000kg",
        description: "Herbívoro com três chifres e um grande escudo cranial.",
        image: "https://images.unsplash.com/photo-1637858868790-2f60f6c6e8ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    }
];

// Estado da aplicação
let state = {
    selectedPeriod: "Triássico",
    expandedPeriod: null,
    isLoading: false
};

// Elementos DOM
const periodButtons = document.querySelectorAll('.period-btn');
const periodDetails = document.getElementById('periodDetails');
const dinosaurSection = document.getElementById('dinosaurSection');
const dinosaurTitle = document.getElementById('dinosaurTitle');
const dinosaurGrid = document.getElementById('dinosaurGrid');

// Inicializar a página
document.addEventListener('DOMContentLoaded', () => {
    renderPeriodDetails();
    renderDinosaurs();
    setupEventListeners();
    initializeImageEnhancements();
});

// Configurar event listeners
function setupEventListeners() {
    // Botões de período
    periodButtons.forEach(button => {
        button.addEventListener('click', () => {
            const period = button.getAttribute('data-period');
            setSelectedPeriod(period);
        });
    });
}

// Definir período selecionado
function setSelectedPeriod(period) {
    state.selectedPeriod = period;
    
    // Atualizar botões
    periodButtons.forEach(button => {
        const buttonPeriod = button.getAttribute('data-period');
        if (buttonPeriod === period) {
            button.className = 'btn btn-primary period-btn';
        } else {
            button.className = 'btn btn-outline period-btn';
        }
    });
    
    // Renderizar detalhes e dinossauros
    renderPeriodDetails();
    renderDinosaurs();
}

// Alternar expansão dos detalhes do período
function toggleExpanded() {
    state.expandedPeriod = state.expandedPeriod === state.selectedPeriod ? null : state.selectedPeriod;
    renderPeriodDetails();
}

// Renderizar detalhes do período
function renderPeriodDetails() {
    const period = periodData[state.selectedPeriod];
    
    periodDetails.innerHTML = `
        <div class="card ${period.bgClass}">
            <div class="${period.colorClass} h-2"></div>
            <div class="card-header text-center pb-4">
                <div class="text-6xl mb-4">${period.icon}</div>
                <h3 class="text-3xl font-bold mb-2">
                    Período ${state.selectedPeriod}
                </h3>
                <div class="flex items-center justify-center">
                    <i class="far fa-clock mr-2"></i>
                    <span class="text-lg">${period.timeRange}</span>
                </div>
            </div>
            <div class="card-content">
                <p class="text-lg text-center mb-6 max-w-4xl mx-auto">
                    ${period.description}
                </p>
                
                <button class="btn btn-ghost w-full mb-4" onclick="toggleExpanded()">
                    ${state.expandedPeriod === state.selectedPeriod ? 
                        'Ocultar Características <i class="fas fa-chevron-up ml-2"></i>' : 
                        'Ver Características <i class="fas fa-chevron-down ml-2"></i>'}
                </button>

                <div id="periodCharacteristics" class="${state.expandedPeriod === state.selectedPeriod ? '' : 'hidden'}">
                    <div class="characteristics-grid gap-4">
                        ${period.characteristics.map(char => `
                            <div class="characteristic-item">
                                <div class="characteristic-dot ${period.colorClass}"></div>
                                <span>${char}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Renderizar dinossauros do período selecionado
function renderDinosaurs() {
    const periodDinos = dinosaurs.filter(d => d.period === state.selectedPeriod);

    dinosaurTitle.textContent = `Dinossauros do ${state.selectedPeriod}`;

    if (periodDinos.length > 0) {
        dinosaurGrid.innerHTML = periodDinos.map(dinosaur => `
            <div class="card dino-card">
                <div class="dino-card-image-container">
                    <img src="${dinosaur.image}" alt="${dinosaur.name}" loading="lazy" onload="this.removeAttribute('loading')">
                    <div class="dino-card-image-overlay">
                        <div class="dino-card-image-title">${dinosaur.name}</div>
                    </div>
                </div>
                <div class="dino-card-content">
                    <h3 class="text-xl font-bold mb-2">${dinosaur.name}</h3>
                    <p class="text-stone-600 mb-3">${dinosaur.scientific_name}</p>
                    <div class="flex gap-2">
                        <span class="badge badge-amber">${dinosaur.period}</span>
                        <span class="badge badge-emerald">${dinosaur.diet}</span>
                    </div>
                </div>
            </div>
        `).join('');
    } else {
        dinosaurGrid.innerHTML = `
            <div class="text-center py-12 col-span-3">
                <div class="text-6xl mb-4">🔍</div>
                <h3 class="text-xl font-semibold mb-2">
                    Nenhum dinossauro catalogado
                </h3>
                <p class="text-stone-600">
                    Ainda não temos dinossauros do período ${state.selectedPeriod} em nossa base de dados
                </p>
            </div>
        `;
    }
}

// Funções globais para uso nos event listeners inline
window.toggleExpanded = toggleExpanded;

// Função para melhorar o tratamento de imagens
function handleImageLoad(img) {
    img.removeAttribute('loading');

    // Adicionar classe para imagens carregadas
    img.classList.add('loaded');

    // Remover placeholder de loading
    const placeholder = img.parentElement.querySelector('.image-placeholder');
    if (placeholder) {
        placeholder.style.display = 'none';
    }
}

function handleImageError(img) {
    // Criar placeholder elegante para imagens que falharam
    const container = img.parentElement;
    const placeholder = document.createElement('div');
    placeholder.className = 'image-placeholder';
    placeholder.innerHTML = `
        <div class="placeholder-content">
            <div class="placeholder-icon">🦕</div>
            <div class="placeholder-text">Imagem não disponível</div>
        </div>
    `;

    // Esconder a imagem com erro
    img.style.display = 'none';

    // Adicionar o placeholder
    container.appendChild(placeholder);

    // Adicionar estilos CSS para o placeholder
    if (!document.querySelector('#placeholder-styles')) {
        const style = document.createElement('style');
        style.id = 'placeholder-styles';
        style.textContent = `
            .image-placeholder {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, var(--stone-100), var(--stone-200));
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 1rem 1rem 0 0;
            }

            .placeholder-content {
                text-align: center;
                color: var(--stone-500);
            }

            .placeholder-icon {
                font-size: 3rem;
                margin-bottom: 0.5rem;
                opacity: 0.6;
            }

            .placeholder-text {
                font-size: 0.9rem;
                font-weight: 500;
            }

            .dino-card img.loaded {
                filter: brightness(1.0) contrast(1.1) saturate(1.1);
            }
        `;
        document.head.appendChild(style);
    }
}

// Função para inicializar melhorias de imagem
function initializeImageEnhancements() {
    const images = document.querySelectorAll('.dino-card img');

    images.forEach(img => {
        // Adicionar event listeners
        img.addEventListener('load', () => handleImageLoad(img));
        img.addEventListener('error', () => handleImageError(img));

        // Se a imagem já estiver carregada (cached)
        if (img.complete && img.naturalHeight !== 0) {
            handleImageLoad(img);
        }
    });
}


// Navbar Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    
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
    
    // Adicionar efeito de scroll na navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            navbar.style.padding = '0';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
});

