//dog esto lo modefique porque el profe quiere que muestre el nombre del usario en venta 
//osea la persona que esta logiada tu podes entrar y en venta se carga tu nombre 
//que estas logiado..
// Obtener los datos del usuario y rol desde el localStorage.
// Esto viene de la página de inicio de sesión (`Login.JS`).
let usuario = localStorage.getItem("usuario") || "";
const rol = localStorage.getItem("rol") || "";

// Si no existe la clave "usuario", intentar otras claves comunes.
// Esto ayuda si hay distintos nombres de variable en otras partes del proyecto.
if (!usuario) {
    usuario = localStorage.getItem("user") || localStorage.getItem("nombre") || localStorage.getItem("name") || localStorage.getItem("email") || "";
}

// Referencias a elementos del DOM que pueden existir en varias páginas.
const nombreHeader = document.getElementById("nombreHeader");
const rolHeader = document.getElementById("rolHeader");
const usuarioDisplay = document.getElementById("usuarioDisplay");
const usuarioHidden = document.getElementById("usuario");

// Función que rellena los campos de la sesión en la página.
const populateSessionFields = () => {
    // Mostrar el nombre de usuario en el encabezado, si existe.
    if (nombreHeader) {
        nombreHeader.textContent = usuario;
    }

    // Mostrar el rol en el encabezado, si existe.
    if (rolHeader) {
        rolHeader.textContent = rol;
    }

    // Rellenar el campo visible del formulario de ventas.
    if (usuarioDisplay) {
        usuarioDisplay.value = usuario;
    }

    // Rellenar el input oculto que enviará el usuario real al servidor.
    if (usuarioHidden) {
        usuarioHidden.value = usuario;
    }
};

// esto dog Ejecutar la función una vez que el DOM esté listo.
// Si el documento ya está cargado, llamarla inmediatamente.
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", populateSessionFields);
} else {
    populateSessionFields();
}