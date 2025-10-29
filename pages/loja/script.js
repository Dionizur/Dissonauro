/* ===== estado global ===== */
let products = [];
let state = { search: '', category: 'todos' };

/* ===== utilidades ===== */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);
const money = v => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

/* ===== formatação de preço ===== */
function formatPrice(value) {
  if (value >= 1_000_000) return Math.floor(value / 1_000_000) + 'M';
  if (value >= 1_000) return Math.floor(value / 1_000) + 'MIL';
  return money(value);
}

/* ===== toasts ===== */
function toast(msg, type = 'success') {
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = msg;
  $('#toastWrap').appendChild(el);
  setTimeout(() => el.remove(), 2500);
}

/* ===== categorias ===== */
const categories = [
  { id: 'todos', name: '📦 Todos' },
  { id: 'modelos', name: '🦕 Dinossauros' },
  { id: 'itens', name: '🎁 Itens' }
];

function renderCategories() {
  $('#categories').innerHTML = categories.map(c =>
    `<button class="cat-btn ${state.category === c.id ? 'active' : ''}" data-cat="${c.id}">${c.name}</button>`
  ).join('');
}

/* ===== produtos ===== */
function renderProducts() {
  let list = products.filter(product =>
    (!state.search || product.name.toLowerCase().includes(state.search.toLowerCase())) &&
    (state.category === 'todos' || product.category === state.category)
  );

  $('#grid').innerHTML = list.map(product => `
    <article class="card">
      <div class="media">
        <img src="${product.image_url || 'https://via.placeholder.com/300x200?text=Produto'}" 
             alt="${product.name}" 
             onerror="this.src='https://via.placeholder.com/300x200?text=Imagem+Não+Encontrada'">
      </div>
      <div class="body">
        <div class="title">${product.name}</div>
        <div class="desc">${product.description}</div>
        <div class="footer">
          <div class="price">${formatPrice(product.price)}</div>
          <button class="btn view-btn" data-view="${product.id}">👁️ Visualizar</button>
        </div>
      </div>
    </article>
  `).join('');

  $('#emptyMsg').style.display = list.length ? 'none' : 'block';
}

function closeModal() { 
  $('#modalRoot').style.display = 'none'; 
}

/* ===== Stripe (simulação) ===== */
const stripeJs = Stripe('pk_test_51SJEHo35c44XgjTKTkDyme8bqokzAok7GgVZweY9s1LQ9olQSWXRmqYreEsnYyHYfsBfrT1YO32J7pXlPBUIDN95004b3xGupN');

async function criarPagamento(amount) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('pi_test_secret_' + Math.random().toString(36).substr(2, 9));
    }, 1000);
  });
}

/* ===== abrir modal de produto ===== */
function openProductModal(product) {
  $('#modalRoot').style.display = 'block';
  $('#modalRoot').innerHTML = `
    <div class="modal-backdrop">
      <div class="modal">
        <img src="${product.image_url || 'https://via.placeholder.com/400x300?text=Produto'}" 
             alt="${product.name}" 
             class="modal-img"
             onerror="this.src='https://via.placeholder.com/400x300?text=Imagem+Não+Encontrada'">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <div class="price-modal">💰 ${money(product.price)}</div>
        <div class="modal-actions">
          <button id="buyBtn" class="btn buy-btn">🛒 Iniciar Pagamento</button>
          <button id="closeModalBtn" class="btn secondary">❌ Fechar</button>
        </div>
      </div>
    </div>`;

  $('#closeModalBtn').onclick = closeModal;
  $('#buyBtn').onclick = async () => {
    $('#buyBtn').textContent = '⌛ Processando...';
    $('#buyBtn').disabled = true;
    
    try {
      const res = await fetch('https://fakestoreapi.com/carts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 1,
          date: new Date().toISOString(),
          products: [{ productId: product.id, quantity: 1 }]
        })
      });
      
      if (!res.ok) throw new Error('Erro na API de carrinho');

      const amount = Math.round(product.price * 100);
      const clientSecret = await criarPagamento(amount);

      const { error } = await stripeJs.confirmCardPayment(clientSecret, {
        payment_method: {
          card: {
            number: '4242424242424242',
            exp_month: 12,
            exp_year: 2025,
            cvc: '123',
          },
        },
      });

      if (error) {
        throw new Error(error.message);
      } else {
        toast('✅ Pagamento simulado com sucesso!');
        $('#buyBtn').textContent = '✅ Concluído';
        setTimeout(closeModal, 2000);
      }
    } catch (err) {
      console.error('Erro no pagamento:', err);
      toast('❌ Falha na simulação: ' + err.message, 'error');
      $('#buyBtn').textContent = '🛒 Tentar novamente';
      $('#buyBtn').disabled = false;
    }
  };
}

/* ===== carregar produtos ===== */
async function loadProducts() {
  $('#loadingMsg').style.display = 'block';
  $('#grid').style.display = 'none';
  $('#emptyMsg').style.display = 'none';
  
  try {
    const response = await fetch('http://localhost:3000/produtos');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const data = await response.json();
    products = Array.isArray(data) ? data : [];
    
    if (products.length === 0) {
      toast('⚠️ Nenhum produto cadastrado no sistema', 'warning');
    }
    
  } catch (error) {
    console.error('❌ Erro ao carregar produtos:', error);
    products = [
      { id: 1, name: "T-Rex Model", description: "Modelo detalhado do T-Rex", price: 299.99, category: "modelos", image_url: "https://via.placeholder.com/300x200/10b981/white?text=T-Rex" },
      { id: 2, name: "Triceratops", description: "Modelo do Triceratops", price: 199.99, category: "modelos", image_url: "https://via.placeholder.com/300x200/3b82f6/white?text=Triceratops" },
      { id: 3, name: "Camiseta Dinoco", description: "Camiseta oficial", price: 49.99, category: "itens", image_url: "https://via.placeholder.com/300x200/f59e0b/white?text=Camiseta" }
    ];
    toast('⚠️ Usando dados de exemplo - JSON Server offline', 'warning');
  } finally {
    $('#loadingMsg').style.display = 'none';
    $('#grid').style.display = 'grid';
    renderProducts();
  }
}

/* ===== eventos globais ===== */
function setupEventListeners() {
  // Clique global robusto (view + categoria)
  document.body.addEventListener('click', e => {
    const btn = e.target.closest('[data-view]');
    if (btn) {
      const id = btn.dataset.view;
      const product = products.find(p => p.id == id);
      if (product) openProductModal(product);
    }

    const catBtn = e.target.closest('[data-cat]');
    if (catBtn) {
      state.category = catBtn.dataset.cat;
      renderCategories();
      renderProducts();
    }
  });

  // Busca
  $('#searchInput').oninput = e => {
    state.search = e.target.value;
    renderProducts();
  };

  // Fechar modal clicando fora
  $('#modalRoot').addEventListener('click', e => {
    if (e.target.id === 'modalRoot' || e.target.classList.contains('modal-backdrop')) {
      closeModal();
    }
  });
}

/* ===== inicialização ===== */  
async function boot() {
  console.log('🚀 Inicializando aplicação...');
  setupEventListeners();
  await loadProducts();
  renderCategories();
  console.log('✅ Aplicação inicializada');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}