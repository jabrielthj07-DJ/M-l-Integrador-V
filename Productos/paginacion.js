const API_URL = "https://localhost:7030/api/Producto";

let productos = [];

let paginaActual = 1;

const registrosPorPagina = 7;

async function cargarProductos() {

    const token = localStorage.getItem("token");

    try {

        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {

            throw new Error("Error al obtener productos");

        }

        productos = await response.json();

        setTimeout(() => {

            mostrarPagina();

        }, 500);

    }
    catch (error) {

        console.error(error);

        document.getElementById("tablaProductos").innerHTML = `
            <tr>
                <td colspan="3">
                    Error al cargar productos
                </td>
            </tr>
        `;

    }

}

function mostrarPagina() {

    const tbody =
        document.getElementById("tablaProductos");

    tbody.innerHTML = "";

    const inicio =
        (paginaActual - 1) * registrosPorPagina;

    const fin =
        inicio + registrosPorPagina;

    const productosPagina =
        productos.slice(inicio, fin);

    productosPagina.forEach(producto => {

        const fila =
            document.createElement("tr");

        fila.innerHTML = `
            <td>${producto.nombre_Producto}</td>

            <td>${producto.descripcion}</td>

            <td class="acciones">

                <button class="btn-editar">
                    Editar
                </button>

                <button class="btn-eliminar">
                    Eliminar
                </button>

            </td>
        `;

        tbody.appendChild(fila);

    });

    document.getElementById("paginaActual")
        .textContent = `Página ${paginaActual}`;

}

document.getElementById("btnSiguiente")
.addEventListener("click", () => {

    const totalPaginas =
        Math.ceil(productos.length / registrosPorPagina);

    if (paginaActual < totalPaginas) {

        paginaActual++;

        mostrarPagina();

    }

});

document.getElementById("btnAnterior")
.addEventListener("click", () => {

    if (paginaActual > 1) {

        paginaActual--;

        mostrarPagina();

    }

});

cargarProductos();