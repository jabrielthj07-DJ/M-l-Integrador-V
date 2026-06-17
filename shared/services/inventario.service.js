import HttpService from "../services/http.service.js";
import InventarioRequest from "../models/request/inventario.request.js";
import { InventarioResponse } from "../models/response/inventario.response.js";

export default class InventarioService extends HttpService {

    endpoint = "/Inventario";

    async get(){

        const json = await super.get(this.endpoint);

        if(!Array.isArray(json))
            return [];

        return json.map(
            item => InventarioResponse.fromJson(item)
        );
    }

    async getByProducto(id){

        const json =
        await super.get(`${this.endpoint}/${id}`);

        return InventarioResponse.fromJson(json);
    }

    async create(inventarioRequest){

        if(!(inventarioRequest instanceof InventarioRequest))
            throw new Error("Inventario inválido");

        return await super.post(
            this.endpoint,
            inventarioRequest.toJson()
        );
    }

    async update(inventarioRequest){

        if(!(inventarioRequest instanceof InventarioRequest))
            throw new Error("Inventario inválido");

        return await super.put(
            this.endpoint,
            inventarioRequest.toJson()
        );
    }
}