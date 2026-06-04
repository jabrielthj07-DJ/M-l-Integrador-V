// RegistrarProveedor.js
const API_URL = "https://localhost:7030/api/proveedor";

// Validar token antes de permitir registrar
const token = localStorage.getItem("token");
if (!token) {
    document.getElementById("mensaje").innerText = "Debe iniciar sesión para registrar proveedores.";
    setTimeout(() => {
        window.location.href = "/Login.html";
    }, 2000);
}

// Función para registrar proveedor
async function registrarProveedor(event) {
    event.preventDefault(); // evitar recarga de página

    const nuevoProveedor = {
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        email: document.getElementById("email").value,
        telefono: document.getElementById("telefono").value,
        razon_Social: document.getElementById("razonSocial").value,
        direccion: document.getElementById("direccion").value,
        id_Producto: document.getElementById("idProducto").value
    };

    try {
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };

        const response = await fetch(API_URL, {
            method: "POST",
            headers,
            body: JSON.stringify(nuevoProveedor)
        });

        if (!response.ok) {
            document.getElementById("mensaje").innerText = "Error al registrar proveedor: " + response.status;
            return;
        }

        const data = await response.json();
        document.getElementById("mensaje").innerText = data.mensaje || "Proveedor registrado correctamente";

        // limpiar formulario
        document.getElementById("form-agregar-compras").reset();

        // opcional: redirigir a la lista de proveedores
        setTimeout(() => {
            window.location.href = "/Proovedores.Html";
        }, 1500);

    } catch (error) {
        console.error("Error al registrar proveedor:", error);
        document.getElementById("mensaje").innerText = "Error al registrar proveedor.";
    }
}

// Vincular evento submit del formulario
document.getElementById("form-agregar-compras").addEventListener("submit", registrarProveedor);
