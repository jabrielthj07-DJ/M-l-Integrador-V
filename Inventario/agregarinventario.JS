document.getElementById("form-agregar-inventario")
.addEventListener("submit", async (e) => {

    e.preventDefault();

    const token = localStorage.getItem("token");

    const idProducto =
        document.getElementById("producto").value;

    const precio =
        document.getElementById("precio").value;

    const stock =
        document.getElementById("stock").value;

    if (!idProducto) {

        alert("Seleccione un producto");

        return;
    }

    try {

        // Buscar información del producto

        const productoResponse = await fetch(
            `https://localhost:7030/api/Producto/${idProducto}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (!productoResponse.ok) {

            throw new Error(
                "No se pudo obtener el producto"
            );

        }

        const producto =
            await productoResponse.json();

        // Registrar inventario

        const response = await fetch(
            "https://localhost:7030/api/Inventario",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },

                body: JSON.stringify({

                    id_Inventario: 0,

                    descripcion:
                        producto.descripcion,

                    precio:
                        parseFloat(precio),

                    stock:
                        parseInt(stock),

                    id_Producto:
                        parseInt(idProducto),

                    nombre_Producto:
                        producto.nombre_Producto
                })
            }
        );

        if (response.ok) {

            alert(
                "Inventario agregado correctamente"
            );

            document
            .getElementById(
                "form-agregar-inventario"
            )
            .reset();

        }
        else {

            const error =
                await response.text();

            alert(error);

        }

    }
    catch (error) {

        console.error(error);

        alert("Error al conectar con la API");

    }

});