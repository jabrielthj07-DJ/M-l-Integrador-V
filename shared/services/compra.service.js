// implementando los servicio de las compras 
import HttpService from "./http.service.js";
import { CompraResponse } from "../models/response/compras.response.js";
import ComprasRequest from "../models/request/compras.request.js";

export default class Compraservice extends HttpService {
    endepoint = "/Compras";

    // Método asíncrono get para obtener la lista de compras de productos
    async get(){
        const json = await super.get(this.endepoint);
        if (!Array.isArray(json)) return [];
        
        // Si notas que la tabla general también falla, puedes cambiar esto por: return json;
        return json.map(item => CompraResponse.fromJson(item));
    }

    // Retornamos el JSON puro para que la factura lea TODO directamente
    async getById(id){
        const json = await super.get(`${this.endepoint}/${id}`);
        
        // Retornamos 'json' directamente para asegurarnos de que no se pierda 
        // ninguna propiedad (como Proveedor o Producto) en el modelo JS.
        return json; 
    }

    async create(compraRequest){
        if (!(compraRequest instanceof ComprasRequest))
            throw new Error("Compra invalida");

        return await super.post(
            this.endepoint,
            compraRequest.toJson()
        );
    }
   
    // Corregido: Se agregó el parámetro 'id' que faltaba en la firma del método
    async delete(id){
        return await super.delete(
            `${this.endepoint}/${id}`
        );
    }
}