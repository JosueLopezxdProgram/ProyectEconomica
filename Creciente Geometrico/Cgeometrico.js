const form = document.querySelector('#input-form');
const calculateButton = document.querySelector('#calculate');
const resultBody = document.querySelector('#result-body');
const resultLabel = document.querySelector('#result-label');
const allInputs = document.querySelectorAll('.input-field');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const A1 = parseFloat(document.querySelector('#A1').value);
    const j = parseFloat(document.querySelector('#j').value) / 100;
    const i = parseFloat(document.querySelector('#i').value) / 100;
    const n = parseFloat(document.querySelector('#n').value);
    const m = parseInt(document.querySelector('#m').value);
    const periodicity = document.querySelector('#periodicity').value;
    const frequency = document.querySelector('#frequency').value;
    const radioButtonValue = document.querySelector('input[name="radio"]:checked').value;

    let result = 0;
    let formula = '';

    if (radioButtonValue === 'PE' || radioButtonValue === 'FE' || radioButtonValue === 'AE') {
        if (periodicity === 'Mensual') {
            n *= 12;
        } else if (periodicity === 'Trimestral') {
            n *= 4;
        } else if (periodicity === 'Semestral') {
            n *= 2;
        }

        if (frequency === 'Mensualmente') {
            i = Math.pow(1 + i, 1.0 / 12) - 1;
        } else if (frequency === 'Trimestralmente') {
            i = Math.pow(1 + i, 1.0 / 4) - 1;
        } else if (frequency === 'Semestralmente') {
            i = Math.pow(1 + i, 1.0 / 2) - 1;
        }

        if (radioButtonValue === 'PE') {
            result = PE(A1, j, i, n);
            formula = 'Presente Equivalente';
        } else if (radioButtonValue === 'FE') {
            result = FE(A1, j, i, n);
            formula = 'Futuro Equivalente';
        } else if (radioButtonValue === 'AE') {
            result = AE(A1, j, i, n);
            formula = 'Anualidad Equivalente';
        }
    } else if (radioButtonValue === 'I') {
        result = I(j, m);
        formula = 'Tasa Equivalente';
    }

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${formula}</td>
        <td>${A1}</td>
        <td>${(j * 100).toFixed(2)}%</td>
        <td>${(i * 100).toFixed(2)}%</td>
        <td>${n}</td>
        <td>${m}</td>
        <td>${result.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
    `;
    resultBody.appendChild(newRow);

    resultLabel.textContent = `Resultado (${formula}): ${result.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`;
});

function PE(A1, j, i, n) {
    return A1 * (((1 + j) / (1 + i)) * n - 1) / (j - i);
}

function FE(A1, j, i, n) {
    return A1 * ((Math.pow((1 + j), n) - Math.pow((1 + i), n)) / (j - i));
}

function AE(A1, j, i, n) {
    return A1 * ((Math.pow((1 + j), n) - Math.pow((1 + i), n)) / (j - i)) * (i / (Math.pow((1 + i), n) - 1));
}

function I(j, m) {
    return Math.pow((1 + j / m), m) - 1;
}

document.querySelectorAll('input[name="radio"]').forEach(radio => {
    radio.addEventListener('change', () => {
        const isRateConversion = document.querySelector('input[name="radio"]:checked').value === 'I';
        allInputs.forEach(input => {
            if (isRateConversion) {
                input.disabled = !['#j', '#m'].includes(`#${input.id}`);
            } else {
                input.disabled = false;
            }
        });
    });
});
