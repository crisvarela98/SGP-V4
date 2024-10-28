document.addEventListener('DOMContentLoaded', function () {
    const marcaContainer = document.getElementById('marcaContainer');
    const clienteSeleccionado = JSON.parse(localStorage.getItem('clienteSeleccionado'));

    if (!clienteSeleccionado) {
        alert('Por favor, selecciona un cliente primero.');
        window.location.href = 'clientes.html';
        return;
    }

    fetch('/json/productos.json')
        .then(response => response.json())
        .then(data => {
            const marcas = [...new Set(data.map(producto => producto.Marca))].sort();
            marcas.forEach(marca => {
                const button = document.createElement('button');
                button.textContent = marca;
                button.classList.add('marca-button');
                button.onclick = function () {
                    localStorage.setItem('marcaSeleccionada', marca);
                    window.location.href = 'familias.html';
                };
                marcaContainer.appendChild(button);
            });
        })
        .catch(error => console.error('Error al cargar las marcas:', error));
});
