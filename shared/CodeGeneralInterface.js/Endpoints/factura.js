import VentasService from "../../services/ventas.service.js";

const ventasService = new VentasService();

const params =
new URLSearchParams(window.location.search);

const idVenta =
parseInt(params.get("id"));
//se agrego para que inprima la factura
const shouldPrint = params.get("print") === "true";
//===================================================
async function cargarFactura() {

    try {

        if (isNaN(idVenta)) {

            alert("No se recibió el ID de la venta");

            return;
        }

        console.log("ID recibido:", idVenta);

        const venta =
        await ventasService.getById(idVenta);

        console.log("Venta:", venta);

        document.getElementById("idVenta").textContent =
        `FAC-${venta.idVenta.toString().padStart(5, "0")}`;

        document.getElementById("fecha").textContent =
        new Date(venta.fechaVenta)
        .toLocaleDateString("es-NI");

        document.getElementById("usuario").textContent =
        venta.nombre;

        const tbody =
        document.getElementById("detalleFactura");

        tbody.innerHTML = "";

        let totalGeneral = 0;

        venta.detalles.forEach(detalle => {

            const subtotal =
            detalle.cantidad *
            detalle.precioUnitario;

            totalGeneral += subtotal;

            tbody.innerHTML += `
                <tr>
                    <td>${detalle.nombreProducto}</td>
                    <td>${detalle.cantidad}</td>
                    <td>C$ ${detalle.precioUnitario.toFixed(2)}</td>
                    <td>C$ ${subtotal.toFixed(2)}</td>
                </tr>
            `;
        });

        document.getElementById("totalGeneral").textContent =
        totalGeneral.toFixed(2);
  // para imprimir la factura 
        if (shouldPrint) {
            window.print();
        }

    }
    catch (error) {

        console.error(error);

        alert("No se pudo cargar la factura");
    }
    //========================= 
}

cargarFactura();