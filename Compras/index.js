//realizaremos la conexion de la api

const API_URL ="https://localhost:7030/api/Compras"

//creamos un asincrona y wai para una promesa
 async function getCompras() {
    try{
        //creamos una contaste de cons log de mensaje
        console.log("enviando datos  Fetcg a la API...");
     

        //creamos validacion de token con localStorage
        const token = localStorage.getItem("token")//recuperar token guardado

        //header que el formato esta en json
        const headers={"Content-Type": "application/json",
                       "Authorization": `Bearer ${token} `

        };
        
    //llamda de la api del metodo Get
    const response = await fetch(API_URL,{
      method:"GET", headers
    });
    //creamos una constante awai que se espara la promesa
    const compras= await response.json();

    //selecionamos todo el cuerpo de la tabla
    const tablaBody = document.querySelector(".tabla-Compras tbody")
    tablaBody.innerHTML =""; //limpiamos antes de insertar


    //recorremos cada compras y cuerpo de la tablas
    if(Array.isArray(compras)){
        compras.forEach(compra =>{
          const fila=document.createElement("tr");
          
        fila.innerHTML= `
          <td>${compra.id_Compra}</td>
        <td>${compra.id_Proveedor}</td>
        <td>${compra.fecha_Compra}</td>
        <td>${compra.total}</td>
        <td>${compra.observaciones}</td>
        `;
    //tabla body
    tablaBody.appendChild(fila); //aqui mandamos a llamar la variable fila de la tabla
        });
           //creamos un consola  de datos recibido
    console.log("Datos resibidos:", compras);
    }else{
       // Mostrar mensaje en la tabla si no hay datos
      const fila = document.createElement("tr");
      fila.innerHTML = `<td colspan="5">No se pudieron cargar las compras</td>`;
      
        console.log("la api no devolvio arregolo:", compras);
    }
       
        

    
    }catch (error) {   //creamos un cach si hay un error al obtener las compras
      console.log("Error al obtener las compras:",error)
    }

 }

 //aqui ejecutamos getcompras al cargar la pajina

getCompras();
 
