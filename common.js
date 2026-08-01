/* ==========================================================================
   DOMROPING — COMMON
   Funções compartilhadas por todas as páginas (Home, Catálogo, Produto, Marcas).
   Depende de data.js (deve ser carregado antes deste arquivo).
   ========================================================================== */

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* ---------- FAVORITOS ---------- */
const favorites = new Set(JSON.parse(sessionStorage.getItem("domroping-favs") || "[]"));

function saveFavorites() {
  try { sessionStorage.setItem("domroping-favs", JSON.stringify([...favorites])); } catch (e) { /* ambiente sem storage: ignora */ }
  const badge = $("#favCount");
  if (badge) badge.textContent = favorites.size;
}

function toggleFavorite(id) {
  id = Number(id);
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  if (favorites.has(id)) {
    favorites.delete(id);
    showToast(`${product.nome} removido dos favoritos.`);
  } else {
    favorites.add(id);
    showToast(`${product.nome} adicionado aos favoritos.`);
  }
  saveFavorites();
  $$(`[data-fav="${id}"]`).forEach(btn => {
    btn.classList.toggle("is-active", favorites.has(id));
    btn.setAttribute("aria-pressed", favorites.has(id));
  });
}

/* ---------- TOAST ---------- */
function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

/* ---------- FORMATAÇÃO ---------- */
function formatPrice(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function discountPercent(product) {
  if (!product.precoAnterior || product.precoAnterior <= product.preco) return 0;
  return Math.round((1 - product.preco / product.precoAnterior) * 100);
}

/* ---------- PLACEHOLDER DE IMAGEM ---------- */
function placeholderMarkup(category, size = "md") {
  const icon = CATEGORY_ICONS[category] || CATEGORY_ICONS["Acessórios"];
  return `<div class="product-placeholder product-placeholder--${size}">${icon}<span>Imagem do produto</span></div>`;
}

const heartIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7.5-4.6-10-9.3C.5 8 2 4.5 5.6 4c2-.3 3.8.6 4.9 2.3C11.6 4.6 13.4 3.7 15.4 4 19 4.5 20.5 8 19 11.7 16.5 16.4 9 21 9 21z" transform="translate(3 0) scale(0.9)"/></svg>';

/* ---------- CARD DE PRODUTO (link real para a página do produto) ---------- */
function productCard(product, { badgeText = "" } = {}) {
  const capa = product.imagens && product.imagens[0];
  const media = capa
    ? `<img src="${capa}" alt="${product.nome} — ${product.marca}" loading="lazy">`
    : placeholderMarkup(product.categoria);

  const isFav = favorites.has(product.id);
  const desconto = discountPercent(product);
  const badge = badgeText || (desconto > 0 ? `-${desconto}%` : "");

  return `
    <article class="product-card" data-id="${product.id}">
      <a class="product-card__link" href="produto.html?id=${product.id}" aria-label="Ver detalhes de ${product.nome}">
        <div class="product-card__media">
          ${media}
          ${badge ? `<span class="product-card__badge">${badge}</span>` : ""}
        </div>
        <div class="product-card__body">
          <span class="product-card__brand">${product.marca}</span>
          <h3 class="product-card__name">${product.nome}</h3>
          <div class="product-card__prices">
            ${product.precoAnterior ? `<span class="product-card__price-old">${formatPrice(product.precoAnterior)}</span>` : ""}
            <span class="product-card__price">${formatPrice(product.preco)}</span>
          </div>
          <span class="product-card__store">Vendido por ${product.loja}</span>
        </div>
      </a>
      <button class="product-card__fav ${isFav ? "is-active" : ""}" data-fav="${product.id}" aria-label="Favoritar ${product.nome}" aria-pressed="${isFav}">
        ${heartIcon}
      </button>
    </article>`;
}

/* Delegação de eventos: favoritar em qualquer grade, em qualquer página */
document.addEventListener("click", (e) => {
  const favBtn = e.target.closest("[data-fav]");
  if (favBtn) { e.preventDefault(); toggleFavorite(favBtn.dataset.fav); return; }
});

/* ---------- CABEÇALHO: dropdown de categorias ---------- */
function renderCategoriesDropdown() {
  const dropdown = $("#categoriesDropdown");
  if (!dropdown) return;
  const items = CATEGORIES.map(cat => {
    const count = PRODUCTS.filter(p => p.categoria === cat).length;
    return `<a href="produtos.html?cat=${encodeURIComponent(cat)}">${cat}<span>${count}</span></a>`;
  }).join("");
  dropdown.innerHTML = items + `<a href="marcas.html" class="nav__dropdown-marcas">Ver todas as marcas<span>${BRANDS.length}</span></a>`;
}

/* ---------- CABEÇALHO: busca instantânea ---------- */
function initHeaderSearch() {
  const searchToggle = $("#searchToggle");
  const searchBox = $("#searchBox");
  const searchInput = $("#searchInput");
  const searchResults = $("#searchResults");
  if (!searchToggle || !searchBox || !searchInput || !searchResults) return;

  searchToggle.addEventListener("click", () => {
    const isOpen = searchBox.classList.toggle("search--open");
    if (isOpen) searchInput.focus();
    else { searchResults.hidden = true; searchInput.value = ""; }
  });

  function matches(product, q) {
    const haystack = `${product.nome} ${product.marca} ${product.categoria} ${product.subcategoria} ${(product.tags || []).join(" ")}`.toLowerCase();
    return haystack.includes(q);
  }

  function renderResults(query) {
    if (!query) { searchResults.hidden = true; return; }
    const q = query.toLowerCase();
    const results = PRODUCTS.filter(p => matches(p, q)).slice(0, 6);

    searchResults.hidden = false;
    if (results.length === 0) {
      searchResults.innerHTML = `<div class="search-results__inner"><div class="search-results__empty">Nenhum resultado para "${query}". Tente buscar por marca, categoria ou produto.</div></div>`;
      return;
    }

    searchResults.innerHTML = `<div class="search-results__inner">
      ${results.map(p => `
        <a class="search-result" href="produto.html?id=${p.id}">
          <div class="search-result__thumb">${p.imagens[0] ? `<img src="${p.imagens[0]}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">` : placeholderMarkup(p.categoria, "sm")}</div>
          <div>
            <div class="search-result__name">${p.nome}</div>
            <div class="search-result__meta">${p.marca} · ${p.categoria} · ${formatPrice(p.preco)}</div>
          </div>
        </a>
      `).join("")}
      <a class="search-result search-result--all" href="produtos.html?q=${encodeURIComponent(query)}">Ver todos os resultados para "${query}"</a>
    </div>`;
  }

  searchInput.addEventListener("input", (e) => renderResults(e.target.value.trim()));
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && searchInput.value.trim()) {
      window.location.href = `produtos.html?q=${encodeURIComponent(searchInput.value.trim())}`;
    }
  });

  document.addEventListener("click", (e) => {
    if (!searchBox.contains(e.target)) searchResults.hidden = true;
  });
}

/* ---------- MENU MOBILE ---------- */
function initMobileMenu() {
  const menuToggle = $("#menuToggle");
  const mainNav = $("#mainNav");
  if (!menuToggle || !mainNav) return;

  menuToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("is-open");
    menuToggle.classList.toggle("is-open", open);
    menuToggle.setAttribute("aria-expanded", open);
  });

  $$(".nav__item--dropdown > .nav__link").forEach(btn => {
    btn.addEventListener("click", () => {
      if (window.innerWidth > 980) return; // no desktop o dropdown já abre no hover
      const item = btn.closest(".nav__item--dropdown");
      const open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open);
    });
  });

  $$(".nav__link, .nav__dropdown a").forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 980 && link.tagName === "A") {
        mainNav.classList.remove("is-open");
        menuToggle.classList.remove("is-open");
      }
    });
  });
}

/* ---------- SCROLL REVEAL ---------- */
function initScrollReveal() {
  const targets = $$("[data-reveal], [data-reveal-group]");
  if (!targets.length) return;
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

function markSectionsForReveal(groupSelectors = []) {
  $$(".section__head").forEach(el => el.setAttribute("data-reveal", ""));
  groupSelectors.forEach(sel => { const el = $(sel); if (el) el.setAttribute("data-reveal-group", ""); });
}

/* ---------- INICIALIZAÇÃO COMUM A TODA PÁGINA ---------- */
function initCommonLayout() {
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  saveFavorites();
  renderCategoriesDropdown();
  initHeaderSearch();
  initMobileMenu();

  const privacy = $("#footerPrivacy");
  if (privacy) privacy.addEventListener("click", (e) => { e.preventDefault(); showToast("Política de Privacidade em elaboração."); });
  const affiliates = $("#footerAffiliates");
  if (affiliates) affiliates.addEventListener("click", (e) => { e.preventDefault(); showToast("Programa de Afiliados em elaboração."); });
}

document.addEventListener("DOMContentLoaded", initCommonLayout);
