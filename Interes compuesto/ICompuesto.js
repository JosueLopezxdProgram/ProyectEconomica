// script.js
document.getElementById('tipoCalculo').addEventListener('change', function () {
    const tipoCalculo = this.value;
    const vPresente = document.getElementById('vPresente');
    const vFuturo = document.getElementById('vFuturo');
    const interes = document.getElementById('interes');
    const periodo = document.getElementById('periodo');

    switch (tipoCalculo) {
        case 'VFuturo':
            vPresente.disabled = false;
            vFuturo.disabled = true;
            interes.disabled = false;
            periodo.disabled = false;
            break;
        case 'VPresente':
            vPresente.disabled = true;
            vFuturo.disabled = false;
            interes.disabled = false;
            periodo.disabled = false;
            break;
        case 'Tasa':
            vPresente.disabled = false;
            vFuturo.disabled = false;
            interes.disabled = true;
            periodo.disabled = false;
            break;
        case 'Periodo':
            vPresente.disabled = false;
            vFuturo.disabled = false;
            interes.disabled = false;
            periodo.disabled = true;
            break;
        default:
            vPresente.disabled = true;
            vFuturo.disabled = true;
            interes.disabled = true;
            periodo.disabled = true;
            break;
    }
});

document.getElementById('btnCalcular').addEventListener('click', function () {
    const tipoCalculo = document.getElementById('tipoCalculo').value;
    const vPresente = parseFloat(document.getElementById('vPresente').value);
    const vFuturo = parseFloat(document.getElementById('vFuturo').value);
    let interes = parseFloat(document.getElementById('interes').value);
    let periodo = parseFloat(document.getElementById('periodo').value);
    const frecuencia = document.getElementById('frecuencia').value;

    if (tipoCalculo !== 'Tasa' && isNaN(interes)) {
        alert("Por favor, ingrese una tasa de interés válida.");
        return;
    }
    interes /= 100;

    if (tipoCalculo !== 'Periodo' && isNaN(periodo)) {
        alert("Por favor, ingrese un número de periodos válido.");
        return;
    }

    interes = ajustarTasaInteres(interes, frecuencia);
    periodo = ajustarNumPeriodos(periodo, frecuencia);

    let resultado = 0;

    switch (tipoCalculo) {
        case 'VFuturo':
            if (isNaN(vPresente)) {
                alert("Por favor, ingrese un valor presente válido.");
                return;
            }
            resultado = calcularValorFuturo(vPresente, interes, periodo);
            break;
        case 'VPresente':
            if (isNaN(vFuturo)) {
                alert("Por favor, ingrese un valor futuro válido.");
                return;
            }
            resultado = calcularValorPresente(vFuturo, interes, periodo);
            break;
        case 'Tasa':
            if (isNaN(vPresente) || isNaN(vFuturo)) {
                alert("Por favor, ingrese valores válidos.");
                return;
            }
            resultado = calcularTasaInteres(vPresente, vFuturo, periodo);
            break;
        case 'Periodo':
            if (isNaN(vPresente) || isNaN(vFuturo)) {
                alert("Por favor, ingrese valores válidos.");
                return;
            }
            resultado = calcularPeriodo(vPresente, vFuturo, interes);
            break;
    }

    agregarResultado(tipoCalculo, vPresente, vFuturo, interes, periodo, resultado);
});

function ajustarTasaInteres(tasaInteres, frecuencia) {
    switch (frecuencia) {
        case 'Diaria':
            return tasaInteres / 365;
        case 'Semanal':
            return tasaInteres / 52;
        case 'Quincenal':
            return tasaInteres / 24;
        case 'Mensual':
            return tasaInteres / 12;
        case 'Bimestral':
            return tasaInteres / 6;
        case 'Trimestral':
            return tasaInteres / 4;
        case 'Cuatrimestral':
            return tasaInteres / 3;
        case 'Semestral':
            return tasaInteres / 2;
        case 'Anual':
        default:
            return tasaInteres;
    }
}

function ajustarNumPeriodos(numPeriodos, frecuencia) {
    switch (frecuencia) {
        case 'Diaria':
            return numPeriodos * 365;
        case 'Semanal':
            return numPeriodos * 52;
        case 'Quincenal':
            return numPeriodos * 24;
        case 'Mensual':
            return numPeriodos * 12;
        case 'Bimestral':
            return numPeriodos * 6;
        case 'Trimestral':
            return numPeriodos * 4;
        case 'Cuatrimestral':
            return numPeriodos * 3;
        case 'Semestral':
            return numPeriodos * 2;
        case 'Anual':
        default:
            return numPeriodos;
    }
}

function calcularValorFuturo(presente, tasaInteres, numPeriodos) {
    return Math.round(presente * Math.pow(1 + tasaInteres, numPeriodos) * 100) / 100;
}

function calcularValorPresente(futuro, tasaInteres, numPeriodos) {
    return Math.round(futuro / Math.pow(1 + tasaInteres, numPeriodos) * 100) / 100;
}

function calcularTasaInteres(presente, futuro, numPeriodos) {
    return Math.round((Math.pow(futuro / presente, 1.0 / numPeriodos) - 1) * 10000) / 10000;
}

function calcularPeriodo(presente, futuro, tasaInteres) {
    return Math.round((Math.log(futuro / presente) / Math.log(1 + tasaInteres)) * 100) / 100;
}

function agregarResultado(tipoCalculo, vPresente, vFuturo, interes, periodo, resultado) {
    const table = document.getElementById('results').getElementsByTagName('tbody')[0];
    const row = table.insertRow();
    row.insertCell(0).textContent = tipoCalculo;
    row.insertCell(1).textContent = vFuturo ? vFuturo.toFixed(2) : '-';
    row.insertCell(2).textContent = vPresente ? vPresente.toFixed(2) : '-';
    row.insertCell(3).textContent = (interes * 100).toFixed(2);
    row.insertCell(4).textContent = periodo;
    row.insertCell(5).textContent = resultado.toFixed(2);
}
