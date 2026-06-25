export default class DetalleVentaRequest {

    constructor(
        idProducto,
        cantidad,
        precioUnitario,
        nombreProducto
    ){
        this.id_Producto = idProducto;
        this.cantidad = cantidad;
        this.precio_Unitario = precioUnitario;
        // ¡ESTA ES LA LÍNEA CRUCIAL QUE TE PIDE EL ERROR!
        this.Nombre_Producto = nombreProducto;
    }

    toJson(){
        return {
            id_Producto: this.id_Producto,
            cantidad: this.cantidad,
            precio_Unitario: this.precio_Unitario,
            Nombre_Producto: this.Nombre_Producto
        };
    }
}