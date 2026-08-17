/* ==========================================================================
   DOMROPING — CATÁLOGO (produtos.html)
   Serve tanto como "ver todos os produtos" quanto como página dedicada de
   cada categoria/subcategoria/busca, lendo parâmetros da URL:
     produtos.html?cat=Equipamentos
     produtos.html?cat=Acessórios&sub=Bonés
     produtos.html?q=bota
   Não existe mais filtro por marca — a navegação é só por categoria/preço/busca.
   ========================================================================== */

function getParams() {
  return new URLSearchParams(window.location.search);
}

function populateFilterOptions() {
  const catSelect = $("#filterCategory");
  MAIN_CATEGORIES.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat; opt.textContent = cat;
    catSelect.appendChild(opt);
  });
}

function updatePageHead(category, query, sub) {
  const title = $("#pageTitle");
  const desc = $("#pageDesc");
  const crumb = $("#breadcrumbCurrent");

  if (query) {
    title.textContent = `Resultados para "${query}"`;
    desc.textContent = "Produtos que combinam com a sua busca.";
    crumb.textContent = "Busca";
    document.title = `Busca: ${query} — DomRoping`;
  } else if (sub) {
    title.textContent = sub;
    desc.textContent = `${category} → ${sub}.`;
    crumb.textContent = sub;
    document.title = `${sub} — DomRoping`;
  } else if (category) {
    title.textContent = category;
    desc.textContent = `Confira toda a seleção DomRoping em ${category}.`;
    crumb.textContent = category;
    document.title = `${category} — DomRoping`;
  } else {
    title.textContent = "Todos os produtos";
    desc.textContent = "Filtre por categoria ou faixa de preço para encontrar exatamente o que precisa.";
    crumb.textContent = "Produtos";
    document.title = "Produtos — DomRoping";
  }
}

function renderSubcatChips(category, activeSub) {
  const wrap = $("#subcatChips");
  const subs = CATEGORY_TREE[category];
  if (!subs) { wrap.hidden = true; wrap.innerHTML = ""; return; }

  wrap.hidden = false;
  wrap.innerHTML = `
    <button class="subcat-chip ${!activeSub ? "is-active" : ""}" data-sub="">Todos</button>
    ${subs.map(s => `<button class="subcat-chip ${activeSub === s ? "is-active" : ""}" data-sub="${s}">${s}</button>`).join("")}
  `;

  wrap.addEventListener("click", (e) => {
    const chip = e.target.closest(".subcat-chip");
    if (!chip) return;
    const params = getParams();
    if (chip.dataset.sub) params.set("sub", chip.dataset.sub); else params.delete("sub");
    window.location.search = params.toString();
  });
}

function applyFilters() {
  const params = getParams();
  const category = params.get("cat") || "";
  const sub = params.get("sub") || "";
  const maxPrice = Number($("#filterPrice").value) || Infinity;
  const query = (params.get("q") || "").toLowerCase();

  const filtered = PRODUCTS.filter(p => {
    if (category && p.categoria !== category) return false;
    if (sub && p.subcategoria !== sub) return false;
    if (p.preco > maxPrice) return false;
    if (query) {
      const haystack = `${p.nome} ${p.marca} ${p.categoria} ${p.subcategoria} ${(p.tags || []).join(" ")}`.toLowerCase();
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

function init() {
  const params = getParams();
  const category = params.get("cat") || "";
  const sub = params.get("sub") || "";
  const query = params.get("q") || "";

  populateFilterOptions();
  $("#filterCategory").value = category;

  updatePageHead(category, query, sub);
  renderSubcatChips(category, sub);

  applyFilters();

  // Trocar categoria pelo <select> navega para a URL correspondente, assim
  // cada categoria continua tendo uma rota própria e compartilhável.
  $("#filterCategory").addEventListener("change", () => {
    const p = new URLSearchParams();
    if ($("#filterCategory").value) p.set("cat", $("#filterCategory").value);
    window.location.search = p.toString();
  });

  $("#filterPrice").addEventListener("change", applyFilters);

  $("#clearFilters").addEventListener("click", () => {
    window.location.href = "produtos.html";
  });
}

document.addEventListener("DOMContentLoaded", init);
