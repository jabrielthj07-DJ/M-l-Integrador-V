//implementando los servicio de las compras 
import HttpService from "./http.service.js";
import CompraRequest from "../models/request/compras.request.js";
import { CompraResponse } from "../models/response/compras.response.js";
import ComprasRequest from "../models/request/compras.request.js";

export default class Compraservice extends HttpService {
    endepoint = "/Compras";

    //metodo asincrono get para obtener las listas de la ventas de los productos
    async get(){
        const json= await super.get(this.endepoint);
          if(!Array.isArray(json))
                    return [];
        
                return json.map(
                    item => CompraResponse.fromJson(item)
                );
    }

    async getById(id){
        const json = 
        await super.get(`${this.endepoint}/${id}`)

        return CompraResponse.fromJson(json);
    }

    async create(compraResques){
        if(!(compraResques instanceof ComprasRequest))
            throw new Error("Compra invalida");

        return await super.post(
            this.endepoint,
            compraResques.toJson()
        );

    }
   
    async delete(){
        return await super.delete(
            `${this.endepoint}/${id}`
        );
    }
    
}