/* ==========================================================================
   DOMROPING — HOME (index.html)
   ========================================================================== */

function renderCategoriesGrid() {
  const grid = $("#categoriesGrid");
  if (!grid) return;
  grid.innerHTML = MAIN_CATEGORIES.map(cat =>
    `<a class="category-tag" href="categorias.html?principal=${encodeURIComponent(cat)}">${cat}</a>`
  ).join("");
}

function renderRecommend() {
  const grid = $("#recommendGrid");
  if (!grid) return;
  const items = PRODUCTS.filter(p => p.recomendado);
  grid.innerHTML = items.map(p => `
    <a class="recommend-card" href="produto.html?id=${p.id}" data-reveal>
      <div class="recommend-card__media">
        ${p.imagens[0] ? `<img src="${p.imagens[0]}" alt="${p.nome}">` : placeholderMarkup(p)}
        <span class="recommend-card__tag">${p.recomendado}</span>
      </div>
      <div class="recommend-card__body">
        <span class="recommend-card__brand">${p.marca}</span>
        <span class="recommend-card__name">${p.nome}</span>
        <span class="recommend-card__price">${formatPrice(p.preco)}</span>
      </div>
    </a>
  `).join("");
}

/* Home mostra o catálogo inteiro direto, sem filtros — a navegação por
   categoria/marca acontece nas seções logo abaixo. */
function renderProducts() {
  const grid = $("#productsGrid");
  if (!grid) return;
  grid.innerHTML = PRODUCTS.map(p => productCard(p)).join("");
}

function init() {
  renderProducts();
  renderCategoriesGrid();
  renderRecommend();

  markSectionsForReveal(["#productsGrid", "#categoriesGrid", "#recommendGrid"]);
  initScrollReveal();
  requestAnimationFrame(initScrollReveal);
}

document.addEventListener("DOMContentLoaded", init);
