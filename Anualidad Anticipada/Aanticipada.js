document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('anualidadForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Previene el envío del formulario y el reinicio de los campos
        
        const anualidad = parseFloat(document.getElementById('txtAnulidad').value);
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

        if (document.getElementById('rbtVpresente').checked) {
            tipoCalculo = 'Valor Presente';
            resultado = calcularValorPresente(anualidad, tasa, periodos);
        } else if (document.getElementById('rdbVFuturo').checked) {
            tipoCalculo = 'Valor Futuro';
            resultado = calcularValorFuturo(anualidad, tasa, periodos);
        } else {
            alert('Por favor, seleccione un tipo de cálculo.');
            return;
        }

        document.getElementById('lblResult').value = resultado.toLocaleString('es-ES', { style: 'currency', currency: 'USD' });

        const tbody = document.querySelector('#resultTable tbody');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${anualidad.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
            <td>${(tasa * 100).toFixed(2)}%</td>
            <td>${periodos.toFixed(2)}</td>
            <td>${resultado.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
            <td>${tipoCalculo}</td>
        `;
        tbody.appendChild(row);
    });

    function calcularValorPresente(A, i, n) {
        return A + (A * ((Math.pow((1 + i), n - 1) - 1) / (i * Math.pow((1 + i), n - 1))));
    }

    function calcularValorFuturo(A, i, n) {
        return (A + (A * ((Math.pow((1 + i), n - 1) - 1) / (i * Math.pow((1 + i), n - 1))))) * Math.pow((1 + i), n);
    }
});
