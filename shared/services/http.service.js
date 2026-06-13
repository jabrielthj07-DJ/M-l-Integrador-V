export default class HttpService {

    baseUrl = "https://localhost:7030/api";

    async get(endpoint) {

        const token = localStorage.getItem("token");

        const response = await fetch(
            this.baseUrl + endpoint,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        return await response.json();
    }

    async post(endpoint, body) {

        const token = localStorage.getItem("token");

        const response = await fetch(
            this.baseUrl + endpoint,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(body)
            }
        );

        return await response.json();
    }

    async put(endpoint, body) {

        const token = localStorage.getItem("token");

        const response = await fetch(
            this.baseUrl + endpoint,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(body)
            }
        );

        return await response.json();
    }

    async delete(endpoint) {

        const token = localStorage.getItem("token");

        const response = await fetch(
            this.baseUrl + endpoint,
            {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        return await response.json();
    }
}