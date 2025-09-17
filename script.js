// Dados dos dinossauros (simulando uma API)
        const dinosaurs = [
            {
                id: 1,
                name: "Tiranossauro Rex",
                scientific_name: "Tyrannosaurus rex",
                period: "Cretáceo",
                diet: "Carnívoro",
                length: "12m",
                weight: "8000kg",
                description: "Um dos maiores carnívoros terrestres de todos os tempos.",
                image: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            },
            {
                id: 2,
                name: "Tricerátops",
                scientific_name: "Triceratops horridus",
                period: "Cretáceo",
                diet: "Herbívoro",
                length: "9m",
                weight: "12000kg",
                description: "Herbívoro com três chifres e um grande escudo cranial.",
                image: "https://images.unsplash.com/photo-1637858868790-2f60f6c6e8ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            },
            {
                id: 3,
                name: "Velociraptor",
                scientific_name: "Velociraptor mongoliensis",
                period: "Cretáceo",
                diet: "Carnívoro",
                length: "2m",
                weight: "15kg",
                description: "Pequeno dinossauro predador muito ágil e inteligente.",
                image: "https://images.unsplash.com/photo-1638749909554-5ae5e9adad1f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            },
            {
                id: 4,
                name: "Brontossauro",
                scientific_name: "Brontosaurus excelsus",
                period: "Jurássico",
                diet: "Herbívoro",
                length: "22m",
                weight: "15000kg",
                description: "Um dos maiores dinossauros, com pescoço e cauda longos.",
                image: "https://images.unsplash.com/photo-1574786351745-ba6cafca51fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            },
            {
                id: 5,
                name: "Estegossauro",
                scientific_name: "Stegosaurus stenops",
                period: "Jurássico",
                diet: "Herbívoro",
                length: "9m",
                weight: "5000kg",
                description: "Herbívoro com placas ósseas nas costas e espigões na cauda.",
                image: "https://images.unsplash.com/photo-1574786351927-5c5dd5dec0eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            },
            {
                id: 6,
                name: "Pterodáctilo",
                scientific_name: "Pterodactylus antiquus",
                period: "Jurássico",
                diet: "Carnívoro",
                length: "1m",
                weight: "2kg",
                description: "Réptil voador com asas membranosas, não era um dinossauro.",
                image: "https://images.unsplash.com/photo-1574786368107-5c5cd86db4d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            }
        ];

        // Estado da aplicação
        let state = {
            filteredDinosaurs: [...dinosaurs],
            searchTerm: "",
            selectedPeriod: "Todos",
            selectedDiet: "Todos"
        };

        // Elementos DOM
        const dinosaurGrid = document.getElementById('dinosaurGrid');
        const searchInput = document.getElementById('searchInput');
        const resultsCount = document.getElementById('resultsCount');
        const viewAll = document.getElementById('viewAll');
        const noResults = document.getElementById('noResults');
        const periodButtons = document.querySelectorAll('[data-period]');
        const dietButtons = document.querySelectorAll('[data-diet]');

        // Renderizar dinossauros
        function renderDinosaurs() {
            dinosaurGrid.innerHTML = '';
            
            if (state.filteredDinosaurs.length === 0) {
                noResults.classList.remove('hidden');
                viewAll.classList.add('hidden');
                return;
            }
            
            noResults.classList.add('hidden');
            
            const featuredDinosaurs = state.filteredDinosaurs.slice(0, 6);
            
            featuredDinosaurs.forEach(dinosaur => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <div class="card-content">
                        <img src="${dinosaur.image}" alt="${dinosaur.name}" class="aspect-video object-cover rounded-lg mb-4">
                        <h3 class="text-xl font-bold mb-2">${dinosaur.name}</h3>
                        <p class="text-stone-600 mb-3">${dinosaur.scientific_name}</p>
                        <div class="flex gap-2">
                            <span class="badge badge-amber">${dinosaur.period}</span>
                            <span class="badge badge-emerald">${dinosaur.diet}</span>
                        </div>
                    </div>
                `;
                dinosaurGrid.appendChild(card);
            });
            
            // Mostrar o botão "Ver Todos" se houver mais de 6 resultados
            if (state.filteredDinosaurs.length > 6) {
                viewAll.classList.remove('hidden');
            } else {
                viewAll.classList.add('hidden');
            }
            
            // Atualizar contador de resultados
            if (state.filteredDinosaurs.length === dinosaurs.length) {
                resultsCount.textContent = `${dinosaurs.length} dinossauros encontrados`;
            } else {
                resultsCount.textContent = `${state.filteredDinosaurs.length} de ${dinosaurs.length} dinossauros`;
            }
        }

        // Aplicar filtros
        function applyFilters() {
            let filtered = dinosaurs;

            // Filtrar por termo de busca
            if (state.searchTerm) {
                filtered = filtered.filter(dino => 
                    dino.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
                    dino.scientific_name.toLowerCase().includes(state.searchTerm.toLowerCase())
                );
            }

            // Filtrar por período
            if (state.selectedPeriod !== "Todos") {
                filtered = filtered.filter(dino => dino.period === state.selectedPeriod);
            }

            // Filtrar por dieta
            if (state.selectedDiet !== "Todos") {
                filtered = filtered.filter(dino => dino.diet === state.selectedDiet);
            }

            state.filteredDinosaurs = filtered;
            renderDinosaurs();
        }

        // Event Listeners
        searchInput.addEventListener('input', (e) => {
            state.searchTerm = e.target.value;
            applyFilters();
        });

        // Event listeners para botões de período
        periodButtons.forEach(button => {
            button.addEventListener('click', () => {
                const period = button.getAttribute('data-period');
                state.selectedPeriod = period;
                
                // Atualizar UI
                periodButtons.forEach(btn => btn.classList.remove('active-filter'));
                button.classList.add('active-filter');
                
                applyFilters();
            });
        });

        // Event listeners para botões de dieta
        dietButtons.forEach(button => {
            button.addEventListener('click', () => {
                const diet = button.getAttribute('data-diet');
                state.selectedDiet = diet;
                
                // Atualizar UI
                dietButtons.forEach(btn => btn.classList.remove('active-filter'));
                button.classList.add('active-filter');
                
                applyFilters();
            });
        });

        // Inicializar a página
        document.addEventListener('DOMContentLoaded', () => {
            renderDinosaurs();
        });
