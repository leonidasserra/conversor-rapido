const conversoes = {
  "c-f": { de: "°C", para: "°F", calcular: function (valor) { return valor * 9 / 5 + 32; } },
  "f-c": { de: "°F", para: "°C", calcular: function (valor) { return (valor - 32) * 5 / 9; } },
  // Fatores exatos: 1 mi = 1,609344 km e 1 lb = 0,45359237 kg
  "km-mi": { de: "km", para: "mi", calcular: function (valor) { return valor / 1.609344; } },
  "mi-km": { de: "mi", para: "km", calcular: function (valor) { return valor * 1.609344; } },
  "kg-lb": { de: "kg", para: "lb", calcular: function (valor) { return valor / 0.45359237; } },
  "lb-kg": { de: "lb", para: "kg", calcular: function (valor) { return valor * 0.45359237; } }
};

const formulario = document.getElementById("form-conversao");
const campoValor = document.getElementById("valor");
const campoTipo = document.getElementById("tipo");
const areaResultado = document.getElementById("resultado");
const listaHistorico = document.getElementById("lista-historico");

const CHAVE_HISTORICO = "conversor-rapido:historico";
const LIMITE_HISTORICO = 5;

function lerEntrada() {
  return campoValor.value.trim().replace(",", ".");
}

function validarValor(texto) {
  // Number("") vale 0, por isso a entrada vazia é verificada à parte
  return texto !== "" && Number.isFinite(Number(texto));
}

function converter(valor, tipo) {
  return conversoes[tipo].calcular(valor);
}

function formatarNumero(numero) {
  // Somar 0 transforma -0 em 0, evitando exibir "-0" (ex.: -0,001 arredondado)
  const arredondado = Math.round(numero * 100) / 100 + 0;
  return arredondado.toLocaleString("pt-BR", { maximumFractionDigits: 2, useGrouping: false });
}

function formatarResultado(valor, tipo, resultado) {
  const conversao = conversoes[tipo];
  return formatarNumero(valor) + " " + conversao.de + " = " +
    formatarNumero(resultado) + " " + conversao.para;
}

function mostrarResultado(texto) {
  areaResultado.textContent = texto;
}

function carregarHistorico() {
  // Se o dado salvo estiver corrompido ou não for uma lista, recomeça vazio
  try {
    const historico = JSON.parse(localStorage.getItem(CHAVE_HISTORICO) || "[]");
    return Array.isArray(historico) ? historico.slice(0, LIMITE_HISTORICO) : [];
  } catch (erro) {
    return [];
  }
}

function salvarHistorico(texto) {
  const historico = carregarHistorico();
  historico.unshift(texto);
  localStorage.setItem(CHAVE_HISTORICO, JSON.stringify(historico.slice(0, LIMITE_HISTORICO)));
}

function renderizarHistorico() {
  listaHistorico.replaceChildren();
  for (const texto of carregarHistorico()) {
    const item = document.createElement("li");
    item.textContent = texto;
    listaHistorico.appendChild(item);
  }
}

formulario.addEventListener("submit", function (evento) {
  // Impede o envio do formulário, que recarregaria a página
  evento.preventDefault();

  const texto = lerEntrada();
  if (!validarValor(texto)) {
    mostrarResultado("Digite um número válido");
    return;
  }

  const valor = Number(texto);
  const tipo = campoTipo.value;
  const resultado = converter(valor, tipo);
  const textoResultado = formatarResultado(valor, tipo, resultado);
  mostrarResultado(textoResultado);
  salvarHistorico(textoResultado);
  renderizarHistorico();
});

renderizarHistorico();
