import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

// Cuando la página de inicio carga por completo
document.addEventListener("DOMContentLoaded", () => {
  const carrito = obtenerCarrito();
  actualizarContador(carrito);
});