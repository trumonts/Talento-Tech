import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

// Cuando la página carga por completo
document.addEventListener("DOMContentLoaded", () => {
  const carrito = obtenerCarrito();
  actualizarContador(carrito);

  // Toggle menú hamburguesa
  const toggleBtn = document.getElementById("hamburger-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      const icon = toggleBtn.querySelector("i");
      if (icon) {
        if (navMenu.classList.contains("active")) {
          icon.className = "bi bi-x-lg";
        } else {
          icon.className = "bi bi-list";
        }
      }
    });
  }
});