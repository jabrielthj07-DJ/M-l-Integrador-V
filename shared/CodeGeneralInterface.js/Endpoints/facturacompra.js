import Compraservice from "../../services/compra.service.js";

const service = new Compraservice();

const urlParams = new URLSearchParams(window.location.search);
const idCompra = urlParams.get("id");
const autoPrint = urlParams.get("print") === "true";

async function cargarDatosFactura() {
    if (!idCompra) {
        alert("ID de compra no especificado.");
        return;
    }

    try {
        const compra = await service.getById(idCompra);
        console.log("JSON directo del Backend:", compra); // Revisa qué propiedades trae en F12

        if (!compra) {
            alert("No se encontró el registro de la compra.");
            return;
        }

        // 1. ID de la Compra
        document.getElementById("idVenta").textContent = compra.idCompra ?? compra.IdCompra ?? compra.id ?? idCompra;

        // 2. Formatear Fecha
        let fechaLimpia = compra.fecha ?? compra.Fecha ?? compra.fechaCompra ?? "N/A";
        if (fechaLimpia.includes("T")) {
            fechaLimpia = fechaLimpia.split("T")[0].split("-").reverse().join("/");
        }
        document.getElementById("facturaFecha").textContent = fechaLimpia;

        // 3. Usuario
        document.getElementById("facturaUsuario").textContent = compra.usuario ?? compra.Usuario ?? "Admin";
        
        // 4. PROVEEDOR (Captura las variantes de objeto de navegación de EF Core)
        document.getElementById("facturaProveedor").textContent = 
            compra.nombre ?? 
            compra.Nombre ?? 
            compra.proveedor?.nombre ?? 
            compra.idProveedorNavigation?.nombre ?? "N/A";
        
        // 5. Total General
        const totalFinal = compra.total ?? compra.Total ?? 0;
        document.getElementById("facturaTotal").textContent = parseFloat(totalFinal).toFixed(2);

        // 6. Tabla de Detalles y Subtotales
        const tbody = document.getElementById("facturaDetalleBody");
        tbody.innerHTML = "";

        // Verificamos si vienen listas de detalles o si viene en un formato plano
        const detalles = compra.detalles ?? compra.Detalles ?? compra.detallesCompras ?? [];

        if (detalles.length > 0) {
            detalles.forEach(detalle => {
                const cantidad = detalle.cantidad ?? detalle.Cantidad ?? 0;
                const precio = detalle.precioUnitario ?? detalle.PrecioUnitario ?? detalle.precio_Unitario ?? detalle.Precio_Unitario ?? 0;
                const subtotal = cantidad * precio;
                const nombreProd = detalle.nombreProducto ?? detalle.NombreProducto ?? detalle.nombre_Producto ?? detalle.Nombre_Producto ?? detalle.idProductoNavigation?.nombreProducto ?? "Producto";

                tbody.innerHTML += `
                    <tr>
                        <td>${detalle.nombreProducto}</td>
                        <td>${cantidad}</td>
                        <td>C$ ${parseFloat(precio).toFixed(2)}</td>
                        <td>C$ ${subtotal.toFixed(2)}</td>
                    </tr>
                `;
            });
        } else {
            // Mapeo de respaldo si el backend envía la información en la raíz de la compra
            const cantidadPlana = compra.cantidad ?? compra.Cantidad ?? 2;
            const precioPlano = compra.precioUnitario ?? compra.PrecioUnitario ?? compra.precio_Unitario ?? compra.Precio_Unitario ?? 0;
            const subtotalPlano = cantidadPlana * precioPlano;
            const nombreProdPlano = compra.producto ?? compra.Producto ?? compra.nombreProducto ?? compra.NombreProducto ?? "Producto";

            tbody.innerHTML = `
                <tr>
                    <td>${nombreProdPlano}</td>
                    <td>${cantidadPlana}</td>
                    <td>C$ ${parseFloat(precioPlano).toFixed(2)}</td>
                    <td>C$ ${subtotalPlano.toFixed(2)}</td>
                </tr>
            `;
        }

        if (autoPrint) {
            setTimeout(() => { window.print(); }, 800);
        }

    } catch (error) {
        console.error("Error al generar la factura:", error);
        alert("Error cargando los detalles de la factura.");
    }
}

document.addEventListener("DOMContentLoaded", cargarDatosFactura);