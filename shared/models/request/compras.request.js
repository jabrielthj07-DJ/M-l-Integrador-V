export default class ComprasRequest {
    constructor(
    //idCompra,
    idProveedor,
    fechaCompra,
    total,
    detalles = []

    ){
    //this.idCompra = idCompra;
    this.idProveedor = idProveedor;
    this.fechaCompra = fechaCompra;
    this.total = total;
    this.detalles = detalles;
    
    }
    toJson(){
      return{
        id_Proveedor: this.id_Proveedor,
        fecha_Compra: this.fecha_Compra,
        total: this.total,
        detalles : this.detalles.map(
            detalle => detalle.toJson()
        )
      };

    }
}