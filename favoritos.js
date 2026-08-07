/* ==========================================================================
   DOMROPING — FAVORITOS (favoritos.html)
   ========================================================================== */

function renderFavorites() {
  const grid = $("#favoritesGrid");
  const empty = $("#favoritesEmpty");
  const items = PRODUCTS.filter(p => favorites.has(p.id));

  if (items.length === 0) {
    grid.innerHTML = "";
    grid.hidden = true;
    empty.hidden = false;
  } else {
    empty.hidden = true;
    grid.hidden = false;
    grid.innerHTML = items.map(p => productCard(p)).join("");
  }
}

function init() {
  renderFavorites();
  // Sempre que um favorito for removido/adicionado (inclusive nesta própria
  // página), a lista se atualiza sozinha.
  document.addEventListener("favorites:changed", renderFavorites);
}

document.addEventListener("DOMContentLoaded", init);
