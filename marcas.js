/* ==========================================================================
   DOMROPING — MARCAS (marcas.html)
   ========================================================================== */

function init() {
  const grid = $("#brandsGrid");
  grid.innerHTML = MAIN_BRANDS.map(brand => {
    const count = PRODUCTS.filter(p => p.marca === brand).length;
    return `
      <a class="brand-card" href="produtos.html?marca=${encodeURIComponent(brand)}">
        <span class="brand-card__name">${brand}</span>
        <span class="brand-card__count">${count} produto${count === 1 ? "" : "s"}</span>
      </a>`;
  }).join("");
}

document.addEventListener("DOMContentLoaded", init);
