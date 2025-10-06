        // Modal functionality
        const modal = document.getElementById('dino-modal');
        const closeBtn = document.querySelector('.close');
        const modalTitle = document.getElementById('modal-title');
        const modalSubtitle = document.getElementById('modal-subtitle');
        const modalBody = document.getElementById('modal-body');
        
        // Fechar modal ao clicar no X
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        // Fechar modal ao clicar fora dele
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
        
        // Função para buscar informações na Wikipedia
        async function fetchDinoInfo(dinoName, ptName, era, diet) {
            modalTitle.textContent = ptName;
            modalSubtitle.textContent = `Época: ${era} | Dieta: ${diet}`;
            modalBody.innerHTML = '<div class="loading">Carregando informações...</div>';
            modal.style.display = 'block';
            
            try {
                
                if (searchData.query.search.length === 0) {
                    throw new Error('Dinossauro não encontrado');
                }
                
                const pageId = searchData.query.search[0].pageid;
                
                // Agora buscar o conteúdo do artigo
                const contentResponse = await fetch(`https://pt.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&exintro=true&explaintext=true&pithumbsize=400&pageids=${pageId}&format=json&origin=*`);
                const contentData = await contentResponse.json();
                
                const page = contentData.query.pages[pageId];
                
                if (page.missing === "") {
                    throw new Error('Página não encontrada');
                }
                
                let extract = page.extract;
                
                // Limitar o texto para não ser muito longo
                if (extract.length > 1000) {
                    extract = extract.substring(0, 1000) + '...';
                }
                
                // Formatar o conteúdo
                let contentHTML = '';
                
                contentHTML += `<p>${extract}</p>`;
                
                modalBody.innerHTML = contentHTML;
            } catch (error) {
                console.error('Erro ao buscar informações:', error);
                modalBody.innerHTML = `<div class="error-message">Não foi possível carregar informações sobre este dinossauro. Tente novamente mais tarde.</div>`;
            }
        }
        
        // Funcionalidade de busca
        const searchInput = document.querySelector('.search-input');
        const searchButton = document.querySelector('.search-button');
        const searchResults = document.getElementById('search-results');
        
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        async function performSearch() {
            const query = searchInput.value.trim();
            
            if (query === '') {
                alert('Por favor, digite o nome de um dinossauro para buscar.');
                return;
            }
            
            searchResults.innerHTML = '<div class="loading">Buscando...</div>';
            
            try {
                const response = await fetch(`https://pt.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query} dinossauro&format=json&origin=*`);
                const data = await response.json();
                
                if (data.query.search.length === 0) {
                    searchResults.innerHTML = '<div class="error-message">Nenhum resultado encontrado. Tente outro termo.</div>';
                    return;
                }
                
                let resultsHTML = '';
                
                // Limitar a 6 resultados
                const limitedResults = data.query.search.slice(0, 6);
                
                limitedResults.forEach(result => {
                    // Verificar se parece ser um dinossauro (heurística simples)
                    if (result.title.toLowerCase().includes('saurus') || 
                        result.title.toLowerCase().includes('dino') ||
                        result.snippet.toLowerCase().includes('dinossauro')) {
                        
                        resultsHTML += `
                            <div class="dino-card" onclick="fetchCustomDinoInfo(${result.pageid}, '${result.title}')">
                                <div class="dino-info">
                                    <h3>${result.title}</h3>
                                    <p>${result.snippet.replace(/<span class="searchmatch">|<\/span>/g, '')}...</p>
                                </div>
                            </div>
                        `;
                    }
                });
                
                if (resultsHTML === '') {
                    searchResults.innerHTML = '<div class="error-message">Nenhum dinossauro encontrado com esse termo.</div>';
                } else {
                    searchResults.innerHTML = resultsHTML;
                }
                
            } catch (error) {
                console.error('Erro na busca:', error);
                searchResults.innerHTML = '<div class="error-message">Erro na busca. Tente novamente.</div>';
            }
        }
        
        // Função global para buscar informações customizadas (para os resultados de busca)
        window.fetchCustomDinoInfo = async function(pageId, title) {
            modalTitle.textContent = title;
            modalSubtitle.textContent = '';
            modalBody.innerHTML = '<div class="loading">Carregando informações...</div>';
            modal.style.display = 'block';
            
            try {
                const contentResponse = await fetch(`https://pt.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&exintro=true&explaintext=true&pithumbsize=400&pageids=${pageId}&format=json&origin=*`);
                const contentData = await contentResponse.json();
                
                const page = contentData.query.pages[pageId];
                
                if (page.missing === "") {
                    throw new Error('Página não encontrada');
                }
                
                let extract = page.extract;
                
                // Limitar o texto para não ser muito longo
                if (extract.length > 1000) {
                    extract = extract.substring(0, 1000) + '...';
                }
                
                // Formatar o conteúdo
                let contentHTML = '';
                
                if (page.thumbnail) {
                    contentHTML += `<img src="${page.thumbnail.source}" alt="${page.title}">`;
                }
                
                contentHTML += `<p>${extract}</p>`;
                contentHTML += `<p><a href="https://pt.wikipedia.org/?curid=${pageId}" target="_blank">Ler mais na Wikipedia</a></p>`;
                
                modalBody.innerHTML = contentHTML;
            } catch (error) {
                console.error('Erro ao buscar informações:', error);
                modalBody.innerHTML = `<div class="error-message">Não foi possível carregar informações sobre este dinossauro. Tente novamente mais tarde.</div>`;
            }
        }