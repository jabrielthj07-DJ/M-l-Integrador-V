import UsuarioService from "../../services/usuario.service.js";
import InventarioService from "../../services/inventario.service.js";
import VentasService from "../../services/ventas.service.js";
import VentasRequest from "../../models/request/ventas.request.js";
import DetalleVentaRequest from "../../models/request/detalleventa.request.js";

const usuarioService = new UsuarioService();
const inventarioService = new InventarioService();
const ventasService = new VentasService();

const cmbUsuario = document.getElementById("usuario");
const cmbProducto = document.getElementById("producto");
const txtCantidad = document.getElementById("cantidad");
const txtPrecio = document.getElementById("precioUnitario");
const txtTotal = document.getElementById("total");
const txtFecha = document.getElementById("fecha");
const carritoBody = document.getElementById("carritoBody");
const carritoTotal = document.getElementById("carritoTotal");
const btnFinalizarVenta = document.getElementById("btnFinalizarVenta");

let inventarios = [];
let carrito = [];

async function cargarProductos() {
  try {
    inventarios = await inventarioService.get();

    cmbProducto.innerHTML = `<option value="">Seleccione un producto</option>`;
    inventarios.forEach((item) => {
      cmbProducto.innerHTML += `
        <option value="${item.idProducto}">${item.nombreProducto}</option>
      `;
    });
  } catch (error) {
    console.error("Error cargando productos:", error);
  }
}

function actualizarPrecio() {
  const producto = inventarios.find((x) => x.idProducto == cmbProducto.value);
  if (!producto) {
    txtPrecio.value = "";
    txtTotal.value = "";
    return;
  }
  txtPrecio.value = producto.precio;
  calcularTotal();
}

function calcularTotal() {
  const cantidad = parseInt(txtCantidad.value) || 0;
  const precio = parseFloat(txtPrecio.value) || 0;
  txtTotal.value = (cantidad * precio).toFixed(2);
}

function agregarAlCarrito(event) {
  event.preventDefault();

  const producto = inventarios.find((x) => x.idProducto == cmbProducto.value);
  if (!producto) {
    alert("Seleccione un producto válido.");
    return;
  }

  const cantidad = parseInt(txtCantidad.value);
  if (!cantidad || cantidad <= 0) {
    alert("Ingrese una cantidad mayor a 0.");
    return;
  }

  if (cantidad > producto.stock) {
    alert(`Stock insuficiente. Disponible: ${producto.stock}`);
    return;
  }

  const detalleExistente = carrito.find((item) => item.idProducto == producto.idProducto);
  if (detalleExistente) {
    detalleExistente.cantidad += cantidad;
    detalleExistente.subtotal = parseFloat((detalleExistente.cantidad * detalleExistente.precioUnitario).toFixed(2));
  } else {
    carrito.push({
      idProducto: producto.idProducto,
      nombreProducto: producto.nombreProducto,
      cantidad,
      precioUnitario: parseFloat(producto.precio),
      subtotal: parseFloat((cantidad * producto.precio).toFixed(2)),
    });
  }

  renderizarCarrito();
  limpiarFormularioProducto();
}

function renderizarCarrito() {
  carritoBody.innerHTML = "";
  if (carrito.length === 0) {
    carritoBody.innerHTML = `
      <tr>
        <td colspan="5">No hay productos agregados.</td>
      </tr>
    `;
    carritoTotal.textContent = "0.00";
    return;
  }

  let total = 0;
  carrito.forEach((item, index) => {
    total += item.subtotal;
    carritoBody.innerHTML += `
      <tr>
        <td>${item.nombreProducto}</td>
        <td>${item.cantidad}</td>
        <td>C$ ${item.precioUnitario.toFixed(2)}</td>
        <td>C$ ${item.subtotal.toFixed(2)}</td>
        <td><button type="button" class="boton-eliminar" data-index="${index}">Eliminar</button></td>
      </tr>
    `;
  });

  carritoTotal.textContent = total.toFixed(2);
  actualizarBotonFinalizar();
}

function limpiarFormularioProducto() {
  cmbProducto.value = "";
  txtCantidad.value = "";
  txtPrecio.value = "";
  txtTotal.value = "";
}

function eliminarProducto(event) {
  const boton = event.target;
  if (!boton.matches(".boton-eliminar")) return;

  const index = parseInt(boton.dataset.index, 10);
  if (Number.isNaN(index)) return;

  carrito.splice(index, 1);
  renderizarCarrito();
}

function actualizarBotonFinalizar() {
  btnFinalizarVenta.disabled = carrito.length === 0;
}

async function finalizarVenta() {

  console.log("ENTRÓ A FINALIZAR");

  if (carrito.length === 0) {
    alert("Debe agregar al menos un producto al carrito.");
    return;
  }

  // ✔️ Obtener usuario de sesión
  const idUsuario = parseInt(
  localStorage.getItem("id_Usuario") ||
  localStorage.getItem("idUsuario"),
  10
);

console.log("RAW ID:", idUsuario);

  console.log("ID USUARIO:", idUsuario);

  // ✔️ FIX: no mandar a JS ni romper flujo
if (isNaN(idUsuario) || idUsuario <= 0) {
  alert("Sesión inválida. Inicie sesión nuevamente.");
  window.location.href = "../../../Login/Login.html";
  return;
}

  if (!txtFecha.value) {
    alert("Seleccione una fecha para la venta.");
    return;
  }

  // ✔️ construir detalles
  const detalles = carrito.map(item =>
    new DetalleVentaRequest(
      item.idProducto,
      item.cantidad,
      item.precioUnitario
    )
  );

  const total = parseFloat(carritoTotal.textContent) || 0;

  const venta = new VentasRequest(
    idUsuario,
    txtFecha.value,
    total,
    detalles
  );

  try {

    const response = await ventasService.create(venta);

    console.log("RESPUESTA BACKEND:", response);

    const idVenta =
      response?.id_Venta ??
      response?.idVenta ??
      response?.id;

    if (!idVenta) {
      alert("No se pudo obtener el ID de la venta");
      return;
    }

    alert("Venta registrada correctamente");

    // ✔️ IR A FACTURA (CORRECTO)
    window.location.href =
      `../../.././Ventas/Factura.html?id=${idVenta}&print=true`;

  } catch (error) {
    console.error("ERROR FINALIZANDO VENTA:", error);
    alert("Error al registrar la venta");
  }
}

async function inicializar() {
  await cargarProductos();
  txtFecha.value = new Date().toISOString().split("T")[0];
  renderizarCarrito();
  actualizarBotonFinalizar();

  cmbProducto.addEventListener("change", actualizarPrecio);
  txtCantidad.addEventListener("input", calcularTotal);
  document.getElementById("form-agregar-ventas").addEventListener("submit", agregarAlCarrito);
  carritoBody.addEventListener("click", eliminarProducto);
  btnFinalizarVenta.addEventListener("click", finalizarVenta);
}

// Inicializar cuando el DOM esté listo
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inicializar);
} else {
  inicializar();
}

