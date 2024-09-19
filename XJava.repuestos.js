// Filtrar productos
function filtrarProductos(nombreFiltro) {
    productosFiltrados = imagenes.filter(producto => producto.nombre.toLowerCase().includes(nombreFiltro.toLowerCase()));
    paginaActual = 1; // Resetear la página actual al filtrar
    configurarPaginado(productosFiltrados.length);
    mostrarProductos(paginaActual);
    updatePagination();
}

// Configurar eventos para filtros
document.querySelectorAll('.selectorImagenes ol li').forEach(filtro => {
    filtro.addEventListener('click', () => {
        filtrarProductos(filtro.textContent.trim());
    });
});

// Configurar evento para el botón "Mostrar todos"
document.getElementById('mostrar-todos').addEventListener('click', () => {
    document.getElementById('searchInput').value = ''; // Limpiar campo de búsqueda
    productosFiltrados = imagenes; // Mostrar todos los productos
    paginaActual = 1; // Resetear la página actual al mostrar todos
    configurarPaginado(productosFiltrados.length);
    mostrarProductos(paginaActual);
    updatePagination();
});

// Configurar evento para el campo de búsqueda
document.getElementById('searchInput').addEventListener('keyup', (e) => {
    filtrarProductos(e.target.value);
});

// Inicializar
productosFiltrados = imagenes; // Por defecto muestra todos los productos
configurarPaginado(productosFiltrados.length);
mostrarProductos(paginaActual);
updatePagination();