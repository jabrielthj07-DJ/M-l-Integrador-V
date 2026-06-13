import CategoriaService from "../../services/categoria.service.js";

const service = new CategoriaService();

async function loadCategorias() {

    const categorias = await service.get();

    console.log(categorias);

    const table = document.getElementById("tableCategorias");

    table.innerHTML = "";

    categorias.forEach(categoria => {

        table.innerHTML += `
            <tr>
                <td>${categoria.nombreCategoria}</td>
                <td>${categoria.descripcion}</td>
                <td>
                    <div class="acciones">

            <button class="btn-editar">
                Editar
            </button>

            <button class="btn-eliminar">
                Eliminar
            </button>

        </div>
    </td>

</tr>
        `;
    });
}

loadCategorias();