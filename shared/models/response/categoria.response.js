export class CategoriaResponse {

    constructor(
        idCategoria,
        nombreCategoria,
        descripcion
    ) {

        this.idCategoria = idCategoria;
        this.nombreCategoria = nombreCategoria;
        this.descripcion = descripcion;
    }

    static fromJson(json) {

        return new CategoriaResponse(
            json.id_Categoria,
            json.nombre_Categoria,
            json.descripcion
        );
    }
}