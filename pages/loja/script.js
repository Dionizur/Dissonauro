/* ===== estado global ===== */
let products = [];
let state = { search: '', category: 'todos' };

const CART_KEY = 'cart';
const USER_KEY = 'user';

/* ===== utilidades ===== */
const $ = (sel)=> document.querySelector(sel);
const money = v => v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const get = k => JSON.parse(localStorage.getItem(k) || 'null');
const set = (k,v)=> localStorage.setItem(k, JSON.stringify(v));

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
  let list = products.filter(p=>
    (!state.search || p.name.toLowerCase().includes(state.search)) &&
    (state.category==='todos' || p.category===state.category)
  );
  $('#grid').innerHTML = list.map(p=>`
    <article class="card">
      <div class="media"><img src="${p.image_url}" alt="${p.name}"></div>
      <div class="body">
        <div class="title">${p.name}</div>
        <div class="desc">${p.description}</div>
        <div class="footer">
          <div class="price">${money(p.price)}</div>
          <button class="btn" data-add="${p.id}">🛒 Adicionar</button>
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

/* ===== eventos ===== */
document.body.addEventListener('click', e => {
  if (e.target.dataset.cat) {
    state.category = e.target.dataset.cat;
    renderCategories();
    renderProducts();
  }
  if (e.target.dataset.add) {
    const u = get(USER_KEY);
    if (!u) return openLogin();
    let cart = get(CART_KEY) || [];
    let item = cart.find(i => i.id == e.target.dataset.add);
    item ? item.qtd++ : cart.push({ id: e.target.dataset.add, qtd: 1 });
    set(CART_KEY, cart);
    toast('🛒 Adicionado ao carrinho!');
  }
});
$('#loginBtn').onclick = () => {
  if (get(USER_KEY)) { 
    localStorage.removeItem(USER_KEY); 
    updateUser(); 
    toast('👋 Desconectado'); 
  }
  else openLogin();
};
$('#searchInput').oninput = e => { 
  state.search = e.target.value.toLowerCase(); 
  renderProducts(); 
};

/* ===== boot ===== */  
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

  console.log(products); // Exibe no console os produtos carregados

  renderCategories(); // Cria os botões de categoria
  renderProducts();   // Mostra os produtos na tela
  updateUser();       // Atualiza nome do usuário no topo (se logado)
}
boot();
  