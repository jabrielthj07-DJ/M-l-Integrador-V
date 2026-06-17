const API_PRODUCTOS = "https://localhost:7030/api/Inventario";
const productoSelect = document.getElementById("producto");
const cantidadInput = document.getElementById("cantidad");
const precioUnitarioInput = document.getElementById("precioUnitario");
const totalInput = document.getElementById("total");

let productos = [];

const actualizarPrecioTotal = () => {
    if (!productoSelect) return;

    const productoId = productoSelect.value;
    const producto = productos.find(p => String(p.id_Producto) === String(productoId));
    const precioUnitario = producto && typeof producto.precio !== "undefined" ? Number(producto.precio) : 0;
    const cantidad = cantidadInput ? Number(cantidadInput.value) || 0 : 0;

    if (precioUnitarioInput) {
        precioUnitarioInput.value = precioUnitario ? precioUnitario.toFixed(2) : "";
    }

    if (totalInput) {
        totalInput.value = (precioUnitario * cantidad).toFixed(2);
    }
};

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

        productos = await response.json();

        if (!productoSelect) return;

        productoSelect.innerHTML = `<option value="">Seleccione</option>` +
            productos.map(producto => `
                <option value="${producto.id_Producto}">${producto.nombre_Producto}</option>
            `).join("");

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

document.addEventListener("DOMContentLoaded", cargarProductos);
