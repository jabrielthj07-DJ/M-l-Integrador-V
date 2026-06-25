export default class ProveedorRequest {

    constructor(
        idProveedor,
        nombre,
        apellido,
        email,
        telefono,
        razonSocial,
        direccion,
        idProducto
    ) {
        this.idProveedor = idProveedor;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.telefono = telefono;
        this.razonSocial = razonSocial;
        this.direccion = direccion;
        this.idProducto = idProducto;
    }

    toJson() {
        return {
            id_Proveedor: this.idProveedor || 0,
            nombre: this.nombre,
            apellido: this.apellido,
            email: this.email,
            telefono: this.telefono,
            razon_Social: this.razonSocial,
            direccion: this.direccion,
            id_Producto: this.idProducto
        };
    }
}