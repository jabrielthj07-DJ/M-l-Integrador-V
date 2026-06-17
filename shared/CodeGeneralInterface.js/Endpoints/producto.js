import ProductoService from "../../services/producto.service.js";

const service = new ProductoService();

let todosProductos = [];

async function loadProductos(){

    try{

        todosProductos = await service.get();

        renderizarProductos(todosProductos);

    }catch(error){

        console.error(error);

    }
}

// renderizacion tbl
function renderizarProductos(productos){

    const table =
    document.getElementById("tablaProductos");

    table.innerHTML = "";

    productos.forEach(producto => {

        table.innerHTML += `
        <tr>

            <td>${producto.nombreProducto}</td>

            <td>${producto.descripcion}</td>

            <td class="acciones">

                <button
                class="btn-editar"
                onclick="editarProducto(${producto.idProducto})">
                    Editar
                </button>

                <button
                class="btn-eliminar"
                onclick="eliminarProducto(${producto.idProducto})">
                    Eliminar
                </button>

            </td>

        </tr>
        `;
    });
}


// Buscadorimprovisado por nombre
document
.getElementById("buscarProducto")
.addEventListener("input", function(){

    const texto =
    this.value.toLowerCase();

    const filtrados =
    todosProductos.filter(producto =>

        producto.nombreProducto
        .toLowerCase()
        .includes(texto)

    );

    renderizarProductos(filtrados);

});


window.eliminarProducto =
async function(id){

    const confirmar =
    confirm("¿Desea eliminar este producto?");

    if(!confirmar)
        return;

    try{

        await service.delete(id);

        await loadProductos();

        alert("Producto eliminado correctamente");

    }catch(error){

        console.error(error);

        alert("Error al eliminar");

    }
};


window.editarProducto =
function(id){

    window.location.href =
    `EditarProducto.html?id=${id}`;

};

loadProductos();



