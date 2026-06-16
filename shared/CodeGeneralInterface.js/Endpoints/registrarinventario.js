import ProductoService from "../../services/producto.service.js";
import InventarioService from "../../services/inventario.service.js";
import InventarioRequest from "../../models/request/inventario.request.js";

const productoService =
new ProductoService();

const inventarioService =
new InventarioService();

const cmbProducto =
document.getElementById("producto");

const txtDescripcion =
document.getElementById("descripcion");

async function cargarProductos(){

    const productos =
    await productoService.get();

    productos.forEach(producto => {

        cmbProducto.innerHTML += `
            <option
                value="${producto.idProducto}"
                data-descripcion="${producto.descripcion}">
                ${producto.nombreProducto}
            </option>
        `;
    });
}

cmbProducto.addEventListener(
"change",
() => {

    const opcion =
    cmbProducto.options[
        cmbProducto.selectedIndex
    ];

    txtDescripcion.value =
    opcion.dataset.descripcion || "";
});

document
.getElementById("form-agregar-inventario")
.addEventListener(
"submit",
async function(e){

    e.preventDefault();

    try{

        const request =
        new InventarioRequest(

            txtDescripcion.value,

            parseFloat(
                document.getElementById("precio").value
            ),

            parseInt(
                document.getElementById("stock").value
            ),

            parseInt(
                cmbProducto.value
            )
        );

        await inventarioService.create(
            request
        );

        alert(
            "Inventario agregado correctamente"
        );

        window.location.href =
        "/Inventario/Inventario.html";

    }catch(error){

        console.error(error);

        alert(
            "Error al guardar inventario"
        );
    }
});

cargarProductos();