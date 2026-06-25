export default class ComprasRequest {
    constructor(
        idProveedor,
        fechaCompra,
        total,
        observaciones = "",
        detalles = []
    ){
        this.id_Proveedor = idProveedor;
        this.fecha_Compra = fechaCompra;
        this.total = total;
        this.observaciones = observaciones;
        this.detalles = detalles;
    }
    toJson(){
      return{
        id_Proveedor: this.id_Proveedor,
        fecha_Compra: this.fecha_Compra,
        total: this.total,
        observaciones: this.observaciones,
        detalles : this.detalles.map(
            detalle => detalle.toJson()
        )
      };
    }
}