
import HttpService from "../services/http.service.js";
import ProductoRequest from "../models/request/producto.request.js";
import { ProductoResponse } from "../models/response/producto.response.js";

export default class ProductoService extends HttpService {

    endpoint = "/Producto";

    async get(){

        const json = await super.get(this.endpoint);

        if(!Array.isArray(json))
            return [];

        return json.map(
            item => ProductoResponse.fromJson(item)
        );
    }

    async getById(id){

        const json = await super.get(
            `${this.endpoint}/${id}`
        );

        return ProductoResponse.fromJson(json);
    }

    async create(productoRequest){

        if(!(productoRequest instanceof ProductoRequest))
            throw new Error("Producto inválido");

        return await super.post(
            this.endpoint,
            productoRequest.toJson()
        );
    }

    async update(id, productoRequest){

        if(!(productoRequest instanceof ProductoRequest))
            throw new Error("Producto inválido");

        return await super.put(
            `${this.endpoint}/${id}`,
            productoRequest.toJson()
        );
    }

    async delete(id){

        return await super.delete(
            `${this.endpoint}/${id}`
        );
    }
}