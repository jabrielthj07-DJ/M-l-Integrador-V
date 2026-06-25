//creamos metodo responsive para compras
import { DetalleCompraResponse }
from "./detallecompra.response.js";
export class CompraResponse{
    //contructor de los datos
    constructor(
        Id_Compra,
        Id_Proveedor,
        fecha_Compra,
        total,
        Observaciones,
        detalles
    ){
        this.Id_Compra = Id_Compra;
        this.fecha_Compra = fecha_Compra;
        this.Total = Total;
        this.Observaciones = Observaciones;
        this.detalles = detalles;

    }
    //metodo estatico
    static fromJson(json){
        return CompraResponse(
            json.Id_Compra,
            json.Id_Proveedor,
            json.fecha_Compra,
            json.total,
            json.Observaciones,
            
            (json.detalles || []).map(

                 detalle =>
                DetalleCompraResponse.fromJson(detalle)
            )
            
          );
    
    }
        
}