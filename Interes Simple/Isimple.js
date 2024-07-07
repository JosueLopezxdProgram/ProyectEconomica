document.addEventListener('DOMContentLoaded', function () {
    const radioButtons = document.querySelectorAll('input[name="calculo"]');
    const txtVPresente = document.getElementById('txtVPresente');
    const txtValorFuturo = document.getElementById('txtValorFuturo');
    const txtInteres = document.getElementById('txtInteres');
    const txtPeriodo = document.getElementById('txtPeriodo');
    const btnCalcular = document.getElementById('btnCalcular');
    const resultTable = document.querySelector('#resultTable tbody');
    const lblResultado = document.getElementById('lblResultado');

    radioButtons.forEach(rb => {
        rb.addEventListener('change', handleRadioButtonChange);
    });

    btnCalcular.addEventListener('click', calculate);

    function handleRadioButtonChange() {
        const selectedRadio = document.querySelector('input[name="calculo"]:checked');
        if (selectedRadio) {
            const value = selectedRadio.value;
            switch (value) {
                case 'valorFuturo':
                    txtVPresente.disabled = false;
                    txtValorFuturo.disabled = true;
                    txtInteres.disabled = false;
                    txtPeriodo.disabled = false;
                    txtValorFuturo.value = '';
                    break;
                case 'valorPresente':
                    txtVPresente.disabled = true;
                    txtValorFuturo.disabled = false;
                    txtInteres.disabled = false;
                    txtPeriodo.disabled = false;
                    txtVPresente.value = '';
                    break;
                case 'interes':
                    txtVPresente.disabled = false;
                    txtValorFuturo.disabled = false;
                    txtInteres.disabled = true;
                    txtPeriodo.disabled = false;
                    txtInteres.value = '';
                    break;
                case 'periodo':
                    txtVPresente.disabled = false;
                    txtValorFuturo.disabled = false;
                    txtInteres.disabled = false;
                    txtPeriodo.disabled = true;
                    txtPeriodo.value = '';
                    break;
            }
        }
    }

    function calculate() {
        try {
            let P = 0, F = 0, I = 0, N = 0;

            const selectedRadio = document.querySelector('input[name="calculo"]:checked');

            if (selectedRadio) {
                const value = selectedRadio.value;

                if (value === 'valorFuturo') {
                    P = parseFloat(txtVPresente.value);
                    I = parseFloat(txtInteres.value) / 100;
                    N = parseFloat(txtPeriodo.value);
                    F = P * (1 + I * N);
                } else if (value === 'valorPresente') {
                    F = parseFloat(txtValorFuturo.value);
                    I = parseFloat(txtInteres.value) / 100;
                    N = parseFloat(txtPeriodo.value);
                    P = F / (1 + I * N);
                } else if (value === 'interes') {
                    P = parseFloat(txtVPresente.value);
                    F = parseFloat(txtValorFuturo.value);
                    N = parseFloat(txtPeriodo.value);
                    I = (F / P - 1) / N;
                } else if (value === 'periodo') {
                    P = parseFloat(txtVPresente.value);
                    F = parseFloat(txtValorFuturo.value);
                    I = parseFloat(txtInteres.value) / 100;
                    N = (F / P - 1) / I;
                } else {
                    alert('Por favor seleccione qué desea calcular.');
                    return;
                }

                const interesPorcentaje = (I * 100).toFixed(1) + "%";

                resultTable.innerHTML = ''; // Clear previous results

                if (value === 'valorFuturo') {
                    resultTable.innerHTML = `
                        <tr>
                            <td>Valor Futuro</td>
                            <td>$${P.toFixed(2)}</td>
                            <td>$${F.toFixed(2)}</td>
                            <td>${interesPorcentaje}</td>
                            <td>${N.toFixed(2)}</td>
                        </tr>
                    `;
                    lblResultado.textContent = `Valor Futuro: $${F.toFixed(2)}`;
                } else if (value === 'valorPresente') {
                    resultTable.innerHTML = `
                        <tr>
                            <td>Valor Presente</td>
                            <td>$${P.toFixed(2)}</td>
                            <td>$${F.toFixed(2)}</td>
                            <td>${interesPorcentaje}</td>
                            <td>${N.toFixed(2)}</td>
                        </tr>
                    `;
                    lblResultado.textContent = `Valor Presente: $${P.toFixed(2)}`;
                } else if (value === 'interes') {
                    resultTable.innerHTML = `
                        <tr>
                            <td>Tasa de Interés</td>
                            <td>$${P.toFixed(2)}</td>
                            <td>$${F.toFixed(2)}</td>
                            <td>${interesPorcentaje}</td>
                            <td>${N.toFixed(2)}</td>
                        </tr>
                    `;
                    lblResultado.textContent = `Tasa de Interés: ${interesPorcentaje}`;
                } else if (value === 'periodo') {
                    resultTable.innerHTML = `
                        <tr>
                            <td>Número de Períodos</td>
                            <td>$${P.toFixed(2)}</td>
                            <td>$${F.toFixed(2)}</td>
                            <td>${interesPorcentaje}</td>
                            <td>${N.toFixed(2)}</td>
                        </tr>
                    `;
                    lblResultado.textContent = `Número de Períodos: ${N.toFixed(2)}`;
                }
            } else {
                alert('Por favor seleccione qué desea calcular.');
            }
        } catch (error) {
            alert('Por favor ingrese valores numéricos válidos en los campos de entrada.');
        }
    }
});
