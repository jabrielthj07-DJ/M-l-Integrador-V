//exportamos la clase de detalles de compras y sus datos
export class DetalleCompraResponse{
    constructor(
        idDetalleCompra,
        idProducto,
        cantidad,
        precioUnitario,
        subtotal
    ){
        this.idDetalleCompra = idDetalleCompra;
        this.idProducto = idProducto;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
        this.subtotal = subtotal;
    }

    //metodo statico formato json 
    static fromJson (json){
        return new DetalleCompraResponse(
        json.id_Detalle_Compra,
        json.id_Producto,
        json.cantidad,
        json.precio_Unitario,
        json.subtotal
        
        );
      
    }
}