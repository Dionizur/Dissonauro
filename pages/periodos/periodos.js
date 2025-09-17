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
        image: "https://images.unsplash.com/photo-1574786351745-ba6cafca51fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
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
                <img src="${dinosaur.image}" alt="${dinosaur.name}">
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
