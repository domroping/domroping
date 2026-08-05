/* ==========================================================================
   DOMROPING — CATEGORIAS (categorias.html)
   Página de duas etapas, controlada por ?principal=:
     categorias.html                        -> mostra Vestuário / Acessórios / Equipamentos
     categorias.html?principal=Acessórios   -> mostra as subcategorias de Acessórios
   Ao clicar numa subcategoria, vai direto para produtos.html?cat=X&sub=Y
   (a mesma página de catálogo já existente).
   ========================================================================== */

function renderMainCategories() {
  const list = $("#categoriesList");
  list.innerHTML = MAIN_CATEGORIES.map(cat =>
    `<a class="category-tag" href="categorias.html?principal=${encodeURIComponent(cat)}">${cat}</a>`
  ).join("");
}

function renderSubcategories(principal) {
  const subs = CATEGORY_TREE[principal];
  const list = $("#categoriesList");

  if (!subs) {
    // categoria principal desconhecida — volta pra visão geral
    renderMainCategories();
    return;
  }

  list.innerHTML = subs.map(sub =>
    `<a class="category-tag" href="produtos.html?cat=${encodeURIComponent(principal)}&sub=${encodeURIComponent(sub)}">${sub}</a>`
  ).join("");

  $("#pageTitle").textContent = principal;
  $("#pageTitleTag").textContent = `${principal} — DomRoping`;
  $("#pageDesc").textContent = `Escolha uma subcategoria dentro de ${principal}.`;
  $("#breadcrumb").innerHTML = `
    <a href="index.html">Início</a><span>/</span>
    <a href="categorias.html">Categorias</a><span>/</span>
    <span>${principal}</span>`;
}

function init() {
  const params = new URLSearchParams(window.location.search);
  const principal = params.get("principal");

  if (principal && CATEGORY_TREE[principal]) {
    renderSubcategories(principal);
  } else {
    renderMainCategories();
  }
}

document.addEventListener("DOMContentLoaded", init);
