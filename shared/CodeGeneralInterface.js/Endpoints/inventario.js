import InventarioService from "../../services/inventario.service.js";

const service = new InventarioService();

let todosInventarios = [];

async function loadInventario(){

    try{

        todosInventarios =
        await service.get();

        renderizarInventario(
            todosInventarios
        );

    }catch(error){

        console.error(error);

    }
}

function renderizarInventario(inventarios){

    const table =
    document.getElementById("tablaInventario");

    table.innerHTML = "";

    inventarios.forEach(item => {

        table.innerHTML += `
        <tr>

            <td>${item.nombreProducto}</td>

            <td>${item.descripcion}</td>

            <td>C$ ${item.precio}</td>

            <td>${item.stock}</td>

            <td>

                <button
                class="btn-editar"
                onclick="editarInventario(${item.idProducto})">

                    Editar

                </button>

            </td>

        </tr>
        `;
    });
}

document
.querySelector(".buscador")
.addEventListener("input", function(){

    const texto =
    this.value.toLowerCase();

    const filtrados =
    todosInventarios.filter(item =>

        item.nombreProducto
        .toLowerCase()
        .includes(texto)

    );

    renderizarInventario(filtrados);
});

window.editarInventario =
function(id){

    window.location.href =
    `EditarInventario.html?id=${id}`;
};

loadInventario();