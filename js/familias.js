document.addEventListener('DOMContentLoaded', function () {
    const familiaContainer = document.getElementById('familiaContainer');
    const marcaSeleccionada = localStorage.getItem('marcaSeleccionada');

    if (!marcaSeleccionada) {
        alert('Por favor, selecciona una marca primero.');
        window.location.href = 'marcas.html';
        return;
    }

    fetch('/json/productos.json')
        .then(response => response.json())
        .then(data => {
            const familias = [...new Set(
                data
                .filter(producto => producto.Marca === marcaSeleccionada)
                .map(producto => producto.Familia1)
            )].sort();

            familias.forEach(familia => {
                const button = document.createElement('button');
                button.textContent = familia;
                button.classList.add('familia-button');
                button.onclick = function () {
                    localStorage.setItem('familiaSeleccionada', familia);
                    window.location.href = 'productos.html';
                };
                familiaContainer.appendChild(button);
            });
        })
        .catch(error => console.error('Error al cargar las familias:', error));
});
