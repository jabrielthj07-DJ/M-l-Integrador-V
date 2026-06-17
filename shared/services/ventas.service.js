import HttpService from "../services/http.service.js";
import VentasRequest from "../models/request/ventas.request.js";
import { VentasResponse } from "../models/response/ventas.response.js";

export default class VentasService extends HttpService {

    endpoint = "/Ventas";

    async get(){

        const json = await super.get(this.endpoint);

        if(!Array.isArray(json))
            return [];

        return json.map(
            item => VentasResponse.fromJson(item)
        );
    }

    async getById(id){

        const json =
        await super.get(`${this.endpoint}/${id}`);

        return VentasResponse.fromJson(json);
    }

    async create(ventasRequest){

        if(!(ventasRequest instanceof VentasRequest))
            throw new Error("Venta inválida");

        return await super.post(
            this.endpoint,
            ventasRequest.toJson()
        );
    }

    async delete(id){

        return await super.delete(
            `${this.endpoint}/${id}`
        );
    }
}