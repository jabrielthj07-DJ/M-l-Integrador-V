
document.addEventListener("DOMContentLoaded", () => {

    const usuario = localStorage.getItem("usuario");
    const rol = localStorage.getItem("rol");

    const nombreHeader = document.getElementById("nombreHeader");
    const rolHeader = document.getElementById("rolHeader");

    if(nombreHeader){
        nombreHeader.textContent = usuario;
    }

    if(rolHeader){
        rolHeader.textContent = rol;
    }

});