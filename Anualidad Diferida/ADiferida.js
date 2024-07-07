const calcularButton = document.getElementById('calcular');
const anualidadInput = document.getElementById('anualidad');
const interesInput = document.getElementById('interes');
const periodoInput = document.getElementById('periodo');
const frecuencia1Select = document.getElementById('frecuencia1');
const frecuencia2Select = document.getElementById('frecuencia2');
const vpresenteRadio = document.getElementById('vpresente');
const vfuturoRadio = document.getElementById('vfuturo');
const resultadoDiv = document.getElementById('resultado');
const tablaBody = document.getElementById('tablaBody');

calcularButton.addEventListener('click', calcular);

function calcular() {
    const A = parseFloat(anualidadInput.value);
    const i = parseFloat(interesInput.value) / 100;
    const n = parseFloat(periodoInput.value);
    let resultado = 0;
    let tipoCalculo = '';

    switch (frecuencia1Select.value) {
        case 'Mensual':
            i /= 12;
            break;
        case 'Trimestral':
            i /= 4;
            break;
        case 'Semestral':
            i /= 2;
            break;
        case 'Anual':
            break;
    }
    switch (frecuencia2Select.value) {
        case 'Mensual':
            n *= 12;
            break;
        case 'Trimestral':
            n *= 4;
            break;
        case 'Semestral':
            n *= 2;
            break;
        case 'Anual':
            break;
    }

    if (vpresenteRadio.checked) {
        resultado = calcularValorPresente(A, i, n);
        tipoCalculo = 'Valor Presente';
    } else if (vfuturoRadio.checked) {
        resultado = calcularValorFuturo(A, i, n);
        tipoCalculo = 'Valor Futuro';
    }

    resultadoDiv.innerHTML = `Resultado: ${resultado.toFixed(2)}`;
    const newRow = tablaBody.insertRow();
    newRow.innerHTML = `
        <td>${A}</td>
        <td>${i * 100}</td>
        <td>${n}</td>
        <td>${resultado.toFixed(2)}</td>
        <td>${tipoCalculo}</td>
    `;
}

function calcularValorPresente(A, i, n) {
    return A + (A * ((Math.pow((1 + i), n - 1) - 1) / (i * Math.Pow((1 + i), n - 1))));
}

function calcularValorFuturo(A, i, n) {
    return (A + (A * ((Math.pow((1 + i), n - 1) - 1) / (i * Math.Pow((1 + i), n - 1))))) * Math.pow((1 + i), n);
}