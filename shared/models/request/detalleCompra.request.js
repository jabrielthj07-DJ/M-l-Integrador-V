//
export default class DetalleCompraRequest {

    constructor(
        idProducto,
        cantidad,
        precioUnitario,
        nombreProducto // 👈 ¡Debes recibirlo aquí!
    ){
        this.id_Producto = idProducto;
        this.cantidad = cantidad;
        this.precio_Unitario = precioUnitario;
        // ¡ESTA ES LA LÍNEA CRUCIAL QUE TE PIDE EL ERROR!
        this.Nombre_Producto = nombreProducto;
    }

    toJson(){
        return {
            id_Producto: this.id_Producto, // Asegura que viaje como entero
            cantidad: this.cantidad,
            precio_Unitario: this.precio_Unitario,
            Nombre_Producto: this.nombreProducto // 👈 ¡ESTA es la línea crucial para la factura!
        };
    }
}