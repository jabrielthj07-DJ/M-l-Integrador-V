export class ProductoResponse {

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

    static fromJson(json){

        return new ProductoResponse(
            json.id_Producto,
            json.nombre_Producto,
            json.descripcion,
            json.id_Categoria
        );
    }
}