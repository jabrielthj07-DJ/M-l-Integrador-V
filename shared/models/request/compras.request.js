export default class ComprasRequest {
    constructor(
        idProveedor,       // 👈 Ahora pasamos el ID numérico para la base de datos
        nombreProveedor,
        fechaCompra,
        total,
        observaciones = "",
        detalles = []
    ){
        this.id_Proveedor = idProveedor;
        this.nombre = nombreProveedor; // El backend pide 'Nombre'
        this.fecha_Compra = fechaCompra;
        this.total = total;
        this.observaciones = observaciones;
        this.detalles = detalles; // Arreglo de items agregados
    }

    toJson(){
        return {
            // Ajustado a las propiedades exactas que lee tu API de C#
            // AQUÍ ESTÁ LA SOLUCIÓN: Enviamos la propiedad numérica exacta que espera la FK en C#
            id_Proveedor: this.id_Proveedor,
            Nombre: this.nombre, 
            fecha_Compra: this.fecha_Compra,
            total: this.total,
            Observaciones: this.observaciones,
              detalles: this.detalles.map(
            detalle => detalle.toJson()
              )
            
         
        };
    }
}