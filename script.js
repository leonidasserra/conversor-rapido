const formulario = document.getElementById("form-conversao");
const campoValor = document.getElementById("valor");
const areaResultado = document.getElementById("resultado");

function lerEntrada() {
  return Number(campoValor.value);
}

function converter(celsius) {
  return celsius * 9 / 5 + 32;
}

function mostrarResultado(texto) {
  areaResultado.textContent = texto;
}

formulario.addEventListener("submit", function (evento) {
  // Impede o envio do formulário, que recarregaria a página
  evento.preventDefault();

  const valor = lerEntrada();
  const resultado = converter(valor);
  mostrarResultado(valor + " °C = " + resultado + " °F");
});
