export class DetalleVentaResponse {

    constructor(
        idDetalleVenta,
        idProducto,
        nombreProducto,
        cantidad,
        precioUnitario
    ){
        this.idDetalleVenta = idDetalleVenta;
        this.idProducto = idProducto;
        this.nombreProducto = nombreProducto;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
    }

    static fromJson(json){

        return new DetalleVentaResponse(

            json.id_Detalle_Venta,
            json.id_Producto,
            json.nombre_Producto,
            json.cantidad,
            json.precio_Unitario
        );
    }
}