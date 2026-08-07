/* ==========================================================================
   DOMROPING — COMMON
   Funções compartilhadas por todas as páginas (Home, Catálogo, Produto, Marcas).
   Depende de data.js (deve ser carregado antes deste arquivo).
   ========================================================================== */

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* ---------- FAVORITOS (persistem no navegador via localStorage) ---------- */
const FAVORITES_KEY = "domroping-favoritos";
const favorites = new Set(JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]"));

function saveFavorites() {
  try { localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites])); } catch (e) { /* ambiente sem storage: ignora */ }
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
  document.dispatchEvent(new CustomEvent("favorites:changed"));
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
  if (value === null || value === undefined) return "";
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function discountPercent(product) {
  if (!product.preco || !product.precoAnterior || product.precoAnterior <= product.preco) return 0;
  return Math.round((1 - product.preco / product.precoAnterior) * 100);
}

/* ---------- PLACEHOLDER DE IMAGEM ---------- */
function placeholderMarkup(product, size = "md") {
  const icon = iconFor(product);
  return `<div class="product-placeholder product-placeholder--${size}">${icon}<span>Imagem do produto</span></div>`;
}

const heartIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7.5-4.6-10-9.3C.5 8 2 4.5 5.6 4c2-.3 3.8.6 4.9 2.3C11.6 4.6 13.4 3.7 15.4 4 19 4.5 20.5 8 19 11.7 16.5 16.4 9 21 9 21z" transform="translate(3 0) scale(0.9)"/></svg>';

/* ---------- CARD DE PRODUTO (link real para a página do produto) ---------- */
function productCard(product, { badgeText = "" } = {}) {
  const capa = product.imagens && product.imagens[0];
  const isPlaceholder = isPlaceholderProduct(product);
  const media = capa
    ? `<img src="${capa}" alt="${product.nome} — ${product.marca}" loading="lazy">`
    : placeholderMarkup(product);

  const isFav = favorites.has(product.id);
  const desconto = discountPercent(product);
  const badge = badgeText || (isPlaceholder ? "Em breve" : (desconto > 0 ? `-${desconto}%` : ""));

  const nome = isPlaceholder ? "Produto em cadastro" : product.nome;
  const marca = product.marca || "\u00A0";
  const precoTexto = isPlaceholder ? "Em breve" : formatPrice(product.preco);
  const loja = product.loja ? `Vendido por ${product.loja}` : "\u00A0";

  return `
    <article class="product-card ${isPlaceholder ? "product-card--placeholder" : ""}" data-id="${product.id}">
      <a class="product-card__link" href="produto.html?id=${product.id}" aria-label="Ver detalhes de ${nome}">
        <div class="product-card__media">
          ${media}
          ${badge ? `<span class="product-card__badge">${badge}</span>` : ""}
        </div>
        <div class="product-card__body">
          <span class="product-card__brand">${marca}</span>
          <h3 class="product-card__name">${nome}</h3>
          <span class="product-card__price-old">${product.precoAnterior ? formatPrice(product.precoAnterior) : "\u00A0"}</span>
          <span class="product-card__price">${precoTexto}</span>
          <span class="product-card__store">${loja}</span>
        </div>
      </a>
      <button class="product-card__fav ${isFav ? "is-active" : ""}" data-fav="${product.id}" aria-label="Favoritar ${nome}" aria-pressed="${isFav}">
        ${heartIcon}
      </button>
    </article>`;
}

/* Delegação de eventos: favoritar em qualquer grade, em qualquer página */
document.addEventListener("click", (e) => {
  const favBtn = e.target.closest("[data-fav]");
  if (favBtn) { e.preventDefault(); toggleFavorite(favBtn.dataset.fav); return; }
});

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
          <div class="search-result__thumb">${p.imagens[0] ? `<img src="${p.imagens[0]}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">` : placeholderMarkup(p, "sm")}</div>
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

/* ---------- BARRA DE CONFIANÇA (ticker animado) ---------- */
function initTrustBar() {
  const track = $("#trustBarTrack");
  if (!track) return;
  // duplica o conteúdo para permitir loop infinito via CSS (translateX -50%)
  track.innerHTML = track.innerHTML + track.innerHTML;
}

/* ---------- BOTÃO DE FAVORITOS NO CABEÇALHO ---------- */
function initFavoritesButton() {
  const btn = $("#favoritesBtn");
  if (!btn) return;
  btn.addEventListener("click", () => { window.location.href = "favoritos.html"; });
}

/* ---------- MENU MOBILE ---------- */
function initMobileMenu() {
  const menuToggle = $("#menuToggle");
  const mainNav = $("#mainNav");
  const navClose = $("#navClose");
  if (!menuToggle || !mainNav) return;

  let lockedScrollY = 0;

  function setOpen(open) {
    mainNav.classList.toggle("is-open", open);
    menuToggle.classList.toggle("is-open", open);
    menuToggle.setAttribute("aria-expanded", open);

    // Trava de scroll robusta para iOS: overflow:hidden sozinho no body é
    // conhecido por falhar no Safari (o fundo ainda "arrasta"/dá bounce,
    // o que passa a sensação de menu travado). Fixar o body na posição
    // atual e restaurar o scroll ao fechar resolve isso de forma confiável.
    if (open) {
      lockedScrollY = window.scrollY;
      document.body.classList.add("nav-open");
      document.body.style.top = `-${lockedScrollY}px`;
    } else {
      document.body.classList.remove("nav-open");
      document.body.style.top = "";
      window.scrollTo(0, lockedScrollY);
    }
  }

  menuToggle.addEventListener("click", () => setOpen(!mainNav.classList.contains("is-open")));
  if (navClose) navClose.addEventListener("click", () => setOpen(false));

  $$(".nav__link").forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 980 && link.tagName === "A") setOpen(false);
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });

  window.addEventListener("resize", () => { if (window.innerWidth > 980) setOpen(false); });
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
  initHeaderSearch();
  initMobileMenu();
  initTrustBar();
  initFavoritesButton();

  const privacy = $("#footerPrivacy");
  if (privacy) privacy.addEventListener("click", (e) => { e.preventDefault(); showToast("Política de Privacidade em elaboração."); });
  const affiliates = $("#footerAffiliates");
  if (affiliates) affiliates.addEventListener("click", (e) => { e.preventDefault(); showToast("Programa de Afiliados em elaboração."); });
  const cursos = $("#navCursos");
  if (cursos) cursos.addEventListener("click", (e) => { e.preventDefault(); showToast("Cursos DomRoping em breve — em outro site."); });
}

document.addEventListener("DOMContentLoaded", initCommonLayout);
