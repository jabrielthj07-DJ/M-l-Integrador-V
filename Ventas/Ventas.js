/*realizaremos la conexion de ventas */

const API_URLC = "https://localhost:7030/api/Ventas"

/*validaderemos el token */
const token = localStorage.getItem("token");
if(!token){
    document.getElementById("mensaje").innerText = "debde de iniciar sesion para acceder a ventas";
    setTimeout (() => {
        window.location.href= "/Login.html";

    },200);
}

//creamos una funcion asincrona para la promesa
async function getVentas() {
try{
    console.log("Eviando datos al fetc API");

    //recuperamos token
    const token =localStorage.getItem("token");
   
    //cabexera indicando al formato json y autorazacion de bearer osea el token
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };

    // llamamos la api median el metodo get utlizando fetch
    const response = await fetch(API_URLC,{
      method: "GET",
      headers
    });

    //validando si la repuesta es correcta opteniendo la promesa 
    if(!response.ok){
    document.getElementById("mensaje").innerText = "Error al obtener las ventas: " +response.status;
    return; //retornamos la validacion
    }

    //obteniendo la repuesta de la promesa en un formato json
    const ventas = await response.json();

    //selecionamos el cuerpo de la tablas
    const tablaBody = document.querySelector(".tabla-Ventas tbody");
    tablaBody.innerHTML = ""; //limpiamos ante de insetar

    //recorremos cada fila de la ventas 
    if(Array.isArray(ventas) && ventas.length > 0){
        ventas.forEach(venta =>{
            //creamos una constante de la fila de la tabla
            const fila = document.createElement("tr");
            
            // --- PROCESAR LA LISTA DE DETALLES (PRODUCTOS) ---
            // Como una venta puede tener varios productos, listamos todos hacia abajo dentro de cada celda
            let productosHTML = "Sin producto";
            let cantidadesHTML = "0";
            let preciosHTML = "$0";

            if (venta.detalles && venta.detalles.length > 0) {
                productosHTML = venta.detalles.map(d => `<div class="detalle-item">${d.nombre_Producto}</div>`).join("");
                cantidadesHTML = venta.detalles.map(d => `<div class="detalle-item">${d.cantidad}</div>`).join("");
                preciosHTML = venta.detalles.map(d => `<div class="detalle-item">$${d.precio_Unitario}</div>`).join("");
            }
            
            // Inyectamos el HTML en la fila incluyendo el botón de Editar e Imprimir
            fila.innerHTML = `
                <td>${formatearFecha(venta.fecha_Venta)}</td>
                <td>${venta.nombre}</td>
                <td><strong>$${venta.total}</strong></td>
                <td>${productosHTML}</td>
                <td style="text-align: center;">${cantidadesHTML}</td>
                <td style="text-align: right;">${preciosHTML}</td>
                <td>
                    <button class="btn-editar" style="margin-right: 5px;">Editar</button>
                    <button class="btn-imprimir">Imprimir</button>
                </td>
            `;

            // Enlazamos los eventos 'click' de los botones de esta fila específica
            const btnEditar = fila.querySelector(".btn-editar");
            const btnImprimir = fila.querySelector(".btn-imprimir");

            // Usamos venta.id_Venta que es el ID real de la api
            btnEditar.addEventListener("click", () => editarVenta(venta.id_Venta));
            btnImprimir.addEventListener("click", () => imprimirVenta(venta));

            tablaBody.appendChild(fila); //recorriendo la fila de la tablas
        });
        //mensaje
        console.log("Datos ventas resibidos:",ventas);
    }else{
        //mostramos mensaje de la tablas si nos hay datos (Ajustado a 7 columnas)
        const fila = document.createElement("tr");
        fila.innerHTML = `<td colspan="7" style="text-align: center;">No se lograron cargar las ventas o el listado está vacío</td>`;
        tablaBody.appendChild(fila);
        console.log("La API no devolvio un arreglo:", ventas);
    }
}catch (error){//capturamos el error
    console.log("Error al obtener la ventas:",error)
}
}

//ejecutamos 
getVentas();


// 1. Función para dar formato legible a la fecha
function formatearFecha(fechaString) {
    if (!fechaString) return "-";
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString() + ' ' + fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// 2. Acción para el botón Editar
function editarVenta(id) {
    console.log("Redirigiendo a editar venta con ID:", id);
    window.location.href = `/EditarVenta.html?id=${id}`;
}

// 3. Acción para el botón Imprimir (Genera un Ticket en pestaña nueva y lo imprime)
function imprimirVenta(venta) {
    const idVenta = venta.id_Venta || "000";
    const ventanaImpresion = window.open("", "_blank", "width=800,height=600");

    // Construimos la lista de productos del ticket dinámicamente
    let filasProductos = "";
    if (venta.detalles && venta.detalles.length > 0) {
        venta.detalles.forEach(d => {
            filasProductos += `
                <tr>
                    <td>${d.nombre_Producto}</td>
                    <td style="text-align: center;">${d.cantidad}</td>
                    <td style="text-align: right;">$${d.precio_Unitario}</td>
                    <td style="text-align: right;">$${d.cantidad * d.precio_Unitario}</td>
                </tr>
            `;
        });
    }
}