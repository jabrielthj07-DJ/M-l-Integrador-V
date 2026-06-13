import ProductoService from "../../services/producto.service.js";
import CategoriaService from "../../services/categoria.service.js";
import ProductoRequest from "../../models/request/producto.request.js";

const productoService = new ProductoService();
const categoriaService = new CategoriaService();

async function cargarCategorias() {

    try {

        const categorias =
            await categoriaService.get();

        const select =
            document.getElementById("categoria");

        categorias.forEach(categoria => {

            select.innerHTML += `
                <option value="${categoria.idCategoria}">
                    ${categoria.nombreCategoria}
                </option>
            `;
        });

    }
    catch (error) {

        console.error(
            "Error cargando categorías:",
            error
        );

    }

}

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await cargarCategorias();

        const form =
            document.getElementById("form-agregar-compras");

        form.addEventListener(
            "submit",
            async (e) => {

                e.preventDefault();

                try {

                    const nombreProducto =
                        document.getElementById("producto").value;

                    const descripcion =
                        document.getElementById("descripcion").value;

                    const idCategoria =
                        parseInt(
                            document.getElementById("categoria").value
                        );

                    const producto =
                        new ProductoRequest(
                            0,
                            nombreProducto,
                            descripcion,
                            idCategoria
                        );

                    await productoService.create(producto);

                    alert(
                        "Producto agregado correctamente"
                    );

                    window.location.href =
                        "Productos.Html";

                }
                catch (error) {

                    console.error(
                        "Error al registrar producto:",
                        error
                    );

                    alert(
                        "No se pudo registrar el producto"
                    );
                }

            }
        );

    }
);