export class ProveedorResponse {

    constructor(
        id,
        nombre,
        apellido,
        email,
        telefono,
        razonSocial,
        direccion,
        idProducto
    ) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.telefono = telefono;
        this.razonSocial = razonSocial;
        this.direccion = direccion;
        this.idProducto = idProducto;
    }

    static fromJson(json) {
        return new ProveedorResponse(
            json.id_Proveedor,
            json.nombre,
            json.apellido,
            json.email,
            json.telefono,
            json.razon_Social,
            json.direccion,
            json.id_Producto
        );
    }
}