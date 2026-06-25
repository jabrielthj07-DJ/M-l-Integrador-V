import ProveedorService from "../../services/proveedor.service.js";

const service = new ProveedorService();

const tabla = document.getElementById("tablaProveedores");

async function cargarProveedores() {

    try {

        const proveedores = await service.get();

        tabla.innerHTML = "";

        proveedores.forEach(p => {

            tabla.innerHTML += `
                <tr>
                    <td>${p.nombre}</td>
                    <td>${p.apellido}</td>
                    <td>${p.email}</td>
                    <td>${p.telefono}</td>
                    <td>${p.razonSocial}</td>
                    <td>${p.direccion}</td>
                    <td>${p.idProducto}</td>
                    <td>
                        <button class="btn-editar">Editar</button>
                    </td>
                </tr>
            `;
        });

    } catch (error) {
        console.error(error);
    }
}

// botón agregar
document.querySelector(".btn-agregar").addEventListener("click", () => {
    window.location.href = "RegistrarProveedor.html";
});

cargarProveedores();

// Buscadorimprovisado por nombre
document
.getElementById("buscarProveedor")
.addEventListener("input", function () {

    const texto = this.value.toLowerCase();

    const filtrados = todosProveedores.filter(p =>

        p.nombre.toLowerCase().includes(texto) ||
        p.apellido.toLowerCase().includes(texto) ||
        p.email.toLowerCase().includes(texto) ||
        p.razonSocial.toLowerCase().includes(texto)

    );

    renderizarProveedores(filtrados);

});