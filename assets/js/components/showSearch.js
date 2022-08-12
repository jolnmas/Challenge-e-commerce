
function showSearch(obj) {
    //contenedor flexx
    const containerFlex = document.querySelector('[data-list-products]');

    //creando items
    const item = document.createElement("div");
    item.classList.add("item__listado");

    const subitemImagen = document.createElement("img");
    subitemImagen.src = obj.imagen;
    subitemImagen.classList.add("juegoImagen");
    item.appendChild(subitemImagen);

    const subitemTitulo = document.createElement("h1");
    subitemTitulo.textContent = obj.nombre;
    subitemTitulo.classList.add("nombre__juego");
    item.appendChild(subitemTitulo);

    const subitemPrecioContainerFlex = document.createElement("div");
    subitemPrecioContainerFlex.classList.add("oferta__consola--flex");

    const subitemPrecio = document.createElement("div");
    subitemPrecio.textContent = obj.precio + " US$";
    subitemPrecioContainerFlex.appendChild(subitemPrecio);

    const subitemDescuento = document.createElement("div");
    subitemDescuento.textContent = obj.descuento + " %";
    subitemPrecioContainerFlex.appendChild(subitemDescuento);
    item.appendChild(subitemPrecioContainerFlex);

    const subitemLink = document.createElement("a");
    subitemLink.textContent = "Ver mas"
    subitemLink.href = "#";

    subitemLink.classList.add("linkProducto");
    subitemLink.setAttribute('data-link', obj.id);
    item.appendChild(subitemLink);

    containerFlex.appendChild(item);

}
export { showSearch }