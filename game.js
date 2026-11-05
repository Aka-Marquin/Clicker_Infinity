// 1. TODOS ELEMENTOS HTML
const pontuacaoElemento = document.querySelector("#pontuacao");
const mascote = document.querySelector("#mascote");
const efeitos = document.querySelector("#efeitos");
const tituloDescoberta = document.querySelector("#titulo-descoberta");
const textoDescoberta = document.querySelector("#texto-descoberta");
const proximoMarco = document.querySelector("#proximo-marco");
const barraProgresso = document.querySelector("#barra-progresso");
const botaoReiniciar = document.querySelector("#reiniciar");

// 2. Dados principais do jogo.
let pontos = 0;
const pontosPorClique = 21;

// ARRAY DAS QUOTES
const descobertas = [
  {
    pontos: 21 * 10,
    titulo: "MJ vs Freddy Krueger",
    texto: 'Eu sou Michael Jackson "Cês que me odeiam? "Cês são Freddy Krueger!'
  },
  {
    pontos: 21 * 37,
    titulo: "Bro",
    texto: "Bro, faz sol, camisa da FERNVNDX Clothing"
  },
  {
    pontos: 21 * 55,
    titulo: "28 swag",
    texto: "Foda-se a televisão, foda-se o dinheiro e o satã"
  },
  {
    pontos: 21 * 476.1904761904762,
    titulo: "10K",
    texto: "Dez mil sozinho num mês continuo independente..."
  }
];

// INDICA QUAL ITEM JA FOI DSCOBERTO
let indiceDescoberta = -1;


// FUNÇÂO QUE ATUALIZA O CONTADOR E  AS INFORMAÇÔES DA INTERFACE
function atualizarPontuacao() {
  pontuacaoElemento.textContent = pontos;
  atualizarProgresso();
  verificarDescobertas();
}

// CALCULA A PENDENCIA PARA A PROXIMA QUOTE
function atualizarProgresso() {
  const proxima = descobertas[indiceDescoberta + 1];

  if (!proxima) {
    proximoMarco.textContent = "Todas desbloqueadas!";
    barraProgresso.style.width = "100%";
    return;
  }

  const marcoAnterior = indiceDescoberta >= 0 ? descobertas[indiceDescoberta].pontos : 0;
  const intervalo = proxima.pontos - marcoAnterior;
  const progressoAtual = pontos - marcoAnterior;
  const porcentagem = Math.max(0, Math.min(100, (progressoAtual / intervalo) * 100));

  proximoMarco.textContent = `${proxima.pontos} pontos`;
  barraProgresso.style.width = `${porcentagem}%`;
}

// FUNÇÂO QUE DESBLOQUEIAS AS QUOTES 
function verificarDescobertas() {
  const proxima = descobertas[indiceDescoberta + 1];

  if (proxima && pontos >= proxima.pontos) {
    indiceDescoberta++;
    tituloDescoberta.textContent = proxima.titulo;
    textoDescoberta.textContent = proxima.texto;
  }
}

// ANIMAÇÂO DO CLICK/PONTUAÇÂO - DEIXAR MAIS FLUIDO ou sei la
function mostrarEfeito(evento) {
  const efeito = document.createElement("span");
  efeito.classList.add("ponto-flutuante");
  efeito.textContent = "🕶️☀️";
  efeito.style.left = `${evento.clientX}px`;
  efeito.style.top = `${evento.clientY}px`;
  efeitos.appendChild(efeito);

 
  //APAGANDO OS ELEMENTOS DPS DA ANIMAÇÂO PARA NAO ACUMULAR SHADOW ITENS
  setTimeout(() => efeito.remove(), 800);
}

//CADA CLIQUE SOMA A PONTUAÇÂO E ATIVA A ANIMAÇÂO, em tese
mascote.addEventListener("click", (evento) => {
  pontos += pontosPorClique;
  atualizarPontuacao();
  mostrarEfeito(evento);
});

// SERVE PARA REINICIAR A BARRA DE PONTOS
botaoReiniciar.addEventListener("click", () => {
  pontos = 0;
  indiceDescoberta = -1;
  tituloDescoberta.textContent = "Sua primeira descoberta espera por você!";
  textoDescoberta.textContent = "Continue clicando para desbloquear uma curiosidade.";
  atualizarPontuacao();
});

// ATUALIZAÇÂO AO CARREGAR AS PAGINAS
atualizarPontuacao();