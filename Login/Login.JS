/*ojo ojo ojo 🧐🧐 dog darell no borrar nada aqui ni modificar el codigo ya esta listo para optener el token 
sin necesidad estar copiando token y agregandolo al fetch, solo hay unos pequeños detalles al iniciar tiene que ser con la
contraseña en texto plano la original no pongas la contraseña incriptada de la base de datos que ocupamos para iniciar sesion en la API 
porque te dara una abvertencia.....
*/

/* == 🧐ojo ojo cuidado la cantias modificando el codigo☠️ === */

/*JAJAJA Que va mi dogs nada que ver / Att: DJJA*/

//realizando acceso de usuario para obtener el token

document.getElementById("loginForm").addEventListener("submit",async (e) =>{
    e.preventDefault(); // evita que se recargue la interfaz de vuelta

    //creamos una contante de email y contrasena
   const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  //creamos un try cach 
  try{
    //aqui llamamos el endpint de login de la API con fetch con su promesa que se cumpla...
    const response = await fetch("https://localhost:7030/api/Login/login",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
        correo: email, 
       clave: password
        })
    });   

    //Error si no existe el usuario o la contraseña 
    if (!response.ok){
        throw new Error("Credenciales invalidas o error en el servidor");  
    }
    // una constante de data si se cumplio la promesa usa esos datos
    const data = await response.json();
    console.log("Repuesta del servidor:", data);

    //guardamos el token en localStorage
    localStorage.setItem("token",data.token);

    // Header rol y nombre
    localStorage.setItem("usuario", data.usuario);
localStorage.setItem("rol", data.rol);

    console.log("Token guardado con exito",data.token);

    //dirigir al menu principal luego de iniciar sesion con window
   document.getElementById("pantallaCarga").style.display = "flex";

setTimeout(() => {

    window.location.href = "/Inicio/Index.html";

}, 2500);

  }catch (error){

    console.error("Error al iniciar sesion:", error);
    alert("No se pudo iniciar sesion verrifica tus credenciales.")
  }

})
