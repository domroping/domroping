/* ==========================================================================
   DOMROPING — DADOS (fonte única de verdade para todas as páginas)

   COMO ADICIONAR / EDITAR PRODUTOS:
   1. Edite o array PRODUCTS abaixo.
   2. Cada produto aceita ATÉ 3 imagens no campo "imagens": ["", "", ""].
      Deixe uma posição como "" para mostrar um placeholder elegante no lugar.
   3. Preencha "linkCompra" com a URL real da loja. Enquanto for "#", o clique
      em "Comprar aqui" mostra um aviso e não navega para lugar nenhum.
   4. "precoAnterior" é opcional — deixe null se não houver desconto.
   ========================================================================== */

/* ---------- CATEGORIAS ----------
   Estrutura em 2 níveis: 3 categorias principais, cada uma com suas
   subcategorias. Todo produto tem "categoria" (uma das 3 chaves abaixo) e
   "subcategoria" (um dos valores da respectiva lista).

   Para adicionar uma subcategoria nova no futuro, basta incluir o nome no
   array correspondente aqui — os produtos com esse valor em "subcategoria"
   passam a aparecer automaticamente, sem mexer em nenhuma página.
*/
const CATEGORY_TREE = {
  "Vestuário": ["Calças", "Camisas", "Camisetas", "Botas"],
  "Acessórios": ["Bonés", "Chapéus", "Luvas", "Óculos"],
  "Equipamentos": ["Laços", "Rédeas", "Cabrestos", "Freios", "Mantas", "Protetores", "Escovas", "Outros equipamentos"],
};
const MAIN_CATEGORIES = Object.keys(CATEGORY_TREE); // ["Vestuário", "Acessórios", "Equipamentos"]

/* Marcas "principais" — as únicas exibidas como card na página Marcas.
   Mantida curta de propósito (loja pequena ainda). "Classic" agrupa tanto
   Classic Rope quanto Classic Equine numa marca só — não separar.
   Para adicionar uma marca principal nova no futuro, é só incluir aqui. */
const MAIN_BRANDS = ["Classic", "Fast Back", "Ariat", "Cinch", "Wrangler", "Hooey", "Kimes Ranch"];

const CATEGORY_ICONS = {
  "Calças": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2h12l1 6-2 14h-4l-1-11-1 11H7L5 8z"/></svg>',
  "Botas": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 2v9l-4 4v4a1 1 0 0 0 1 1h17a1 1 0 0 0 .9-1.5C20 15 16 15 14 13V2z"/><path d="M7 6h7"/></svg>',
  "Camisas": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2 4 6l2 3 2-1v12h8V8l2 1 2-3-4-4-2 2h-4z"/></svg>',
  "Camisetas": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3 3 7l2.5 3L8 8.5V21h8V8.5L18.5 10 21 7l-5-4-2 2h-4z"/></svg>',
  "Chapéus": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 16c3-1 15-1 18 0-1 2-4 3-9 3s-8-1-9-3z"/><path d="M8 16c-1-4 1-8 4-8s5 4 4 8"/></svg>',
  "Bonés": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 15a9 9 0 0 1 18 0"/><path d="M2 15h14"/><path d="M16 15c2.4 0 4.6-.6 6-2.3"/></svg>',
  "Luvas": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 21v-7.5a5 5 0 0 1 5-5h1a5 5 0 0 1 5 5V21z"/><path d="M12 8.5V3.5"/></svg>',
  "Óculos": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="13" r="3.3"/><circle cx="17" cy="13" r="3.3"/><path d="M10.3 13h3.4"/><path d="M3.7 11 2 9.5"/><path d="M20.3 11 22 9.5"/></svg>',
  "Laços": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="10" cy="12" r="7"/><path d="M15.5 16.5 21 22"/></svg>',
  "Equipamentos": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20c1-5 2-7 5-9L7 5c3-2 6-2 8 1l1 3 4 2-2 2-3-1-2 2 2 7"/></svg>',
  "Vestuário": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2 4 6l2 3 2-1v12h8V8l2 1 2-3-4-4-2 2h-4z"/></svg>',
  "Acessórios": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><path d="M12 4v3M12 17v3M4 12h3M17 12h3"/></svg>',
  "Marcas": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 3 6v6c0 5 4 8 9 10 5-2 9-5 9-10V6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/></svg>',
};

/* Ícone do placeholder de imagem: tenta a subcategoria, depois a categoria
   principal, e por fim cai no ícone genérico de Acessórios. */
function iconFor(product) {
  return CATEGORY_ICONS[product.subcategoria] || CATEGORY_ICONS[product.categoria] || CATEGORY_ICONS["Acessórios"];
}

const DIFFERENTIALS = [
  { title: "Produtos Originais", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2 3 6v6c0 5 4 8 9 10 5-2 9-5 9-10V6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/></svg>' },
  { title: "Links Oficiais", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 15 15 9"/><path d="M11 6h-1a5 5 0 0 0 0 10h1"/><path d="M13 18h1a5 5 0 0 0 0-10h-1"/></svg>' },
  { title: "Escolhido a Dedo", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/></svg>' },
  { title: "Atualizações Frequentes", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 3v6h-6"/></svg>' },
  { title: "Compra Segura", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>' },
];

/* ---------- PRODUTOS ----------
   imagens: sempre um array de 3 posições. "" = placeholder.
   precoAnterior: número ou null.
   categoria: uma das 3 chaves de CATEGORY_TREE ("Vestuário" | "Acessórios" | "Equipamentos").
   subcategoria: um dos valores do array correspondente em CATEGORY_TREE.
*/
const PRODUCTS = [
  { id: 1, nome: "Calça M2 Brandon", marca: "Ariat", categoria: "Vestuário", subcategoria: "Calças", preco: 392.90, precoAnterior: null, imagens: ["", "", ""], descricao: "Calça jeans de corte reto pensada para longas horas na sela, com reforço nas costuras e tecido resistente ao desgaste do dia a dia no campo.", caracteristicas: ["Corte reto (Straight Leg)", "Tecido reforçado nas costuras internas", "Cintura média", "Bolsos reforçados"], loja: "Amazon", linkCompra: "#", tags: ["jeans", "cowboy", "campo"], recomendado: "Melhor custo-benefício" },
  { id: 2, nome: "Bota Fatbaby Heritage", marca: "Ariat", categoria: "Vestuário", subcategoria: "Botas", preco: 899.00, precoAnterior: 999.00, imagens: ["", "", ""], descricao: "Bota western feminina em couro legítimo, com solteira de borracha antiderrapante e sistema de amortecimento para conforto o dia inteiro.", caracteristicas: ["Couro legítimo", "Solado antiderrapante", "Sistema de amortecimento ATS", "Cano médio"], loja: "Loja Oficial", linkCompra: "#", tags: ["bota", "couro", "feminina"], recomendado: "Melhor bota" },
  { id: 3, nome: "Camisa Manga Longa Team Roper", marca: "Cinch", categoria: "Vestuário", subcategoria: "Camisas", preco: 249.90, precoAnterior: null, imagens: ["", "", ""], descricao: "Camisa de botão de pressão em algodão respirável, ideal para competições e para o dia a dia na lida.", caracteristicas: ["100% algodão", "Botões de pressão", "Ajuste regular", "Respirável"], loja: "Mercado Livre", linkCompra: "#", tags: ["camisa", "team roping"], recomendado: "" },
  { id: 4, nome: "Chapéu de Feltro Rancher", marca: "Resistol", categoria: "Acessórios", subcategoria: "Chapéus", preco: 1190.00, precoAnterior: null, imagens: ["", "", ""], descricao: "Chapéu de feltro premium com aba rígida e copa clássica, referência entre profissionais do rodeio.", caracteristicas: ["Feltro premium", "Aba rígida 4”", "Forro interno em cetim", "Ajuste interno regulável"], loja: "Loja Oficial", linkCompra: "#", tags: ["chapéu", "feltro", "rodeio"], recomendado: "Melhor chapéu" },
  { id: 5, nome: "Laço Classic Rope 30ft", marca: "Classic", categoria: "Equipamentos", subcategoria: "Laços", preco: 349.00, precoAnterior: null, imagens: ["", "", ""], descricao: "Laço trançado de 30 pés, equilíbrio médio, indicado para quem está evoluindo técnica no team roping.", caracteristicas: ["30 pés", "Trançado 4 fios", "Rigidez média", "Ideal para header"], loja: "Amazon", linkCompra: "#", tags: ["laço", "team roping", "corda"], recomendado: "Mais vendido" },
  { id: 6, nome: "Sela Team Roping Pro", marca: "Martin Saddlery", categoria: "Equipamentos", subcategoria: "Outros equipamentos", preco: 8450.00, precoAnterior: null, imagens: ["", "", ""], descricao: "Sela profissional de team roping, estrutura reforçada para suportar o esforço do laço com máximo conforto para o cavalo.", caracteristicas: ["Árvore reforçada", "Couro premium", "Assento 15\" a 17\"", "Chifre reforçado para laço"], loja: "Loja Oficial", linkCompra: "#", tags: ["sela", "team roping", "equipamento"], recomendado: "🏆 Nossa escolha" },
  { id: 7, nome: "Cabresto de Corda Trançado", marca: "Professionals Choice", categoria: "Equipamentos", subcategoria: "Cabrestos", preco: 179.00, precoAnterior: null, imagens: ["", "", ""], descricao: "Cabresto trançado à mão, leve e resistente, com ajuste preciso para o manejo diário.", caracteristicas: ["Corda trançada", "Ajuste regulável", "Leve e resistente", "Ideal para manejo diário"], loja: "Mercado Livre", linkCompra: "#", tags: ["cabresto", "equipamento cavalo"], recomendado: "" },
  { id: 8, nome: "Cinto Trançado Couro Legítimo", marca: "Justin", categoria: "Acessórios", subcategoria: "Outros acessórios", preco: 219.00, precoAnterior: null, imagens: ["", "", ""], descricao: "Cinto de couro legítimo trançado à mão, acabamento premium para compor o visual western.", caracteristicas: ["Couro legítimo", "Trançado à mão", "Fivela removível", "Acabamento premium"], loja: "Amazon", linkCompra: "#", tags: ["acessório", "couro", "cinto"], recomendado: "" },
  { id: 9, nome: "Bota M4 Low Cowboy", marca: "Ariat", categoria: "Vestuário", subcategoria: "Botas", preco: 1049.00, precoAnterior: null, imagens: ["", "", ""], descricao: "Bota masculina cano baixo, couro full-grain e biqueira quadrada, feita para durar na lida e na cidade.", caracteristicas: ["Couro full-grain", "Biqueira quadrada", "Cano baixo", "Solado de borracha"], loja: "Loja Oficial", linkCompra: "#", tags: ["bota", "masculina", "couro"], recomendado: "" },
  { id: 10, nome: "Calça White Label Slim", marca: "Wrangler", categoria: "Vestuário", subcategoria: "Calças", preco: 279.90, precoAnterior: 329.90, imagens: ["", "", ""], descricao: "Calça jeans slim de alta qualidade, elastano para maior mobilidade em cima do cavalo.", caracteristicas: ["Corte slim", "Com elastano", "Cintura média", "5 bolsos"], loja: "Magazine Luiza", linkCompra: "#", tags: ["jeans", "slim"], recomendado: "" },
  { id: 11, nome: "Bota Cactus Roper", marca: "Twisted X", categoria: "Vestuário", subcategoria: "Botas", preco: 749.00, precoAnterior: null, imagens: ["", "", ""], descricao: "Bota roper versátil, confortável para longas jornadas dentro e fora da sela.", caracteristicas: ["Couro cactus", "Solado flexível", "Cano curto", "Palmilha acolchoada"], loja: "Loja Oficial", linkCompra: "#", tags: ["bota", "roper"], recomendado: "" },
  { id: 12, nome: "Camisa Xadrez Snap Front", marca: "Cinch", categoria: "Vestuário", subcategoria: "Camisas", preco: 219.00, precoAnterior: null, imagens: ["", "", ""], descricao: "Camisa xadrez clássica com botões de pressão, tecido leve para os dias mais quentes.", caracteristicas: ["Estampa xadrez", "Botões de pressão", "Tecido leve", "Ajuste regular"], loja: "Shopee", linkCompra: "#", tags: ["camisa", "xadrez"], recomendado: "" },
  { id: 13, nome: "Chapéu Palha Aba Larga", marca: "Resistol", categoria: "Acessórios", subcategoria: "Chapéus", preco: 389.00, precoAnterior: null, imagens: ["", "", ""], descricao: "Chapéu de palha natural, leve e ventilado, ideal para o calor e o trabalho a campo.", caracteristicas: ["Palha natural", "Aba larga", "Leve e ventilado", "Forro interno"], loja: "Amazon", linkCompra: "#", tags: ["chapéu", "palha"], recomendado: "" },
  { id: 14, nome: "Laço Fast Back Poly", marca: "Fast Back", categoria: "Equipamentos", subcategoria: "Laços", preco: 299.00, precoAnterior: null, imagens: ["", "", ""], descricao: "Laço em poliéster de alta performance, toque macio e ótima resposta para heeler.", caracteristicas: ["30 pés", "Poliéster", "Toque macio", "Indicado para heeler"], loja: "Loja Oficial", linkCompra: "#", tags: ["laço", "team roping"], recomendado: "" },
  { id: 15, nome: "Manta para Sela Premium", marca: "Professionals Choice", categoria: "Equipamentos", subcategoria: "Mantas", preco: 459.00, precoAnterior: null, imagens: ["", "", ""], descricao: "Manta acolchoada de alta absorção, protege o dorso do cavalo durante o esforço.", caracteristicas: ["Alta absorção de impacto", "Ventilação central", "Lavável", "Compatível com selas western"], loja: "Mercado Livre", linkCompra: "#", tags: ["manta", "sela", "equipamento cavalo"], recomendado: "" },
  { id: 16, nome: "Luva de Roping Reforçada", marca: "Classic", categoria: "Acessórios", subcategoria: "Luvas", preco: 89.90, precoAnterior: null, imagens: ["", "", ""], descricao: "Luva reforçada para melhor pega no laço, com respiro na palma e ajuste no punho.", caracteristicas: ["Reforço na palma", "Respiro traseiro", "Ajuste em velcro", "Uma unidade"], loja: "Amazon", linkCompra: "#", tags: ["luva", "acessório"], recomendado: "" },
  { id: 17, nome: "Protetor de Perna Team Roping", marca: "Professionals Choice", categoria: "Equipamentos", subcategoria: "Protetores", preco: 529.00, precoAnterior: null, imagens: ["", "", ""], descricao: "Par de protetores de perna com fechamento em velcro, proteção essencial para o esforço do team roping.", caracteristicas: ["Par (2 unidades)", "Fechamento em velcro", "Espuma de impacto", "Ajuste anatômico"], loja: "Loja Oficial", linkCompra: "#", tags: ["protetor", "equipamento cavalo", "team roping"], recomendado: "" },
  { id: 18, nome: "Bota Infantil Lil Stompers", marca: "Ariat", categoria: "Vestuário", subcategoria: "Botas", preco: 329.00, precoAnterior: null, imagens: ["", "", ""], descricao: "Bota infantil western, leve e macia, para os pequenos cowboys e cowgirls da família.", caracteristicas: ["Couro macio", "Fechamento em elástico", "Solado leve", "Numeração infantil"], loja: "Amazon", linkCompra: "#", tags: ["bota", "infantil"], recomendado: "" },
  { id: 19, nome: "Camiseta Logo DomRoping", marca: "Cinch", categoria: "Vestuário", subcategoria: "Camisetas", preco: 99.90, precoAnterior: null, imagens: ["", "", ""], descricao: "Camiseta 100% algodão, corte reto, estampa discreta inspirada no universo do team roping.", caracteristicas: ["100% algodão", "Corte reto", "Estampa serigrafada", "Gola careca"], loja: "Loja Oficial", linkCompra: "#", tags: ["camiseta", "casual"], recomendado: "" },
  { id: 20, nome: "Camiseta Performance Dry", marca: "Ariat", categoria: "Vestuário", subcategoria: "Camisetas", preco: 139.90, precoAnterior: null, imagens: ["", "", ""], descricao: "Camiseta tecnológica com tecido de secagem rápida, ideal para treinos e dias quentes no rancho.", caracteristicas: ["Tecido dry-fit", "Proteção UV", "Costura plana anti-atrito", "Leve e respirável"], loja: "Amazon", linkCompra: "#", tags: ["camiseta", "performance"], recomendado: "Melhor para o dia a dia" },

  /* ---------- Acessórios → Bonés (6 registros estruturados, sem dados fictícios) ----------
     Preencher manualmente depois: nome, marca, preco, imagens, descricao,
     caracteristicas, loja e linkCompra. Até lá, aparecem no catálogo como
     "Produto em cadastro" com um selo "Em breve" — a estrutura já funciona
     de ponta a ponta (card, página própria, favoritos, busca). Para
     adicionar um 7º boné, copie um destes objetos e mude o id. */
  { id: 21, nome: "", marca: "", categoria: "Acessórios", subcategoria: "Bonés", preco: null, precoAnterior: null, imagens: ["", "", ""], descricao: "", caracteristicas: [], loja: "", linkCompra: "#", tags: [], recomendado: "" },
  { id: 22, nome: "", marca: "", categoria: "Acessórios", subcategoria: "Bonés", preco: null, precoAnterior: null, imagens: ["", "", ""], descricao: "", caracteristicas: [], loja: "", linkCompra: "#", tags: [], recomendado: "" },
  { id: 23, nome: "", marca: "", categoria: "Acessórios", subcategoria: "Bonés", preco: null, precoAnterior: null, imagens: ["", "", ""], descricao: "", caracteristicas: [], loja: "", linkCompra: "#", tags: [], recomendado: "" },
  { id: 24, nome: "", marca: "", categoria: "Acessórios", subcategoria: "Bonés", preco: null, precoAnterior: null, imagens: ["", "", ""], descricao: "", caracteristicas: [], loja: "", linkCompra: "#", tags: [], recomendado: "" },
  { id: 25, nome: "", marca: "", categoria: "Acessórios", subcategoria: "Bonés", preco: null, precoAnterior: null, imagens: ["", "", ""], descricao: "", caracteristicas: [], loja: "", linkCompra: "#", tags: [], recomendado: "" },
  { id: 26, nome: "", marca: "", categoria: "Acessórios", subcategoria: "Bonés", preco: null, precoAnterior: null, imagens: ["", "", ""], descricao: "", caracteristicas: [], loja: "", linkCompra: "#", tags: [], recomendado: "" },

  /* ---------- Slots estruturais: 3 produtos por subcategoria (etapa de finalização) ----------
     Registros reais, sem dados fictícios — mesma estrutura de qualquer outro
     produto do site. Preencher manualmente depois. Para adicionar mais um
     produto numa dessas subcategorias, copie um objeto e mude o id. */
  { id: 27, nome: "", marca: "", categoria: "Vestuário", subcategoria: "Calças", preco: null, precoAnterior: null, imagens: ["", "", ""], descricao: "", caracteristicas: [], loja: "", linkCompra: "#", tags: [], recomendado: "" },
  { id: 28, nome: "", marca: "", categoria: "Vestuário", subcategoria: "Camisas", preco: null, precoAnterior: null, imagens: ["", "", ""], descricao: "", caracteristicas: [], loja: "", linkCompra: "#", tags: [], recomendado: "" },
  { id: 29, nome: "", marca: "", categoria: "Vestuário", subcategoria: "Camisetas", preco: null, precoAnterior: null, imagens: ["", "", ""], descricao: "", caracteristicas: [], loja: "", linkCompra: "#", tags: [], recomendado: "" },
  { id: 30, nome: "", marca: "", categoria: "Acessórios", subcategoria: "Chapéus", preco: null, precoAnterior: null, imagens: ["", "", ""], descricao: "", caracteristicas: [], loja: "", linkCompra: "#", tags: [], recomendado: "" },
  { id: 31, nome: "", marca: "", categoria: "Acessórios", subcategoria: "Luvas", preco: null, precoAnterior: null, imagens: ["", "", ""], descricao: "", caracteristicas: [], loja: "", linkCompra: "#", tags: [], recomendado: "" },
  { id: 32, nome: "", marca: "", categoria: "Acessórios", subcategoria: "Luvas", preco: null, precoAnterior: null, imagens: ["", "", ""], descricao: "", caracteristicas: [], loja: "", linkCompra: "#", tags: [], recomendado: "" },
  { id: 33, nome: "", marca: "", categoria: "Acessórios", subcategoria: "Óculos", preco: null, precoAnterior: null, imagens: ["", "", ""], descricao: "", caracteristicas: [], loja: "", linkCompra: "#", tags: [], recomendado: "" },
  { id: 34, nome: "", marca: "", categoria: "Acessórios", subcategoria: "Óculos", preco: null, precoAnterior: null, imagens: ["", "", ""], descricao: "", caracteristicas: [], loja: "", linkCompra: "#", tags: [], recomendado: "" },
  { id: 35, nome: "", marca: "", categoria: "Acessórios", subcategoria: "Óculos", preco: null, precoAnterior: null, imagens: ["", "", ""], descricao: "", caracteristicas: [], loja: "", linkCompra: "#", tags: [], recomendado: "" },
  { id: 36, nome: "", marca: "", categoria: "Equipamentos", subcategoria: "Laços", preco: null, precoAnterior: null, imagens: ["", "", ""], descricao: "", caracteristicas: [], loja: "", linkCompra: "#", tags: [], recomendado: "" },
  { id: 37, nome: "", marca: "", categoria: "Equipamentos", subcategoria: "Rédeas", preco: null, precoAnterior: null, imagens: ["", "", ""], descricao: "", caracteristicas: [], loja: "", linkCompra: "#", tags: [], recomendado: "" },
  { id: 38, nome: "", marca: "", categoria: "Equipamentos", subcategoria: "Rédeas", preco: null, precoAnterior: null, imagens: ["", "", ""], descricao: "", caracteristicas: [], loja: "", linkCompra: "#", tags: [], recomendado: "" },
  { id: 39, nome: "", marca: "", categoria: "Equipamentos", subcategoria: "Rédeas", preco: null, precoAnterior: null, imagens: ["", "", ""], descricao: "", caracteristicas: [], loja: "", linkCompra: "#", tags: [], recomendado: "" },
  { id: 40, nome: "", marca: "", categoria: "Equipamentos", subcategoria: "Cabrestos", preco: null, precoAnterior: null, imagens: ["", "", ""], descricao: "", caracteristicas: [], loja: "", linkCompra: "#", tags: [], recomendado: "" },
  { id: 41, nome: "", marca: "", categoria: "Equipamentos", subcategoria: "Cabrestos", preco: null, precoAnterior: null, imagens: ["", "", ""], descricao: "", caracteristicas: [], loja: "", linkCompra: "#", tags: [], recomendado: "" },
  { id: 42, nome: "", marca: "", categoria: "Equipamentos", subcategoria: "Freios", preco: null, precoAnterior: null, imagens: ["", "", ""], descricao: "", caracteristicas: [], loja: "", linkCompra: "#", tags: [], recomendado: "" },
  { id: 43, nome: "", marca: "", categoria: "Equipamentos", subcategoria: "Freios", preco: null, precoAnterior: null, imagens: ["", "", ""], descricao: "", caracteristicas: [], loja: "", linkCompra: "#", tags: [], recomendado: "" },
  { id: 44, nome: "", marca: "", categoria: "Equipamentos", subcategoria: "Freios", preco: null, precoAnterior: null, imagens: ["", "", ""], descricao: "", caracteristicas: [], loja: "", linkCompra: "#", tags: [], recomendado: "" },
  { id: 45, nome: "", marca: "", categoria: "Equipamentos", subcategoria: "Mantas", preco: null, precoAnterior: null, imagens: ["", "", ""], descricao: "", caracteristicas: [], loja: "", linkCompra: "#", tags: [], recomendado: "" },
  { id: 46, nome: "", marca: "", categoria: "Equipamentos", subcategoria: "Mantas", preco: null, precoAnterior: null, imagens: ["", "", ""], descricao: "", caracteristicas: [], loja: "", linkCompra: "#", tags: [], recomendado: "" },
  { id: 47, nome: "", marca: "", categoria: "Equipamentos", subcategoria: "Protetores", preco: null, precoAnterior: null, imagens: ["", "", ""], descricao: "", caracteristicas: [], loja: "", linkCompra: "#", tags: [], recomendado: "" },
  { id: 48, nome: "", marca: "", categoria: "Equipamentos", subcategoria: "Protetores", preco: null, precoAnterior: null, imagens: ["", "", ""], descricao: "", caracteristicas: [], loja: "", linkCompra: "#", tags: [], recomendado: "" },
  { id: 49, nome: "", marca: "", categoria: "Equipamentos", subcategoria: "Escovas", preco: null, precoAnterior: null, imagens: ["", "", ""], descricao: "", caracteristicas: [], loja: "", linkCompra: "#", tags: [], recomendado: "" },
  { id: 50, nome: "", marca: "", categoria: "Equipamentos", subcategoria: "Escovas", preco: null, precoAnterior: null, imagens: ["", "", ""], descricao: "", caracteristicas: [], loja: "", linkCompra: "#", tags: [], recomendado: "" },
  { id: 51, nome: "", marca: "", categoria: "Equipamentos", subcategoria: "Escovas", preco: null, precoAnterior: null, imagens: ["", "", ""], descricao: "", caracteristicas: [], loja: "", linkCompra: "#", tags: [], recomendado: "" },
  { id: 52, nome: "", marca: "", categoria: "Equipamentos", subcategoria: "Outros equipamentos", preco: null, precoAnterior: null, imagens: ["", "", ""], descricao: "", caracteristicas: [], loja: "", linkCompra: "#", tags: [], recomendado: "" },
  { id: 53, nome: "", marca: "", categoria: "Equipamentos", subcategoria: "Outros equipamentos", preco: null, precoAnterior: null, imagens: ["", "", ""], descricao: "", caracteristicas: [], loja: "", linkCompra: "#", tags: [], recomendado: "" },
];

/* Um produto é "placeholder" (ainda não preenchido) quando não tem nome.
   Usado pelos cards e pela página do produto para mostrar "Produto em
   cadastro" / "Em breve" em vez de campos em branco. */
function isPlaceholderProduct(product) { return !product.nome; }

/* Lista completa de marcas realmente em uso nos produtos (derivada, nunca
   precisa ser editada à mão). Usada no filtro de marca do catálogo — mais
   ampla que MAIN_BRANDS de propósito, pra filtrar continua funcionando
   mesmo pra marcas que ainda não têm um card na página Marcas. */
const BRANDS = [...new Set(PRODUCTS.map(p => p.marca).filter(Boolean))].sort((a, b) => a.localeCompare(b, "pt-BR"));
