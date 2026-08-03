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

/* ---------- CATEGORIAS ---------- */
const CATEGORIES = [
  "Laços",
  "Calças",
  "Camisas",
  "Camisetas",
  "Botas",
  "Chapéus",
  "Equipamentos para Cavalo",
  "Acessórios",
];

/* Subcategorias — hoje só "Equipamentos para Cavalo" possui, mas a estrutura
   aceita subcategorias para qualquer categoria futura. */
const SUBCATEGORIES = {
  "Equipamentos para Cavalo": ["Selas", "Rédeas", "Freios", "Cabrestos", "Mantas", "Barrigueiras", "Outros equipamentos"],
};

const BRANDS = ["Ariat", "Cinch", "Classic Rope", "Fast Back", "Professionals Choice", "Justin", "Twisted X", "Wrangler", "Martin Saddlery", "Resistol"];

const CATEGORY_ICONS = {
  "Calças": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2h12l1 6-2 14h-4l-1-11-1 11H7L5 8z"/></svg>',
  "Botas": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 2v9l-4 4v4a1 1 0 0 0 1 1h17a1 1 0 0 0 .9-1.5C20 15 16 15 14 13V2z"/><path d="M7 6h7"/></svg>',
  "Camisas": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2 4 6l2 3 2-1v12h8V8l2 1 2-3-4-4-2 2h-4z"/></svg>',
  "Camisetas": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3 3 7l2.5 3L8 8.5V21h8V8.5L18.5 10 21 7l-5-4-2 2h-4z"/></svg>',
  "Chapéus": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 16c3-1 15-1 18 0-1 2-4 3-9 3s-8-1-9-3z"/><path d="M8 16c-1-4 1-8 4-8s5 4 4 8"/></svg>',
  "Laços": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="10" cy="12" r="7"/><path d="M15.5 16.5 21 22"/></svg>',
  "Selas": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 15c2-6 6-9 9-9s7 3 9 9c-3 2-6-1-9-1s-6 3-9 1z"/></svg>',
  "Equipamentos para Cavalo": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20c1-5 2-7 5-9L7 5c3-2 6-2 8 1l1 3 4 2-2 2-3-1-2 2 2 7"/></svg>',
  "Acessórios": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><path d="M12 4v3M12 17v3M4 12h3M17 12h3"/></svg>',
  "Marcas": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 3 6v6c0 5 4 8 9 10 5-2 9-5 9-10V6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/></svg>',
};

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
*/
const PRODUCTS = [
  { id: 1, nome: "Calça M2 Brandon", marca: "Ariat", categoria: "Calças", subcategoria: "", preco: 392.90, precoAnterior: null, imagens: ["", "", ""], descricao: "Calça jeans de corte reto pensada para longas horas na sela, com reforço nas costuras e tecido resistente ao desgaste do dia a dia no campo.", caracteristicas: ["Corte reto (Straight Leg)", "Tecido reforçado nas costuras internas", "Cintura média", "Bolsos reforçados"], loja: "Amazon", linkCompra: "#", tags: ["jeans", "cowboy", "campo"], recomendado: "Melhor custo-benefício" },
  { id: 2, nome: "Bota Fatbaby Heritage", marca: "Ariat", categoria: "Botas", subcategoria: "", preco: 899.00, precoAnterior: 999.00, imagens: ["", "", ""], descricao: "Bota western feminina em couro legítimo, com solteira de borracha antiderrapante e sistema de amortecimento para conforto o dia inteiro.", caracteristicas: ["Couro legítimo", "Solado antiderrapante", "Sistema de amortecimento ATS", "Cano médio"], loja: "Loja Oficial", linkCompra: "#", tags: ["bota", "couro", "feminina"], recomendado: "Melhor bota" },
  { id: 3, nome: "Camisa Manga Longa Team Roper", marca: "Cinch", categoria: "Camisas", subcategoria: "", preco: 249.90, precoAnterior: null, imagens: ["", "", ""], descricao: "Camisa de botão de pressão em algodão respirável, ideal para competições e para o dia a dia na lida.", caracteristicas: ["100% algodão", "Botões de pressão", "Ajuste regular", "Respirável"], loja: "Mercado Livre", linkCompra: "#", tags: ["camisa", "team roping"], recomendado: "" },
  { id: 4, nome: "Chapéu de Feltro Rancher", marca: "Resistol", categoria: "Chapéus", subcategoria: "", preco: 1190.00, precoAnterior: null, imagens: ["", "", ""], descricao: "Chapéu de feltro premium com aba rígida e copa clássica, referência entre profissionais do rodeio.", caracteristicas: ["Feltro premium", "Aba rígida 4”", "Forro interno em cetim", "Ajuste interno regulável"], loja: "Loja Oficial", linkCompra: "#", tags: ["chapéu", "feltro", "rodeio"], recomendado: "Melhor chapéu" },
  { id: 5, nome: "Laço Classic Rope 30ft", marca: "Classic Rope", categoria: "Laços", subcategoria: "", preco: 349.00, precoAnterior: null, imagens: ["", "", ""], descricao: "Laço trançado de 30 pés, equilíbrio médio, indicado para quem está evoluindo técnica no team roping.", caracteristicas: ["30 pés", "Trançado 4 fios", "Rigidez média", "Ideal para header"], loja: "Amazon", linkCompra: "#", tags: ["laço", "team roping", "corda"], recomendado: "Mais vendido" },
  { id: 6, nome: "Sela Team Roping Pro", marca: "Martin Saddlery", categoria: "Equipamentos para Cavalo", subcategoria: "Selas", preco: 8450.00, precoAnterior: null, imagens: ["", "", ""], descricao: "Sela profissional de team roping, estrutura reforçada para suportar o esforço do laço com máximo conforto para o cavalo.", caracteristicas: ["Árvore reforçada", "Couro premium", "Assento 15\" a 17\"", "Chifre reforçado para laço"], loja: "Loja Oficial", linkCompra: "#", tags: ["sela", "team roping", "equipamento"], recomendado: "🏆 Nossa escolha" },
  { id: 7, nome: "Cabresto de Corda Trançado", marca: "Professionals Choice", categoria: "Equipamentos para Cavalo", subcategoria: "Cabrestos", preco: 179.00, precoAnterior: null, imagens: ["", "", ""], descricao: "Cabresto trançado à mão, leve e resistente, com ajuste preciso para o manejo diário.", caracteristicas: ["Corda trançada", "Ajuste regulável", "Leve e resistente", "Ideal para manejo diário"], loja: "Mercado Livre", linkCompra: "#", tags: ["cabresto", "equipamento cavalo"], recomendado: "" },
  { id: 8, nome: "Cinto Trançado Couro Legítimo", marca: "Justin", categoria: "Acessórios", subcategoria: "", preco: 219.00, precoAnterior: null, imagens: ["", "", ""], descricao: "Cinto de couro legítimo trançado à mão, acabamento premium para compor o visual western.", caracteristicas: ["Couro legítimo", "Trançado à mão", "Fivela removível", "Acabamento premium"], loja: "Amazon", linkCompra: "#", tags: ["acessório", "couro"], recomendado: "" },
  { id: 9, nome: "Bota M4 Low Cowboy", marca: "Ariat", categoria: "Botas", subcategoria: "", preco: 1049.00, precoAnterior: null, imagens: ["", "", ""], descricao: "Bota masculina cano baixo, couro full-grain e biqueira quadrada, feita para durar na lida e na cidade.", caracteristicas: ["Couro full-grain", "Biqueira quadrada", "Cano baixo", "Solado de borracha"], loja: "Loja Oficial", linkCompra: "#", tags: ["bota", "masculina", "couro"], recomendado: "" },
  { id: 10, nome: "Calça White Label Slim", marca: "Wrangler", categoria: "Calças", subcategoria: "", preco: 279.90, precoAnterior: 329.90, imagens: ["", "", ""], descricao: "Calça jeans slim de alta qualidade, elastano para maior mobilidade em cima do cavalo.", caracteristicas: ["Corte slim", "Com elastano", "Cintura média", "5 bolsos"], loja: "Magazine Luiza", linkCompra: "#", tags: ["jeans", "slim"], recomendado: "" },
  { id: 11, nome: "Bota Cactus Roper", marca: "Twisted X", categoria: "Botas", subcategoria: "", preco: 749.00, precoAnterior: null, imagens: ["", "", ""], descricao: "Bota roper versátil, confortável para longas jornadas dentro e fora da sela.", caracteristicas: ["Couro cactus", "Solado flexível", "Cano curto", "Palmilha acolchoada"], loja: "Loja Oficial", linkCompra: "#", tags: ["bota", "roper"], recomendado: "" },
  { id: 12, nome: "Camisa Xadrez Snap Front", marca: "Cinch", categoria: "Camisas", subcategoria: "", preco: 219.00, precoAnterior: null, imagens: ["", "", ""], descricao: "Camisa xadrez clássica com botões de pressão, tecido leve para os dias mais quentes.", caracteristicas: ["Estampa xadrez", "Botões de pressão", "Tecido leve", "Ajuste regular"], loja: "Shopee", linkCompra: "#", tags: ["camisa", "xadrez"], recomendado: "" },
  { id: 13, nome: "Chapéu Palha Aba Larga", marca: "Resistol", categoria: "Chapéus", subcategoria: "", preco: 389.00, precoAnterior: null, imagens: ["", "", ""], descricao: "Chapéu de palha natural, leve e ventilado, ideal para o calor e o trabalho a campo.", caracteristicas: ["Palha natural", "Aba larga", "Leve e ventilado", "Forro interno"], loja: "Amazon", linkCompra: "#", tags: ["chapéu", "palha"], recomendado: "" },
  { id: 14, nome: "Laço Fast Back Poly", marca: "Fast Back", categoria: "Laços", subcategoria: "", preco: 299.00, precoAnterior: null, imagens: ["", "", ""], descricao: "Laço em poliéster de alta performance, toque macio e ótima resposta para heeler.", caracteristicas: ["30 pés", "Poliéster", "Toque macio", "Indicado para heeler"], loja: "Loja Oficial", linkCompra: "#", tags: ["laço", "team roping"], recomendado: "" },
  { id: 15, nome: "Manta para Sela Premium", marca: "Professionals Choice", categoria: "Equipamentos para Cavalo", subcategoria: "Mantas", preco: 459.00, precoAnterior: null, imagens: ["", "", ""], descricao: "Manta acolchoada de alta absorção, protege o dorso do cavalo durante o esforço.", caracteristicas: ["Alta absorção de impacto", "Ventilação central", "Lavável", "Compatível com selas western"], loja: "Mercado Livre", linkCompra: "#", tags: ["manta", "sela", "equipamento cavalo"], recomendado: "" },
  { id: 16, nome: "Luva de Roping Reforçada", marca: "Classic Rope", categoria: "Acessórios", subcategoria: "", preco: 89.90, precoAnterior: null, imagens: ["", "", ""], descricao: "Luva reforçada para melhor pega no laço, com respiro na palma e ajuste no punho.", caracteristicas: ["Reforço na palma", "Respiro traseiro", "Ajuste em velcro", "Uma unidade"], loja: "Amazon", linkCompra: "#", tags: ["luva", "acessório"], recomendado: "" },
  { id: 17, nome: "Protetor de Perna Team Roping", marca: "Professionals Choice", categoria: "Equipamentos para Cavalo", subcategoria: "Outros equipamentos", preco: 529.00, precoAnterior: null, imagens: ["", "", ""], descricao: "Par de protetores de perna com fechamento em velcro, proteção essencial para o esforço do team roping.", caracteristicas: ["Par (2 unidades)", "Fechamento em velcro", "Espuma de impacto", "Ajuste anatômico"], loja: "Loja Oficial", linkCompra: "#", tags: ["protetor", "equipamento cavalo", "team roping"], recomendado: "" },
  { id: 18, nome: "Bota Infantil Lil Stompers", marca: "Ariat", categoria: "Botas", subcategoria: "", preco: 329.00, precoAnterior: null, imagens: ["", "", ""], descricao: "Bota infantil western, leve e macia, para os pequenos cowboys e cowgirls da família.", caracteristicas: ["Couro macio", "Fechamento em elástico", "Solado leve", "Numeração infantil"], loja: "Amazon", linkCompra: "#", tags: ["bota", "infantil"], recomendado: "" },
  { id: 19, nome: "Camiseta Logo DomRoping", marca: "Cinch", categoria: "Camisetas", subcategoria: "", preco: 99.90, precoAnterior: null, imagens: ["", "", ""], descricao: "Camiseta 100% algodão, corte reto, estampa discreta inspirada no universo do team roping.", caracteristicas: ["100% algodão", "Corte reto", "Estampa serigrafada", "Gola careca"], loja: "Loja Oficial", linkCompra: "#", tags: ["camiseta", "casual"], recomendado: "" },
  { id: 20, nome: "Camiseta Performance Dry", marca: "Ariat", categoria: "Camisetas", subcategoria: "", preco: 139.90, precoAnterior: null, imagens: ["", "", ""], descricao: "Camiseta tecnológica com tecido de secagem rápida, ideal para treinos e dias quentes no rancho.", caracteristicas: ["Tecido dry-fit", "Proteção UV", "Costura plana anti-atrito", "Leve e respirável"], loja: "Amazon", linkCompra: "#", tags: ["camiseta", "performance"], recomendado: "Melhor para o dia a dia" },
];

/* Categorias que aparecem hoje no catálogo mas não têm nenhum produto ainda
   (ex.: Camisetas específicas) continuam navegáveis — a página de catálogo
   mostra o estado vazio corretamente. */
