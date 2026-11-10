const WHATSAPP='543518588027';
const ADMIN_PASSWORD='0608';
const PRICE_KEY='cartof-price-overrides-v1';
const products=window.CARTOF_CATALOG||[];
const cart=new Map();
const grid=document.querySelector('#menu-grid');
const categoryFilters=document.querySelector('#menu-filters');
const menuSelect=document.querySelector('#menu-select');
const searchInput=document.querySelector('#menu-search');
const priceFormatter=new Intl.NumberFormat('es-AR',{style:'currency',currency:'ARS',maximumFractionDigits:0});
let activeCategory='Todos';
let priceOverrides=readOverrides();

function readOverrides(){try{return JSON.parse(localStorage.getItem(PRICE_KEY)||'{}')}catch{return {}}}
function priceFor(p){return Object.prototype.hasOwnProperty.call(priceOverrides,p.id)?priceOverrides[p.id]:p.price}
function money(amount){return priceFormatter.format(Number(amount)||0)}
function normalize(s){return String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('es').trim()}
function escapeHTML(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function buildFilters(){
  const categories=['Todos',...new Set(products.map(p=>p.category))];
  categoryFilters.innerHTML=categories.map(c=>`<button class="filter${c===activeCategory?' active':''}" type="button" data-category="${escapeHTML(c)}">${escapeHTML(c)}</button>`).join('');
  const menus=[...new Set(products.map(p=>p.menu))];
  menuSelect.innerHTML='<option value="todos">Todas las cartas</option>'+menus.map(m=>`<option value="${escapeHTML(m)}">${escapeHTML(m)}</option>`).join('');
}
function renderMenu(){
  const q=normalize(searchInput.value);
  const menu=menuSelect.value;
  const terms=q.split(/\s+/).filter(Boolean);
  const found=products.filter(p=>{
    const matchesMenu=menu==='todos'||p.menu===menu;
    const matchesCategory=activeCategory==='Todos'||p.category===activeCategory;
    const searchable=normalize([p.name,p.menu,p.category,p.note].join(' '));
    const matchesText=!terms.length||terms.every(t=>searchable.includes(t));
    return matchesMenu&&matchesCategory&&matchesText;
  });
  document.querySelector('#result-count').textContent=`${found.length} ${found.length===1?'producto':'productos'}`;
  if(!found.length){grid.innerHTML='<p class="no-results">No encontramos productos con esa búsqueda. Probá otra palabra o frase.</p>';return}
  grid.innerHTML=found.map(p=>{
    const price=priceFor(p);
    return `<article class="menu-card"><div class="dish-info"><span class="dish-number">${escapeHTML(p.menu)} · ${escapeHTML(p.category)}</span><h3>${escapeHTML(p.name)}</h3>${p.note?`<p>${escapeHTML(p.note)}</p>`:''}<span class="dish-price">${price===null?'Precio a consultar':money(price)}</span></div><button class="add-dish" type="button" data-add="${p.id}" aria-label="Agregar ${escapeHTML(p.name)} al carrito">+</button></article>`;
  }).join('');
}
function countCart(){let n=0;for(const q of cart.values())n+=q;document.querySelector('.cart-count').textContent=n;}
function renderCart(){
  const container=document.querySelector('#cart-items');
  if(!cart.size){container.innerHTML='<p class="empty-cart">Todavía no agregaste productos. Explorá la carta y sumá tus favoritos.</p>';document.querySelector('#cart-total').textContent='';countCart();return}
  let total=0,missing=false;
  container.innerHTML=[...cart.entries()].map(([id,q])=>{
    const p=products.find(x=>x.id===id),price=priceFor(p);
    if(price===null)missing=true;else total+=Number(price)*q;
    return `<div class="cart-line"><div><strong>${escapeHTML(p.name)}</strong><small>${price===null?'Precio a confirmar':`${money(price)} c/u`}</small></div><div class="quantity"><button type="button" data-delta="-1" data-id="${id}" aria-label="Quitar uno">−</button><span>${q}</span><button type="button" data-delta="1" data-id="${id}" aria-label="Agregar uno">+</button></div></div>`;
  }).join('');
  document.querySelector('#cart-total').textContent=`${missing?'Total parcial':'Total'}: ${money(total)}${missing?' · hay importes a confirmar':''}`;
  countCart();
}
function openCart(){const b=document.querySelector('.cart-backdrop'),d=document.querySelector('.cart-drawer');b.hidden=false;requestAnimationFrame(()=>b.classList.add('open'));d.classList.add('open');d.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';renderCart()}
function closeCart(){const b=document.querySelector('.cart-backdrop'),d=document.querySelector('.cart-drawer');d.classList.remove('open');d.setAttribute('aria-hidden','true');b.classList.remove('open');document.body.style.overflow='';setTimeout(()=>{if(!b.classList.contains('open'))b.hidden=true},260)}
function sendWhatsApp(message){window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`,'_blank','noopener,noreferrer')}
function currentCatalog(){return products.filter(p=>{const q=normalize(document.querySelector('#admin-search').value);return !q||normalize(`${p.name} ${p.menu} ${p.category}`).includes(q)})}
function renderAdminRows(){
  const rows=document.querySelector('#admin-rows');
  rows.innerHTML=currentCatalog().map(p=>`<label class="admin-row"><span><b>${escapeHTML(p.name)}</b><small>${escapeHTML(p.menu)} · ${escapeHTML(p.category)}</small></span><span class="admin-price"><small>$</small><input type="number" min="0" step="100" inputmode="numeric" data-price-id="${p.id}" value="${priceFor(p)??''}" placeholder="Consultar" aria-label="Precio de ${escapeHTML(p.name)}"></span></label>`).join('');
}

buildFilters();renderMenu();renderCart();
categoryFilters.addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(!b)return;activeCategory=b.dataset.category;categoryFilters.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x===b));renderMenu()});
searchInput.addEventListener('input',renderMenu);menuSelect.addEventListener('change',renderMenu);
grid.addEventListener('click',e=>{const b=e.target.closest('[data-add]');if(!b)return;cart.set(b.dataset.add,(cart.get(b.dataset.add)||0)+1);renderCart();b.textContent='✓';setTimeout(()=>b.textContent='+',700)});
document.querySelectorAll('.cart-open').forEach(b=>b.addEventListener('click',openCart));
document.querySelector('.cart-close').addEventListener('click',closeCart);document.querySelector('.cart-backdrop').addEventListener('click',closeCart);
document.querySelector('#cart-items').addEventListener('click',e=>{const b=e.target.closest('[data-delta]');if(!b)return;const n=(cart.get(b.dataset.id)||0)+Number(b.dataset.delta);if(n<=0)cart.delete(b.dataset.id);else cart.set(b.dataset.id,n);renderCart()});
document.querySelector('#order-form [name="mode"]').addEventListener('change',e=>{const table=document.querySelector('.table-field');table.hidden=e.target.value!=='En el local';table.querySelector('input').required=e.target.value==='En el local'});
document.querySelector('#order-form').addEventListener('submit',e=>{
  e.preventDefault();if(!cart.size)return;
  const f=new FormData(e.currentTarget);
  const lines=[...cart.entries()].map(([id,q])=>{const p=products.find(x=>x.id===id),price=priceFor(p);return `• ${q} × ${p.name}${price===null?' — precio a confirmar':` — ${money(price)} c/u`}`}).join('\n');
  const mode=f.get('mode');let msg=`Hola Cartof, quiero hacer este pedido:\n\n${lines}\n\n${document.querySelector('#cart-total').textContent}\nNombre: ${f.get('name')}\nModalidad: ${mode}`;
  if(mode==='En el local'&&f.get('table'))msg+=`\nMesa: ${f.get('table')}`;
  if(f.get('notes'))msg+=`\nIndicaciones: ${f.get('notes')}`;
  msg+='\n\n¿Me confirman disponibilidad y precios?';sendWhatsApp(msg);
});

const adminDialog=document.querySelector('#admin-dialog');
document.querySelector('.admin-open').addEventListener('click',()=>{document.querySelector('#admin-login').hidden=false;document.querySelector('#admin-editor').hidden=true;document.querySelector('.admin-error').textContent='';adminDialog.showModal()});
document.querySelector('.admin-close').addEventListener('click',()=>adminDialog.close());
document.querySelector('#admin-login').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.currentTarget);if(f.get('password')!==ADMIN_PASSWORD){document.querySelector('.admin-error').textContent='La clave no es correcta.';e.currentTarget.reset();return}e.currentTarget.hidden=true;document.querySelector('#admin-editor').hidden=false;renderAdminRows()});
document.querySelector('#admin-search').addEventListener('input',renderAdminRows);
document.querySelector('#save-prices').addEventListener('click',()=>{
  document.querySelectorAll('[data-price-id]').forEach(input=>{const original=products.find(p=>p.id===input.dataset.priceId).price;const value=input.value.trim();if(!value){delete priceOverrides[input.dataset.priceId]}else{const num=Math.max(0,Math.round(Number(value)));if(Number.isFinite(num)&&num!==original)priceOverrides[input.dataset.priceId]=num;else delete priceOverrides[input.dataset.priceId]}});
  localStorage.setItem(PRICE_KEY,JSON.stringify(priceOverrides));renderMenu();renderCart();document.querySelector('#save-status').textContent='Precios guardados en este navegador.';
});

document.querySelector('#reservation-form').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.currentTarget);const msg=`Hola Cartof, quisiera solicitar una reserva.\n\nNombre: ${f.get('name')}\nPersonas: ${f.get('people')}\nFecha: ${f.get('date')}\nHorario: ${f.get('time')}${f.get('email')?`\nEmail: ${f.get('email')}`:''}${f.get('notes')?`\nComentarios: ${f.get('notes')}`:''}`;sendWhatsApp(msg)});
document.querySelector('.menu-toggle').addEventListener('click',e=>{const n=document.querySelector('.nav-links');const open=n.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',open)});
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>{document.querySelector('.nav-links').classList.remove('open');document.querySelector('.menu-toggle').setAttribute('aria-expanded','false')}));
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');revealObserver.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
document.querySelector('[name="date"]').min=new Date().toISOString().slice(0,10);

// Partículas de Three.js para el hero.
function initScene(){const canvas=document.querySelector('#hero-canvas');if(!window.THREE||!canvas)return;const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(48,1,.1,100);camera.position.z=13;const count=115,positions=new Float32Array(count*3),speeds=new Float32Array(count);for(let i=0;i<count;i++){positions[i*3]=(Math.random()-.5)*23;positions[i*3+1]=(Math.random()-.5)*13;positions[i*3+2]=(Math.random()-.5)*8;speeds[i]=.002+Math.random()*.008}const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(positions,3));const material=new THREE.PointsMaterial({color:0xd4e76d,size:.055,transparent:true,opacity:.72,sizeAttenuation:true}),points=new THREE.Points(geometry,material);scene.add(points);function size(){const w=canvas.clientWidth,h=canvas.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()}size();window.addEventListener('resize',size);const clock=new THREE.Clock();function animate(){requestAnimationFrame(animate);const p=geometry.attributes.position.array,t=clock.getElapsedTime();for(let i=0;i<count;i++){p[i*3+1]+=speeds[i];p[i*3]+=Math.sin(t*.35+i)*.0015;if(p[i*3+1]>7)p[i*3+1]=-7}geometry.attributes.position.needsUpdate=true;points.rotation.y=Math.sin(t*.08)*.07;renderer.render(scene,camera)}animate()}
if(document.readyState==='complete')initScene();else window.addEventListener('load',initScene,{once:true});
