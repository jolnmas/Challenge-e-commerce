import getData from '../components/getData.js'
let infoTitulo = document.querySelector("[data-info-title]");
let infoDescripcion = document.querySelector("[data-info-description]");
let infoprice = document.querySelector("[data-info-price]");
let infoDescuento = document.querySelector("[data-info-off]");
let infoImage = document.querySelector("[ data-info-img]");
let infoTipo = document.querySelector("[data-info-type]");

let linkProductId = localStorage.getItem("linkProduct") || [];
if (linkProductId == "") {
    alert("Error");
}
else {
    gettingElement();
}

//getting data from server
async function gettingElement() {
    const data = await getData();
    Object.keys(data).forEach(function (key) {
        if (data[key]._id == linkProductId) {
            let nombre = data[key].name;
            let description = data[key].description;
            let precio = data[key].price;
            let descuento = data[key].discount;
            let category = data[key].category;
            let imagen = data[key].image.secure_url;
            infoTitulo.textContent = "Nombre: " + nombre;
            infoDescripcion.textContent = "Descripcion: " + description;
            infoprice.textContent = "Precio: US$" + precio;
            infoDescuento.textContent = "Descuento: " + descuento;
            infoTipo.textContent = "Tipo: " + category;
            infoImage.src = imagen
        }
    });
}

const logoButton = document.querySelector('[data-logo]');
logoButton.addEventListener('click', function(){
    window.location.href = "index.html";
});

const storeButton = document.querySelector("[data-store-button]");
storeButton.addEventListener('click', function () {
    window.location.href = "index.html";
});




