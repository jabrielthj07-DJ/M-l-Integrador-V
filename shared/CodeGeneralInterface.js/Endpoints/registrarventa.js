import UsuarioService from "../../services/usuario.service.js";
import InventarioService from "../../services/inventario.service.js";
import VentasService from "../../services/ventas.service.js";

import VentasRequest from "../../models/request/ventas.request.js";
import DetalleVentaRequest from "../../models/request/detalleventa.request.js";

const usuarioService = new UsuarioService();
const inventarioService = new InventarioService();
const ventasService = new VentasService();

const cmbUsuario =
document.getElementById("usuario");

const cmbProducto =
document.getElementById("producto");

const txtCantidad =
document.getElementById("cantidad");

const txtPrecio =
document.getElementById("precioUnitario");

const txtTotal =
document.getElementById("total");

const txtFecha =
document.getElementById("fecha");

let inventarios = [];

async function cargarUsuarios() {

    try {

        const usuarios =
        await usuarioService.get();

        cmbUsuario.innerHTML =
        `<option value="">Seleccione un usuario</option>`;

        usuarios.forEach(usuario => {

            cmbUsuario.innerHTML += `
                <option value="${usuario.id_Usuario}">
                    ${usuario.nombre}
                </option>
            `;
        });

    } catch(error) {

        console.error(
            "Error cargando usuarios:",
            error
        );
    }
}

async function cargarProductos() {

    try {

        inventarios =
        await inventarioService.get();

        cmbProducto.innerHTML =
        `<option value="">Seleccione un producto</option>`;

        inventarios.forEach(item => {

            cmbProducto.innerHTML += `
                <option value="${item.idProducto}">
                    ${item.nombreProducto}
                </option>
            `;
        });

    } catch(error) {

        console.error(
            "Error cargando inventario:",
            error
        );
    }
}

function calcularTotal() {

    const cantidad =
    parseInt(txtCantidad.value) || 0;

    const precio =
    parseFloat(txtPrecio.value) || 0;

    txtTotal.value =
    (cantidad * precio).toFixed(2);
}

cmbProducto.addEventListener(
"change",
() => {

    const producto =
    inventarios.find(

        x =>
        x.idProducto ==
        cmbProducto.value
    );

    if(!producto)
        return;

    txtPrecio.value =
    producto.precio;

    calcularTotal();
});

txtCantidad.addEventListener(
"input",
calcularTotal
);

document.addEventListener(
"DOMContentLoaded",
async () => {

    await cargarUsuarios();
    await cargarProductos();

    txtFecha.value =
    new Date()
    .toISOString()
    .split("T")[0];

    document
    .getElementById("form-agregar-ventas")
    .addEventListener(
    "submit",
    async e => {

        e.preventDefault();

        try {

            const producto =
            inventarios.find(

                x =>
                x.idProducto ==
                cmbProducto.value
            );

            if(!producto){

                alert(
                    "Seleccione un producto"
                );

                return;
            }

            const cantidad =
            parseInt(txtCantidad.value);

            if(cantidad > producto.stock){

                alert(
                    `Stock insuficiente. Disponible: ${producto.stock}`
                );

                return;
            }

            const detalle =
            new DetalleVentaRequest(

                parseInt(
                    cmbProducto.value
                ),

                cantidad,

                parseFloat(
                    txtPrecio.value
                )
            );

            const venta =
            new VentasRequest(

                parseInt(
                    cmbUsuario.value
                ),

                txtFecha.value,

                parseFloat(
                    txtTotal.value
                ),

                [detalle]
            );

            await ventasService.create(
                venta
            );

            alert(
                "Venta registrada correctamente"
            );

            window.location.href =
            "/Ventas/Ventas.html";

        }
        catch(error){

            console.error(error);

            alert(
                "Error al registrar la venta"
            );
        }
    });
});

