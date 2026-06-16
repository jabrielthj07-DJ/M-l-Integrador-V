export class InventarioResponse {

    constructor(
        idInventario,
        descripcion,
        precio,
        stock,
        idProducto,
        nombreProducto
    ){
        this.idInventario = idInventario;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.idProducto = idProducto;
        this.nombreProducto = nombreProducto;
    }

    static fromJson(json){

        return new InventarioResponse(
            json.id_Inventario,
            json.descripcion,
            json.precio,
            json.stock,
            json.id_Producto,
            json.nombre_Producto
        );
    }
}