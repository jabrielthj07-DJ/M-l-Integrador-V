import { DetalleVentaResponse }
from "./detalleventa.response.js";

export class VentasResponse {

    constructor(
        idVenta,
        idUsuario,
        fechaVenta,
        nombre,
        total,
        detalles
    ){
        this.idVenta = idVenta;
        this.idUsuario = idUsuario;
        this.fechaVenta = fechaVenta;
        this.nombre = nombre;
        this.total = total;
        this.detalles = detalles;
    }

    static fromJson(json){

        return new VentasResponse(

            json.id_Venta,
            json.id_Usuario,
            json.fecha_Venta,
            json.nombre,
            json.total,

            (json.detalles || []).map(
                detalle =>
                DetalleVentaResponse.fromJson(detalle)
            )
        );
    }
}