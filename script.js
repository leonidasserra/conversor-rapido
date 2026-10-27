const conversoes = {
  "c-f": function (valor) { return valor * 9 / 5 + 32; }
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
  mostrarResultado(valor + " °C = " + resultado + " °F");
});
