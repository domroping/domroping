/* ==========================================================================
   DOMROPING — HOME (index.html)
   ========================================================================== */

function renderCategoriesGrid() {
  const grid = $("#categoriesGrid");
  if (!grid) return;
  grid.innerHTML = CATEGORIES.map(cat => `
    <a class="category-card" href="produtos.html?cat=${encodeURIComponent(cat)}">
      <span class="category-card__icon">${CATEGORY_ICONS[cat] || ""}</span>
      <span class="category-card__name">${cat}</span>
      <span class="category-card__count">${PRODUCTS.filter(p => p.categoria === cat).length} produtos</span>
    </a>
  `).join("") + `
    <a class="category-card category-card--marcas" href="marcas.html">
      <span class="category-card__icon">${CATEGORY_ICONS["Marcas"]}</span>
      <span class="category-card__name">Marcas</span>
      <span class="category-card__count">${BRANDS.length} marcas</span>
    </a>`;
}

function renderRecommend() {
  const grid = $("#recommendGrid");
  if (!grid) return;
  const items = PRODUCTS.filter(p => p.recomendado);
  grid.innerHTML = items.map(p => `
    <a class="recommend-card" href="produto.html?id=${p.id}" data-reveal>
      <span class="recommend-card__tag">${p.recomendado}</span>
      <span class="recommend-card__name">${p.nome}</span>
      <span class="recommend-card__brand">${p.marca}</span>
      <span class="recommend-card__price">${formatPrice(p.preco)}</span>
      <span class="btn btn--ghost btn--sm">Ver produto</span>
    </a>
  `).join("");
}

/* ---------- FILTROS DA VITRINE (Home mostra o catálogo completo) ---------- */
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

  const filtered = PRODUCTS.filter(p => {
    if (category && p.categoria !== category) return false;
    if (brand && p.marca !== brand) return false;
    if (p.preco > maxPrice) return false;
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

function initHomeFilters() {
  populateFilterOptions();

  $("#clearFilters").addEventListener("click", () => {
    $("#filterCategory").value = "";
    $("#filterBrand").value = "";
    $("#filterPrice").value = "";
    applyFilters();
  });

  ["filterCategory", "filterBrand", "filterPrice"].forEach(id => {
    $(`#${id}`).addEventListener("change", applyFilters);
  });

  applyFilters();
}

function init() {
  renderCategoriesGrid();
  renderRecommend();
  initHomeFilters();

  markSectionsForReveal(["#productsGrid", "#categoriesGrid", "#recommendGrid"]);
  initScrollReveal();
  requestAnimationFrame(initScrollReveal);
}

document.addEventListener("DOMContentLoaded", init);
