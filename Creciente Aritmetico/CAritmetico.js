document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btnCalcular').addEventListener('click', function() {
        const G = parseFloat(document.getElementById('txtG').value) || 0;
        const i = parseFloat(document.getElementById('txtI').value) / 100 || 0;
        const n = parseFloat(document.getElementById('txtP').value) || 0;

        const frecuenciaInteres = document.getElementById('comboBox1').value;
        const frecuenciaPeriodo = document.getElementById('comboBox2').value;

        const tasa = ConvertirInteres(i, frecuenciaInteres);
        const periodos = ConvertirPeriodo(n, frecuenciaPeriodo, frecuenciaInteres);

        let PG = 0, FG = 0, AG = 0;
        let resultado = "";

        const tipoCalculo = document.querySelector('input[name="calculo"]:checked').value;

        switch (tipoCalculo) {
            case 'PG':
                PG = CalcularPG(G, tasa, periodos);
                resultado = `PG: ${PG.toFixed(2)}`;
                break;
            case 'FG':
                FG = CalcularFG(G, tasa, periodos);
                resultado = `FG: ${FG.toFixed(2)}`;
                break;
            case 'AG':
                AG = CalcularAG(G, tasa, periodos);
                resultado = `AG: ${AG.toFixed(2)}`;
                break;
        }

        document.getElementById('lblResultado').value = resultado;

        const tbody = document.querySelector('#resultTable tbody');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${G.toFixed(2)}</td>
            <td>${(i * 100).toFixed(2)} %</td>
            <td>${periodos}</td>
            <td>${PG.toFixed(2)}</td>
            <td>${FG.toFixed(2)}</td>
            <td>${AG.toFixed(2)}</td>
        `;
        tbody.appendChild(row);
    });

    document.getElementById('btnLimpiar').addEventListener('click', function() {
        document.querySelector('#resultTable tbody').innerHTML = '';
        document.getElementById('lblResultado').value = 'Resultado:';
    });

    function ConvertirInteres(i, frecuenciaInteres) {
        switch (frecuenciaInteres) {
            case "Semestral":
                return i / 2;
            case "Trimestral":
                return i / 4;
            case "Mensual":
                return i / 12;
            default: // Anual
                return i;
        }
    }

    function ConvertirPeriodo(n, frecuenciaPeriodo, frecuenciaInteres) {
        switch (frecuenciaPeriodo) {
            case "Semestres":
                return n * 2;
            case "Trimestres":
                return n * 4;
            case "Meses":
                return n * 12;
            default: // Años
                return n;
        }
    }

    function CalcularPG(G, i, n) {
        return (G / i) * (((Math.pow(1 + i, n) - 1) / (i * Math.pow(1 + i, n))) - (n / Math.pow(1 + i, n)));
    }

    function CalcularFG(G, i, n) {
        return (G / i) * (((Math.pow(1 + i, n) - 1) / i) - n);
    }

    function CalcularAG(G, i, n) {
        return G * ((1 / i) - (n / (Math.pow(1 + i, n) - 1)));
    }
});
