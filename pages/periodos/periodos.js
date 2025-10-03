// ==================== Dados dos períodos ====================
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

// ==================== Estado da aplicação ====================
let state = {
    selectedPeriod: "Triássico",
    expandedPeriod: null,
    isLoading: false,
    dinosaurs: [] // dinossauros carregados do JSON server
};

// ==================== Elementos DOM ====================
const periodButtons = document.querySelectorAll('.period-btn');
const periodDetails = document.getElementById('periodDetails');
const dinosaurSection = document.getElementById('dinosaurSection');
const dinosaurTitle = document.getElementById('dinosaurTitle');
const dinosaurGrid = document.getElementById('dinosaurGrid');

// ==================== Inicializar a página ====================
document.addEventListener('DOMContentLoaded', () => {
    renderPeriodDetails();
    setupEventListeners();
    fetchDinosaurs(); // carregar dados do JSON Server
});

// ==================== Configurar event listeners ====================
function setupEventListeners() {
    periodButtons.forEach(button => {
        button.addEventListener('click', () => {
            const period = button.getAttribute('data-period');
            setSelectedPeriod(period);
        });
    });
}

// ==================== Definir período selecionado ====================
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

// ==================== Alternar expansão dos detalhes ====================
function toggleExpanded() {
    state.expandedPeriod = state.expandedPeriod === state.selectedPeriod ? null : state.selectedPeriod;
    renderPeriodDetails();
}

// ==================== Renderizar detalhes do período ====================
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

// ==================== Buscar dinossauros do JSON server ====================
async function fetchDinosaurs() {
    try {
        const res = await fetch("http://localhost:3000/produtos");
        if (!res.ok) throw new Error("Erro ao buscar dados");
        const data = await res.json();
        state.dinosaurs = data;
        renderDinosaurs();
    } catch (err) {
        console.error("Falha ao carregar dinossauros:", err);
        dinosaurGrid.innerHTML = `
            <div class="text-center py-12 col-span-3">
                <div class="text-6xl mb-4">⚠️</div>
                <h3 class="text-xl font-semibold mb-2">Erro ao carregar dinossauros</h3>
                <p class="text-stone-600">Não foi possível conectar ao servidor.</p>
            </div>
        `;
    }
}

// ==================== Renderizar dinossauros ====================
function renderDinosaurs() {
    const periodDinos = state.dinosaurs.filter(d => d.period === state.selectedPeriod);

    dinosaurTitle.textContent = `Dinossauros do ${state.selectedPeriod}`;

    if (periodDinos.length > 0) {
        dinosaurGrid.innerHTML = periodDinos.map(produtos => `
            <div class="card dino-card">
                <div class="dino-card-image-container">
                    <img src="${produtos.image_url}" alt="${produtos.name}" loading="lazy">
                    <div class="dino-card-image-overlay">
                        <div class="dino-card-image-title">${produtos.name}</div>
                    </div>
                </div>
                <div class="dino-card-content">
                    <h3 class="text-xl font-bold mb-2">${produtos.name}</h3>
                    <p class="text-stone-600 mb-3">${produtos.diet}</p>
                    <div class="flex gap-2">
                        <span class="badge badge-amber">${produtos.period}</span>
                        <span class="badge badge-emerald">${produtos.diet}</span>
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

// ==================== Função global usada no botão inline ====================
window.toggleExpanded = toggleExpanded;

// ==================== Navbar Toggle Functionality ====================
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    
    navbarToggle.addEventListener('click', function() {
        navbarMenu.classList.toggle('active');
        navbarToggle.classList.toggle('active');
    });
    
    const navbarLinks = document.querySelectorAll('.navbar-link');
    navbarLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navbarMenu.classList.remove('active');
                navbarToggle.classList.remove('active');
            }
        });
    });
    
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
