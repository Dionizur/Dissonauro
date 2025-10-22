/* ===== estado global ===== */
let products = [];
let state = { search: '', category: 'todos' };

const USER_KEY = 'user';

/* ===== utilidades ===== */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);
const money = v => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const get = k => JSON.parse(localStorage.getItem(k) || 'null');
const set = (k, v) => localStorage.setItem(k, JSON.stringify(v));

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

/* ===== login ===== */
function updateUser() {
  const u = get(USER_KEY);
  $('#userName').textContent = u ? `🙍 ${u.name}` : '🙍 Não conectado';
  $('#loginBtn').textContent = u ? '🚪 Logout' : '🔑 Login';
}

function openLogin() {
  $('#modalRoot').style.display = 'block';
  $('#modalRoot').innerHTML = `
    <div class="modal-backdrop">
      <div class="modal">
        <h3>🔑 Entrar</h3>
        <input id="name" placeholder="Nome" value="João Silva">
        <input id="email" placeholder="Email" value="joao@email.com">
        <div class="modal-actions">
          <button id="doLogin" class="btn">✅ Entrar</button>
          <button id="closeLogin" class="btn secondary">❌ Cancelar</button>
        </div>
      </div>
    </div>`;
  
  $('#doLogin').onclick = () => {
    const u = { 
      name: $('#name').value, 
      email: $('#email').value 
    };
    if (!u.name || !u.email) return toast('⚠️ Preencha todos os campos', 'error');
    set(USER_KEY, u);
    updateUser();
    closeModal();
    toast('🎉 Logado com sucesso!');
  };
  
  $('#closeLogin').onclick = closeModal;
}

function closeModal() { 
  $('#modalRoot').style.display = 'none'; 
}

/* ===== Stripe (simulação) ===== */
// Em produção, use suas chaves reais do Stripe
const stripeJs = Stripe('pk_test_51SJEHo35c44XgjTKTkDyme8bqokzAok7GgVZweY9s1LQ9olQSWXRmqYreEsnYyHYfsBfrT1YO32J7pXlPBUIDN95004b3xGupN');

async function criarPagamento(amount) {
  // Simulação - em produção, isso deve ser feito no backend
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('pi_test_secret_' + Math.random().toString(36).substr(2, 9));
    }, 1000);
  });
}

/* ===== abrir modal de produto ===== */
function openProductModal(product) {
  const u = get(USER_KEY);
  if (!u) return openLogin();

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
      // Simulação de adição ao carrinho
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

      // Simulação de pagamento com Stripe
      const amount = Math.round(product.price * 100);
      const clientSecret = await criarPagamento(amount);

      // Simulação de confirmação de pagamento
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
    console.log('🔄 Buscando produtos do JSON Server...');
    
    const response = await fetch('http://localhost:3000/produtos');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Produtos carregados:', data);
    
    products = Array.isArray(data) ? data : [];
    
    if (products.length === 0) {
      console.warn('⚠️ Nenhum produto encontrado no JSON Server');
      toast('⚠️ Nenhum produto cadastrado no sistema', 'warning');
    }
    
  } catch (error) {
    console.error('❌ Erro ao carregar produtos:', error);
    
    // Fallback: dados de exemplo caso o JSON Server não esteja disponível
    products = [
      {
        id: 1,
        name: "T-Rex Model",
        description: "Modelo detalhado do famoso T-Rex",
        price: 299.99,
        category: "modelos",
        image_url: "https://via.placeholder.com/300x200/10b981/white?text=T-Rex"
      },
      {
        id: 2,
        name: "Triceratops",
        description: "Modelo do herbívoro Triceratops",
        price: 199.99,
        category: "modelos", 
        image_url: "https://via.placeholder.com/300x200/3b82f6/white?text=Triceratops"
      },
      {
        id: 3,
        name: "Camiseta Dinoco",
        description: "Camiseta oficial da loja",
        price: 49.99,
        category: "itens",
        image_url: "https://via.placeholder.com/300x200/f59e0b/white?text=Camiseta"
      }
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
  // Categorias (delegation)
  document.body.addEventListener('click', e => {
    if (e.target.dataset.cat) {
      state.category = e.target.dataset.cat;
      renderCategories();
      renderProducts();
    }

    if (e.target.dataset.view) {
      const product = products.find(p => p.id == e.target.dataset.view);
      if (product) openProductModal(product);
    }
  });

  // Login/logout
  $('#loginBtn').onclick = () => {
    if (get(USER_KEY)) {
      localStorage.removeItem(USER_KEY);
      updateUser();
      toast('👋 Desconectado');
    } else {
      openLogin();
    }
  };

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
  
  // Configurar listeners
  setupEventListeners();
  
  // Carregar dados iniciais
  await loadProducts();
  renderCategories();
  updateUser();
  
  console.log('✅ Aplicação inicializada');
}

// Iniciar quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}