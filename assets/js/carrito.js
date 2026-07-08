import { obtenerCarrito } from "./storage.js";
import { eliminarProducto, vaciarCarrito } from "./funcionesCarrito.js";
import { actualizarContador } from "./ui.js";

// Muestro el carrito en pantalla
const renderizarCarrito = () => {
  const carrito = obtenerCarrito();
  actualizarContador(carrito);

  const contenedor = document.getElementById("contenedor-carrito");
  const divAcciones = document.getElementById("acciones-carrito");

  if (!contenedor || !divAcciones) return;

  contenedor.innerHTML = "";
  divAcciones.innerHTML = "";

  // Si no hay productos en el localStorage
  if (!carrito.length) {
    const mensaje = document.createElement("p");
    mensaje.classList.add("carrito-vacio-msg");
    mensaje.textContent = "Tu carrito de skincare está vacío 🛒🌿";

    contenedor.appendChild(mensaje);
    return;
  }

  // Armo las tarjetas de los productos agregados
  carrito.forEach((producto, index) => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("producto");

    tarjeta.innerHTML = `
      <div class="infoProducto">
          <div class="infoProductoBody">
              <img src="${producto.img}" alt="${producto.nombre}">
              <p class="nombreProducto"><strong>${producto.nombre}</strong></p>
          </div>
          <div class="infoProductoFooter">
              <p class="preciProducto">Precio: $${producto.precio}</p>
              <button class="btn-eliminar">
                Eliminar producto
              </button>
          </div>
      </div>
    `;

    // Asignar el evento para borrar este item específico
    const btnEliminar = tarjeta.querySelector(".btn-eliminar");
    btnEliminar.addEventListener("click", () => {
      eliminarProducto(index);
      renderizarCarrito(); // Volvemos a pintar el carrito actualizado
    });

    contenedor.appendChild(tarjeta);
  });

  // Calculo el total acumulado
  const total = carrito.reduce((acc, prod) => acc + prod.precio, 0);
  const totalFormateado = total.toFixed(2);

  // Muestro el total y el botón de vaciar
  const textoTotal = document.createElement("p");
  textoTotal.classList.add("carrito-total-txt");
  textoTotal.textContent = `Total a pagar: $${totalFormateado}`;

  const btnVaciar = document.createElement("button");
  btnVaciar.classList.add("btn-vaciar-cart");
  btnVaciar.textContent = "Vaciar carrito";

  btnVaciar.addEventListener("click", () => {
    vaciarCarrito();
    renderizarCarrito();
  });

  // Meto los elementos al contenedor de acciones
  divAcciones.classList.add("carrito-acciones-container");

  divAcciones.appendChild(textoTotal);
  divAcciones.appendChild(btnVaciar);
};

// Inicializar la vista al cargar la página del carrito
document.addEventListener("DOMContentLoaded", () => {
  renderizarCarrito();
});
