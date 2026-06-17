import ProductoService from "../../services/producto.service.js";
import InventarioService from "../../services/inventario.service.js";
import InventarioRequest from "../../models/request/inventario.request.js";

const productoService = new ProductoService();
const inventarioService = new InventarioService();

const urlParams = new URLSearchParams(window.location.search);

const idProducto =
parseInt(urlParams.get("id"));

const cmbProducto =
document.getElementById("producto");

const txtDescripcion =
document.getElementById("descripcion");

const txtPrecio =
document.getElementById("precio");

const txtStock =
document.getElementById("stock");

let inventarioActual = null;

async function cargarProductos(){

    try{

        const productos =
        await productoService.get();

        cmbProducto.innerHTML = `
            <option value="">
                Seleccione
            </option>
        `;

        productos.forEach(producto => {

            cmbProducto.innerHTML += `
                <option value="${producto.idProducto}">
                    ${producto.nombreProducto}
                </option>
            `;
        });

    }
    catch(error){

        console.error(error);

        alert(
            "Error cargando productos"
        );
    }
}

async function cargarInventario(){

    try{

        const inventario =
        await inventarioService.getByProducto(
            idProducto
        );

        inventarioActual =
        inventario;

        cmbProducto.value =
        inventario.idProducto;

        txtDescripcion.value =
        inventario.descripcion;

        txtPrecio.value =
        inventario.precio;

        txtStock.value =
        inventario.stock;
    }
    catch(error){

        console.error(error);

        alert(
            "No se pudo cargar el inventario"
        );
    }
}

document.addEventListener(
"DOMContentLoaded",
async () => {

    if(!idProducto){

        alert(
            "No se encontró el ID"
        );

        window.location.href =
        "Inventario.html";

        return;
    }

    await cargarProductos();

    await cargarInventario();

    document
    .getElementById("form-agregar-compras")
    .addEventListener(
    "submit",
    async function(e){

        e.preventDefault();

        try{

            const request =
            new InventarioRequest(

                txtDescripcion.value,

                parseFloat(
                    txtPrecio.value
                ),

                parseInt(
                    txtStock.value
                ),

                parseInt(
                    cmbProducto.value
                ),

                inventarioActual.nombreProducto
            );

            request.id_Inventario =
            inventarioActual.idInventario;

            await inventarioService.update(
                request
            );

            alert(
                "Inventario actualizado correctamente"
            );

            window.location.href =
            "/Inventario/Inventario.html";
        }
        catch(error){

            console.error(error);

            alert(
                "Error al actualizar inventario"
            );
        }
    });
});