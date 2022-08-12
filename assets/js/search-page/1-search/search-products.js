
import { homePage } from '../../components/next-page.js'
import { showSearch } from '../../components/showSearch.js'
import { singInPage } from '../../components/next-page.js'
import { productPage } from '../../components/next-page.js'
import getData from '../../components/getData.js'

async function gettingElement() {
    const word = localStorage.search
    const data = await getData();
    Object.keys(data).forEach(function (key) {
    let nombre = data[key].name;
    if (nombre.includes(word)) {
      let id = data[key]._id;
      let nombre = data[key].name;
      let description = data[key].description;
      let precio = data[key].price;
      let descuento = data[key].discount;
      let category = data[key].category;
      let imagen = data[key].image.secure_url;
      let obj = {
        id,
        nombre,
        description,
        precio,
        descuento,
        category,
        imagen
      }
      showSearch(obj);
    }
  });
  linkToProduct();
}

function linkToProduct() {
  localStorage.removeItem("linkProduct");
  const link = document.querySelectorAll('[data-link]');
  for (let i = 0; i < link.length; i++) {
    link[i].addEventListener("click", function (event) {
      event.preventDefault();
      let id = link[i].getAttribute('data-link');
      localStorage.setItem("linkProduct", id);
      productPage();
    })
  }
}

gettingElement();


const logoButton = document.querySelector('[data-logo]');
logoButton.addEventListener('click', function(){
    window.location.href = "index.html";
});




//going back to store page
const storeButton = document.querySelector('[data-store-button]');
storeButton.addEventListener('click', function(){
  window.location.href = "index.html";
}
);


//login page
const singInButton = document.querySelector('[data-singin-button]');
singInButton.addEventListener('click', singInPage);


//clean list of products
function removeFromListProduct() {
  const listProducts = document.querySelector('[data-list-products]');
  while (listProducts.firstChild) {
    listProducts.removeChild(listProducts.firstChild);
  }
}

//to filter by a-z
let auxArray = [];
async function ordenarAZ() {
  removeFromListProduct();
  const data = await getData();
  Object.keys(data).forEach(function (key) {
    let id = data[key]._id;
    let nombre = data[key].name;
    let description = data[key].description;
    let precio = data[key].price;
    let descuento = data[key].discount;
    let category = data[key].category;
    let imagen = data[key].image.secure_url;
    let obj = {
      id,
      nombre,
      description,
      precio,
      descuento,
      category,
      imagen
    }
    auxArray.push(obj)
  })
  auxArray.sort((a, b) => a.nombre.localeCompare(b.nombre));
  addProductToList(auxArray);
  linkToProduct();
}


let auxArraybyPrice = [];
async function filterByPrice() {
  removeFromListProduct();
  const data = await getData();
  Object.keys(data).forEach(function (key) {
    let id = data[key]._id;
    let nombre = data[key].name;
    let description = data[key].description;
    let precio = data[key].price;
    let descuento = data[key].discount;
    let category = data[key].category;
    let imagen = data[key].image.secure_url;
    let obj = {
      id,
      nombre,
      description,
      precio,
      descuento,
      category,
      imagen
    }
    auxArraybyPrice.push(obj);
  });

  auxArraybyPrice.sort((a, b) => {
    return a.precio - b.precio;
  });
  addProductToList(auxArraybyPrice);
  linkToProduct();
}


//add products by a-z on screen
function addProductToList(array) {
  for (const elem in array) {
    //contenedor flexx
    const containerFlex = document.querySelector('[data-list-products]');
    //creando items
    const item = document.createElement("div");
    item.classList.add("item__listado");

    const subitemImagen = document.createElement("img");
    subitemImagen.src = array[elem].imagen;
    subitemImagen.classList.add("juegoImagen");
    item.appendChild(subitemImagen);

    const subitemTitulo = document.createElement("h1");
    subitemTitulo.textContent = array[elem].nombre;
    subitemTitulo.classList.add("nombre__juego");
    item.appendChild(subitemTitulo);

    const subitemPrecioContainerFlex = document.createElement("div");
    subitemPrecioContainerFlex.classList.add("oferta__consola--flex");

    const subitemPrecio = document.createElement("div");
    subitemPrecio.textContent = array[elem].precio + " US$";
    subitemPrecioContainerFlex.appendChild(subitemPrecio);

    const subitemDescuento = document.createElement("div");
    subitemDescuento.textContent = array[elem].descuento + " %";
    subitemPrecioContainerFlex.appendChild(subitemDescuento);
    item.appendChild(subitemPrecioContainerFlex);

    const subitemLink = document.createElement("a");
    subitemLink.textContent = "Ver mas";
    subitemLink.href = "#";

    subitemLink.classList.add("linkProducto");
    subitemLink.setAttribute('data-link', array[elem].id);
    item.appendChild(subitemLink);

    //agregado item al flex
    containerFlex.appendChild(item);
  }
}


//filtros de busqueda
let vectorFilterState = [];
vectorFilterState[0] = 0;
vectorFilterState[1] = 0;

const priceButton = document.querySelector('[data-filter-price]');
priceButton.addEventListener('click', function () {
  if (vectorFilterState[0] == 0) {
    priceButton.classList.replace("filter__Button", "filter__Button--state2");
    vectorFilterState[0] = 1;
    filterByPrice();
    if (vectorFilterState[1] = 1) {
      azButton.classList.replace("filter__Button--state2", "filter__Button");
      vectorFilterState[1] = 0;
    }
  }
  else {
    if (vectorFilterState[0] == 1) {
      priceButton.classList.replace("filter__Button--state2", "filter__Button");
      vectorFilterState[0] = 0;
    }
  }
});

//filter
const azButton = document.querySelector('[data-filter-az]');
azButton.addEventListener('click', function () {
  if (vectorFilterState[1] == 0) {
    azButton.classList.replace("filter__Button", "filter__Button--state2");
    vectorFilterState[1] = 1;
    ordenarAZ();
    if (vectorFilterState[0] = 1) {
      priceButton.classList.replace("filter__Button--state2", "filter__Button");
      vectorFilterState[0] = 0;
    }
  }
  else {
    if (vectorFilterState[1] == 1) {
      azButton.classList.replace("filter__Button--state2", "filter__Button");
      vectorFilterState[1] = 0;
    }
  }
});
