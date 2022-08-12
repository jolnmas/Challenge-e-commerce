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
        if (obj.category == "varios") {
                establecerVarios(obj);
        }
});


function establecerVarios(obj) {
        //contenedor flexx
        const containerFlex = document.querySelector('.container__listadoN3--flex');
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
        subitemLink.setAttribute('data-link-varios', obj.id);
        item.appendChild(subitemLink);

        //agregado item al flex
        containerFlex.appendChild(item);
}


///link product
localStorage.removeItem("linkProduct");
const linkVarios = document.querySelectorAll('[data-link-varios]');
for (let i = 0; i < linkVarios.length; i++) {
        linkVarios[i].addEventListener("click", function (event) {
                event.preventDefault();
                let id = linkVarios[i].getAttribute('data-link-varios');
                localStorage.setItem("linkProduct", id);
                productPage();
        })
}


