import VentasService from "../../services/ventas.service.js";

const ventasService =
new VentasService();

const urlParams =
new URLSearchParams(window.location.search);

const idVenta =
parseInt(urlParams.get("id"));

async function cargarFactura(){

    try{

        const venta =
        await ventasService.getById(idVenta);

        const detalle =
        venta.detalles[0];

        document.getElementById("producto").textContent =
        detalle.nombreProducto;

        document.getElementById("precio").textContent =
        detalle.cantidad;

        document.getElementById("cantidad").textContent =
        detalle.precioUnitario;

    }catch(error){

        console.error(error);

        alert("No se pudo cargar factura");

    }
}

cargarFactura();