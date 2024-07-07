const saldoInicialInput = document.getElementById('saldoInicial');
const interesInput = document.getElementById('interes');
const periodoInput = document.getElementById('periodo');
const generarCalendarioButton = document.getElementById('generarCalendario');
const guardarDatosButton = document.getElementById('guardarDatos');
const cerrarButton = document.getElementById('cerrar');
const calendarioSection = document.getElementById('calendario');
const dataTableBody = document.getElementById('dataTableBody');

generarCalendarioButton.addEventListener('click', generateCalendar);
guardarDatosButton.addEventListener('click', saveData);
cerrarButton.addEventListener('click', closeApp);

function generateCalendar() {
    const saldoInicial = parseFloat(saldoInicialInput.value);
    const tasaInteres = parseFloat(interesInput.value) / 100;
    const periodos = parseInt(periodoInput.value);

    const cuota = (saldoInicial * tasaInteres) / (1 - Math.pow((1 + tasaInteres), -periodos));

    let tableRows = `
        <tr>
            <td>0</td>
            <td>$${saldoInicial.toFixed(2)}</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
    `;

    let saldo = saldoInicial;
    let totalIntereses = 0;
    let totalCuotas = 0;
    let totalAmortizacion = 0;

    for (let periodo = 1; periodo <= periodos; periodo++) {
        const intereses = saldo * tasaInteres;
        const amortizacion = cuota - intereses;
        saldo -= amortizacion;

        totalIntereses += intereses;
        totalCuotas += cuota;
        totalAmortizacion += amortizacion;

        tableRows += `
            <tr>
                <td>${periodo}</td>
                <td>$${saldo.toFixed(2)}</td>
                <td>$${intereses.toFixed(2)}</td>
                <td>$${cuota.toFixed(2)}</td>
                <td>$${amortizacion.toFixed(2)}</td>
            </tr>
        `;
    }

    tableRows += `
        <tr>
            <td>Total</td>
            <td>-</td>
            <td>$${totalIntereses.toFixed(2)}</td>
            <td>$${totalCuotas.toFixed(2)}</td>
            <td>$${totalAmortizacion.toFixed(2)}</td>
        </tr>
    `;

    dataTableBody.innerHTML = tableRows;
    calendarioSection.style.display = 'block';
}

function saveData() {
    const table = document.getElementById('dataTable');
    const html = table.outerHTML;
    const blob = new Blob(['\ufeff', html], { type: 'application/vnd.ms-excel' });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Calendario_de_Pagos.xls';
    a.click();
    URL.revokeObjectURL(url);
}

function closeApp() {
    window.close();
}
