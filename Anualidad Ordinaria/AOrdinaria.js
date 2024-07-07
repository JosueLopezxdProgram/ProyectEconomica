document.addEventListener('DOMContentLoaded', function() {
    // Inicializa la visibilidad de los campos según el tipo de cálculo seleccionado
    const radioButtons = document.querySelectorAll('input[name="calculo"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', updateVisibility);
    });

    document.getElementById('btnCalcular').addEventListener('click', function() {
        const anualidad = parseFloat(document.getElementById('txtAnualidad').value);
        const valorPresente = parseFloat(document.getElementById('txtVPresnte').value);
        const tasaInteres = parseFloat(document.getElementById('txtInteres').value) / 100;
        const numPeriodos = parseFloat(document.getElementById('txtPeriodo').value);

        const freqTasa = document.getElementById('comboBox1').value;
        const freqPeriodo = document.getElementById('comboBox2').value;

        let tasa = tasaInteres;
        let periodos = numPeriodos;

        switch (freqTasa) {
            case "Mensual":
                tasa /= 12;
                break;
            case "Trimestral":
                tasa /= 4;
                break;
            case "Semestral":
                tasa /= 2;
                break;
        }

        switch (freqPeriodo) {
            case "Mensual":
                periodos *= 12;
                break;
            case "Trimestral":
                periodos *= 4;
                break;
            case "Semestral":
                periodos *= 2;
                break;
        }

        let resultado = 0;
        let tipoCalculo = '';

        if (document.getElementById('rdbVFuturo').checked) {
            tipoCalculo = 'Valor Futuro';
            resultado = calcularValorFuturo(anualidad, tasa, periodos);
        } else if (document.getElementById('rbtVpresente').checked) {
            tipoCalculo = 'Valor Presente';
            resultado = calcularValorPresente(anualidad, tasa, periodos);
        } else if (document.getElementById('rdbAnualdad').checked) {
            tipoCalculo = 'Anualidad';
            resultado = calcularAnualidad(valorPresente, tasa, periodos);
        } else {
            alert('Por favor, seleccione un tipo de cálculo.');
            return;
        }

        document.getElementById('lblResult').value = resultado.toLocaleString('es-ES', { style: 'currency', currency: 'USD' });

        const tbody = document.querySelector('#resultTable tbody');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${tipoCalculo}</td>
            <td>${(anualidad || valorPresente).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
            <td>${(tasa * 100).toFixed(2)}%</td>
            <td>${periodos.toFixed(2)}</td>
            <td>${resultado.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
        `;
        tbody.appendChild(row);
    });

    function calcularValorFuturo(anualidad, tasaInteres, numPeriodos) {
        return anualidad * (Math.pow(1 + tasaInteres, numPeriodos) - 1) / tasaInteres;
    }

    function calcularValorPresente(anualidad, tasaInteres, numPeriodos) {
        return anualidad * (1 - Math.pow(1 + tasaInteres, -numPeriodos)) / tasaInteres;
    }

    function calcularAnualidad(valorPresente, tasaInteres, numPeriodos) {
        return valorPresente * (tasaInteres * Math.pow(1 + tasaInteres, numPeriodos)) / (Math.pow(1 + tasaInteres, numPeriodos) - 1);
    }

    function updateVisibility() {
        const rdbVFuturo = document.getElementById('rdbVFuturo').checked;
        const rbtVpresente = document.getElementById('rbtVpresente').checked;
        const rdbAnualdad = document.getElementById('rdbAnualdad').checked;

        document.getElementById('txtAnualidad').disabled = !rdbVFuturo && !rbtVpresente;
        document.getElementById('txtVPresnte').disabled = !rdbAnualdad;
    }

    // Inicializar visibilidad de campos al cargar
    updateVisibility();
});
