export default class VentasRequest {

    constructor(
        idUsuario,
        fechaVenta,
        total,
        detalles = []
    ){
        this.id_Usuario = idUsuario;
        this.fecha_Venta = fechaVenta;
        this.total = total;
        this.detalles = detalles;
    }

    toJson(){

        return {

            id_Usuario: this.id_Usuario,
            fecha_Venta: this.fecha_Venta,
            total: this.total,
            detalles: this.detalles.map(
                detalle => detalle.toJson()
            )
        };
    }
}