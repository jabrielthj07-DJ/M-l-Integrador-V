import HttpService from "../services/http.service.js";
import { CategoriaResponse } from "../models/response/categoria.response.js";


export default class CategoriaService extends HttpService {

    endpoint = "/Categorias";

    async get() {

        const json = await super.get(this.endpoint);

        if (!Array.isArray(json))
            return [];

        return json.map(
            item => CategoriaResponse.fromJson(item)
        );
    }
}