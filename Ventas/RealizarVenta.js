
// URL del endpoint de inventario que devuelve los productos disponibles.
const API_PRODUCTOS = "https://localhost:7030/api/Inventario";

// Referencias a los campos del formulario de ventas.
const usuarioInput = document.getElementById("usuario");
const usuarioDisplay = document.getElementById("usuarioDisplay");
const productoSelect = document.getElementById("producto");
const cantidadInput = document.getElementById("cantidad");
const precioUnitarioInput = document.getElementById("precioUnitario");
const totalInput = document.getElementById("total");

// Lista de productos cargada desde la API.
let productos = [];

const setLoggedUsuario = () => {
    const usuarioLogeado = localStorage.getItem("usuario") ||
        localStorage.getItem("nombre") ||
        localStorage.getItem("name") ||
        localStorage.getItem("user") ||
        localStorage.getItem("email") || "";

    const idUsuario = localStorage.getItem("id_Usuario") ||
        localStorage.getItem("idUsuario") ||
        localStorage.getItem("id") || "";

    if (usuarioDisplay) {
        usuarioDisplay.value = usuarioLogeado;
    }

    if (usuarioInput) {
        if (idUsuario) {
            usuarioInput.value = idUsuario;
        } else {
            usuarioInput.value = usuarioLogeado;
        }
    }
};

// Actualiza el precio unitario y el total cuando cambia el producto o la cantidad.
const actualizarPrecioTotal = () => {
    if (!productoSelect) return;

    // Obtener el id del producto seleccionado.
    const productoId = productoSelect.value;

    // Buscar el producto en la lista cargada desde la API.
    const producto = productos.find(p => String(p.id_Producto) === String(productoId));

    // Si el producto existe, usar su precio; si no, usar 0.
    const precioUnitario = producto && typeof producto.precio !== "undefined" ? Number(producto.precio) : 0;

    // Obtener la cantidad ingresada por el usuario.
    const cantidad = cantidadInput ? Number(cantidadInput.value) || 0 : 0;

    // Mostrar el precio unitario en el campo correspondiente.
    if (precioUnitarioInput) {
        precioUnitarioInput.value = precioUnitario ? precioUnitario.toFixed(2) : "";
    }

    // Calcular el total como precio unitario * cantidad y mostrarlo.
    if (totalInput) {
        totalInput.value = (precioUnitario * cantidad).toFixed(2);
    }
};

// Carga los productos desde la API y llena el select de productos.
const cargarProductos = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(API_PRODUCTOS, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { "Authorization": `Bearer ${token}` } : {})
            }
        });

        if (!response.ok) {
            throw new Error(`Error al cargar productos: ${response.status}`);
        }

        // Guardar los productos en la variable global para usar en el cálculo.
        productos = await response.json();

        if (!productoSelect) return;

        // Llenar el dropdown con los productos obtenidos.
        productoSelect.innerHTML = `<option value="">Seleccione</option>` +
            productos.map(producto => `
                <option value="${producto.id_Producto}">${producto.nombre_Producto}</option>
            `).join("");

        // Forzar un cálculo inicial para que se muestre el total si un producto ya está seleccionado.
        actualizarPrecioTotal();
    } catch (error) {
        console.error(error);
        if (productoSelect) {
            productoSelect.innerHTML = `<option value="">No se pudieron cargar los productos</option>`;
        }
    }
};

if (productoSelect) {
    productoSelect.addEventListener("change", actualizarPrecioTotal);
}

if (cantidadInput) {
    cantidadInput.addEventListener("input", actualizarPrecioTotal);
}

document.addEventListener("DOMContentLoaded", () => {
    setLoggedUsuario();
    cargarProductos();
});
