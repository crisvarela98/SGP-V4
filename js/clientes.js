document.addEventListener('DOMContentLoaded', function () {
    const clienteContainer = document.getElementById('clienteContainer');
    const zonaSeleccionada = localStorage.getItem('zonaSeleccionada');
    
    if (!zonaSeleccionada) {
        alert('Por favor, selecciona una zona primero.');
        window.location.href = 'zona.html';
        return;
    }

    fetch('/json/clientes.json')
        .then(response => response.json())
        .then(clientes => {
            const clientesFiltrados = clientes.filter(cliente => cliente.Zona === zonaSeleccionada);
            if (clientesFiltrados.length === 0) {
                clienteContainer.innerHTML = '<p>No hay clientes registrados en esta zona.</p>';
                return;
            }
            const table = document.createElement('table');
            table.classList.add('clientes-table');
            clientesFiltrados.forEach(cliente => {
                const row = table.insertRow();
                row.insertCell().textContent = cliente.Cod;
                row.insertCell().textContent = cliente.RazonSocial;
                row.insertCell().textContent = cliente.CUIT;
                row.insertCell().textContent = cliente.Direccion;
                row.insertCell().textContent = cliente.NomZon;
                row.insertCell().textContent = cliente.NomVend;
                row.onclick = function () {
                    localStorage.setItem('clienteSeleccionado', JSON.stringify(cliente));
                    window.location.href = 'marcas.html';
                };
            });
            clienteContainer.appendChild(table);
        })
        .catch(error => console.error('Error al cargar los clientes:', error));
});
