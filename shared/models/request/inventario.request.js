export default class InventarioRequest {

    constructor(
        descripcion,
        precio,
        stock,
        idProducto,
        nombreProducto = null
    ){
        this.id_Inventario = 0;

        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.id_Producto = idProducto;
        this.nombre_Producto = nombreProducto;
    }

    toJson(){

        return {

            id_Inventario: this.id_Inventario,

            descripcion: this.descripcion,
            precio: this.precio,
            stock: this.stock,
            id_Producto: this.id_Producto,
            nombre_Producto: this.nombre_Producto
        };
    }
}