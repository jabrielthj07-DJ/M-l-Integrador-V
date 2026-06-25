//registra ventas de los productos mi dog el mero prgramador se mucho pero tu me ganas en otras formas mi dog🫡...
//import

import ProveedorService from "../../services/proveedor.service.js";
import ProductoService from "../../services/producto.service.js";
import Compraservice from "../../services/compra.service.js";
import ComprasRequest from "../../models/request/compras.request.js";
import DetalleCompraRequest from "../../models/request/detalleCompra.request.js";

const proveedorService = new ProveedorService();
const productoService = new ProductoService();
const comprasService = new Compraservice();

//ELEMENTOS DEL DOM - Formulario General de la Compra
const cmbProveedor = document.getElementById("proveedor");
const txtFecha = document.getElementById("fecha");
const txtObservaciones = document.getElementById("observaciones");
//ELEMENTOS DEL DOM - Detalle de Producto a agregar
const cmbProducto = document.getElementById("producto");
const txtCantidad = document.getElementById("cantidad");
const txtPrecio = document.getElementById("precioUnitario");
const txtSubtotal = document.getElementById("subtotal");
//ELEMENTOS DEL DOM - Tabla 
const compraBody = document.querySelector(".compraBody") || document.getElementById("compraBody");
const compraTotal = document.getElementById("compraTotal");
const btnFinalizarCompra = document.getElementById("finalizarcompra");
const formAgregarDetalle = document.getElementById("form-agregar-detalle");
let proveedores = [];
let productos = [];
let carrito = [];
/**
 * Carga la lista de proveedores desde la API y llena el select
 */
async function cargarProveedores() {
  try {
    proveedores = await proveedorService.get();
    cmbProveedor.innerHTML = `<option value="">Seleccione un proveedor</option>`;
    proveedores.forEach((item) => {
      cmbProveedor.innerHTML += `
        <option value="${item.id}">${item.nombre} ${item.apellido || ""}</option>
      `;
    });
  } catch (error) {
    console.error("Error cargando proveedores:", error);
  }
}
/**
 * Carga la lista de productos desde la API y llena el select
 */
async function cargarProductos() {
  try {
    productos = await productoService.get();
    cmbProducto.innerHTML = `<option value="">Seleccione un producto</option>`;
    productos.forEach((item) => {
      cmbProducto.innerHTML += `
        <option value="${item.idProducto}">${item.nombreProducto}</option>
      `;
    });
  } catch (error) {
    console.error("Error cargando productos:", error);
  }
}
/**
 * Calcula automáticamente el subtotal en base a la cantidad y precio unitario ingresados.
 */
function calcularSubtotal() {
  const cantidad = parseInt(txtCantidad.value, 10) || 0;
  const precio = parseFloat(txtPrecio.value) || 0;
  txtSubtotal.value = (cantidad * precio).toFixed(2);
}
/**
 * Agrega un producto a la tbla  de compras local.
 */
function agregarAlCarrito(event) {
  event.preventDefault();
  const idProveedor = parseInt(cmbProveedor.value, 10);
  if (!idProveedor) {
    alert("Seleccione un proveedor primero.");
    return;
  }
  const idProducto = parseInt(cmbProducto.value, 10);
  const producto = productos.find((x) => x.idProducto == idProducto);
  if (!producto) {
    alert("Seleccione un producto válido.");
    return;
  }
  const cantidad = parseInt(txtCantidad.value, 10);
  if (!cantidad || cantidad <= 0) {
    alert("Ingrese una cantidad mayor a 0.");
    return;
  }
  const precioUnitario = parseFloat(txtPrecio.value);
  if (isNaN(precioUnitario) || precioUnitario <= 0) {
    alert("Ingrese un precio unitario mayor a 0.");
    return;
  }
  const observaciones = txtObservaciones.value.trim() || "Sin observaciones";
  const fecha = txtFecha.value || new Date().toISOString().split("T")[0];
  const subtotal = parseFloat((cantidad * precioUnitario).toFixed(2));
  // Bloquea el cambio de proveedor una vez agregado el primer producto para mantener consistencia
  cmbProveedor.disabled = true;
  const detalleExistente = carrito.find((item) => item.idProducto == idProducto);
  if (detalleExistente) {
    detalleExistente.cantidad += cantidad;
    detalleExistente.precioUnitario = precioUnitario; // actualiza precio
    detalleExistente.subtotal = parseFloat((detalleExistente.cantidad * precioUnitario).toFixed(2));
  } else {
    carrito.push({
      idProducto,
      nombreProducto: producto.nombreProducto,
      observaciones,
      fecha,
      cantidad,
      precioUnitario,
      subtotal,
    });
  }
  renderizarCarrito();
  limpiarFormularioProducto();
}
/**
 * Dibuja la tabla con las compras agregadas temporalmente.
 */
function renderizarCarrito() {
  compraBody.innerHTML = "";
  if (carrito.length === 0) {
    compraBody.innerHTML = `
      <tr>
        <td colspan="8" class="compra-row">No hay compras de productos agregadas.</td>
      </tr>
    `;
    compraTotal.textContent = "0.00";
    cmbProveedor.disabled = false; // Permite cambiar de proveedor si no hay productos
    return;
  }
  let total = 0;
  carrito.forEach((item, index) => {
    total += item.subtotal;
    compraBody.innerHTML += `
      <tr>
        <td>${item.nombreProducto}</td>
        <td>${item.observaciones}</td>
        <td>C$ ${item.subtotal.toFixed(2)}</td> 
        <td>${item.fecha}</td>
        <td>${item.cantidad}</td>
        <td>C$ ${item.precioUnitario.toFixed(2)}</td>
        <td>C$ ${item.subtotal.toFixed(2)}</td>
        <td>
          <button type="button" class="boton-eliminar" data-index="${index}">Eliminar</button>
        </td>
      </tr>
    `;
  });
  compraTotal.textContent = total.toFixed(2);
  actualizarBotonFinalizar();
}
/**
 * Limpia el formulario inferior una vez agregado el item.
 */
function limpiarFormularioProducto() {
  cmbProducto.value = "";
  txtCantidad.value = "";
  txtPrecio.value = "";
  txtSubtotal.value = "";
}
/**
 * Elimina un producto del carrito usando su índice.
 */
function eliminarProducto(event) {
  const boton = event.target;
  if (!boton.matches(".boton-eliminar")) return;
  const index = parseInt(boton.dataset.index, 10);
  if (Number.isNaN(index)) return;
  carrito.splice(index, 1);
  renderizarCarrito();
}
/**
 * Habilita o deshabilita el botón finalizador según si hay ítems.
 */
function actualizarBotonFinalizar() {
  btnFinalizarCompra.disabled = carrito.length === 0;
}
/**
 * Valida los datos y envía la compra al backend.
 */
async function finalizarCompra() {
  console.log("INICIANDO REGISTRO DE COMPRA");
  if (carrito.length === 0) {
    alert("Debe agregar al menos un producto al carrito de compras.");
    return;
  }
  //Obtener ID de usuario de la sesión activa
  let idUsuarioRaw = localStorage.getItem("id_Usuario") || localStorage.getItem("idUsuario");
  
  if (!idUsuarioRaw) {
    const usuarioLogeadoStr = localStorage.getItem("usuarioLogeado");
    if (usuarioLogeadoStr) {
      try {
        const usuarioLogeado = JSON.parse(usuarioLogeadoStr);
        idUsuarioRaw = usuarioLogeado.id_Usuario || usuarioLogeado.idUsuario || usuarioLogeado.id;
      } catch (e) {
        console.error("Error parsing usuarioLogeado from localStorage:", e);
      }
    }
  }

  let idUsuario = parseInt(idUsuarioRaw, 10);
  
  console.log("ID USUARIO LOGUEADO:", idUsuario);

  if (isNaN(idUsuario) || idUsuario <= 0) {
    console.warn("No se encontró idUsuario en sesión. Usando ID 1 por defecto en desarrollo.");
    idUsuario = 1;
  }
  const idProveedor = parseInt(cmbProveedor.value, 10);
  if (!idProveedor) {
    alert("Por favor, seleccione un proveedor.");
    return;
  }
  if (!txtFecha.value) {
    alert("Seleccione una fecha válida para la compra.");
    return;
  }
  //Construcción de los detalles de la compra
  const detalles = carrito.map(
    (item) =>
      new DetalleCompraRequest(
        item.idProducto,
        item.cantidad,
        item.precioUnitario
      )
  );
  const total = parseFloat(compraTotal.textContent) || 0;
  const observacionesGlobales = txtObservaciones.value.trim() || "Sin observaciones";
  //Objeto request completo
  const compra = new ComprasRequest(
    idProveedor,
    txtFecha.value,
    total,
    observacionesGlobales,
    detalles
  );
  try {
    const response = await comprasService.create(compra);
    console.log("RESPUESTA BACKEND:", response);
    let idCompra =
      response?.id_Compra ??
      response?.idCompra ??
      response?.Id_Compra ??
      response?.IdCompra ??
      response?.id ??
      response?.Id;

    if (!idCompra && response) {
      const parsedId = parseInt(response, 10);
      if (!isNaN(parsedId) && parsedId > 0) {
        idCompra = parsedId;
      }
    }

    if (!idCompra && response) {
      idCompra =
        response.value?.id_Compra ??
        response.value?.idCompra ??
        response.value?.Id_Compra ??
        response.value?.IdCompra ??
        response.value?.id ??
        response.value?.Id ??
        response.data?.id_Compra ??
        response.data?.idCompra ??
        response.data?.Id_Compra ??
        response.data?.IdCompra ??
        response.data?.id ??
        response.data?.Id;
    }

    // Failsafe: Si el formato del backend cambió, busca el ID de la compra más reciente
    if (!idCompra) {
      try {
        const todasLasCompras = await comprasService.get();
        if (todasLasCompras && todasLasCompras.length > 0) {
          todasLasCompras.sort((a, b) => (b.id_Compra || b.idCompra) - (a.id_Compra || a.idCompra));
          idCompra = todasLasCompras[0].id_Compra || todasLasCompras[0].idCompra;
          console.log("Failsafe: ID de compra recuperado de la lista:", idCompra);
        }
      } catch (err) {
        console.error("Error en failsafe de última compra:", err);
      }
    }

    if (!idCompra) {
      alert("No se pudo obtener el ID de la compra para generar la factura.");
      return;
    }

    alert("Compra registrada correctamente");
    // ✔️ Redirección a factura de compra
    window.location.href = `../../.././Compras/Factura.html?id=${idCompra}&print=true`;
  } catch (error) {
    console.error("ERROR FINALIZANDO COMPRA:", error);
    alert("Error al registrar la compra: " + error.message);
  }
}
/**
 * Inicialización de oyentes y valores de carga.
 */
async function inicializar() {
  await cargarProveedores();
  await cargarProductos();
  txtFecha.value = new Date().toISOString().split("T")[0]; // Asignar fecha de hoy
  renderizarCarrito();
  actualizarBotonFinalizar();
  // Calcular subtotal en tiempo real al tipear
  txtCantidad.addEventListener("input", calcularSubtotal);
  txtPrecio.addEventListener("input", calcularSubtotal);
  // Enviar formulario de agregar item
  formAgregarDetalle.addEventListener("submit", agregarAlCarrito);
  // Evento para eliminar un elemento de la lista
  compraBody.addEventListener("click", eliminarProducto);
  // Evento para completar y guardar la compra en el servidor
  btnFinalizarCompra.addEventListener("click", finalizarCompra);
}
// Inicializar cuando el DOM esté listo
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inicializar);
} else {
  inicializar();
}