/* ===== estado global ===== */
let products = [];
let state = { search: '', category: 'todos' };

const USER_KEY = 'user';

/* ===== utilidades ===== */
const $ = (sel)=> document.querySelector(sel);
const money = v => v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const get = k => JSON.parse(localStorage.getItem(k) || 'null');
const set = (k,v)=> localStorage.setItem(k, JSON.stringify(v));

/* ===== formatação de preço ===== */
function formatPrice(value) {
  if (value >= 1_000_000) return Math.floor(value / 1_000_000) + 'M';
  if (value >= 1_000) return Math.floor(value / 1_000) + 'MIL';
  return money(value);
}

/* ===== toasts ===== */
function toast(msg,type='success'){
  const el = document.createElement('div');
  el.className = 'toast '+type;
  el.innerHTML = msg;
  $('#toastWrap').appendChild(el);
  setTimeout(()=>el.remove(),2500);
}

/* ===== categorias ===== */
const categories = [
  {id:'todos',name:'📦 Todos'}, 
  {id:'modelos',name:'🦕 Dinossauros'}, 
  {id:'itens',name:'🎁 Itens'}
];
function renderCategories(){
  $('#categories').innerHTML = categories.map(c=>
    `<button class="cat-btn ${state.category===c.id?'active':''}" data-cat="${c.id}">${c.name}</button>`
  ).join('');
}

/* ===== produtos ===== */
function renderProducts(){
  let list = products.filter(response=>
    (!state.search || response.name.toLowerCase().includes(state.search)) &&
    (state.category==='todos' || response.category===state.category)
  );

  $('#grid').innerHTML = list.map(response=>`
    <article class="card">
      <div class="media">
        <img src="${response.image_url}" alt="${response.name}">
      </div>
      <div class="body">
        <div class="title">${response.name}</div>
        <div class="desc">${response.description}</div>
        <div class="footer">
          <div class="price">${formatPrice(response.price)}</div>
          <button class="btn view-btn" data-view="${response.id}">👁️ Visualizar</button>
        </div>
      </div>
    </article>
  `).join('');

  $('#emptyMsg').style.display = list.length ? 'none' : 'block';
}

/* ===== login ===== */
function updateUser(){
  const u = get(USER_KEY);
  $('#userName').textContent = u ? `🙍 ${u.name}` : '🙍 Não conectado';
  $('#loginBtn').textContent = u ? '🚪 Logout' : '🔑 Login';
}
function openLogin(){
  $('#modalRoot').style.display = 'block';
  $('#modalRoot').innerHTML = `
    <div class="modal-backdrop">
      <div class="modal">
        <h3>🔑 Entrar</h3>
        <input id="name" placeholder="Nome">
        <input id="email" placeholder="Email">
        <button id="doLogin" class="btn">✅ Entrar</button>
      </div>
    </div>`;
  $('#doLogin').onclick = () => {
    const u = { name: $('#name').value, email: $('#email').value };
    if (!u.name || !u.email) return toast('⚠️ Preencha todos os campos','error');
    set(USER_KEY, u);
    updateUser();
    closeModal();
    toast('🎉 Logado com sucesso!');
  };
}
function closeModal(){ $('#modalRoot').style.display = 'none'; }

/* ===== abrir modal de produto ===== */
function openProductModal(product){
  const u = get(USER_KEY);
  if (!u) return openLogin();

  $('#modalRoot').style.display = 'block';
  $('#modalRoot').innerHTML = `
    <div class="modal-backdrop">
      <div class="modal">
        <img src="${product.image_url}" alt="${product.name}" class="modal-img">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <div class="price-modal">💰 ${money(product.price)}</div>
        <div class="modal-actions">
          <button id="buyBtn" class="btn buy-btn">🛒 Comprar</button>
          <button id="closeModalBtn" class="btn secondary">❌ Fechar</button>
        </div>
      </div>
    </div>`;

  $('#closeModalBtn').onclick = closeModal;
  $('#buyBtn').onclick = async ()=>{
    $('#buyBtn').textContent = '⌛ Processando...';
    $('#buyBtn').disabled = true;
    try {
      const res = await fetch('https://fakestoreapi.com/carts', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          userId: 1,
          date: new Date().toISOString(),
          products: [{ productId: product.id, quantity: 1 }]
        })
      });
      if (!res.ok) throw new Error('Erro na compra');
      toast('✅ Compra simulada com sucesso!');
      $('#buyBtn').textContent = '✅ Concluído';
    } catch (err){
      toast('❌ Falha na compra','error');
      $('#buyBtn').textContent = 'Tentar novamente';
      $('#buyBtn').disabled = false;
    }
  };
}

/* ===== eventos globais ===== */
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

$('#loginBtn').onclick = () => {
  if (get(USER_KEY)) { 
    localStorage.removeItem(USER_KEY); 
    updateUser(); 
    toast('👋 Desconectado'); 
  } else openLogin();
};

$('#searchInput').oninput = e => { 
  state.search = e.target.value.toLowerCase(); 
  renderProducts(); 
};

/* ===== inicialização ===== */  
async function boot(){
  products = await fetch('http://localhost:3000/produtos')
    .then(r => {
      if (!r.ok) throw new Error('Erro ao carregar produtos');
      return r.json();
    })
    .catch(err => {
      console.error(err);
      toast('⚠️ Falha ao buscar produtos', 'error');
      return [];
    });

  renderCategories();
  renderProducts();
  updateUser();
}
boot();
