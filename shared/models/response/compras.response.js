//creamos metodo responsive para compras
import { DetalleCompraResponse }
from "./detallecompra.response.js";
export class CompraResponse{
    constructor(
        id_Compra,
        id_Proveedor,
        fecha_Compra,
        total,
        observaciones,
        detalles
    ){
        this.id_Compra = id_Compra;
        this.id_Proveedor = id_Proveedor;
        this.fecha_Compra = fecha_Compra;
        this.total = total;
        this.observaciones = observaciones;
        this.detalles = detalles;
    }
    static fromJson(json){
        return new CompraResponse(
            json.id_Compra ?? json.Id_Compra,
            json.id_Proveedor ?? json.Id_Proveedor,
            json.fecha_Compra,
            json.total,
            json.observaciones ?? json.Observaciones,
            (json.detalles || []).map(
                 detalle =>
                DetalleCompraResponse.fromJson(detalle)
            )
          );
    }
}