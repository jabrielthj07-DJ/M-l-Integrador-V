import ProveedorService from "../../services/proveedor.service.js";
import ProductoService from "../../services/producto.service.js";
import ProveedorRequest from "../../models/request/proveedor.request.js";

const proveedorService = new ProveedorService();
const productoService = new ProductoService();

const txtNombre = document.getElementById("nombre");
const txtApellido = document.getElementById("apellido");
const txtEmail = document.getElementById("email");
const txtTelefono = document.getElementById("telefono");
const txtRazon = document.getElementById("razonSocial");
const txtDireccion = document.getElementById("direccion");
const cmbProducto = document.getElementById("idProducto");

const form = document.getElementById("form-agregar-compras");

document.addEventListener("DOMContentLoaded", async () => {

    await cargarProductos();

});

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    await guardar();

});

async function cargarProductos() {

    try {

        const productos = await productoService.get();

        cmbProducto.innerHTML = `
            <option value="">
                Seleccione un producto
            </option>
        `;

        productos.forEach(producto => {

            cmbProducto.innerHTML += `
                <option value="${producto.idProducto}">
                    ${producto.nombreProducto}
                </option>
            `;

        });

    } catch (error) {

        console.error(error);

        alert("Error al cargar productos");

    }
}

async function guardar() {

    try {

        const req = new ProveedorRequest(
            0,
            txtNombre.value.trim(),
            txtApellido.value.trim(),
            txtEmail.value.trim(),
            txtTelefono.value.trim(),
            txtRazon.value.trim(),
            txtDireccion.value.trim(),
            parseInt(cmbProducto.value)
        );

        await proveedorService.create(req);

        alert("Proveedor guardado correctamente");

        limpiar();

        window.location.href = "Proovedores.Html";

    } catch (error) {

        console.error(error);

        alert("Error al guardar proveedor");

    }
}

function limpiar() {

    txtNombre.value = "";
    txtApellido.value = "";
    txtEmail.value = "";
    txtTelefono.value = "";
    txtRazon.value = "";
    txtDireccion.value = "";
    cmbProducto.value = "";

}