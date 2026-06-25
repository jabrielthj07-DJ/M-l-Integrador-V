import HttpService from "../services/http.service.js";
import ProveedorRequest from "../models/request/proveedor.request.js";
import { ProveedorResponse } from "../models/response/proveedor.response.js";

export default class ProveedorService extends HttpService {

    endpoint = "/Proveedor";

    async get() {
        const json = await super.get(this.endpoint);

        if (!Array.isArray(json))
            return [];

        return json.map(x =>
            ProveedorResponse.fromJson(x)
        );
    }

    async getById(id) {
        const json = await super.get(`${this.endpoint}/${id}`);
        return ProveedorResponse.fromJson(json);
    }

    async create(req) {

        if (!(req instanceof ProveedorRequest))
            throw new Error("Proveedor inválido");

        return await super.post(this.endpoint, req.toJson());
    }

    async update(id, req) {

        if (!(req instanceof ProveedorRequest))
            throw new Error("Proveedor inválido");

        return await super.put(`${this.endpoint}/${id}`, req.toJson());
    }

    async delete(id) {
        return await super.delete(`${this.endpoint}/${id}`);
    }
}