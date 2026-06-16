import ProductoService from "../../services/producto.service.js";
import CategoriaService from "../../services/categoria.service.js";
import ProductoRequest from "../../models/request/producto.request.js";

const productoService = new ProductoService();
const categoriaService = new CategoriaService();

const urlParams = new URLSearchParams(window.location.search);
const idProducto = parseInt(urlParams.get("id"));

async function cargarCategorias() {

    try {

        const categorias = await categoriaService.get();

        const select =
            document.getElementById("categoria");

        select.innerHTML = `
            <option value="">
                Seleccione una categoría
            </option>
        `;

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

async function cargarProducto() {

    try {

        const producto =
            await productoService.getById(idProducto);

        document.getElementById("producto").value =
            producto.nombreProducto;

        document.getElementById("descripcion").value =
            producto.descripcion;

        document.getElementById("categoria").value =
            producto.idCategoria;

    }
    catch (error) {

        console.error(
            "Error cargando producto:",
            error
        );

        alert(
            "No se pudo cargar el producto"
        );
    }
}

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        if (!idProducto) {

            alert(
                "No se encontró el ID del producto"
            );

            window.location.href =
                "Productos.Html";

            return;
        }

        await cargarCategorias();
        await cargarProducto();

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
                            idProducto,
                            nombreProducto,
                            descripcion,
                            idCategoria
                        );

                    await productoService.update(
                        idProducto,
                        producto
                    );

                    alert(
                        "Producto actualizado correctamente"
                    );

                    window.location.href =
                        "Productos.Html";

                }
                catch (error) {

                    console.error(
                        "Error al actualizar producto:",
                        error
                    );

                    alert(
                        "No se pudo actualizar el producto"
                    );
                }
            }
        );
    }
);