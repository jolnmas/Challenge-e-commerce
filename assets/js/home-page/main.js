import setPositionSlider from '../components/slider.js';
import { searchPage, singInPage } from '../components/next-page.js'
import getData from '../components/getData.js'

var enableAnimation = false;
let loop;
let count = 1;
let band = false;

//to animations
window.onload = function () {
    loop = setInterval(() => {
        if (count <= 5) {
            if (band) {
                count++;
                band = false;
            }
            animate(count);
            count++;
        }
        else {
            count = 1;
            band = true;
            animate(count);

        }
    }, 9000);
}


const data = await getData();
let lenghtProductos = Object.keys(data).length;
let arrayAuxPosiciones = [];

function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}


//to get ramdom product to show on the main section
if (data) {
    let cont = 0;
    while (cont < 5) {
        let estaRepetido = false;
        let number = random(0, lenghtProductos - 1);
        for (const elem in arrayAuxPosiciones) {
            if (number == arrayAuxPosiciones[elem]) {
                estaRepetido = true;
            }
        }
        if (!estaRepetido) {
            arrayAuxPosiciones.push(number);
            cont++;
        }
    }
}

function gettingElement() {
    /// setting products
    for (const elem in arrayAuxPosiciones) {
        let auxArray = arrayAuxPosiciones[elem];
        Object.keys(data).forEach(function (key2) {
            if (auxArray == key2) {
                let id = data[key2]._id;
                let nombre = data[key2].name;
                let description = data[key2].description;
                let precio = data[key2].price;
                let descuento = data[key2].discount;
                let category = data[key2].category;
                let img = data[key2].image.secure_url;
                let obj = {
                    id,
                    nombre,
                    description,
                    precio,
                    descuento,
                    category,
                    img,
                    elem
                }
                establecerProducto(obj);
            }
        })
    }
    enableAnimation = true;
}

gettingElement();


//creating elemento to html
function establecerProducto(obj) {
    //contenedor flexx
    const containerFlex = document.querySelector('.container__products--flex');
    //crearndo li
    const itemLi = document.createElement("li");

    itemLi.classList.add("item__product");
    itemLi.classList.add("producto__n1");
    itemLi.id = obj.elem;

    //creando div sub product
    const divSubProducto = document.createElement("div");
    divSubProducto.classList.add("subproduct");
    itemLi.appendChild(divSubProducto);

    //creando div collection
    const divCollection = document.createElement("div");
    divCollection.classList.add("collection__1--flex");

    //creado img
    const imgProd = document.createElement("img");
    imgProd.classList.add("item__collection1__image");
    imgProd.src = obj.img;
    imgProd.setAttribute("data-game-image-" + obj.elem, "");
    divCollection.appendChild(imgProd);

    //creado h1 titulo
    const h1Titulo = document.createElement("h1");
    h1Titulo.textContent = obj.nombre;
    h1Titulo.classList.add("item__collection1__name");
    divCollection.appendChild(h1Titulo);

    itemLi.appendChild(divCollection);

    containerFlex.appendChild(itemLi);
}


main();

function main() {
    //section buscar
    const searchInput = document.querySelector("[data-input-search]");

    const searchButton = document.querySelector("[data-find]");
    searchButton.addEventListener('click', function () {
        localStorage.search = searchInput.value;
        searchInput.value = "";
        searchPage();
    });

    //section Sing In
    const singInButton = document.querySelector("[data-button-sing]");
    singInButton.addEventListener('click', singInPage);

    let vectorPositionGames = []
    let countScreen = 0;


    if (window.innerWidth <= 768) {
        let numberSlidersSmallDevice = (lenghtProductos / 6)
        for (var i = 0; i <= numberSlidersSmallDevice; i++) {
            vectorPositionGames.push(countScreen);
            countScreen = countScreen - 50;
        }
    }
    else {
        let numberSlidersDesktop = (lenghtProductos / 16) - 1;
        for (var i = 0; i <= numberSlidersDesktop; i++) {
            vectorPositionGames.push(countScreen);
            countScreen = countScreen - 50;
        }
    }

    let vectorPositionConsole = []
    let countScreenConsole = 0;


    if (window.innerWidth <= 768) {
        let numberSlidersSmallDevice = (lenghtProductos / 6) - 1;
        for (var i = 0; i <= numberSlidersSmallDevice; i++) {
            vectorPositionConsole.push(countScreenConsole);
            countScreenConsole = countScreenConsole - 50;
        }
    }
    else {
        let numberSlidersDesktop = (lenghtProductos / 16) - 1;
        for (var i = 0; i <= numberSlidersDesktop; i++) {
            vectorPositionConsole.push(countScreenConsole);
            countScreenConsole = countScreenConsole - 50;
        }
    }


    let vectorPositionVarios = [];
    let countScreenVarios = 0;
    if (window.innerWidth <= 768) {
        let numberSlidersSmallDevice = (lenghtProductos / 6) - 1;
        for (var i = 0; i <= numberSlidersSmallDevice; i++) {
            vectorPositionVarios.push(countScreenVarios);
            countScreenVarios = countScreenVarios - 50;
        }
    }
    else {
        let numberSlidersDesktop = (lenghtProductos / 16) - 1;
        for (var i = 0; i <= numberSlidersDesktop; i++) {
            vectorPositionVarios.push(countScreenVarios);
            countScreenVarios = countScreenVarios - 50;
        }
    }

    //sliders
    localStorage.setItem("indexGames", 0);

    const sliderGames = document.querySelector('.container__listado--flex');
    const sliderConsole = document.querySelector('.container__listadoN2--flex');
    const sliderVarios = document.querySelector('.container__listadoN3--flex');

    //games
    const leftSliderGames = document.querySelector("[data-slider-games-left]");
    leftSliderGames.addEventListener('click', function () {
        setPositionSlider(-1, vectorPositionGames, sliderGames);
    });

    const rightSliderGames = document.querySelector("[data-slider-games-right]");
    rightSliderGames.addEventListener('click', function () {
        setPositionSlider(1, vectorPositionGames, sliderGames);
    });

    //console
    const leftSliderConsole = document.querySelector("[data-slider-console-left]");
    leftSliderConsole.addEventListener('click', function () {
        setPositionSlider(-1, vectorPositionConsole, sliderConsole);
    });

    const rightSliderConsole = document.querySelector("[data-slider-console-right]");
    rightSliderConsole.addEventListener('click', function () {
        setPositionSlider(1, vectorPositionConsole, sliderConsole);
    });


    //varios
    const leftSliderVarios = document.querySelector("[data-slider-varios-left]");
    leftSliderVarios.addEventListener('click', function () {
        setPositionSlider(-1, vectorPositionVarios, sliderVarios);
    });

    const rightliderVarios = document.querySelector("[data-slider-varios-right]");
    rightliderVarios.addEventListener('click', function () {
        setPositionSlider(1, vectorPositionVarios, sliderVarios);
    });

}

let mainProducto = document.querySelector('.main__product');

function animate(num) {
    let liEmento1 = document.getElementById("0").firstChild;
    let liEmento2 = document.getElementById("1").firstChild;
    let liEmento3 = document.getElementById("2").firstChild;
    let liEmento4 = document.getElementById("3").firstChild;
    let liEmento5 = document.getElementById("4").firstChild;
    if (enableAnimation) {
        if (num == 1) {
            liEmento5.classList.remove("subproduct__efecto");
            liEmento1.classList.add("subproduct__efecto");
            let pro1 = document.querySelector("[data-game-image-0]");
            mainProducto.setAttribute("style", "background-image: url(" + pro1.src + ");background-repeat: no-repeat; object-fit: none;");
        }
        if (num == 2) {
            liEmento1.classList.remove("subproduct__efecto");
            liEmento2.classList.add("subproduct__efecto");
            let pro2 = document.querySelector("[data-game-image-1]");
            mainProducto.setAttribute("style", "background-image: url(" + pro2.src + ");background-repeat: no-repeat; object-fit: none;");
        }
        if (num == 3) {
            liEmento2.classList.remove("subproduct__efecto");
            liEmento3.classList.add("subproduct__efecto");
            let pro3 = document.querySelector("[data-game-image-2]");
            mainProducto.setAttribute("style", "background-image: url(" + pro3.src + ");background-repeat: no-repeat; object-fit: none;");
        }
        if (num == 4) {
            liEmento3.classList.remove("subproduct__efecto");
            liEmento4.classList.add("subproduct__efecto");
            let pro4 = document.querySelector("[data-game-image-3]");
            mainProducto.setAttribute("style", "background-image: url(" + pro4.src + ");background-repeat: no-repeat; object-fit: none;");
        }
        if (num == 5) {
            liEmento4.classList.remove("subproduct__efecto");
            liEmento5.classList.add("subproduct__efecto");
            let pro5 = document.querySelector("[data-game-image-4]");
            mainProducto.setAttribute("style", "background-image: url(" + pro5.src + ");background-repeat: no-repeat; object-fit: none;");
        }
    }
}
