//
export default class DetalleCompraRequest {

    constructor(
        idProducto,
        cantidad,
        precioUnitario
    ){
        this.id_Producto = idProducto;
        this.cantidad = cantidad;
        this.precio_Unitario = precioUnitario;
    }

    toJson(){
        return {
            id_Producto: this.id_Producto,
            cantidad: this.cantidad,
            precio_Unitario: this.precio_Unitario
        };
    }
}