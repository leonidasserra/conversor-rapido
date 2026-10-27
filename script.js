const conversoes = {
  "c-f": function (valor) { return valor * 9 / 5 + 32; },
  "f-c": function (valor) { return (valor - 32) * 5 / 9; },
  // Fatores exatos: 1 mi = 1,609344 km e 1 lb = 0,45359237 kg
  "km-mi": function (valor) { return valor / 1.609344; },
  "mi-km": function (valor) { return valor * 1.609344; },
  "kg-lb": function (valor) { return valor / 0.45359237; },
  "lb-kg": function (valor) { return valor * 0.45359237; }
};

const formulario = document.getElementById("form-conversao");
const campoValor = document.getElementById("valor");
const campoTipo = document.getElementById("tipo");
const areaResultado = document.getElementById("resultado");

function lerEntrada() {
  return Number(campoValor.value);
}

function converter(valor, tipo) {
  return conversoes[tipo](valor);
}

function mostrarResultado(texto) {
  areaResultado.textContent = texto;
}

formulario.addEventListener("submit", function (evento) {
  // Impede o envio do formulário, que recarregaria a página
  evento.preventDefault();

  const valor = lerEntrada();
  const resultado = converter(valor, campoTipo.value);
  mostrarResultado("Resultado: " + resultado);
});
