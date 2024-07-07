document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btnCalcular').addEventListener('click', function() {
        const flujoCajaStr = document.getElementById('txtFlujoCaja').value.split(',').map(item => parseFloat(item.trim()));
        const tasaDescuento = parseFloat(document.getElementById('txtTasaDescuento').value) / 100;
        const vidaUtil = parseInt(document.getElementById('txtVidaUtil').value);

        const radioButton = document.querySelector('input[name="calculo"]:checked');
        if (!radioButton) {
            alert("Por favor, seleccione un tipo de cálculo.");
            return;
        }

        const tipoCalculo = radioButton.value;

        if (!validarCampos(flujoCajaStr, tasaDescuento, vidaUtil)) {
            alert("Por favor, ingrese valores válidos.");
            return;
        }

        let van, tir, caue;
        switch (tipoCalculo) {
            case 'tir':
                tir = calcularTIR(flujoCajaStr);
                document.getElementById('txtTIR').value = (tir * 100).toFixed(2) + "%";
                van = calcularVAN(flujoCajaStr, tasaDescuento);
                agregarFilaTabla(flujoCajaStr, tasaDescuento, vidaUtil, '-', (tir * 100).toFixed(2) + "%", '-');
                break;
            case 'van':
                van = calcularVAN(flujoCajaStr, tasaDescuento);
                document.getElementById('txtVAN').value = van.toLocaleString('es-ES', { style: 'currency', currency: 'USD' });
                agregarFilaTabla(flujoCajaStr, tasaDescuento, vidaUtil, van.toLocaleString('es-ES', { style: 'currency', currency: 'USD' }), '-', '-');
                break;
            case 'caue':
                van = calcularVAN(flujoCajaStr, tasaDescuento);
                caue = calcularCAUE(van, tasaDescuento, vidaUtil);
                document.getElementById('txtCAUE').value = caue.toLocaleString('es-ES', { style: 'currency', currency: 'USD' });
                agregarFilaTabla(flujoCajaStr, tasaDescuento, vidaUtil, van.toLocaleString('es-ES', { style: 'currency', currency: 'USD' }), '-', caue.toLocaleString('es-ES', { style: 'currency', currency: 'USD' }));
                break;
        }
    });

    function validarCampos(flujoCaja, tasaDescuento, vidaUtil) {
        return flujoCaja.every(item => !isNaN(item)) && !isNaN(tasaDescuento) && !isNaN(vidaUtil);
    }

    function calcularVAN(flujosCaja, tasaDescuento) {
        return flujosCaja.reduce((sum, flujo, t) => sum + flujo / Math.pow(1 + tasaDescuento, t), 0);
    }

    function calcularTIR(flujosCaja) {
        const f = r => flujosCaja.reduce((sum, flujo, t) => sum + flujo / Math.pow(1 + r, t), 0);
        return findRoot(f, 0.01, 0.5, 0.0001);
    }

    function calcularCAUE(van, tasaDescuento, vidaUtil) {
        const factorAnualizacion = tasaDescuento * Math.pow(1 + tasaDescuento, vidaUtil) / (Math.pow(1 + tasaDescuento, vidaUtil) - 1);
        return van * factorAnualizacion;
    }

    function findRoot(f, lower, upper, tolerance) {
        let mid = (lower + upper) / 2;
        while ((upper - lower) / 2 > tolerance) {
            if (f(mid) === 0) return mid;
            else if (f(mid) * f(lower) < 0) upper = mid;
            else lower = mid;
            mid = (lower + upper) / 2;
        }
        return mid;
    }

    function agregarFilaTabla(flujosCaja, tasaDescuento, vidaUtil, van, tir, caue) {
        const tbody = document.querySelector('#resultTable tbody');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${flujosCaja.join(', ')}</td>
            <td>${(tasaDescuento * 100).toFixed(2)}%</td>
            <td>${vidaUtil}</td>
            <td>${van}</td>
            <td>${tir}</td>
            <td>${caue}</td>
        `;
        tbody.appendChild(row);
    }
});
