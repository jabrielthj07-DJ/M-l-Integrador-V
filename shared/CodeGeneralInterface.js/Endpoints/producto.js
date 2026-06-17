import ProductoService from "../../services/producto.service.js";
//===================para nombre de categoria de prodcuto
import CategoriaService from "../../services/categoria.service.js";//exportamos para el nomnbre sde la categoria de cada prodcuto

const service = new ProductoService();
const categoriaService = new CategoriaService();//igual para nombrar el nombre de la categoria de product..

let todosProductos = [];
let todasCategorias = [];//iguak ae pone esto para el nombre de la categoria..

async function loadProductos(){

    try{

        const [productos, categorias] = await Promise.all([
            service.get(),
            categoriaService.get()
        ]);

        todosProductos = productos;
        todasCategorias = categorias;

        renderizarProductos(todosProductos);

    }catch(error){

        console.error(error);

    }
}

function obtenerNombreCategoria(idCategoria){
    const categoria = todasCategorias.find(
        cat => cat.idCategoria === idCategoria
    );

    return categoria ? categoria.nombreCategoria : "Sin categoría";
}
//============== solo se implemento el nombre de la categortiria para que muestre en producto..

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

            <td>${obtenerNombreCategoria(producto.idCategoria)}</td>

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



