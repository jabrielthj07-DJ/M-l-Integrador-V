const API_URL = "https://localhost:7030/api/Inventario";

async function cargarInventario() {

    const token = localStorage.getItem("token");

    const tbody = document.getElementById("tablaInventario");

    // Mensaje mientras carga
    tbody.innerHTML = `
        <tr>
            <td colspan="6">Cargando inventario...</td>
        </tr>
    `;

    try {

        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Error al obtener inventario");
        }

        const inventarios = await response.json();

        // Simular carga visual de 1 segundo
        setTimeout(() => {

            tbody.innerHTML = "";

            inventarios.forEach(item => {

                const fila = document.createElement("tr");

                fila.innerHTML = `
                    <td>${item.nombre_Producto}</td>
                    <td>${item.descripcion}</td>
                    <td>-</td>
                    <td>C$ ${item.precio ?? 0}</td>
                    <td>${item.stock ?? 0}</td>
                    <td>
                        <button class="btn-editar">Editar</button>
                    </td>
                `;

                tbody.appendChild(fila);

            });

        }, 1000);

    } catch (error) {

        console.error(error);

        tbody.innerHTML = `
            <tr>
                <td colspan="6">
                    Error al cargar inventario
                </td>
            </tr>
        `;
    }
}

cargarInventario();