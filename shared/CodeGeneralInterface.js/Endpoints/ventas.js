import VentasService from "../../services/ventas.service.js";

const service = new VentasService();

let todasVentas = [];

let paginaActual = 1;
const registrosPorPagina = 7;

async function loadVentas() {

    try {

        todasVentas = await service.get();

        mostrarPagina();

    } catch (error) {

        console.error(error);

    }
}

function mostrarPagina() {

    const inicio =
        (paginaActual - 1) * registrosPorPagina;

    const fin =
        inicio + registrosPorPagina;

    const ventasPagina =
        todasVentas.slice(inicio, fin);

    renderizarVentas(ventasPagina);

    actualizarPaginacion();
}

function renderizarVentas(ventas) {

    const table =
        document.getElementById("tablaventas");

    table.innerHTML = "";

    if (ventas.length === 0) {

        table.innerHTML = `
        <tr>
            <td colspan="7">
                No se encontraron registros
            </td>
        </tr>
        `;

        return;
    }

    ventas.forEach(venta => {

        const detalle =
            venta.detalles?.[0];

        table.innerHTML += `
        <tr>

            <td>${venta.fechaVenta}</td>

            <td>${venta.nombre}</td>

            <td>C$ ${venta.total}</td>

            <td>${detalle?.nombreProducto ?? ""}</td>

            <td>${detalle?.cantidad ?? ""}</td>

            <td>C$ ${detalle?.precioUnitario ?? ""}</td>

            <td class="acciones">

                <button
                class="btn-eliminar"
                onclick="eliminarVenta(${venta.idVenta})">
                    Eliminar
                </button>

                <button
                class="btn-imprimir"
                onclick="imprimirVenta(${venta.idVenta})">
                    Imprimir
                </button>

            </td>

        </tr>
        `;
    });
}

function actualizarPaginacion() {

    const totalPaginas =
        Math.ceil(
            todasVentas.length /
            registrosPorPagina
        );

    document.getElementById(
        "paginaActual"
    ).textContent =
    `Página ${paginaActual} de ${totalPaginas}`;
}

document
.getElementById("btnSiguiente")
.addEventListener("click", () => {

    const totalPaginas =
        Math.ceil(
            todasVentas.length /
            registrosPorPagina
        );

    if (paginaActual < totalPaginas) {

        paginaActual++;

        mostrarPagina();

    }
});

document
.getElementById("btnAnterior")
.addEventListener("click", () => {

    if (paginaActual > 1) {

        paginaActual--;

        mostrarPagina();

    }
});

document
.getElementById("buscarVenta")
.addEventListener("input", function() {

    const texto =
        this.value.toLowerCase();

    const filtradas =
        todasVentas.filter(venta => {

            const detalle =
                venta.detalles?.[0];

            return (

                venta.nombre
                ?.toLowerCase()
                .includes(texto)

                ||

                venta.fechaVenta
                ?.toLowerCase()
                .includes(texto)

                ||

                detalle?.nombreProducto
                ?.toLowerCase()
                .includes(texto)

                ||

                venta.total
                ?.toString()
                .includes(texto)

                ||

                detalle?.cantidad
                ?.toString()
                .includes(texto)

            );

        });

    renderizarVentas(filtradas);

    document.getElementById(
        "paginaActual"
    ).textContent =
    `Resultados encontrados: ${filtradas.length}`;
});

window.eliminarVenta =
async function(id) {

    const confirmar =
        confirm("¿Eliminar venta?");

    if (!confirmar)
        return;

    try {

        await service.delete(id);

        await loadVentas();

        alert(
            "Venta eliminada correctamente"
        );

    } catch (error) {

        console.error(error);

        alert(
            "No se pudo eliminar"
        );

    }
};

window.imprimirVenta =
function(id) {

    window.open(
        `/Ventas/Factura.html?id=${id}`,
        "_blank"
    );
};

loadVentas();  