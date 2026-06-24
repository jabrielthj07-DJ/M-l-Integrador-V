const usuarioPerfil = JSON.parse(localStorage.getItem("usuarioLogeado"));

console.log("Usuario perfil:", usuarioPerfil);

if (!usuarioPerfil) {
    // si no hay sesión lo mandas al login
    window.location.href = "/Login/Login.html";
} else {

    // 🧠 Nombre
    const nombre = document.getElementById("nombreUsuario");
    if (nombre) nombre.textContent = usuarioPerfil.nombre;

    // 🧠 Rol
    const rol = document.getElementById("rolUsuario");
    if (rol) rol.textContent = usuarioPerfil.cargo;

    // 🧠 Correo (el campo clave)
    const correo = document.getElementById("correoUsuario");
    if (correo) correo.textContent = usuarioPerfil.correo_Electronico;

    // 🧠 Usuario sistema
    const usuarioSistema = document.getElementById("usuarioSistema");
    if (usuarioSistema) usuarioSistema.textContent = usuarioPerfil.nombre;

}