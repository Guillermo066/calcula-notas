const botonCalcular = document.getElementById("botonCalcular");
const resultado = document.getElementById("resultado");

botonCalcular.addEventListener("click", calcularNota);

function mostrarResultado(mensaje, tipo) {
  resultado.textContent = mensaje;
  resultado.className = `resultado ${tipo}`;
}

function calcularNota() {
  const campoNotaActual = document.getElementById("notaActual");
  const campoPesoActual = document.getElementById("pesoActual");
  const campoPesoExamen = document.getElementById("pesoExamen");
  const campoNotaDeseada = document.getElementById("notaDeseada");

  if (
    campoNotaActual.value === "" ||
    campoPesoActual.value === "" ||
    campoPesoExamen.value === "" ||
    campoNotaDeseada.value === ""
  ) {
    mostrarResultado("Completa todos los campos.", "error");
    return;
  }

  const notaActual = Number(campoNotaActual.value);
  const pesoActual = Number(campoPesoActual.value);
  const pesoExamen = Number(campoPesoExamen.value);
  const notaDeseada = Number(campoNotaDeseada.value);

  if (
    notaActual < 0 ||
    notaActual > 10 ||
    notaDeseada < 0 ||
    notaDeseada > 10
  ) {
    mostrarResultado(
      "Las notas deben estar entre 0 y 10.",
      "error"
    );
    return;
  }

  if (
    pesoActual < 0 ||
    pesoActual > 100 ||
    pesoExamen <= 0 ||
    pesoExamen > 100
  ) {
    mostrarResultado(
      "Los porcentajes deben estar entre 0 y 100.",
      "error"
    );
    return;
  }

  if (pesoActual + pesoExamen !== 100) {
    mostrarResultado(
      "El porcentaje evaluado y el porcentaje del examen deben sumar 100 %.",
      "error"
    );
    return;
  }

  const puntosConseguidos = notaActual * (pesoActual / 100);

  const notaNecesaria =
    (notaDeseada - puntosConseguidos) / (pesoExamen / 100);

  if (notaNecesaria <= 0) {
    mostrarResultado(
      `Ya tienes asegurada una nota final de al menos ${notaDeseada.toFixed(2)}.`,
      "correcto"
    );
    return;
  }

  if (notaNecesaria > 10) {
    mostrarResultado(
      `No puedes alcanzar un ${notaDeseada.toFixed(2)}, aunque saques un 10 en el examen.`,
      "error"
    );
    return;
  }

  mostrarResultado(
    `Necesitas sacar al menos un ${notaNecesaria.toFixed(2)} en el examen.`,
    "correcto"
  );
}