export default class ProductoRequest {

    constructor(
        idProducto,
        nombreProducto,
        descripcion,
        idCategoria
    ){
        this.idProducto = idProducto;
        this.nombreProducto = nombreProducto;
        this.descripcion = descripcion;
        this.idCategoria = idCategoria;
    }

    toJson(){

        return {

            id_Producto: this.idProducto,
            nombre_Producto: this.nombreProducto,
            descripcion: this.descripcion,
            id_Categoria: this.idCategoria

        };
    }
}