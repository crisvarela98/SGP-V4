document.addEventListener('DOMContentLoaded', function () {
    const zonaContainer = document.getElementById('zonaContainer');

    fetch('/json/clientes.json')
        .then(response => response.json())
        .then(data => {
            const zonas = new Map();
            data.forEach(cliente => {
                if (cliente.Zona && cliente.NomZon) {
                    if (!zonas.has(cliente.Zona)) {
                        zonas.set(cliente.Zona, cliente.NomZon);
                    }
                }
            });
            zonas.forEach((nomZon, zona) => {
                const button = document.createElement('button');
                button.textContent = `Zona ${zona} - ${nomZon}`;
                button.classList.add('zona-button');
                button.onclick = function () {
                    localStorage.setItem('zonaSeleccionada', zona);
                    window.location.href = 'clientes.html';
                };
                zonaContainer.appendChild(button);
            });
        })
        .catch(error => console.error('Error al cargar las zonas:', error));
});
