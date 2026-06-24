document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        const response = await fetch("https://localhost:7030/api/Login/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                correo: email,
                clave: password
            })
        });

        if (!response.ok) {
            throw new Error("Credenciales inválidas o error en el servidor");
        }

        const data = await response.json();
        console.log("Respuesta del servidor:", data);


        localStorage.setItem("token", data.token);


        const nombreUsuario = data.usuario || data.nombre || data.name || data.user || "";

        if (nombreUsuario) {
            localStorage.setItem("usuario", nombreUsuario);
            localStorage.setItem("nombre", nombreUsuario);
        }

        if (data.rol) {
            localStorage.setItem("rol", data.rol);
        }

        const idUsuario = data.id_Usuario || data.idUsuario || data.id || "";
        if (idUsuario) {
            localStorage.setItem("id_Usuario", idUsuario);
            localStorage.setItem("idUsuario", idUsuario);
        }

        // Pal perfil del usuario
        
        const usuarioLogeado = {
            id_Usuario: idUsuario,
            nombre: nombreUsuario,
            correo_Electronico: email,
           rol: data.rol || data.cargo || "",
            token: data.token
        };

        localStorage.setItem("usuarioLogeado", JSON.stringify(usuarioLogeado));

        console.log("Usuario logeado guardado:", usuarioLogeado);

        // redireccion
        document.getElementById("pantallaCarga").style.display = "flex";

        setTimeout(() => {
            window.location.href = "/Inicio/Index.html";
        }, 2500);

    } catch (error) {

        console.error("Error al iniciar sesión:", error);
        alert("No se pudo iniciar sesión, verifica tus credenciales.");
    }
});





























// Por si las moscas



// //realizando acceso de usuario para obtener el token

// document.getElementById("loginForm").addEventListener("submit",async (e) =>{
//     e.preventDefault(); // evita que se recargue la interfaz de vuelta

//     //creamos una contante de email y contrasena
//    const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;

//   //creamos un try cach 
//   try{
//     //aqui llamamos el endpint de login de la API con fetch con su promesa que se cumpla...
//     const response = await fetch("https://localhost:7030/api/Login/login",{
//         method: "POST",
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify({
//         correo: email, 
//        clave: password
//         })
//     });   

//     //Error si no existe el usuario o la contraseña 
//     if (!response.ok){
//         throw new Error("Credenciales invalidas o error en el servidor");  
//     }
//     // una constante de data si se cumplio la promesa usa esos datos
//     const data = await response.json();
//     console.log("Repuesta del servidor:", data);

//     // Guardamos el token en localStorage
//     localStorage.setItem("token", data.token);  

//     // Guardamos nombre y rol para usar en las páginas
//     const nombreUsuario = data.usuario || data.nombre || data.name || data.user || "";
//     if (nombreUsuario) {
//         localStorage.setItem("usuario", nombreUsuario);
//         localStorage.setItem("nombre", nombreUsuario);
//     }

//     if (data.rol) {
//         localStorage.setItem("rol", data.rol);
//     }

//     const idUsuario = data.id_Usuario || data.idUsuario || data.id || "";
//     if (idUsuario) {
//         localStorage.setItem("id_Usuario", idUsuario);
//         localStorage.setItem("idUsuario", idUsuario);
//     }

//     console.log("Token guardado con exito", data.token);

//     //dirigir al menu principal luego de iniciar sesion con window
//    document.getElementById("pantallaCarga").style.display = "flex";

// setTimeout(() => {

//     window.location.href = "/Inicio/Index.html";

// }, 2500);

//   }catch (error){

//     console.error("Error al iniciar sesion:", error);
//     alert("No se pudo iniciar sesion verrifica tus credenciales.")
//   }

// })
