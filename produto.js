/* ==========================================================================
   DOMROPING — PÁGINA DE PRODUTO (produto.html?id=N)
   ========================================================================== */

let currentSlide = 0;
let currentProduct = null;

function getProductFromURL() {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));
  return PRODUCTS.find(p => p.id === id) || null;
}

/* ---------- GALERIA ---------- */
function renderGallery(product) {
  const stage = $("#galleryStage");
  const thumbs = $("#galleryThumbs");
  const dots = $("#galleryDots");
  const slides = product.imagens && product.imagens.length ? product.imagens : ["", "", ""];

  stage.innerHTML = slides.map((img, i) => `
    <div class="gallery__slide ${i === 0 ? "is-active" : ""}" data-slide="${i}">
      ${img ? `<img src="${img}" alt="${product.nome} — foto ${i + 1}">` : placeholderMarkup(product.categoria, "lg")}
    </div>
  `).join("");

  thumbs.innerHTML = slides.map((img, i) => `
    <button class="gallery__thumb ${i === 0 ? "is-active" : ""}" data-thumb="${i}" aria-label="Ver foto ${i + 1}">
      ${img ? `<img src="${img}" alt="">` : placeholderMarkup(product.categoria, "sm")}
    </button>
  `).join("");

  dots.innerHTML = slides.map((_, i) => `<span class="gallery__dot ${i === 0 ? "is-active" : ""}" data-dot="${i}"></span>`).join("");

  currentSlide = 0;
  goToSlide(0);
}

function goToSlide(index) {
  const slides = $$(".gallery__slide");
  const thumbs = $$(".gallery__thumb");
  const dots = $$(".gallery__dot");
  if (!slides.length) return;

  currentSlide = (index + slides.length) % slides.length;

  slides.forEach((s, i) => s.classList.toggle("is-active", i === currentSlide));
  thumbs.forEach((t, i) => t.classList.toggle("is-active", i === currentSlide));
  dots.forEach((d, i) => d.classList.toggle("is-active", i === currentSlide));
}

function initGalleryControls() {
  $("#galleryPrev").addEventListener("click", () => goToSlide(currentSlide - 1));
  $("#galleryNext").addEventListener("click", () => goToSlide(currentSlide + 1));

  $("#galleryThumbs").addEventListener("click", (e) => {
    const thumb = e.target.closest("[data-thumb]");
    if (thumb) goToSlide(Number(thumb.dataset.thumb));
  });

  $("#galleryDots").addEventListener("click", (e) => {
    const dot = e.target.closest("[data-dot]");
    if (dot) goToSlide(Number(dot.dataset.dot));
  });

  // swipe no mobile
  const stage = $("#galleryStage");
  let startX = null;
  stage.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener("touchend", (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) goToSlide(currentSlide + (dx < 0 ? 1 : -1));
    startX = null;
  }, { passive: true });

  // teclado
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goToSlide(currentSlide - 1);
    if (e.key === "ArrowRight") goToSlide(currentSlide + 1);
  });
}

/* ---------- INFORMAÇÕES ---------- */
function renderInfo(product) {
  $("#pageTitleTag").textContent = `${product.nome} — DomRoping`;
  $("#infoBrand").textContent = product.marca;
  $("#infoName").textContent = product.nome;
  $("#infoDescricao").textContent = product.descricao;

  $("#infoPrice").textContent = formatPrice(product.preco);
  const desconto = discountPercent(product);
  if (product.precoAnterior) {
    $("#infoPriceOld").textContent = formatPrice(product.precoAnterior);
    $("#infoPriceOld").hidden = false;
  } else {
    $("#infoPriceOld").hidden = true;
  }
  if (desconto > 0) {
    $("#infoDiscount").textContent = `-${desconto}%`;
    $("#infoDiscount").hidden = false;
  } else {
    $("#infoDiscount").hidden = true;
  }

  $("#infoCaracteristicas").innerHTML = (product.caracteristicas || []).map(c => `<li>${c}</li>`).join("");

  $("#infoStore").textContent = `Vendido por ${product.loja}`;
  const catLink = $("#infoCategoria");
  catLink.textContent = product.categoria;
  catLink.href = `produtos.html?cat=${encodeURIComponent(product.categoria)}`;
  const lojaLink = $("#infoLoja2");
  lojaLink.textContent = product.loja;
  lojaLink.href = "#";
  lojaLink.addEventListener("click", (e) => e.preventDefault());

  const breadcrumbHTML = `
    <a href="index.html">Início</a><span>/</span>
    <a href="produtos.html?cat=${encodeURIComponent(product.categoria)}">${product.categoria}</a><span>/</span>
    <span>${product.nome}</span>`;
  $("#breadcrumb").innerHTML = breadcrumbHTML;
  $("#breadcrumbInline").innerHTML = breadcrumbHTML;

  const favBtn = $("#favBtn");
  const isFav = favorites.has(product.id);
  favBtn.classList.toggle("is-active", isFav);
  favBtn.setAttribute("aria-pressed", isFav);
  $("#favBtnLabel").textContent = isFav ? "Nos favoritos" : "Adicionar aos favoritos";
  favBtn.addEventListener("click", () => {
    toggleFavorite(product.id);
    const nowFav = favorites.has(product.id);
    favBtn.classList.toggle("is-active", nowFav);
    favBtn.setAttribute("aria-pressed", nowFav);
    $("#favBtnLabel").textContent = nowFav ? "Nos favoritos" : "Adicionar aos favoritos";
  });

  $("#buyBtn").addEventListener("click", () => {
    if (!product.linkCompra || product.linkCompra === "#") {
      showToast("Link de afiliado ainda não cadastrado para este produto.");
      return;
    }
    window.open(product.linkCompra, "_blank", "noopener");
  });
}

/* ---------- RELACIONADOS ---------- */
function renderRelated(product) {
  const related = PRODUCTS.filter(p => p.id !== product.id && p.categoria === product.categoria).slice(0, 8);
  if (!related.length) return;
  $("#relatedSection").hidden = false;
  $("#relatedGrid").innerHTML = related.map(p => productCard(p)).join("");
}

function init() {
  currentProduct = getProductFromURL();

  if (!currentProduct) {
    $("#notFound").hidden = false;
    return;
  }

  $("#productDetail").hidden = false;
  renderGallery(currentProduct);
  initGalleryControls();
  renderInfo(currentProduct);
  renderRelated(currentProduct);
}

document.addEventListener("DOMContentLoaded", init);
