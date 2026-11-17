
// Obtenemos los elementos del HTML que vamos a utilizar
const temperatura = document.getElementById("temperatura");
const origen = document.getElementById("origen");
const destino = document.getElementById("destino");
const botonConvertir = document.getElementById("convertir");
const formulario = document.getElementById("formulario");
const resultado = document.getElementById("resultado");

// Esta función comprueba si los tres campos están completos
function validarFormulario() {

    // Verificamos que exista un valor y que ambas unidades estén seleccionadas
    const camposCompletos =
        temperatura.value.trim() !== "" &&
        origen.value !== "" &&
        destino.value !== "";

    // El botón se habilita solamente cuando todos los campos están completos
    botonConvertir.disabled = !camposCompletos;
}

// Escuchamos cuando el usuario escribe o cambia algún campo
temperatura.addEventListener("input", validarFormulario);
origen.addEventListener("change", validarFormulario);
destino.addEventListener("change", validarFormulario);

// Esta función convierte cualquier temperatura a Celsius
function convertirACelsius(valor, unidad) {

    // Si la unidad es Celsius, dejamos el valor igual
    if (unidad === "C") {
        return valor;
    }

    // Si la unidad es Fahrenheit, aplicamos su fórmula de conversión
    if (unidad === "F") {
        return (valor - 32) * 5 / 9;
    }

    // Si la unidad es Kelvin, restamos 273.15
    if (unidad === "K") {
        return valor - 273.15;
    }
}

// Esta función convierte desde Celsius a la unidad que el usuario seleccionó
function convertirDesdeCelsius(valor, unidad) {

    // Si el destino es Celsius, devolvemos el mismo valor
    if (unidad === "C") {
        return valor;
    }

    // Si el destino es Fahrenheit, aplicamos su fórmula
    if (unidad === "F") {
        return (valor * 9 / 5) + 32;
    }

    // Si el destino es Kelvin, sumamos 273.15
    if (unidad === "K") {
        return valor + 273.15;
    }
}

// Escuchamos cuando el usuario presiona el botón Convertir
formulario.addEventListener("submit", function(event) {

    // Evitamos que el formulario recargue la página
    event.preventDefault();

    // Obtenemos la temperatura y la convertimos en número
    const valor = Number(temperatura.value);

    // Obtenemos las unidades seleccionadas
    const unidadOrigen = origen.value;
    const unidadDestino = destino.value;

    // Primero convertimos la temperatura a Celsius
    const temperaturaCelsius = convertirACelsius(valor, unidadOrigen);

    // Después convertimos desde Celsius a la unidad de destino
    const temperaturaConvertida = convertirDesdeCelsius(
        temperaturaCelsius,
        unidadDestino
    );

    // Mostramos el resultado con dos decimales
    resultado.textContent =
        `${valor} ${unidadOrigen} = ${temperaturaConvertida.toFixed(2)} ${unidadDestino}`;
});