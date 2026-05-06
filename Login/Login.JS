// Acceso al Sistema, especificamente nosmandara al Inicio
document.getElementById("loginForm").addEventListener("submit", function(open) {
    open.preventDefault();

    let usuario = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let userCorrecto = "admin";
    let passCorrecto = "87481373";

    if(usuario === userCorrecto && password === passCorrecto){
        window.location.href = "/Inicio/Index.html";
    } else {
        alert("Usuario o contraseña incorrectos");
    }
});