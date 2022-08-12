import { adminPage } from '../components/next-page.js'

const logoButton = document.querySelector('[data-logo]');
logoButton.addEventListener('click', function(){
    window.location.href = "index.html";
});

const storeButton = document.querySelector('[data-singin-store]');
storeButton.addEventListener('click', function(){
    window.location.href = "index.html";
});

const emailInput = document.querySelector('[data-input-email]');
const passInput = document.querySelector('[data-input-pass]');

const singinButton = document.querySelector('[data-singin-account]');
singinButton.addEventListener('click', function () {
    let emainText = emailInput.value;
    let passText = passInput.value;
    if (validateAccount(emainText, passText)) {
        adminPage();
    }
    else {
        alert("Something went wrong");
        emailInput.value = ""; 
        passInput.value = "";
    }
});

function validateAccount(email, pass) {
    let cont = 0;
    if (email == "admin@ecommerce.com") {
        cont++;
    }
    if (pass == "admin") {
        cont++;
    }

    if (cont == 2) {
        return true;
    }
    else {
        return false;
    }

}