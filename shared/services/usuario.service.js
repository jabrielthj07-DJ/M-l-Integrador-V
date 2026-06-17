import HttpService from "../services/http.service.js";

export default class UsuarioService extends HttpService {

    endpoint = "/UsuarioRol";

    async get(){

        const json = await super.get(this.endpoint);

        if(!Array.isArray(json))
            return [];

        return json;
    }
}