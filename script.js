/* ==========================================================================
   DOMROPING — SCRIPT
   Curadoria premium de equipamentos country. JavaScript puro, sem frameworks.

   COMO ADICIONAR PRODUTOS REAIS:
   1. Edite o array PRODUCTS abaixo.
   2. Preencha "image" com o caminho da foto (ex: "assets/images/produtos/ariat-m2.jpg").
      Se "image" ficar vazio (""), um placeholder elegante é exibido no lugar.
   3. Preencha "affiliateLink" com o link de afiliado real. Enquanto estiver "#",
      o clique em "Comprar" mostra um aviso no console e não navega para lugar nenhum.
   ========================================================================== */

/* ---------- 1. DADOS DOS PRODUTOS ---------- */
const PRODUCTS = [
  { id: 1,  name: "Calça M2 Brandon",            brand: "Ariat",              category: "Calças",                 price: "R$ 392,90", priceValue: 392.90,  image: "", store: "Amazon",        affiliateLink: "#", weekly: true,  bestSeller: true,  recommend: "Melhor custo-benefício" },
  { id: 2,  name: "Bota Fatbaby Heritage",        brand: "Ariat",              category: "Botas",                  price: "R$ 899,00", priceValue: 899.00,  image: "", store: "Loja Oficial",  affiliateLink: "#", weekly: false, bestSeller: true,  recommend: "Melhor bota" },
  { id: 3,  name: "Camisa Manga Longa Team Roper", brand: "Cinch",             category: "Camisas",                 price: "R$ 249,90", priceValue: 249.90,  image: "", store: "Mercado Livre", affiliateLink: "#", weekly: true,  bestSeller: false, recommend: "" },
  { id: 4,  name: "Chapéu de Feltro Rancher",      brand: "Resistol",          category: "Chapéus",                 price: "R$ 1.190,00", priceValue: 1190.00, image: "", store: "Loja Oficial",  affiliateLink: "#", weekly: false, bestSeller: false, recommend: "Melhor chapéu" },
  { id: 5,  name: "Laço Classic Rope 30ft",        brand: "Classic Rope",      category: "Laços",                   price: "R$ 349,00", priceValue: 349.00,  image: "", store: "Amazon",        affiliateLink: "#", weekly: false, bestSeller: true,  recommend: "Mais vendido" },
  { id: 6,  name: "Sela Team Roping Pro",          brand: "Martin Saddlery",   category: "Selas",                   price: "R$ 8.450,00", priceValue: 8450.00, image: "", store: "Loja Oficial",  affiliateLink: "#", weekly: false, bestSeller: false, recommend: "🏆 Nossa escolha" },
  { id: 7,  name: "Cabresto de Corda Trançado",    brand: "Professionals Choice", category: "Equipamentos para Cavalo", price: "R$ 179,00", priceValue: 179.00,  image: "", store: "Mercado Livre", affiliateLink: "#", weekly: true,  bestSeller: false, recommend: "" },
  { id: 8,  name: "Cinto Trançado Couro Legítimo", brand: "Justin",            category: "Acessórios",              price: "R$ 219,00", priceValue: 219.00,  image: "", store: "Amazon",        affiliateLink: "#", weekly: false, bestSeller: false, recommend: "" },
  { id: 9,  name: "Bota M4 Low Cowboy",            brand: "Ariat",              category: "Botas",                  price: "R$ 1.049,00", priceValue: 1049.00, image: "", store: "Loja Oficial",  affiliateLink: "#", weekly: false, bestSeller: true,  recommend: "" },
  { id: 10, name: "Calça White Label Slim",        brand: "Wrangler",          category: "Calças",                  price: "R$ 279,90", priceValue: 279.90,  image: "", store: "Magazine Luiza", affiliateLink: "#", weekly: false, bestSeller: false, recommend: "" },
  { id: 11, name: "Bota Cactus Roper",             brand: "Twisted X",         category: "Botas",                  price: "R$ 749,00", priceValue: 749.00,  image: "", store: "Loja Oficial",  affiliateLink: "#", weekly: true,  bestSeller: false, recommend: "" },
  { id: 12, name: "Camisa Xadrez Snap Front",      brand: "Cinch",             category: "Camisas",                 price: "R$ 219,00", priceValue: 219.00,  image: "", store: "Shopee",        affiliateLink: "#", weekly: false, bestSeller: false, recommend: "" },
  { id: 13, name: "Chapéu Palha Aba Larga",        brand: "Resistol",          category: "Chapéus",                 price: "R$ 389,00", priceValue: 389.00,  image: "", store: "Amazon",        affiliateLink: "#", weekly: false, bestSeller: true,  recommend: "" },
  { id: 14, name: "Laço Fast Back Poly",           brand: "Fast Back",         category: "Laços",                   price: "R$ 299,00", priceValue: 299.00,  image: "", store: "Loja Oficial",  affiliateLink: "#", weekly: false, bestSeller: false, recommend: "" },
  { id: 15, name: "Manta para Sela Premium",       brand: "Professionals Choice", category: "Equipamentos para Cavalo", price: "R$ 459,00", priceValue: 459.00,  image: "", store: "Mercado Livre", affiliateLink: "#", weekly: true,  bestSeller: false, recommend: "" },
  { id: 16, name: "Luva de Roping Reforçada",      brand: "Classic Rope",      category: "Acessórios",              price: "R$ 89,90",  priceValue: 89.90,   image: "", store: "Amazon",        affiliateLink: "#", weekly: false, bestSeller: true,  recommend: "" },
  { id: 17, name: "Protetor de Perna Team Roping", brand: "Professionals Choice", category: "Team Roping",           price: "R$ 529,00", priceValue: 529.00,  image: "", store: "Loja Oficial",  affiliateLink: "#", weekly: false, bestSeller: false, recommend: "" },
  { id: 18, name: "Bota Infantil Lil Stompers",    brand: "Ariat",              category: "Botas",                  price: "R$ 329,00", priceValue: 329.00,  image: "", store: "Amazon",        affiliateLink: "#", weekly: true,  bestSeller: false, recommend: "" },
];

const CATEGORIES = ["Calças", "Botas", "Camisas", "Chapéus", "Laços", "Selas", "Equipamentos para Cavalo", "Acessórios", "Team Roping", "Promoções"];
const BRANDS = ["Ariat", "Cinch", "Classic Rope", "Fast Back", "Professionals Choice", "Justin", "Twisted X", "Wrangler", "Martin Saddlery", "Resistol"];

const CATEGORY_ICONS = {
  "Calças": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2h12l1 6-2 14h-4l-1-11-1 11H7L5 8z"/></svg>',
  "Botas": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 2v9l-4 4v4a1 1 0 0 0 1 1h17a1 1 0 0 0 .9-1.5C20 15 16 15 14 13V2z"/><path d="M7 6h7"/></svg>',
  "Camisas": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2 4 6l2 3 2-1v12h8V8l2 1 2-3-4-4-2 2h-4z"/></svg>',
  "Chapéus": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 16c3-1 15-1 18 0-1 2-4 3-9 3s-8-1-9-3z"/><path d="M8 16c-1-4 1-8 4-8s5 4 4 8"/></svg>',
  "Laços": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="10" cy="12" r="7"/><path d="M15.5 16.5 21 22"/></svg>',
  "Selas": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 15c2-6 6-9 9-9s7 3 9 9c-3 2-6-1-9-1s-6 3-9 1z"/></svg>',
  "Equipamentos para Cavalo": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20c1-5 2-7 5-9L7 5c3-2 6-2 8 1l1 3 4 2-2 2-3-1-2 2 2 7"/></svg>',
  "Acessórios": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><path d="M12 4v3M12 17v3M4 12h3M17 12h3"/></svg>',
  "Team Roping": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4c6 3 10 3 16 0M4 20c6-3 10-3 16 0"/><circle cx="12" cy="12" r="3"/></svg>',
  "Promoções": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4 14h6l-1 8 9-12h-6z"/></svg>',
};

const DIFFERENTIALS = [
  { title: "Produtos Originais", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2 3 6v6c0 5 4 8 9 10 5-2 9-5 9-10V6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/></svg>' },
  { title: "Links Oficiais", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 15 15 9"/><path d="M11 6h-1a5 5 0 0 0 0 10h1"/><path d="M13 18h1a5 5 0 0 0 0-10h-1"/></svg>' },
  { title: "Curadoria Manual", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/></svg>' },
  { title: "Atualizações Frequentes", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 3v6h-6"/></svg>' },
  { title: "Compra Segura", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>' },
];

/* ---------- 2. HELPERS ---------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const favorites = new Set(JSON.parse(sessionStorage.getItem("domroping-favs") || "[]"));

function saveFavorites() {
  try { sessionStorage.setItem("domroping-favs", JSON.stringify([...favorites])); } catch (e) { /* ambiente sem storage: ignora */ }
  $("#favCount").textContent = favorites.size;
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

function placeholderMarkup(category) {
  const icon = CATEGORY_ICONS[category] || CATEGORY_ICONS["Acessórios"];
  return `<div class="product-placeholder">${icon}<span>Imagem do produto</span></div>`;
}

const heartIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7.5-4.6-10-9.3C.5 8 2 4.5 5.6 4c2-.3 3.8.6 4.9 2.3C11.6 4.6 13.4 3.7 15.4 4 19 4.5 20.5 8 19 11.7 16.5 16.4 9 21 9 21z" transform="translate(3 0) scale(0.9)"/></svg>';

/* ---------- 3. RENDER: CARD DE PRODUTO ---------- */
function productCard(product, { badgeText = "" } = {}) {
  const media = product.image
    ? `<img src="${product.image}" alt="${product.name} — ${product.brand}" loading="lazy">`
    : placeholderMarkup(product.category);

  const isFav = favorites.has(product.id);

  return `
    <article class="product-card" data-id="${product.id}">
      <div class="product-card__media">
        ${media}
        ${badgeText ? `<span class="product-card__badge">${badgeText}</span>` : ""}
        <button class="product-card__fav ${isFav ? "is-active" : ""}" data-fav="${product.id}" aria-label="Favoritar ${product.name}" aria-pressed="${isFav}">
          ${heartIcon}
        </button>
      </div>
      <div class="product-card__body">
        <span class="product-card__brand">${product.brand}</span>
        <h3 class="product-card__name">${product.name}</h3>
        <span class="product-card__price">${product.price}</span>
        <span class="product-card__store">Vendido por ${product.store}</span>
        <button class="btn btn--outline btn--sm btn--full product-card__cta" data-buy="${product.id}">
          Comprar na ${product.store}
        </button>
      </div>
    </article>`;
}

function buyProduct(id) {
  const product = PRODUCTS.find(p => p.id === Number(id));
  if (!product) return;
  if (!product.affiliateLink || product.affiliateLink === "#") {
    showToast("Link de afiliado ainda não cadastrado para este produto.");
    return;
  }
  window.open(product.affiliateLink, "_blank", "noopener");
}

function toggleFavorite(id) {
  id = Number(id);
  const product = PRODUCTS.find(p => p.id === id);
  if (favorites.has(id)) {
    favorites.delete(id);
    showToast(`${product.name} removido dos favoritos.`);
  } else {
    favorites.add(id);
    showToast(`${product.name} adicionado aos favoritos.`);
  }
  saveFavorites();
  $$(`[data-fav="${id}"]`).forEach(btn => {
    btn.classList.toggle("is-active", favorites.has(id));
    btn.setAttribute("aria-pressed", favorites.has(id));
  });
}

/* Delegação de eventos: um único listener cuida de "comprar" e "favoritar" em qualquer grade */
document.addEventListener("click", (e) => {
  const buyBtn = e.target.closest("[data-buy]");
  if (buyBtn) { buyProduct(buyBtn.dataset.buy); return; }

  const favBtn = e.target.closest("[data-fav]");
  if (favBtn) { toggleFavorite(favBtn.dataset.fav); return; }
});

/* ---------- 4. RENDER: CATEGORIAS ---------- */
function renderCategories() {
  const grid = $("#categoriesGrid");
  grid.innerHTML = CATEGORIES.map(cat => `
    <button class="category-card" data-category="${cat}">
      <span class="category-card__icon">${CATEGORY_ICONS[cat] || ""}</span>
      <span class="category-card__name">${cat}</span>
    </button>
  `).join("");

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".category-card");
    if (!card) return;
    $("#filterCategory").value = card.dataset.category;
    applyFilters();
    document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
  });

  // dropdown do menu principal
  const dropdown = $("#categoriesDropdown");
  dropdown.innerHTML = CATEGORIES.map(cat => {
    const count = PRODUCTS.filter(p => p.category === cat).length;
    return `<a href="#produtos" data-category="${cat}">${cat}<span>${count}</span></a>`;
  }).join("");
  dropdown.addEventListener("click", (e) => {
    const link = e.target.closest("a[data-category]");
    if (!link) return;
    $("#filterCategory").value = link.dataset.category;
    applyFilters();
  });
}

/* ---------- 5. RENDER: MARCAS ---------- */
function renderBrands() {
  const grid = $("#brandsGrid");
  grid.innerHTML = BRANDS.map(brand => `<button class="brand-card" data-brand="${brand}">${brand}</button>`).join("");

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".brand-card");
    if (!card) return;
    const already = card.classList.contains("is-active");
    $$(".brand-card", grid).forEach(b => b.classList.remove("is-active"));
    $("#filterBrand").value = already ? "" : card.dataset.brand;
    if (!already) card.classList.add("is-active");
    applyFilters();
    showToast(already ? "Filtro de marca removido." : `Mostrando produtos da ${card.dataset.brand}.`);
    document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
  });
}

/* ---------- 6. RENDER: DIFERENCIAIS ---------- */
function renderDifferentials() {
  $("#diffGrid").innerHTML = DIFFERENTIALS.map(d => `
    <div class="diff-card" data-reveal>
      <span class="diff-card__icon">${d.icon}</span>
      <span class="diff-card__title">${d.title}</span>
    </div>
  `).join("");
}

/* ---------- 7. RENDER: ACHADOS DA SEMANA / MAIS VENDIDOS / RECOMENDA ---------- */
function renderWeeklyPicks() {
  const items = PRODUCTS.filter(p => p.weekly);
  $("#weeklyPicks").innerHTML = items.map(p => productCard(p, { badgeText: "Achado da semana" })).join("");
}

function renderBestSellers() {
  const items = PRODUCTS.filter(p => p.bestSeller);
  $("#bestSellers").innerHTML = items.map(p => productCard(p, { badgeText: "Mais procurado" })).join("");
}

function renderRecommend() {
  const items = PRODUCTS.filter(p => p.recommend);
  $("#recommendGrid").innerHTML = items.map(p => `
    <div class="recommend-card" data-reveal>
      <span class="recommend-card__tag">${p.recommend}</span>
      <span class="recommend-card__name">${p.name}</span>
      <span class="recommend-card__brand">${p.brand}</span>
      <span class="recommend-card__price">${p.price}</span>
      <button class="btn btn--ghost btn--sm" data-buy="${p.id}">Ver produto</button>
    </div>
  `).join("");
}

/* ---------- 8. FILTROS E VITRINE PRINCIPAL ---------- */
function populateFilterOptions() {
  const catSelect = $("#filterCategory");
  CATEGORIES.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat; opt.textContent = cat;
    catSelect.appendChild(opt);
  });

  const brandSelect = $("#filterBrand");
  BRANDS.forEach(brand => {
    const opt = document.createElement("option");
    opt.value = brand; opt.textContent = brand;
    brandSelect.appendChild(opt);
  });
}

function applyFilters() {
  const category = $("#filterCategory").value;
  const brand = $("#filterBrand").value;
  const maxPrice = Number($("#filterPrice").value) || Infinity;
  const query = $("#searchInput").value.trim().toLowerCase();

  // sincroniza destaque visual de marcas
  $$(".brand-card").forEach(b => b.classList.toggle("is-active", b.dataset.brand === brand));

  const filtered = PRODUCTS.filter(p => {
    if (category && p.category !== category) return false;
    if (brand && p.brand !== brand) return false;
    if (p.priceValue > maxPrice) return false;
    if (query) {
      const haystack = `${p.name} ${p.brand} ${p.category}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });

  const grid = $("#productsGrid");
  const empty = $("#emptyState");
  const count = $("#resultsCount");

  if (filtered.length === 0) {
    grid.innerHTML = "";
    empty.hidden = false;
  } else {
    empty.hidden = true;
    grid.innerHTML = filtered.map(p => productCard(p)).join("");
  }
  count.textContent = `${filtered.length} produto${filtered.length === 1 ? "" : "s"} encontrado${filtered.length === 1 ? "" : "s"}`;
}

$("#clearFilters").addEventListener("click", () => {
  $("#filterCategory").value = "";
  $("#filterBrand").value = "";
  $("#filterPrice").value = "";
  $("#searchInput").value = "";
  applyFilters();
});

["filterCategory", "filterBrand", "filterPrice"].forEach(id => {
  $(`#${id}`).addEventListener("change", applyFilters);
});

/* ---------- 9. BUSCA INSTANTÂNEA (cabeçalho) ---------- */
const searchToggle = $("#searchToggle");
const searchBox = $("#searchBox");
const searchInput = $("#searchInput");
const searchResults = $("#searchResults");

searchToggle.addEventListener("click", () => {
  const isOpen = searchBox.classList.toggle("search--open");
  if (isOpen) searchInput.focus();
  else { searchResults.hidden = true; searchInput.value = ""; }
});

function renderSearchResults(query) {
  if (!query) { searchResults.hidden = true; return; }
  const q = query.toLowerCase();
  const results = PRODUCTS.filter(p => `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(q)).slice(0, 6);

  searchResults.hidden = false;
  if (results.length === 0) {
    searchResults.innerHTML = `<div class="search-results__empty">Nenhum resultado para "${query}".</div>`;
    return;
  }

  searchResults.innerHTML = `<div class="search-results__inner">${results.map(p => `
    <a class="search-result" href="#produtos" data-goto="${p.id}">
      <div class="search-result__thumb">${p.image ? `<img src="${p.image}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">` : placeholderMarkup(p.category)}</div>
      <div>
        <div class="search-result__name">${p.name}</div>
        <div class="search-result__meta">${p.brand} · ${p.category} · ${p.price}</div>
      </div>
    </a>
  `).join("")}</div>`;
}

searchInput.addEventListener("input", (e) => {
  renderSearchResults(e.target.value.trim());
  // também filtra a vitrine principal em tempo real
  applyFilters();
});

searchResults.addEventListener("click", (e) => {
  const link = e.target.closest("[data-goto]");
  if (!link) return;
  e.preventDefault();
  searchResults.hidden = true;
  searchBox.classList.remove("search--open");
  document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
});

document.addEventListener("click", (e) => {
  if (!searchBox.contains(e.target)) searchResults.hidden = true;
});

/* ---------- 10. MENU MOBILE ---------- */
const menuToggle = $("#menuToggle");
const mainNav = $("#mainNav");

menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("is-open");
  menuToggle.classList.toggle("is-open", open);
  menuToggle.setAttribute("aria-expanded", open);
});

$$(".nav__item--dropdown > .nav__link").forEach(btn => {
  btn.addEventListener("click", () => {
    if (window.innerWidth > 720) return; // no desktop o dropdown já abre no hover
    const item = btn.closest(".nav__item--dropdown");
    const open = item.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", open);
  });
});

$$(".nav__link, .nav__dropdown a").forEach(link => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 720 && link.tagName === "A") {
      mainNav.classList.remove("is-open");
      menuToggle.classList.remove("is-open");
    }
  });
});

/* ---------- 11. SCROLL REVEAL ---------- */
function initScrollReveal() {
  const targets = $$("[data-reveal], [data-reveal-group]");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

  targets.forEach(t => observer.observe(t));
}

function markSectionsForReveal() {
  $$(".section__head").forEach(el => el.setAttribute("data-reveal", ""));
  const groups = ["#categoriesGrid", "#productsGrid", "#brandsGrid", "#diffGrid", "#recommendGrid"];
  groups.forEach(sel => { const el = $(sel); if (el) el.setAttribute("data-reveal-group", ""); });
}

/* ---------- 12. INICIALIZAÇÃO ---------- */
function init() {
  $("#year").textContent = new Date().getFullYear();
  saveFavorites();

  populateFilterOptions();
  renderCategories();
  renderBrands();
  renderDifferentials();
  renderWeeklyPicks();
  renderBestSellers();
  renderRecommend();
  applyFilters();

  markSectionsForReveal();
  initScrollReveal();

  // reobserva grades preenchidas dinamicamente após o primeiro render
  requestAnimationFrame(initScrollReveal);

  $("#footerPrivacy").addEventListener("click", (e) => { e.preventDefault(); showToast("Política de Privacidade em elaboração."); });
  $("#footerAffiliates").addEventListener("click", (e) => { e.preventDefault(); showToast("Programa de Afiliados em elaboração."); });
}

document.addEventListener("DOMContentLoaded", init);
