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
        console.error("Error al cargar compras:", error);
    }
}

function mostrarPagina() {
    const inicio = (paginaActual - 1) * registrosPorPagina;
    const fin = inicio + registrosPorPagina;
    const comprasPagina = todasCompras.slice(inicio, fin);

    renderizarCompras(comprasPagina);
    actualizarPaginacion(todasCompras.length);
}

function renderizarCompras(compras) {
    // Apunta al ID correcto en tu HTML de listado de compras
    const table = document.getElementById("tablacompras") || document.getElementById("tablaventas");
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
        const detalle = compra.detalles?.[0];
        
        // Failsafe para extraer IDs y nombres dinámicamente si el backend varía las propiedades
        const idCompra = compra.idCompra ?? compra.id_Compra ?? compra.idVenta ?? compra.id;
        const fecha = compra.fechaCompra ?? compra.fecha_Compra ?? compra.fechaVenta ?? "N/A";
        const total = parseFloat(compra.total || 0).toFixed(2);
        
        // Datos del detalle
        const producto = detalle?.nombreProducto ?? detalle?.nombre_Producto ?? compra.nombreProducto ?? "N/A";
        const cantidad = detalle?.cantidad ?? compra.cantidad ?? "";
        const precioUnit = parseFloat(detalle?.precioUnitario ?? detalle?.precio_Unitario ?? compra.precioUnitario ?? 0).toFixed(2);

        table.innerHTML += `
        <tr>
            <td>${fecha}</td>
            <td>${compra.nombre ?? compra.usuario ?? "Admin"}</td>
            <td>C$ ${total}</td>
            <td>${detalle?.nombreProducto ?? ""}</td>
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

function actualizarPaginacion(totalRegistros) {
    const totalPaginas = Math.ceil(totalRegistros / registrosPorPagina) || 1;
    const elementoPagina = document.getElementById("paginaActual");
    if (elementoPagina) {
        elementoPagina.textContent = `Página ${paginaActual} de ${totalPaginas}`;
    }
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
        const detalle = compra.detalles?.[0];
        const fecha = (compra.fechaCompra ?? compra.fecha_Compra ?? compra.fechaVenta ?? "").toString().toLowerCase();
        const usuario = (compra.nombre ?? compra.usuario ?? "").toLowerCase();
        const producto = (detalle?.nombreProducto ?? detalle?.nombre_Producto ?? compra.nombreProducto ?? "").toLowerCase();
        const total = (compra.total ?? "").toString();

        return (
            usuario.includes(texto) ||
            fecha.includes(texto) ||
            producto.includes(texto) ||
            total.includes(texto)
        );
    });

    renderizarCompras(filtradas);
    
    const elementoPagina = document.getElementById("paginaActual");
    if (elementoPagina) {
        elementoPagina.textContent = `Resultados encontrados: ${filtradas.length}`;
    }
});

// Exponer funciones globales de acción para los botones inline de la tabla
window.eliminarCompra = async function(id) {
    const confirmar = confirm("¿Está seguro de eliminar este registro de compra?");
    if (!confirmar) return;

    try {
        await service.delete(id);
        await loadCompras();
        alert("Compra eliminada correctamente");
    } catch (error) {
        console.error("Error al eliminar compra:", error);
        alert("No se pudo eliminar el registro");
    }
};

window.imprimirCompra = function(id) {
    // Redirecciona directamente a la carpeta de Compras con la bandera para lanzar el diálogo de impresión
    window.open(
        `/Ventas/Factura.html?id=${id}&print=true`,
        "_blank"
    );
};

// Inicializar ejecución
loadCompras();