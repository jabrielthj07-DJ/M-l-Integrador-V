import Compraservice from "../../services/compra.service.js";

const service = new Compraservice();

let todasCompras = [];

let paginaActual = 1;
const registrosPorPagina = 7;

async function loadCompras() {
    try {
        todasCompras = await service.get();
        mostrarPagina();
    } catch (error) {
        console.error(error);
    }
}

function mostrarPagina() {
    const inicio = (paginaActual - 1) * registrosPorPagina;
    const fin = inicio + registrosPorPagina;
    const comprasPagina = todasCompras.slice(inicio, fin);

    renderizarCompras(comprasPagina);
    actualizarPaginacion();
}

function renderizarCompras(compras) {
    const table = document.getElementById("tablacompras");
    if (!table) return;

    table.innerHTML = "";

    if (compras.length === 0) {
        table.innerHTML = `
        <tr>
            <td colspan="7" class="text-center">
                No se encontraron registros de compras
            </td>
        </tr>
        `;
        return;
    }

    compras.forEach(compra => {
        // Obtenemos los detalles respetando las propiedades exactas que envía C#
        const listaDetalles = compra.Detalles ?? compra.detalles ?? [];
        const detalle = listaDetalles[0]; 

        const idCompra = compra.IdCompra ?? compra.idCompra ?? compra.id;
        
        // Limpieza de formato de fecha (Remueve la "T" si viene con la estampa de tiempo)
        let fecha = compra.FechaCompra ?? compra.fechaCompra ?? compra.fecha ?? "N/A";
        if (fecha.includes("T")) {
            fecha = fecha.split("T")[0].split("-").reverse().join("/");
        }

        const total = parseFloat(compra.Total ?? compra.total ?? 0).toFixed(2);
        const proveedor = compra.Nombre ?? compra.nombre ?? "N/A";
        const producto = detalle?.Nombre_Producto ?? detalle?.nombreProducto ?? "N/A";
        const cantidad = detalle?.Cantidad ?? detalle?.cantidad ?? 0;
        
        const precioUnit = parseFloat(
            detalle?.Precio_Unitario ?? detalle?.precioUnitario ?? 0
        ).toFixed(2);

        table.innerHTML += `
        <tr>
            <td>${fecha}</td>
            <td>${proveedor}</td>
            <td>C$ ${total}</td>
            <td>${producto}</td>
            <td>${cantidad}</td>
            <td>C$ ${precioUnit}</td>
            <td class="acciones">
                <button class="btn-eliminar" onclick="eliminarCompra(${idCompra})">
                    Eliminar
                </button>
                <button class="btn-imprimir" onclick="imprimirCompra(${idCompra})">
                    Imprimir
                </button>
            </td>
        </tr>
        `;
    });
}

function actualizarPaginacion() {
    const totalPaginas = Math.ceil(todasCompras.length / registrosPorPagina) || 1;
    document.getElementById("paginaActual").textContent = `Página ${paginaActual} de ${totalPaginas}`;
}

document.getElementById("btnSiguiente")?.addEventListener("click", () => {
    const totalPaginas = Math.ceil(todasCompras.length / registrosPorPagina);
    if (paginaActual < totalPaginas) {
        paginaActual++;
        mostrarPagina();
    }
});

document.getElementById("btnAnterior")?.addEventListener("click", () => {
    if (paginaActual > 1) {
        paginaActual--;
        mostrarPagina();
    }
});

document.getElementById("buscarCompra")?.addEventListener("input", function() {
    const texto = this.value.toLowerCase();

    const filtradas = todasCompras.filter(compra => {
        const listaDetalles = compra.Detalles ?? compra.detalles ?? [];
        const detalle = listaDetalles[0];
        
        let fecha = compra.FechaCompra ?? compra.fechaCompra ?? compra.fecha ?? "";

        return (
            (compra.Nombre ?? compra.nombre ?? "").toLowerCase().includes(texto) ||
            fecha.toLowerCase().includes(texto) ||
            (detalle?.Nombre_Producto ?? detalle?.nombreProducto ?? "").toLowerCase().includes(texto) ||
            (compra.Total ?? compra.total ?? "").toString().includes(texto) ||
            (detalle?.Cantidad ?? detalle?.cantidad ?? "").toString().includes(texto)
        );
    });

    renderizarCompras(filtradas);
    document.getElementById("paginaActual").textContent = `Resultados encontrados: ${filtradas.length}`;
});

window.eliminarCompra = async function(id) {
    const confirmar = confirm("¿Está seguro de que desea eliminar esta compra?");
    if (!confirmar) return;

    try {
        await service.delete(id);
        await loadCompras();
        alert("Compra eliminada correctamente");
    } catch (error) {
        console.error(error);
        alert("No se pudo eliminar la compra");
    }
};

window.imprimirCompra = function(id) {
    window.open(`/Compras/Factura.html?id=${id}&print=true`, "_blank");
};

// Ejecución inicial al cargar la vista
loadCompras();