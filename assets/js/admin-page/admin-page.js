
import { homePage } from '../components/next-page.js'
import getData from '../components/getData.js'
import deleteData from '../components/deleteData.js'
import setData from '../components/setData.js'

const inputProductId = document.querySelector('[data-input-id]');
const inputNameForm = document.querySelector('[data-input-name]');
const inputDescriptionForm = document.querySelector('[data-input-description]');
const inputPrecioForm = document.querySelector('[data-input-price]');
const inputDiscountForm = document.querySelector('[data-input-off]');
const inputCategoryForm = document.querySelector('[data-input-category]');
const inputImgForm = document.querySelector('[data-img-preview]');

let enableNew = false;
let init = 0;

const updateForm = document.querySelector('[data-update-form]');
updateForm.style.display = "none";

const logoButton = document.querySelector('[data-logo]');
logoButton.addEventListener('click', function(){
    window.location.href = "../index.html";
});

const singOut = document.querySelector('[data-singout]');
singOut.addEventListener('click', homePage);


const store = document.querySelector('[data-store-page]');
store.addEventListener('click', homePage);



const addNewItem = document.querySelector('[data-add-new]');
addNewItem.addEventListener('click', function () {
      if (!enableNew) {
            updateForm.style.display = "flex";
            updateForm.setAttribute("data-update-form", "new");
            inputNameForm.value = "";
            inputDescriptionForm.value = "";
            inputPrecioForm.value = "";
            inputDiscountForm.value = "";
            inputCategoryForm.value = "";
            enableNew = true;
      }
      else {
            updateForm.style.display = "none";
            updateForm.setAttribute("data-update-form", "none");
            enableNew = false;
      }
});


//getting data from server
const data = await getData();
function gettingElement() {
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
                  imagen,
            }
            createList(obj);
      });
}

gettingElement()


function createList(obj) {
      //contenedor flex
      const mainContainer = document.querySelector('[data-container]');

      const productContainer = document.createElement("div");
      productContainer.classList.add("product__container--flex");

      //creando imagen del producto
      const productImg = document.createElement("img");
      //let sentence=obj.image;
      productImg.classList.add("info__img");
      //productImg.src=sentence.slice(7,sentence.lenght);
      productImg.src = obj.imagen;

      const itemPorduct = document.createElement("div");
      itemPorduct.classList.add("item__product--flex");

      const idProduct = document.createElement("h1");
      idProduct.textContent = obj.id;

      const subProductTitle = document.createElement("h1");
      subProductTitle.textContent = obj.nombre;
      subProductTitle.classList.add("subitem__titulo");

      const updateButton = document.createElement("button");
      updateButton.textContent = "Actualizar";
      updateButton.classList.add("update__button");
      updateButton.setAttribute("data-update-button", init);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Elminar";
      deleteButton.classList.add("delete__button");
      deleteButton.setAttribute("data-delete-button", init);
      init++;

      itemPorduct.appendChild(idProduct);
      itemPorduct.appendChild(subProductTitle);
      itemPorduct.appendChild(updateButton);
      itemPorduct.appendChild(deleteButton);

      productContainer.appendChild(productImg);
      productContainer.appendChild(itemPorduct);
      mainContainer.appendChild(productContainer);
}



//to eliminate product of the list
const deleteProductButton = document.querySelectorAll('[ data-delete-button]');
for (let i = 0; i < deleteProductButton.length; i++) {
      deleteProductButton[i].addEventListener("click", function (event) {
            let idProducto = event.target.parentElement.children[0].innerHTML;
            deleteData(idProducto);
      });
}


//to update product of the list
const updateListButton = document.querySelectorAll('[data-update-button]');
for (let i = 0; i < updateListButton.length; i++) {
      updateListButton[i].addEventListener("click", function (event) {
            if (!enableNew) {
                  updateForm.style.display = "flex";
                  updateForm.setAttribute("data-update-form", "update");
                  enableNew = true;
                  let idProducto = event.target.parentElement.children[0].innerHTML;
                  inputProductId.setAttribute("data-input-id", idProducto);
                  updateForm.style.display = "flex";
                  getInfoUpdateForm(idProducto);
            }
            else {
                  updateForm.style.display = "none";
                  updateForm.setAttribute("data-update-form", "none");
                  enableNew = false;
            }
      })
}

//load data into the form
function getInfoUpdateForm(id) {
      Object.keys(data).forEach(function (key) {
            let auxId = data[key]._id;
            if (auxId == id) {
                  let nombre = data[key].name;
                  let description = data[key].description;
                  let precio = data[key].price;
                  let descuento = data[key].discount;
                  let category = data[key].category;
                  let img = data[key].image.secure_url;
                  inputNameForm.value = nombre;
                  inputDescriptionForm.value = description;
                  inputPrecioForm.value = precio;
                  inputDiscountForm.value = descuento;
                  inputCategoryForm.value = category;
                  inputImgForm.src = img;
            }
      })
}


//button acept form
const updateAceptButton = document.querySelector("[data-accept-button]");
updateAceptButton.addEventListener('click', function () {
      settingUpdateForm();
});


function settingUpdateForm() {
      let dataElement = updateForm.getAttribute('data-update-form');
      let enableConnection = 0;
      let formData = new FormData();
      let nombre = inputNameForm.value;
      let description = inputDescriptionForm.value;
      let precio = inputPrecioForm.value;
      let descuento = inputDiscountForm.value;
      let category = inputCategoryForm.value;
      let file = document.querySelector('input[type=file]').files[0]

      //validate name
      if (validateText(nombre)) {
            enableConnection++;
      }
      else {
            alert("The name is not correct");
            inputNameForm.value = "";
      }


      //validate description
      if (validateText(description)) {
            enableConnection++;
      }
      else {
            alert("The description is not correct");
            inputDescriptionForm.value = "";
      }


      //validate price
      if (validateNumber(precio)) {
            enableConnection++;
      }
      else {
            alert("The price is not correct");
            inputPrecioForm.value = "";
      }

      //validate discount
      if (validateDiscount(descuento)) {
            enableConnection++;

      }
      else {
            alert("The discount is not correct");
            inputDiscountForm.value = "";
      }

      //validate category
      if (validateCategory(category)) {
            enableConnection++;
      }
      else {
            alert("The category is not correct");
            inputCategoryForm.value = "";
      }

      //validate img
      if (validateImg(file)) {
            enableConnection++;
      }
      else {
            alert("The selected image is not correct");
      }
      if (enableConnection == 6) {
            if (dataElement == "new") {
                  formData.append("name", nombre);
                  formData.append("description", description);
                  formData.append("price", precio);
                  formData.append("discount", descuento);
                  formData.append("category", category);
                  formData.append("image", file);
                  setData(formData);
                  updateForm.style.display = "none";
            }
            if (dataElement == "update") {
                  let id = inputProductId.getAttribute("data-input-id")
                  const req = deleteData(id);
                  formData.append("name", nombre);
                  formData.append("description", description);
                  formData.append("price", precio);
                  formData.append("discount", descuento);
                  formData.append("category", category);
                  formData.append("image", file);
                  setData(formData);
                  updateForm.style.display = "none";
            }
      }
}


function validateText(text) {
      var expression = new RegExp(/^[A-Za-z]/g);
      const result = expression.test(text);
      return result;
}
function validateNumber(num) {
      var expression = /^[\d.,]+$/
      const result = expression.test(num);
      return result;
}

function validateDiscount(num) {
      var expression = /^[1-9]$|^[1-9][0-9]$|^(100)$/
      const result = expression.test(num);
      return result;
}

function validateCategory(type) {
      if (type == "game" || type == "console" || type == "varios") {
            return true;
      }
      else {
            return false;
      }
}

function validateImg(file) {
      if (file != null) {
            return true;
      }
      else {
            return false;
      }

}


const addImg = document.querySelector('[data-input-reader]');
addImg.addEventListener('change', (e) => {
      const preview = document.querySelector('[data-img-preview]');
      const file = document.querySelector('input[type=file]').files[0];
      const reader = new FileReader();
      reader.addEventListener("load", function () {
            preview.src = reader.result;
      }, false);
      if (file) {
            reader.readAsDataURL(file);
      }
});
