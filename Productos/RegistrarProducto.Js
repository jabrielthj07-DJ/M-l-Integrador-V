document.getElementById("form-agregar-compras")
.addEventListener("submit", async (e) => {

    e.preventDefault();

    const producto = document.getElementById("producto").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();

    const token = localStorage.getItem("token");

    if (!producto || !descripcion) {
        alert("Complete todos los campos");
        return;
    }

    try {

        const response = await fetch(
            "https://localhost:7030/api/Producto",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    nombre_Producto: producto,
                    descripcion: descripcion,
                    id_Categoria: 1
                })
            }
        );

        if (response.ok) {

            alert("Producto agregado correctamente");

            document
                .getElementById("form-agregar-compras")
                .reset();

        } else {

            const error = await response.text();

            console.error(error);

            alert("No se pudo registrar el producto");
        }

    } catch (error) {

        console.error("Error:", error);

        alert("Error al conectar con la API");
    }

});