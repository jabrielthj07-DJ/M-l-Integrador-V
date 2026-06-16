export default class InventarioRequest {

    constructor(
        descripcion,
        precio,
        stock,
        idProducto,
        nombreProducto = null
    ){
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.id_Producto = idProducto;
        this.nombre_Producto = nombreProducto;
    }

    toJson(){

        return {

            descripcion: this.descripcion,
            precio: this.precio,
            stock: this.stock,
            id_Producto: this.id_Producto,
            nombre_Producto: this.nombre_Producto
        };
    }
}