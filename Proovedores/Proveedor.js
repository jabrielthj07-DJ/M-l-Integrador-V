//conexio de los datos de api proveedores
const API_URL = "https://localhost:7030/api/proveedor";

//validar el token antes de cargar la pagina
const token = localStorage.getItem("token");
if(!token){
    document.getElementById("mensaje").innerText = "Dene iniciar sesion para acceder a Proveedores.";
    setTimeout(() => {
        window.location.href = "/Login.html";
    },2000); //una espera de 2 segundos antes de redirigir a la pagina de login


}

//creamos una funcion asincrona para obtener los proveedores
async function getProvvedores(){
    try{//utlizamos un try catch para manejar errores
     console.log("Enviando datos fetcha a la API...");

     //creamos una contante de token para recupera el token guardado 
     const token = localStorage.getItem("token");

     //creamos un header para indicar que el formato de los datos es json y autorizacion con token
      const headers ={"Content-Type": "application/json", 
                    "Authorization": `Bearer ${token}`
                
                };
        
    //llamada a la api del metodo get
    const response = await fetch (API_URL,{
        method: "GET", headers

    });
    //validamos la respuesta de la api si no es ok mostramos un mensaje de error

    if (!response.ok){
        document.getElementById("mensaje").innerText = "Error al obtener los proveedores: "+ response.status;
        return;
    }
    //creamos una constante await que se espera la promesa de la respuesta en formato json
    const proveedores = await response.json();

    //seleccionamos el cuerpo de la tabla donde se mostraran los proveedores
    const tablaBody = document.querySelector(".tabla-Proveedores tbody");
    tablaBody.innerHTML = ""; //limpiamos el cuerpo de la tabla antes de insertar los nuevos datos
    //recorremos cada proveedor y creamos una fila en la tabla con sus datos
    if(Array.isArray(proveedores)){
        proveedores.forEach(proveedor =>{
            const fila = document.createElement("tr");
            fila.innerHTML = `
            <td>${proveedor.nombre}</td>
            <td>${proveedor.apellido}</td>
            <td>${proveedor.email}</td>
            <td>${proveedor.telefono}</td>
            <td>${proveedor.razon_Social}</td>
            <td>${proveedor.direccion}</td>
            <td>${proveedor.id_Producto}</td>
            <td>
                <button class="btn-editar">Editar</button>
                <button class="btn-eliminar">Eliminar</button>
            </td>
            `;
        //agregamos la fila al cuerpo de la tabla
        tablaBody.appendChild(fila);
        });
        //creamos una consola para mostrar los datos recibidos
        console.log("Datos resividos:",proveedores);

    }else{//si la respuesta no es un array mostramos un mensaje de error
        const fila = document.createElement("tr");
        fila.innerHTML = `<td colspan="5">No se encontraron proveedores.</td>`;

        console.log("La API no devolvio un arreglo:",proveedores);

    }

    }catch(error){
        console.error("Error al obtener los proveedores:",error);
        
    }

}
//llamamos a la funcion para obtener los proveedores al cargar la pagina
getProvvedores();