const PLANES = [
  { id: 'pro8', nom: 'Pro 8', gb: 8, precio: 199, promo: '16 GB x 12 meses' },
  { id: 'pro20', nom: 'Pro 20', gb: 20, precio: 299, promo: 'Streaming HD + RRSS libres' },
  { id: 'pro40', nom: 'Pro 40', gb: 40, precio: 429, promo: 'Roaming + hotspot premium' },
];

const EQUIPOS = [
  { id: 1, brand: 'apple', name: 'iPhone 15', price: 19999 },
  { id: 2, brand: 'samsung', name: 'Galaxy S24', price: 18999 },
  { id: 3, brand: 'motorola', name: 'Edge 50', price: 11999 },
  { id: 4, brand: 'xiaomi', name: 'Xiaomi 13T', price: 10999 },
];

const sections = ['inicio', 'planes', 'equipos', 'recargas', 'portabilidad', 'asistente'];

function showSection(route) {
  sections.forEach((id) => {
    const node = document.getElementById(id);
    node.classList.add('hidden-section');
    node.classList.remove('active');
  });
  const target = document.getElementById(route);
  target.classList.remove('hidden-section');
  target.classList.add('active');
}

function setupNavigation() {
  document.querySelectorAll('[data-route]').forEach((btn) => {
    btn.addEventListener('click', () => showSection(btn.dataset.route));
  });
}

function renderKpis() {
  const kpis = [
    'Cobertura estimada: 98.7% en zonas urbanas',
    'Tiempo de alta digital: ~7 minutos',
    'Disponibilidad de servicios: 99.95%'
  ];
  document.getElementById('homeKpis').innerHTML = kpis.map(v => `<li>${v}</li>`).join('');
}

function renderPlans() {
  const grid = document.getElementById('plansGrid');
  const planSelect = document.querySelector('#portaForm select[name="plan"]');
  grid.innerHTML = PLANES.map((p) => `
    <article class="card">
      <h3>${p.nom}</h3>
      <p>${p.gb} GB · ${p.promo}</p>
      <p class="price">${NetCure.formatMoney(p.precio)}</p>
      <button class="primary" onclick="showSection('portabilidad')">Contratar</button>
    </article>
  `).join('');
  planSelect.innerHTML = PLANES.map((p) => `<option value="${p.id}">${p.nom}</option>`).join('');
}

function renderDevices(filter = 'all') {
  const grid = document.getElementById('devicesGrid');
  const devices = filter === 'all' ? EQUIPOS : EQUIPOS.filter((d) => d.brand === filter);
  grid.innerHTML = devices.map((d) => `
    <article class="card">
      <h3>${d.name}</h3>
      <p>Marca: ${d.brand.toUpperCase()}</p>
      <p class="price">${NetCure.formatMoney(d.price)}</p>
      <button class="ghost" onclick="showSection('planes')">Ver planes con equipo</button>
    </article>
  `).join('');
}

function setupDeviceFilters() {
  const brands = ['all', ...new Set(EQUIPOS.map((d) => d.brand))];
  const wrap = document.getElementById('brandsFilter');
  wrap.innerHTML = brands.map((b) => `<button class="ghost" data-brand="${b}">${b}</button>`).join('');
  wrap.querySelectorAll('[data-brand]').forEach((btn) => {
    btn.addEventListener('click', () => renderDevices(btn.dataset.brand));
  });
}

function setupRecargas() {
  const form = document.getElementById('recargaForm');
  const result = document.getElementById('recargaResult');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const phone = NetCure.sanitize(data.phone);
    result.innerHTML = `Recarga en proceso para <b>${phone}</b> por <b>${NetCure.formatMoney(Number(data.amount))}</b> vía ${data.method}.`;
  });
}

function setupPortabilidad() {
  const form = document.getElementById('portaForm');
  const result = document.getElementById('portaResult');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    result.innerHTML = `Solicitud creada para <b>${NetCure.sanitize(data.name)}</b>. Número: ${data.phone}. Plan: ${data.plan}.`;
  });
}

function askAssistant(query) {
  const intent = NetCure.scoreIntent(query);
  if (intent === 'portabilidad') return 'Para portabilidad: genera NIP al 051, elige plan y agenda entrega de SIM/eSIM.';
  if (intent === 'recargas') return 'Puedes recargar desde $100 MXN. Las recargas digitales se reflejan casi al instante.';
  if (intent === 'equipos') return 'Tenemos equipos con financiamiento a meses al contratar un plan Pro.';
  return 'Te recomiendo Pro 20 si usas redes y video diario; Pro 40 para trabajo remoto y hotspot.';
}

function setupChat() {
  const chatBox = document.getElementById('chatBox');
  const form = document.getElementById('chatForm');
  const input = document.getElementById('chatInput');
  const push = (text, cls) => {
    const div = document.createElement('div');
    div.className = `msg ${cls}`;
    div.textContent = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
  };
  push('Hola, soy tu asistente Movistar IA. ¿Buscas plan, recarga o portabilidad?', 'ai');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = NetCure.sanitize(input.value);
    push(q, 'user');
    push(askAssistant(q), 'ai');
    input.value = '';
  });
}

setupNavigation();
renderKpis();
renderPlans();
setupDeviceFilters();
renderDevices();
setupRecargas();
setupPortabilidad();
setupChat();
