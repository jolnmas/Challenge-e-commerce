
import { productPage } from '../../components/next-page.js'
import getData from '../../components/getData.js'

const data = await getData();

/// setting the products
let count = 0;
Object.keys(data).forEach(function (key) {
    let id = data[key]._id;
    let nombre = data[key].name;
    let description = data[key].description;
    let precio = data[key].price;
    let descuento = data[key].discount;
    let category = data[key].category;
    let img = data[key].image.secure_url;
    let obj = {
        id,
        nombre,
        description,
        precio,
        descuento,
        category,
        img,
        count
    }
    count++;
    if (obj.category == "game") {
        establecerJuegos(obj);
    }
});


function establecerJuegos(obj) {
    //contenedor flexx
    const containerFlex = document.querySelector('.container__listado--flex');
    //creando items
    const item = document.createElement("div");
    item.classList.add("item__listado");

    const subitemImagen = document.createElement("img");
    subitemImagen.src = obj.img;
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
    subitemLink.textContent = "Ver mas";
    subitemLink.href = "#";
    subitemLink.classList.add("linkProducto");
    subitemLink.setAttribute("data-link-games", obj.id);
    item.appendChild(subitemLink);

    //agregado item al flex
    containerFlex.appendChild(item);
}



localStorage.removeItem("linkProduct");
const linkjuegos = document.querySelectorAll('[data-link-games]');
for (let i = 0; i < linkjuegos.length; i++) {
    linkjuegos[i].addEventListener("click", function (event) {
        let id = linkjuegos[i].getAttribute('data-link-games');
        event.preventDefault();
        localStorage.setItem("linkProduct", id);
        productPage();
    })
}