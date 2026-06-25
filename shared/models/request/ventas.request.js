export default class VentasRequest {

    constructor(
        idUsuario,
        fechaVenta,
        total,
        detalles = [],
        nombre = "" // 1. Agregamos el parámetro nombre aquí
    ){
        this.id_Usuario = idUsuario;
        this.fecha_Venta = fechaVenta;
        this.total = total;
        this.detalles = detalles;
        this.nombre = nombre; // 2. Guardamos el nombre en la instancia
    }

    toJson(){

        return {

            id_Usuario: this.id_Usuario,
            fecha_Venta: this.fecha_Venta,
            total: this.total,
            detalles: this.detalles.map(
            detalle => detalle.toJson()
            ),
            // 3. ¡ESTA ES LA LÍNEA CRUCIAL! 
            // Enviamos la propiedad "Nombre" exactamente como la pide el Servidor C#
            Nombre: this.nombre
        };
    }
}