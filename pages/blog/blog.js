// Dados de exemplo para os posts do blog
const blogPostsData = [
    {
        id: 1,
        title: "Descoberta de nova espécie de dinossauro no Brasil",
        summary: "Paleontólogos anunciaram a descoberta de uma nova espécie de dinossauro carnívoro no sul do Brasil, que viveu há aproximadamente 90 milhões de anos.",
        content: "Uma equipe de paleontólogos brasileiros e argentinos descobriu os fósseis de uma nova espécie de dinossauro...",
        category: "Paleontologia",
        author: "Dr. Carlos Silva",
        created_date: "2023-10-15",
        image: "https://images.unsplash.com/photo-1598885153329-4bda3d5d7a6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        read_time: "5 min de leitura"
    },
    {
        id: 2,
        title: "Tecnologia 3D revela segredos de fósseis antigos",
        summary: "Pesquisadores estão usando tecnologia de escaneamento 3D para revelar detalhes nunca antes vistos em fósseis de dinossauros.",
        content: "Avances recentes na tecnologia de escaneamento 3D estão permitindo que paleontólogos...",
        category: "Ciência",
        author: "Dra. Maria Oliveira",
        created_date: "2023-10-10",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        read_time: "4 min de leitura"
    },
    {
        id: 3,
        title: "Museu inaugura nova ala dedicada ao período Jurássico",
        summary: "O Museu de História Natural inaugurou uma nova ala com exposições interativas sobre o período Jurássico.",
        content: "Visitantes agora podem experimentar uma jornada imersiva através do período Jurássico...",
        category: "Educação",
        author: "Prof. João Santos",
        created_date: "2023-10-05",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        read_time: "3 min de leitura"
    },
    {
        id: 4,
        title: "Como os dinossauros dominaram a Terra por milhões de anos",
        summary: "Novo estudo revela as adaptações evolutivas que permitiram aos dinossauros dominar o planeta por mais de 150 milhões de anos.",
        content: "Pesquisadores da Universidade de Cambridge publicaram um estudo abrangente...",
        category: "História",
        author: "Dr. Robert Johnson",
        created_date: "2023-09-28",
        image: "https://images.unsplash.com/photo-1596722591530-9de50fda5a4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
        read_time: "7 min de leitura"
    },
    {
        id: 5,
        title: "Fóssil de dinossauro com penas encontrado na China",
        summary: "Descoberta rara de um fóssil de dinossauro com penas preservadas oferece novas pistas sobre a evolução das aves.",
        content: "Um fóssil excepcionalmente bem preservado foi desenterrado na província de Liaoning...",
        category: "Paleontologia",
        author: "Dra. Li Wei",
        created_date: "2023-09-20",
        image: "https://images.unsplash.com/photo-1574785525105-d1f5d802e91c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
        read_time: "6 min de leitura"
    },
    {
        id: 6,
        title: "Arqueólogos descobrem artefatos de civilização antiga",
        summary: "Uma equipe de arqueólogos descobriu artefatos que sugerem uma civilização anteriormente desconhecida.",
        content: "Escavações no vale do rio revelaram cerâmicas e ferramentas que datam de...",
        category: "Arqueologia",
        author: "Dr. Ahmed Hassan",
        created_date: "2023-09-15",
        image: "https://images.unsplash.com/photo-1591534279394-c9c6e7abd54a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        read_time: "5 min de leitura"
    }
];

// Estado da aplicação
let state = {
    posts: [],
    filteredPosts: [],
    isLoading: true,
    searchTerm: '',
    category: 'Todas',
    sort: 'newest'
};

// Elementos DOM
const loadingState = document.getElementById('loading-state');
const postsContainer = document.getElementById('posts-container');
const noResults = document.getElementById('no-results');
const searchInput = document.getElementById('search-input');
const categoryTrigger = document.getElementById('category-trigger');
const categoryValue = document.getElementById('category-value');
const categoryContent = document.getElementById('category-content');
const sortTrigger = document.getElementById('sort-trigger');
const sortValue = document.getElementById('sort-value');
const sortContent = document.getElementById('sort-content');
const featuredPost = document.getElementById('featured-post');
const otherPosts = document.getElementById('other-posts');

// Funções
function formatDate(dateString) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
}

function getCategoryClass(category) {
    const categoryMap = {
        'Paleontologia': 'category-paleontologia',
        'Arqueologia': 'category-arqueologia',
        'História': 'category-historia',
        'Ciência': 'category-ciencia',
        'Educação': 'category-educacao'
    };
    return categoryMap[category] || 'category-paleontologia';
}

function createBlogPostCard(post, isFeatured = false) {
    const categoryClass = getCategoryClass(post.category);

    if (isFeatured) {
        return `
            <div class="blog-card featured">
                <img src="${post.image}" alt="${post.title}" class="blog-card-image">
                <div class="blog-card-content">
                    <span class="category-badge ${categoryClass}">${post.category}</span>
                    <h2 class="text-2xl font-bold text-stone-800 mb-2">${post.title}</h2>
                    <p class="text-stone-600 mb-4">${post.summary}</p>
                    <div class="flex items-center text-stone-500 text-sm">
                        <span>${post.author}</span>
                        <span class="mx-2">•</span>
                        <span>${formatDate(post.created_date)}</span>
                        <span class="mx-2">•</span>
                        <span>${post.read_time}</span>
                    </div>
                </div>
            </div>
        `;
    }

    return `
        <div class="blog-card">
            <img src="${post.image}" alt="${post.title}" class="w-full h-48 object-cover">
            <div class="blog-card-content">
                <span class="category-badge ${categoryClass}">${post.category}</span>
                <h3 class="text-xl font-bold text-stone-800 mb-2">${post.title}</h3>
                <p class="text-stone-600 mb-4">${post.summary}</p>
                <div class="flex items-center text-stone-500 text-sm">
                    <span>${formatDate(post.created_date)}</span>
                    <span class="mx-2">•</span>
                    <span>${post.read_time}</span>
                </div>
            </div>
        </div>
    `;
}

function renderPosts() {
    if (state.filteredPosts.length === 0) {
        postsContainer.classList.add('hidden');
        noResults.classList.remove('hidden');
        return;
    }

    noResults.classList.add('hidden');
    postsContainer.classList.remove('hidden');

    // Renderizar post em destaque
    const featured = state.filteredPosts[0];
    featuredPost.innerHTML = createBlogPostCard(featured, true);

    // Renderizar outros posts
    const other = state.filteredPosts.slice(1);
    otherPosts.innerHTML = '';

    other.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.className = 'animate-slideInUp';
        postElement.style.animationDelay = `${index * 0.1}s`;
        postElement.innerHTML = createBlogPostCard(post);
        otherPosts.appendChild(postElement);
    });
}

function filterPosts() {
    let result = [...state.posts];

    // Filtrar por termo de busca
    if (state.searchTerm) {
        const term = state.searchTerm.toLowerCase();
        result = result.filter(post =>
            post.title.toLowerCase().includes(term) ||
            post.summary.toLowerCase().includes(term)
        );
    }

    // Filtrar por categoria
    if (state.category !== 'Todas') {
        result = result.filter(post => post.category === state.category);
    }

    // Ordenar
    if (state.sort === 'newest') {
        result.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    } else if (state.sort === 'oldest') {
        result.sort((a, b) => new Date(a.created_date) - new Date(b.created_date));
    }

    state.filteredPosts = result;
    renderPosts();
}

function loadPosts() {
    state.isLoading = true;

    // Simular carregamento assíncrono
    setTimeout(() => {
        state.posts = blogPostsData;
        state.filteredPosts = blogPostsData;

        // Obter categorias únicas
        const categories = ['Todas', ...new Set(blogPostsData.map(p => p.category))];

        // Preencher dropdown de categorias
        categoryContent.innerHTML = '';
        categories.forEach(cat => {
            const item = document.createElement('div');
            item.className = 'select-item';
            item.textContent = cat;
            item.dataset.value = cat;
            categoryContent.appendChild(item);
        });

        state.isLoading = false;
        loadingState.classList.add('hidden');
        filterPosts();
    }, 1500);
}

// Event Listeners
searchInput.addEventListener('input', (e) => {
    state.searchTerm = e.target.value;
    filterPosts();
});

categoryTrigger.addEventListener('click', () => {
    categoryContent.classList.toggle('hidden');
    sortContent.classList.add('hidden');
});

sortTrigger.addEventListener('click', () => {
    sortContent.classList.toggle('hidden');
    categoryContent.classList.add('hidden');
});

document.addEventListener('click', (e) => {
    if (!categoryTrigger.contains(e.target) && !categoryContent.contains(e.target)) {
        categoryContent.classList.add('hidden');
    }

    if (!sortTrigger.contains(e.target) && !sortContent.contains(e.target)) {
        sortContent.classList.add('hidden');
    }
});

categoryContent.addEventListener('click', (e) => {
    if (e.target.classList.contains('select-item')) {
        state.category = e.target.dataset.value;
        categoryValue.textContent = e.target.textContent;
        categoryContent.classList.add('hidden');
        filterPosts();
    }
});

sortContent.addEventListener('click', (e) => {
    if (e.target.classList.contains('select-item')) {
        state.sort = e.target.dataset.value;
        sortValue.textContent = e.target.textContent;
        sortContent.classList.add('hidden');
        filterPosts();
    }
});

// Inicializar a aplicação
window.addEventListener('DOMContentLoaded', loadPosts);

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
