let enviarMensaje = document.getElementById("button__enviarMensaje");
let nombreContacto = document.getElementById("nombreContacto");
let mensajeContacto = document.getElementById("inputArea__mensaje");
var nombreValido = false;
var mensajeValido = false;

function googleScriptPost() {
    const scriptURL = 'https://script.google.com/macros/s/AKfycby8e8YhugXGnUu1hQG6HkoSRR5l3Ot0llVcJB4mOVm4PyG8DYPEXSNP4hh714OA5-3d/exec'
    const form = document.forms['google-sheet']
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => finalMessage())
        .catch(error => errorShow())
}

enviarMensaje.addEventListener('click', function (e) {
    e.preventDefault()
    textName = nombreContacto.value;
    textMessage = mensajeContacto.value;
    if (textName.length > 0) {
        if (validateWord(textName)) {
            if (textMessage.length > 0) {
                googleScriptPost();
            }
            else {
                errorShow();
            }
        }
        else {
            errorShow();
        }
    }
    else {
        errorShow();
    }
});


function validateWord(text) {
    //match all words with no digits
    var reg = /^[ a-zA-Z]/
    if (reg.test(text)) {
        return true;
    }
    else {
        nombreContacto.value = "";
        return false;
    }
}

function validateEmpty(value) {
    var e = true;
    if (value <= 0) {
        e = false
    }
    return e;
}

function finalMessage() {
    alert("Su mensaje ha sido enviado");
    nombreContacto.value = "";
    mensajeContacto.value = "";
}


function errorShow() {
    alert("Algo salio mal");
    nombreContacto.value = "";
    mensajeContacto.value = "";
}

